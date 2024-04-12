import { PathHelper } from "@/helpers";
import clsx from "clsx";
import { useState } from "react";

function LuckyGiftBoxPage() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="h-full bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${PathHelper.toAbsolutePath(
          "assets/lucky-gift-box/hopqua.png"
        )})`,
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div
          onClick={() => setOpen(!open)}
          className={clsx(
            "present bg-cover cursor-pointer w-[260px] h-[260px] left-0 mx-auto my-0 perspective-9 relative",
            open && "open"
          )}
        >
          <div className={clsx("bg-cover", open && "pyro")}>
            <div className="bg-cover before" />
            <div className="bg-cover after" />
          </div>
          <div
            className={clsx("absolute w-full bg-cover top-2/4", open && "z-10")}
            style={{
              transform: open
                ? "translate3d(0, -50%, 10px) rotateY(1080deg) rotateX(10deg)"
                : "translate3d(0, -50%, 0) rotateY(0) rotateX(0)",
              transition: "transform 2.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            <div
              className={clsx(
                "w-full h-[250px] bg-black transition",
                open ? "visible opacity-100" : "invisible opacity-0"
              )}
            ></div>
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
                  ? "translateZ(130px) rotateX(-90deg)"
                  : "translateZ(130px)",
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
                  ? "translateZ(-130px) rotateY(180deg) rotateX(-90deg)"
                  : "translateZ(-130px) rotateY(180deg) rotateX(0)",
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
                className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5x] h-[270px] before:bg-white before:shadow before:content-[''] before:h-5 before:absolute before:left-0 before:top-[calc(50%-10px)] before:w-full before:translate-z-[0.1px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:absolute after:w-5 after:translate-z-[0.1px]"
                style={{
                  transform: "translateY(-50%) rotateX(90deg)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                style={{
                  transform: "translateZ(135px)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                style={{
                  transform: "translateX(-50%) rotateY(-90deg)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                style={{
                  transform: "translateZ(-135px) rotateY(180deg)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px] after:bg-white after:shadow after:content-[''] after:h-full after:left-[calc(50%-10px)] after:w-5 after:absolute after:translate-z-[0.1px]"
                style={{
                  transform: "translateX(50%) rotateY(90deg)",
                  transformStyle: "preserve-3d",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuckyGiftBoxPage;
