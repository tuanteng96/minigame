import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PathHelper } from "@/helpers";
import { XMarkIcon } from "@heroicons/react/24/solid";
import moment from "moment";

function PrizeWinnerModal({ visible, onHide, prize, PrizeJson }) {
  const params = new URLSearchParams(window.location.search);

  return (
    <AnimatePresence initial={false} mode="wait">
      {visible && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 flex items-end md:items-center justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:inset-0">
            <motion.div
              className="relative w-full md:max-w-[450px] h-full z-20 bg-black/85 shadow-xl flex flex-col justify-center"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
            >
              <div
                className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center text-white transition opacity-85 hover:opacity-100"
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
                <div className="flex items-center flex-col">
                  <div className="text-white mb-2 font-medium">
                    Bạn nhận được
                  </div>
                  <div className="w-[200px] bg-white px-5 pt-6 pb-5 rounded-lg text-center uppercase text-[#fd9426] text-lg font-semibold overflow-hidden relative leading-6">
                    {prize?.option}
                    <div className="w-4 h-4 absolute bg-black/90 rounded-full -top-2 left-7"></div>
                    <div className="w-4 h-4 absolute bg-black/90 rounded-full -bottom-2 left-7"></div>
                    <div className="w-4 h-4 absolute bg-black/90 rounded-full -top-2 right-7"></div>
                    <div className="w-4 h-4 absolute bg-black/90 rounded-full -bottom-2 right-7"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center relative">
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
                        params.get("EndDate"),
                        "DD-MM-YYYY",
                        true
                      ).isValid()
                        ? moment(params.get("EndDate"), "DD-MM-YYYY")
                            .set({
                              hours: "23",
                              minutes: "59",
                            })
                            .format("HH:mm DD-MM-YYYY")
                        : moment()
                            .set({
                              hours: "23",
                              minutes: "59",
                            })
                            .add(Number(params.get("EndDate") || 7), "days")
                            .format("DD-MM-YYYY")}
                    </span>
                    <div className="w-3 h-3 absolute bg-black/90 rounded-full -left-1.5 top-2/4 -translate-y-2/4"></div>
                    <div className="w-3 h-3 absolute bg-black/90 rounded-full -right-1.5 top-2/4 -translate-y-2/4"></div>
                  </div>
                </div>
                <div className="text-white text-[13px] text-center px-5 mt-4">
                  {PrizeJson?.data?.copyrightWinner}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PrizeWinnerModal;
