import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PathHelper } from "@/helpers";
import { XMarkIcon } from "@heroicons/react/24/solid";
import moment from "moment";

function PrizeWinnerModal({ visible, onHide, prize, PrizeJson }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {visible && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 flex items-end justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:items-center md:inset-0 bg-black/85">
            <motion.div
              className="relative w-full md:max-w-[450px] h-full z-20 shadow-xl flex flex-col justify-center"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
            >
              <div
                className="absolute flex items-center justify-center w-12 h-12 text-white transition cursor-pointer top-2 right-2 opacity-85 hover:opacity-100 md:hidden"
                onClick={onHide}
              >
                <XMarkIcon className="w-9" />
              </div>
              <div className="bg-cover pyro">
                <div className="bg-cover before"></div>
                <div className="bg-cover after"></div>
              </div>
              <div className="overflow-auto">
                <div className="flex flex-col items-center">
                  <div className="max-w-[300px] animate-bounce2">
                    <img
                      className="w-full"
                      src={PathHelper.toAbsolutePath(
                        "assets/lucky-gift-box/top.png"
                      )}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-2 font-medium text-white">
                    Bạn nhận được
                  </div>
                  <div className="w-[200px] bg-white px-5 pt-6 pb-5 rounded-lg text-center uppercase text-[#fd9426] text-lg font-semibold overflow-hidden relative leading-6">
                    {prize?.option}
                    <div className="absolute w-4 h-4 rounded-full bg-black/90 -top-2 left-7"></div>
                    <div className="absolute w-4 h-4 rounded-full bg-black/90 -bottom-2 left-7"></div>
                    <div className="absolute w-4 h-4 rounded-full bg-black/90 -top-2 right-7"></div>
                    <div className="absolute w-4 h-4 rounded-full bg-black/90 -bottom-2 right-7"></div>
                  </div>
                </div>
                <div className="relative flex flex-col items-center">
                  <img
                    src={PathHelper.toAbsolutePath(
                      "assets/lucky-gift-box/bottom.png"
                    )}
                    className="max-w-[300px]"
                    alt=""
                  />
                  <div className="absolute bg-white rounded text-[#fd9426] px-4 py-2 font-medium bottom-0 overflow-hidden">
                    HSD :
                    <span className="pl-1">
                      {moment(
                        PrizeJson?.EndDate,
                        "HH:mm DD-MM-YYYY",
                        true
                      ).isValid()
                        ? moment(PrizeJson?.EndDate, "HH:mm DD-MM-YYYY").format(
                            "HH:mm DD-MM-YYYY"
                          )
                        : PrizeJson?.EndDate
                        ? moment()
                            .set({
                              hours: "23",
                              minutes: "59",
                            })
                            .add(Number(PrizeJson?.EndDate || 7), "days")
                            .format("DD-MM-YYYY")
                        : "Không giới hạn"}
                    </span>
                    <div className="w-3 h-3 absolute bg-black/90 rounded-full -left-1.5 top-2/4 -translate-y-2/4"></div>
                    <div className="w-3 h-3 absolute bg-black/90 rounded-full -right-1.5 top-2/4 -translate-y-2/4"></div>
                  </div>
                </div>
                <div className="text-white text-[13px] text-center px-5 mt-4">
                  {PrizeJson?.footer}
                </div>
              </div>
            </motion.div>
            <div
              className="absolute items-center justify-center hidden w-12 h-12 text-white transition cursor-pointer top-2 right-2 opacity-85 hover:opacity-100 md:flex"
              onClick={onHide}
            >
              <XMarkIcon className="w-9" />
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PrizeWinnerModal;
