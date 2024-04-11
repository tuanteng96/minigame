import WheelComponent from "@/components/wheel-lucky";
import { Modal } from "@/partials/modal";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function Preview1Page(props) {
  const { state } = useLocation();
  const { params } = state;
  const [width, setWidth] = useState(550);

  const [visible, setVisible] = useState(false);
  const [spinActive, setSpinActive] = useState(null);

  const wheelRef = useRef();

  const size = useWindowSize();

  useEffect(() => {
    if (size.width && wheelRef?.current?.clientWidth > size.height) {
      setWidth(size.height);
    } else {
      setWidth(wheelRef?.current?.clientWidth || 550);
    }
  }, [wheelRef, size]);

  if (!params) return <></>;
  
  const {
    items,
    backgroundSounding,
    winnerSounding,
    backgroundImage,
    buttonImage,
    arrowImage,
  } = params;

  return (
    <div
      className="w-full min-h-full md:h-full !bg-no-repeat !bg-cover flex flex-col"
      style={{ background: `url(${params.layoutBackground})` }}
    >
      <div className="grow">
        <div className="flex justify-center pt-5 md:absolute md:left-14 md:top-10 md:mt-0">
          <img
            className="w-[150px] md:w-[200px]"
            src={import.meta.env.BASE_URL + "assets/12/logo.png"}
            alt=""
          />
        </div>
        <div className="md:absolute md:top-2/4 md:-translate-y-2/4 md:right-[5%] px-5 pt-10 md:pt-0 md:px-0 mb-24 md:mb-0">
          <div ref={wheelRef} className="md:w-[550px] w-full"></div>
          <WheelComponent
            width={width}
            height={width}
            backgroundImage={backgroundImage}
            buttonImage={buttonImage}
            arrowImage={arrowImage}
            data={items}
            onStopSpinning={(values) => {
              setSpinActive(values);
              setVisible(true);
            }}
            backgroundSounding={backgroundSounding}
            winnerSounding={winnerSounding}
            spinDuration={5000}
            classNames={{
              arrowImageClass: "w-full",
              arrowImageWrapClass:
                "absolute -top-8 z-10 left-2/4 -translate-x-2/4 w-[10%]",
              buttonWrapClass:
                "absolute z-20 w-[18%] h-100 left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center",
            }}
          />
        </div>
      </div>
      <div className="md:absolute relative left-0 bottom-0 md:left-14 w-full md:w-[500px] bg-[#bd0c21] text-white px-8 md:px-14 pt-16 md:pt-28 pb-5 md:pb-10 rounded-t-[25px]">
        <div className="absolute -top-16 md:-top-20 w-[150px] md:w-[220px] left-2/4 -translate-x-2/4">
          <img
            className="w-full"
            src={import.meta.env.BASE_URL + "assets/12/TITLE.png"}
            alt=""
          />
        </div>
        <div className="mb-6 font-light text-center">
          Bấm "QUAY" để bắt đầu quay vòng quay. Ô giải thưởng nào dừng lại ở vị
          trí mũi tên khi vòng quay kết thúc bạn sẽ nhận được quà tặng.
        </div>
        <div className="mb-6 font-light text-center">
          Bấm "QUAY" để bắt đầu quay vòng quay. Ô giải thưởng nào dừng lại ở vị
          trí mũi tên khi vòng quay kết thúc bạn sẽ nhận được quà tặng.
        </div>
        <div className="text-base text-center">
          Khách hàng chỉ có 1 lượt quay duy nhất.
        </div>
      </div>
      <Modal
        values={spinActive}
        visible={visible}
        onHide={() => {
          setSpinActive(null);
          setVisible(false);
        }}
      />
    </div>
  );
}

export default Preview1Page;
