import { Transformer, Text } from "react-konva";
import React, { useEffect, useRef } from "react";

export default function Rectangle({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        // onClick={onSelect}
        // onTap={onSelect}
        visible={shapeProps.visible}
        ref={shapeRef}
        {...shapeProps}
        text={shapeProps.option}
        x={shapeProps.x}
        y={shapeProps.y}
        rotation={shapeProps.rotation}
        fontSize={15}
        // draggable
        // onDragEnd={(e) => {
        //   onChange({
        //     ...shapeProps,
        //     x: e.target.x(),
        //     y: e.target.y(),
        //   });
        // }}
        // onTransformEnd={(e) => {
        //   onChange({
        //     ...shapeProps,
        //   });
        // }}
        fontFamily="Be Vietnam Pro"
        wrap="word"
        width={200}
        fill={shapeProps.color}
        // stroke="#fff"
        fontStyle="500"
      />
      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}
    </>
  );
}
