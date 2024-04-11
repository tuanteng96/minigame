import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage, Wedge } from "react-konva";
import { URLImage } from "./URLImage";
import Rectangle from "./Rectangle";
import FindLocationText from "./FindLocationText";
import { ArrayHelper } from "@/helpers";
import clsx from "clsx";

let timer = null;

function WheelComponent({
  alerDisabled,
  spinDisabled = false,
  spinDuration = 8000,
  width = 550,
  height = 550,
  backgroundImage,
  buttonImage,
  arrowImage,
  data,
  CenterDistance = 80, // Khoảng cách từ tâm tới item
  onStopSpinning,
  backgroundSounding,
  winnerSounding,
  classNames = {
    arrowImageClass: "w-[90px]",
    arrowImageWrapClass: "absolute top-0 z-10 left-2/4 -translate-x-2/4",
    buttonWrapperClass:
      "absolute z-20 w-[100px] h-100 left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center",
  },
}) {
  const initialValues = FindLocationText({
    width,
    initialValues: data,
    CenterDistance,
  });

  const [rectangles, setRectangles] = useState(initialValues);
  const [selectedId, selectShape] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // const [Image, setImage] = React.useState(initialValueImgaes);
  const [Rotate, setRotate] = useState(0);

  const [backgroundAudio] = useState(new Audio(backgroundSounding));
  const [winnerAudio] = useState(new Audio(winnerSounding));

  let dataLength = data.length;

  useEffect(() => {
    if (Rotate > 0) {
      timer = setTimeout(() => {
        let MissingRotation = Rotate % 360;
        let index = Math.floor(MissingRotation / (360 / dataLength));

        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;

        setIsSpinning(false);

        onStopSpinning && onStopSpinning(initialValues[index]);
      }, spinDuration);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Rotate]);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
    if (e.target.attrs.height === width) {
      selectShape(null);
    }
  };

  const onStart = () => {
    if (isSpinning) return;
    if (spinDisabled) {
      alerDisabled && alerDisabled();
      return;
    }

    backgroundAudio.play();
    backgroundAudio.loop = true;

    setIsSpinning(true);
    let index = ArrayHelper.getRandomItemByPercentage(
      data,
      data.map((item) => item.percentage)
    );
    let random =
      Rotate +
      (360 - (Rotate % 360)) +
      Math.floor((360 / dataLength) * index + 360 * 8);
    setRotate(random % (360 / dataLength) === 0 ? 10 + random : random);

    // Winner Sounding Play spinDuration
    winnerAudio.play();
    winnerAudio.pause();
    
    setTimeout(() => {
      winnerAudio.play();
    }, spinDuration);
    
  };

  return (
    <div className="relative inline-block">
      {arrowImage && (
        <div className={classNames.arrowImageWrapClass}>
          <img className={classNames.arrowImageClass} src={arrowImage} alt="" />
        </div>
      )}
      <div className="overflow-hidden">
        <Stage
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{
            transform: `rotate(-${Rotate}deg)`,
            transition: `all ${spinDuration}ms`,
          }}
        >
          <Layer>
            <URLImage
              src={backgroundImage}
              rotation={0}
              width={width}
              height={height}
              x={0}
              y={0}
            />
            {initialValues.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
      {buttonImage && (
        <div className={clsx(classNames.buttonWrapClass)}>
          <button
            className={clsx("transition-all", isSpinning && "scale-95")}
            type="button"
            onClick={onStart}
          >
            <img className="w-full" src={buttonImage} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default WheelComponent;
