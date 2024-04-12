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
      <div className="h-full flex items-center justify-center">
        <div
          onClick={() => setOpen(!open)}
          className={clsx(
            "present bg-cover cursor-pointer w-[260px] h-[260px] left-0 mx-auto my-0 perspective-9 relative",
            open && "open"
          )}
        >
          <div className={clsx("bg-cover", open && "pyro")}>
            <div className="before bg-cover" />
            <div className="after bg-cover" />
          </div>
          <div className="name bg-cover">
            <img src="gift/images/aaa1.png" alt="#" style={{ width: 300 }} />
          </div>
          <div className="rotate-container bg-cover">
            <div className="bg-cover bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2] translate-y-2/4 rotate-x-90" />
            <div className="front bg-cover bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2]" />
            <div
              className={clsx(
                "bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2]"
              )}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform .5s",
                transform: open
                  ? "translateX(-50%) rotateY(-90deg) rotateX(-90deg)"
                  : "translateX(-50%) rotateY(-90deg)",
              }}
            />
            <div
              className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2]"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform .5s",
                transform: open
                  ? "translateZ(-130px) rotateY(180deg) rotateX(-90deg)"
                  : "translateZ(-130px) rotateY(180deg) rotateX(0)",
              }}
            />
            <div
              className="bg-cover origin-bottom bg-[#d3d3d3] h-full left-0 top-0 absolute w-full border border-black/[0.2]"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform .5s",
                transform: open
                  ? "translateX(50%) rotateY(90deg) rotateX(-90deg)"
                  : "translateX(50%) rotateY(90deg)",
              }}
            />
            <div className="lid bg-cover">
              <div
                className="lid-top bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5x] h-[270px] before:bg-white before:shadow before:content-[''] before:h-5 before:absolute before:left-0 before:top-[calc(50%-10px)] before:w-full before:translate-z-[0.1px]"
                style={{
                  transform: "translateY(-50%) rotateX(90deg)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="lid-front bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px]"
                style={{
                  transform: "translateZ(135px)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div
                className="lid-left bg-cover bg-[#ab035a] border border-black/[0.2] absolute w-[270px] opacity-100 -left-[5px] -top-[5px] h-[40px]"
                style={{
                  transform: "translateX(-50%) rotateY(-90deg)",
                  transformStyle: "preserve-3d",
                }}
              />
              <div className="lid-back bg-cover" />
              <div className="lid-right bg-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuckyGiftBoxPage;
