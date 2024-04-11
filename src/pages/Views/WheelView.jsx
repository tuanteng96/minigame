import { BannersAPI, ContactAPI } from "@/api";
import WheelComponent from "@/components/wheel-lucky";
import { PathHelper } from "@/helpers";
import { Modal } from "@/partials/modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

function WheelViewPage(props) {
  const [width, setWidth] = useState(550);
  const [data, setData] = useState({
    items: [
      {
        option: "Giảm 30% 1 dịch vụ Công nghệ cao bất kỳ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0.25,
        values: "A",
        id: "1",
        id_img: "img_1",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 10,
        color: "#000000",
        visible: false,
      },
      {
        option: "Peel Peptide tặng 1 Aqua Pure skin trị giá 900.000",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0.25,
        values: "",
        id: "2",
        id_img: "img_2",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 10,
        color: "#ffffff",
        visible: false,
      },
      {
        option: "Giảm 25% dịch vụ thẩm mỹ nội khoa (Filler/Botox/Chỉ Collagen)",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "ADFG",
        id: "3",
        id_img: "img_3",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 10,
        color: "#000000",
        visible: false,
      },
      {
        option: "Peel Pro tặng 1 Detox Oxygen trị giá 1.200.000",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "4",
        id_img: "img_4",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 15,
        color: "#FFFFFF",
        visible: false,
      },
      {
        option: "Mua 2 tặng 1 toàn bộ dịch vụ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "5",
        id_img: "img_5",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 20,
        color: "#000000",
        visible: false,
      },
      {
        option: "Tặng 1 DV add on RF mắt 990.000 khi mua 1 dịch vụ bất kỳ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "6",
        id_img: "img_6",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 5,
        color: "#FFFFFF",
        visible: false,
      },
      {
        option: "Giảm 20% cho 1 sản phẩm bất kỳ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "7",
        id_img: "img_7",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 10,
        color: "#000000",
        visible: false,
      },
      {
        option:
          "Tặng 1 DV add on RF cổ trị giá 990.000 khi mua 1 dịch vụ bất kỳ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "8",
        id_img: "img_8",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 5,
        color: "#FFFFFF",
        visible: false,
      },
      {
        option:
          "Tặng 1 DV Add on quang trị liệu PDT trị giá 490.000 khi mua 1 dịch vụ bất kỳ",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "9",
        id_img: "img_9",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 5,
        color: "#000000",
        visible: false,
      },
      {
        option: "Meso Therapy tặng 1 Skin Repair trị giá 1.500.000",
        x: 0,
        y: 0,
        rotation: 0,
        chance: 0,
        values: "",
        id: "11",
        id_img: "img_11",
        url: "",
        x_i: 0,
        y_i: 0,
        width_i: 0,
        height_i: 0,
        rotation_i: 0,
        percentage: 10,
        color: "#000000",
        visible: false,
      },
    ],
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
  });

  const params = new URLSearchParams(window.location.search);

  const [BrandVQMM, setBrandVQMM] = useState("");

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

  let BrowserId = Cookies.get("browserId");

  const checkAuth = useQuery({
    queryKey: ["CheckAuthen", { BrowserId, MemberID: window?.Info?.ID || "" }],
    queryFn: async () => {
      let { data: brandVQ } = await BannersAPI.getName("APP.POPUP");
      let data = await ContactAPI.verify({
        Title:
          brandVQ && brandVQ.data && brandVQ.data.length > 0
            ? brandVQ.data[0].Title
            : "",
        MemberID: window?.Info?.ID || "",
        BrowserId: BrowserId,
      });
      setBrandVQMM(
        brandVQ && brandVQ.data && brandVQ.data.length > 0
          ? brandVQ.data[0].Title
          : ""
      );
      return data?.data?.contact || null;
    },
  });

  const PrizeJson = useQuery({
    queryKey: ["PrizeJson"],
    queryFn: async () => {
      let { data } = await axios.get(
        import.meta.env.BASE_URL + "assets/json/prize.json"
      );
      return data || [];
    },
  });

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      items: PrizeJson?.data || [],
    }));
  }, [PrizeJson?.data]);

  const sendMutation = useMutation({
    mutationFn: (body) => ContactAPI.send(body),
  });
  const onSumbit = (values) => {
    sendMutation.mutate(
      {
        contact: {
          Title: BrandVQMM,
          Fullname: window?.Info?.FullName || "",
          Phone1: window?.Info?.MobilePhone || "",
          Content: values?.option || "",
          MemberID: window?.Info?.ID || "",
          BrowserId: BrowserId || "",
          Status: "0",
          Type: "contact",
          StockID: window?.Info?.ByStockID || "",
          DepartmentID: params.get("DepartmentID") || 0,
          EndDate: params.get("EndDate")
            ? moment(params.get("EndDate"), "DD-MM-YYYY")
                .set({
                  hours: "23",
                  minutes: "59",
                })
                .format("HH:mm YYYY-MM-DD")
            : moment("01-01-2099", "DD-MM-YYYY")
                .set({
                  hours: "23",
                  minutes: "59",
                })
                .format("HH:mm YYYY-MM-DD"),
        },
      },
      {
        onSuccess: (data) => {
          checkAuth.refetch();
        },
      }
    );
  };

  const {
    items,
    backgroundSounding,
    winnerSounding,
    backgroundImage,
    buttonImage,
    arrowImage,
    layoutBackground,
    logo,
  } = data;

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
              onSumbit(values);
            }}
            backgroundSounding={backgroundSounding}
            winnerSounding={winnerSounding}
            spinDuration={5000}
            //spinDisabled={checkAuth?.data}
            alerDisabled={() => {
              Swal.fire({
                title: "Hết lượt quay !",
                text: "Mỗi thành viên chỉ được quay 1 lượt duy nhất.",
                icon: "error",
              });
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
      <div className="md:text-[18px] md:leading-9 md:absolute relative left-0 bottom-0 md:left-14 w-full md:w-[550px] bg-[#bd0c21] text-white px-8 md:px-14 pt-16 md:pt-28 pb-5 md:pb-10 rounded-t-[25px]">
        <div className="absolute -top-16 md:-top-20 w-[150px] md:w-[220px] left-2/4 -translate-x-2/4">
          <img
            className="w-full"
            src={PathHelper.toAbsolutePath("assets/12/TITLE.png")}
            alt=""
          />
        </div>
        <div className="mb-6 font-light text-center">
          Bấm "QUAY" để bắt đầu quay vòng quay. Ô giải thưởng nào dừng lại ở vị
          trí mũi tên khi vòng quay kết thúc bạn sẽ nhận được giải thưởng tương
          ứng.
        </div>
        <div className="text-center">
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

export default WheelViewPage;
