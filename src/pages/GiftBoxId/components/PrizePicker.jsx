import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

function PrizePicker({ children, data }) {
  const [visible, setVisible] = useState(false);

  const onHide = () => setVisible(false);

  return (
    <>
      {children({
        open: () => setVisible(true),
      })}
      <AnimatePresence initial={false}>
        {visible && (
          <>
            <div className="fixed top-0 left-0 right-0 z-50 flex items-end justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:items-center md:inset-0">
              <motion.div
                className="relative w-full md:max-w-[450px] max-h-[80%] z-20 bg-white rounded-t-xl shadow-xl flex flex-col"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
              >
                <div className="relative flex items-center justify-between px-5 py-4 border-b">
                  <div className="text-lg font-bold">Cơ cấu giải thưởng</div>
                  <div
                    className="absolute w-10 h-10 flex items-center justify-center right-3 text-[#B5B5C3] hover:text-black transition"
                    onClick={onHide}
                  >
                    <XMarkIcon className="w-7" />
                  </div>
                </div>
                <div className="p-5 overflow-auto grow">
                  {data &&
                    data.map((x, i) => (
                      <div
                        className="flex items-center mb-3 bg-white last:mb-0"
                        key={i}
                      >
                        <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary">
                          {i + 1}
                        </div>
                        <div className="flex-1 pl-4 font-medium text-left">
                          {x.option}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-0 z-10 bg-gray-900/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onHide}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default PrizePicker;
