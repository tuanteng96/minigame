import { ArrayHelper, PathHelper } from "@/helpers";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ModalInfo, PrizePicker, PrizeWinnerModal } from "./components";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../../firebase";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet-async";

var colors = new Array(
  [94, 114, 228],
  [130, 94, 228],
  [45, 206, 137],
  [45, 206, 204],
  [17, 205, 239],
  [17, 113, 239],
  [245, 54, 92],
  [245, 96, 54]
);

var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.002;

function GiftBoxIdPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [MemberID, setMemberID] = useState("");
  const [open, setOpen] = useState(false);
  const [prize, setPrize] = useState();
  const [visible, setVisible] = useState(false);
  const [background, setBackground] = useState({
    webkit: "",
    moz: "",
  });
  const [visibleInfo, setVisibleInfo] = useState(false);

  const [openAudio] = useState(
    new Audio(PathHelper.toAbsolutePath("assets/lucky-gift-box/mp3/gift.mp3"))
  );
  const [winnerAudio] = useState(
    new Audio(
      PathHelper.toAbsolutePath("assets/lucky-gift-box/mp3/gift-winner.mp3")
    )
  );

  let BrowserId = Cookies.get("browserId");

  function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    setBackground({
      webkit:
        "-webkit-gradient(linear, left top, right top, from(" +
        color1 +
        "), to(" +
        color2 +
        "))",
      moz: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)",
    });

    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      colorIndices[1] =
        (colorIndices[1] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
      colorIndices[3] =
        (colorIndices[3] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
    }
  }

  useEffect(() => {
    updateGradient();
    // const intervalId = setInterval(updateGradient, 50);

    // return () => {
    //   clearInterval(intervalId);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMemberID(Number(searchParams.get("id")));
  }, []);

  const { data: Configs, isLoading } = useQuery({
    queryKey: ["Config-Minigame-GiftBox", MemberID],
    queryFn: async () => {
      const q = query(
        collection(db, "gift-box"),
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

  const checkAuth = useQuery({
    queryKey: ["CheckAuthen", MemberID],
    queryFn: async () => {
      let Auth = localStorage.getItem("_Auth");
      let parseAuth = Auth ? JSON.parse(Auth) : null;
      let data = [];
      if (parseAuth) {
        const q = query(
          collection(db, "gift-box-list"),
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

  const openGift = () => {
    let Auth = localStorage.getItem("_Auth");
    if (!Auth) {
      setVisibleInfo(true);
      return;
    }
    if (checkAuth?.data) {
      Swal.fire({
        title: "Hết lượt mở !",
        text: "Mỗi khách hàng chỉ được mở 1 lần duy nhất.",
        icon: "error",
      });
      return;
    }

    setOpen(true);
    openAudio.play();

    let index = ArrayHelper.getRandomItemByPercentage(
      Configs?.options,
      Configs?.options.map((item) => item.percentage)
    );

    onSumbit(Configs?.options[index]);

    setTimeout(() => {
      winnerAudio.play();
      setPrize(Configs?.options[index]);
      setVisible(true);
    }, 1500);
  };

  const onHide = () => {
    setOpen(false);
    setVisible(false);
    setPrize(null);
  };

  const onSubmitInfo = (values) => {
    localStorage.setItem("_Auth", JSON.stringify({ ...values }));
    localStorage.setItem("_Version", Configs?.Version);
    setVisibleInfo(false);
    openGift();
  };

  const onSumbit = (values) => {
    let Auth = localStorage.getItem("_Auth");
    let parseAuth = Auth ? JSON.parse(Auth) : null;

    let memberRef = doc(
      db,
      "gift-box-list",
      "MemberID-" + MemberID + "-" + parseAuth?.Phone
    );
    let payload = {
      Title: "Hộp quà bí ẩn",
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

  return (
    <>
      <Helmet>
        <title>{Configs?.Title}</title>
        <meta name="description" content={Configs?.Desc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={Configs?.Title} />
        <meta property="og:description" content={Configs?.Desc} />
        <meta property="og:image" content={Configs?.ThumbnailSharing} />
      </Helmet>
      <div
        className="relative h-full bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${PathHelper.toAbsolutePath(
            "assets/lucky-gift-box/bg.png"
          )}), ${background.webkit}`,
          //background: background.moz,
          //background: background.webkit,
        }}
      >
        <div className="relative flex flex-col h-full lg:flex-row w-full xl:w-[1200px] mx-auto">
          <div className="flex items-end h-[42%] lg:h-full lg:items-center lg:w-2/4 lg:order-2">
            <div
              onClick={openGift}
              className={clsx(
                "bg-cover cursor-pointer w-[var(--gift-width)] h-[var(--gift-height)] left-0 mx-auto my-0 perspective-9 relative",
                open && "open"
              )}
            >
              <div className={clsx("bg-cover", open && "pyro")}>
                <div className="bg-cover before" />
                <div className="bg-cover after" />
              </div>
              <div
                className={clsx(
                  "absolute w-full bg-cover top-2/4 flex items-center justify-center",
                  open && "z-10"
                )}
                style={{
                  transform: open
                    ? "translate3d(0, -50%, 10px) rotateY(1080deg) rotateX(10deg)"
                    : "translate3d(0, -50%, 0) rotateY(0) rotateX(0)",
                  transition:
                    "transform 2.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <img
                  src={PathHelper.toAbsolutePath(
                    "assets/lucky-gift-box/finish.png"
                  )}
                  className={clsx(
                    "max-w-fit w-[230px] transition",
                    open ? "visible opacity-100" : "invisible opacity-0"
                  )}
                />
              </div>
              <div
                className="h-full bg-cover"
                style={{
                  animation: "present-rotate 30s infinite linear",
                  transform: "rotateY(170deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-cover bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] translate-y-2/4 rotate-x-90" />
                <div
                  className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform .5s",
                    transform: open
                      ? "translateZ(var(--gift-translateZ)) rotateX(-90deg)"
                      : "translateZ(var(--gift-translateZ))",
                  }}
                />
                <div
                  className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform .5s",
                    transform: open
                      ? "translateX(-50%) rotateY(-90deg) rotateX(-90deg)"
                      : "translateX(-50%) rotateY(-90deg)",
                  }}
                />
                <div
                  className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform .5s",
                    transform: open
                      ? "translateZ(calc(var(--gift-translateZ) * -1)) rotateY(180deg) rotateX(-90deg)"
                      : "translateZ(calc(var(--gift-translateZ) * -1)) rotateY(180deg) rotateX(0)",
                  }}
                />
                <div
                  className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform .5s",
                    transform: open
                      ? "translateX(50%) rotateY(90deg) rotateX(-90deg)"
                      : "translateX(50%) rotateY(90deg)",
                  }}
                />
                <div
                  className="bg-cover"
                  style={{
                    animation: open ? "none" : "lid-animation 3.5s 1s infinite",
                    transform: open
                      ? "translate3d(0, -120px, -120px) rotateX(50deg)"
                      : "translate3d(0, 0, 0)",
                    transformStyle: "preserve-3d",
                    transition: "transform .7s",
                  }}
                >
                  <div
                    className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[var(--gift-width-lid)] h-[var(--gift-width-lid)] opacity-100 -left-[5px] -top-[5x] before:bg-white before:shadow before:content-[''] before:h-5 before:absolute before:left-0 before:top-[calc(50%-10px)] before:w-full before:translate-z-[0.1px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:absolute after:w-5 after:translate-z-[0.1px]"
                    style={{
                      transform: "translateY(-50%) rotateX(90deg)",
                      transformStyle: "preserve-3d",
                    }}
                  />
                  <div
                    className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[var(--gift-width-lid)] h-[40px] opacity-100 -left-[5px] -top-[5px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                    style={{
                      transform: "translateZ(var(--gift-lid-translateZ))",
                      transformStyle: "preserve-3d",
                    }}
                  />
                  <div
                    className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[var(--gift-width-lid)] h-[40px] opacity-100 -left-[5px] -top-[5px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                    style={{
                      transform: "translateX(-50%) rotateY(-90deg)",
                      transformStyle: "preserve-3d",
                    }}
                  />
                  <div
                    className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[var(--gift-width-lid)] h-[40px] opacity-100 -left-[5px] -top-[5px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                    style={{
                      transform:
                        "translateZ(calc(var(--gift-lid-translateZ) * -1)) rotateY(180deg)",
                      transformStyle: "preserve-3d",
                    }}
                  />
                  <div
                    className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[var(--gift-width-lid)] h-[40px] opacity-100 -left-[5px] -top-[5px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                    style={{
                      transform: "translateX(50%) rotateY(90deg)",
                      transformStyle: "preserve-3d",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grow lg:order-1 lg:h-full lg:flex lg:flex-col lg:justify-center">
            <div className="flex flex-col items-center justify-center pr-10 mt-10 pl-7 lg:mt-0">
              <img
                className="max-w-[500px] w-full"
                src={PathHelper.toAbsolutePath(
                  "assets/lucky-gift-box/title.png"
                )}
                alt=""
              />
            </div>
            <div>
              <div className="text-center text-white font-semibold text-[15px] leading-7">
                <div>
                  Bấm <span className="text-2xl font-bold">"Mở Hộp Quà"</span>
                </div>
                <div>để tìm kiếm giải thưởng may mắn của bạn</div>
              </div>
              <div className="mt-4 text-center">
                <button
                  className="pt-3 py-2.5 px-8 rounded-3xl font-bold capitalize text-white btn-gift"
                  type="button"
                  onClick={openGift}
                >
                  {checkAuth?.data ? (
                    <>
                      <span className="mr-2 last:mr-0">Hết</span>
                      <span className="mr-2 last:mr-0">lượt</span>
                      <span className="mr-2 last:mr-0">mở!</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2 last:mr-0">Mở</span>
                      <span className="mr-2 last:mr-0">hộp</span>
                      <span className="mr-2 last:mr-0">quà!</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <PrizePicker data={Configs?.options || []}>
                {({ open }) => (
                  <div
                    className="font-semibold text-white underline cursor-pointer"
                    onClick={open}
                  >
                    Danh sách giải thưởng
                  </div>
                )}
              </PrizePicker>
            </div>
            <div className="hidden py-5 text-center text-white lg:block">
              Khách hàng có
              <span className="px-1">{checkAuth?.data ? "0" : "1"}</span>
              lượt mở hộp quà.
            </div>
          </div>
          <div className="py-5 text-sm text-center text-white lg:hidden">
            Khách hàng có
            <span className="px-1">{checkAuth?.data ? "0" : "1"}</span>
            lượt mở hộp quà.
          </div>
        </div>
        <PrizeWinnerModal
          visible={visible}
          prize={prize}
          onHide={onHide}
          PrizeJson={Configs}
        />

        <ModalInfo
          visible={visibleInfo}
          onHide={() => setVisibleInfo(false)}
          onSubmit={onSubmitInfo}
        />
      </div>
    </>
  );
}

export default GiftBoxIdPage;
