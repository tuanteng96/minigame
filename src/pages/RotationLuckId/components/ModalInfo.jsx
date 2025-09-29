import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

const schemaContact = yup
  .object({
    Fullname: yup.string().required("Vui lòng nhập họ tên."),
    Phone: yup.string().required("Vui lòng nhập số điện thoại."),
  })
  .required();

function ModalInfo({ visible, onHide, onSubmit }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      Fullname: "",
      Phone: "",
    },
    resolver: yupResolver(schemaContact),
  });

  useEffect(() => {
    if (!visible) reset();
  }, [visible]);

  return (
    <AnimatePresence initial={false} mode="wait">
      {visible && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:items-center md:inset-0">
            <motion.div
              className="relative w-[calc(100%-30px)] md:max-w-[420px] z-20 bg-white rounded shadow-xl flex flex-col"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
            >
              <div className="relative flex items-center justify-between px-6 py-5 border-b">
                <div className="text-xl font-bold">Thông tin khách hàng</div>
                <div
                  className="absolute w-10 h-10 flex items-center justify-center right-3 text-[#B5B5C3] hover:text-black transition"
                  onClick={onHide}
                >
                  <XMarkIcon className="w-7" />
                </div>
              </div>
              <div className="p-6 overflow-auto grow">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <div className="mb-1">Họ và tên</div>
                    <Controller
                      name="Fullname"
                      control={control}
                      render={({ field: { ref, ...field }, fieldState }) => (
                        <div>
                          <input
                            className={clsx(
                              "border w-full h-[50px] px-4 rounded transition outline-none",
                              fieldState?.invalid
                                ? "border-danger"
                                : "border-[#dfdfdf]"
                            )}
                            type="text"
                            placeholder="Nhập họ tên"
                            autoComplete="off"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <div className="mb-1">Số điện thoại</div>
                    <Controller
                      name="Phone"
                      control={control}
                      render={({ field: { ref, ...field }, fieldState }) => (
                        <div>
                          <input
                            className={clsx(
                              "border w-full h-[50px] px-4 rounded transition outline-none",
                              fieldState?.invalid
                                ? "border-danger"
                                : "border-[#dfdfdf]"
                            )}
                            type="number"
                            placeholder="Nhập số điện thoại"
                            autoComplete="off"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="mt-5">
                    <button
                      className="pt-4 py-3.5 px-8 rounded-3xl font-bold capitalize text-white btn-gift w-full"
                      type="submit"
                    >
                      <span className="mr-2 last:mr-0">Bắt</span>
                      <span className="mr-2 last:mr-0">đầu</span>
                      <span className="mr-2 last:mr-0">quay!</span>
                    </button>
                  </div>
                </form>
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

export default ModalInfo;
