import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

function PrizePicker({ children, data }) {
  const [visible, setVisible] = useState(false);

  const onHide = () => setVisible(false);

  return (
    <AnimatePresence initial={false} mode="wait">
      {children({
        open: () => setVisible(true),
      })}
      {visible && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 flex items-end md:items-center justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:inset-0">
            <motion.div
              className="relative w-full md:max-w-[450px] max-h-[80%] z-20 bg-white rounded-t-xl shadow-xl flex flex-col"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
            >
              <div className="flex justify-between items-center border-b px-5 py-4 relative">
                <div className="font-bold text-lg">Cơ cấu giải thưởng</div>
                <div
                  className="absolute w-10 h-10 flex items-center justify-center right-3 text-[#B5B5C3] hover:text-black transition"
                  onClick={onHide}
                >
                  <XMarkIcon className="w-7" />
                </div>
              </div>
              <div className="p-5 grow overflow-auto">
                {data &&
                  data.map((x, index) => (
                    <div className="bg-white flex items-center mb-3 last:mb-0" key={index}>
                      <div className="w-10 h-10 text-white bg-primary rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1 text-left pl-4 font-medium">{x.option}</div>
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
  );
}

export default PrizePicker;
