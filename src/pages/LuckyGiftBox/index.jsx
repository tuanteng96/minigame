import { ArrayHelper, PathHelper } from "@/helpers";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PrizePicker, PrizeWinnerModal } from "./components";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { BannersAPI, ContactAPI } from "@/api";
import moment from "moment";
import Swal from "sweetalert2";

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

function LuckyGiftBoxPage() {
  const [data, setData] = useState([]);
  const [BrandGift, setBrandGift] = useState("");
  const [open, setOpen] = useState(false);
  const [prize, setPrize] = useState();
  const [visible, setVisible] = useState(false);
  const [background, setBackground] = useState({
    webkit: "",
    moz: "",
  });

  const [openAudio] = useState(
    new Audio(PathHelper.toAbsolutePath("assets/lucky-gift-box/mp3/gift.mp3"))
  );
  const [winnerAudio] = useState(
    new Audio(
      PathHelper.toAbsolutePath("assets/lucky-gift-box/mp3/gift-winner.mp3")
    )
  );

  const params = new URLSearchParams(window.location.search);

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
    const intervalId = setInterval(updateGradient, 50);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setBrandGift(
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
        import.meta.env.BASE_URL + "assets/json/gift.json"
      );
      return data || [];
    },
  });

  useEffect(() => {
    setData(PrizeJson?.data?.data);
  }, [PrizeJson?.data]);

  const openGift = () => {
    if (!PrizeJson?.data?.unlimitedTurns && checkAuth?.data) {
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
      data,
      data.map((item) => item.percentage)
    );

    onSumbit(data[index]);

    setTimeout(() => {
      winnerAudio.play();
      setPrize(data[index]);
      setVisible(true);
    }, 1500);
  };

  const onHide = () => {
    setOpen(false);
    setVisible(false);
    setPrize(null);
  };

  const sendMutation = useMutation({
    mutationFn: (body) => ContactAPI.send(body),
  });

  const onSumbit = (values) => {
    sendMutation.mutate(
      {
        contact: {
          Title: BrandGift,
          Fullname: window?.Info?.FullName || "",
          Phone1: window?.Info?.MobilePhone || "",
          Content: values?.option || "",
          MemberID: window?.Info?.ID || "",
          BrowserId: BrowserId || "",
          Status: "0",
          Type: "contact",
          StockID: window?.Info?.ByStockID || "",
          DepartmentID: params.get("DepartmentID") || 0,
          EndDate: moment(params.get("EndDate"), "DD-MM-YYYY", true).isValid()
            ? moment(params.get("EndDate"), "DD-MM-YYYY")
                .set({
                  hours: "23",
                  minutes: "59",
                })
                .format("HH:mm YYYY-MM-DD")
            : moment()
                .set({
                  hours: "23",
                  minutes: "59",
                })
                .add(Number(params.get("EndDate") || 7), "days")
                .format("HH:mm YYYY-MM-DD"),
        },
      },
      {
        onSuccess: () => {
          checkAuth.refetch();
        },
      }
    );
  };

  return (
    <div
      className="h-full bg-no-repeat bg-cover flex flex-col relative"
      style={{
        backgroundImage: `url(${PathHelper.toAbsolutePath(
          "assets/lucky-gift-box/bg.png"
        )}), ${background.webkit}`,
        //background: background.moz,
        //background: background.webkit,
      }}
    >
      <div className="flex items-end h-[42%]">
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
              transition: "transform 2.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
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
      <div className="grow">
        <div className="pl-7 pr-10 mt-10">
          <img
            src={PathHelper.toAbsolutePath("assets/lucky-gift-box/title.png")}
            alt=""
          />
        </div>
        <div>
          <div className="text-center text-white font-semibold text-[15px] leading-7">
            <div>
              Bấm <span className="text-2xl font-bold">"Mở Hộp Quà"</span>
            </div>
            <div>để tìm kiếm giải thưởng may mắn của bản</div>
          </div>
          <div className="text-center mt-4">
            <button
              className="pt-3 py-2.5 px-8 rounded-3xl font-bold capitalize text-white btn-gift"
              type="button"
              onClick={openGift}
            >
              {!PrizeJson?.data?.unlimitedTurns && checkAuth?.data ? (
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
        <div className="text-center mt-8">
          <PrizePicker data={data}>
            {({ open }) => (
              <div
                className="text-white cursor-pointer underline font-semibold"
                onClick={open}
              >
                Danh sách giải thưởng
              </div>
            )}
          </PrizePicker>
        </div>
      </div>
      <div className="text-center text-white text-sm py-5">
        Khách hàng có
        <span className="px-1">
          {!PrizeJson?.data?.unlimitedTurns && checkAuth?.data ? "0" : "1"}
        </span>
        lượt mở hộp quà.
      </div>
      <PrizeWinnerModal
        visible={visible}
        prize={prize}
        onHide={onHide}
        PrizeJson={PrizeJson}
      />
    </div>
  );
}

export default LuckyGiftBoxPage;
