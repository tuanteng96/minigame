import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import db from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { PathHelper } from "@/helpers";
import WheelComponentId from "@/components/wheel-lucky-id";
import { useWindowSize } from "@uidotdev/usehooks";
import { Modal } from "@/partials/modal";
import moment from "moment";
import ModalInfo from "./components/ModalInfo";
import Swal from "sweetalert2";

function RotationLuckId(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [MemberID, setMemberID] = useState("");

  const [visible, setVisible] = useState(false);
  const [spinActive, setSpinActive] = useState(null);
  const [visibleInfo, setVisibleInfo] = useState(false);

  const [width, setWidth] = useState(550);
  const wheelRef = useRef();

  const size = useWindowSize();

  const [data, setData] = useState({
    items: [],
    clickSounding: PathHelper.toAbsolutePath("assets/mp3/tick.mp3"),
    backgroundSounding: PathHelper.toAbsolutePath(
      "assets/mp3/backgroundsound.mp3"
    ),
    winnerSounding: PathHelper.toAbsolutePath("assets/mp3/fanfare-winner.mp3"),
    backgroundImage: PathHelper.toAbsolutePath("assets/12/vongquay.png"),
    buttonImage: PathHelper.toAbsolutePath("assets/12/quay.png"),
    arrowImage: PathHelper.toAbsolutePath("assets/12/muiten.png"),
    layoutBackground: PathHelper.toAbsolutePath("assets/12/maunen.jpg"),
    logo: PathHelper.toAbsolutePath("assets/12/logo.png"),
    Instruct:
      'Bấm "QUAY" để bắt đầu quay vòng quay. Ô giải thưởng nào dừng lại ở vị trí mũi tên khi vòng quay kết thúc bạn sẽ nhận được giải thưởng tương ứng.',
    TitleImage: PathHelper.toAbsolutePath("assets/12/TITLE.png"),
  });

  const { data: Configs, isLoading } = useQuery({
    queryKey: ["Config-Minigame-Rotation", MemberID],
    queryFn: async () => {
      const q = query(
        collection(db, "rotation-luck"),
        where("MemberID", "==", MemberID)
      );
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data && data.length > 0 ? data[0] : null;
    },
    enabled: Boolean(MemberID && MemberID > 0),
  });

  useEffect(() => {
    if (size.width && wheelRef?.current?.clientWidth > size.height) {
      setWidth(size.height);
    } else {
      setWidth(wheelRef?.current?.clientWidth || 550);
    }
  }, [wheelRef, size, isLoading]);

  useEffect(() => {
    setMemberID(Number(searchParams.get("id")));
  }, []);

  useEffect(() => {
    if (Configs) {
      let {
        BackgroundImage,
        Instruct,
        TitleImage,
        CarouselPhoto,
        RotationButton,
        options,
        Color,
        ColorText,
      } = Configs;
      
      document.documentElement.style.setProperty('--color', Color);
      document.documentElement.style.setProperty('--color-text', ColorText);

      setData((prevState) => ({
        ...prevState,
        layoutBackground: BackgroundImage,
        Instruct,
        TitleImage,
        backgroundImage: CarouselPhoto,
        buttonImage: RotationButton,
        items: options,
        Color,
        ColorText,
      }));
    }
  }, [Configs]);

  const onSubmitInfo = (values) => {
    localStorage.setItem("_Auth", JSON.stringify({ ...values }));
    localStorage.setItem("_Version", Configs?.Version);
    setVisibleInfo(false);
  };

  const checkAuth = useQuery({
    queryKey: ["CheckAuthen", MemberID],
    queryFn: async () => {
      let Auth = localStorage.getItem("_Auth");
      let parseAuth = Auth ? JSON.parse(Auth) : null;
      let data = [];
      if (parseAuth) {
        const q = query(
          collection(db, "rotation-luck-list"),
          where("MemberID", "==", MemberID),
          where("Phone", "==", parseAuth.Phone),
          where("Fullname", "==", parseAuth.Fullname)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
      }
      return data && data.length > 0 ? data[0] : null;
    },
    enabled: Boolean(MemberID && MemberID > 0),
  });

  const onSumbit = (values) => {
    let Auth = localStorage.getItem("_Auth");
    let parseAuth = Auth ? JSON.parse(Auth) : null;

    let memberRef = doc(
      db,
      "rotation-luck-list",
      "MemberID-" + MemberID + "-" + parseAuth?.Phone
    );
    let payload = {
      Title: "Vòng quay may mắn",
      Fullname: parseAuth?.Fullname || "",
      Phone: parseAuth?.Phone || "",
      Content: values?.option || "",
      MemberID: MemberID || "",
      EndDate: Configs?.EndDate,
      EndDatePlay: moment(Configs?.EndDate, "HH:mm DD-MM-YYYY", true).isValid()
        ? moment(Configs?.EndDate, "HH:mm DD-MM-YYYY").format(
            "HH:mm DD-MM-YYYY"
          )
        : Configs?.EndDate
        ? moment()
            .set({
              hours: "23",
              minutes: "59",
            })
            .add(Number(Configs?.EndDate || 7), "days")
            .format("HH:mm DD-MM-YYYY")
        : null,
      timestamp: serverTimestamp(),
    };

    setDoc(memberRef, payload).then((rs) => {
      checkAuth.refetch();
    });
  };

  const {
    items,
    backgroundSounding,
    winnerSounding,
    backgroundImage,
    buttonImage,
    arrowImage,
    layoutBackground,
    Instruct,
    TitleImage,
    Color,
    ColorText,
  } = data;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-24 h-24 border-t-8 border-b-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-b-8 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return (
    <div
      className="w-full min-h-full md:h-full !bg-no-repeat !bg-cover flex flex-col"
      style={{ background: `url(${layoutBackground})` }}
    >
      <div className="grow">
        {/* <div className="flex justify-center pt-5 md:absolute md:left-14 md:top-10 md:mt-0">
      <img className="w-[150px] md:w-[200px]" src={logo} alt="" />
    </div> */}
        <div className="md:absolute md:top-2/4 md:-translate-y-2/4 md:right-[5%] px-5 pt-10 md:pt-0 md:px-0 mb-24 md:mb-0">
          <div ref={wheelRef} className="md:w-[550px] w-full"></div>
          <WheelComponentId
            width={width}
            height={width}
            backgroundImage={backgroundImage}
            buttonImage={buttonImage}
            arrowImage={arrowImage}
            data={items}
            onStopSpinning={(values) => {
              setSpinActive(values);
              setVisible(true);
              onSumbit(values);
            }}
            backgroundSounding={backgroundSounding}
            winnerSounding={winnerSounding}
            spinDuration={5000}
            spinDisabled={checkAuth?.data || !localStorage.getItem("_Auth")}
            alerDisabled={() => {
              let Auth = localStorage.getItem("_Auth");
              if (!Auth) {
                setVisibleInfo(true);
                return;
              }
              if (checkAuth?.data) {
                Swal.fire({
                  title: "Hết lượt quay !",
                  text: "Mỗi khách hàng chỉ được mở 1 lần duy nhất.",
                  icon: "error",
                });
                return;
              }
            }}
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
      <div
        className={`md:text-[18px] md:leading-9 md:absolute relative left-0 bottom-0 md:left-14 w-full md:w-[550px] bg-[var(--color)] text-[var(--color-text)] px-8 md:px-14 pt-16 md:pt-28 pb-5 md:pb-10 rounded-t-[25px]`}
      >
        <div className="absolute w-auto -top-16 md:-top-20 left-2/4 -translate-x-2/4">
          <img className="w-full" src={TitleImage} alt="" />
        </div>
        <div className="mt-3 mb-6 font-light text-center">{Instruct}</div>
        <div className="text-center">
          Khách hàng có
          <span className="px-1">{checkAuth?.data ? "0" : "1"}</span>
          lượt quay.
        </div>
      </div>
      <Modal
        values={spinActive}
        visible={visible}
        onHide={() => {
          setSpinActive(null);
          setVisible(false);
        }}
        PrizeJson={{
          data: {
            copyrightWinner: Configs?.footer || "",
          },
        }}
      />
      <ModalInfo
        visible={visibleInfo}
        onHide={() => setVisibleInfo(false)}
        onSubmit={onSubmitInfo}
      />
    </div>
  );
}

export default RotationLuckId;
