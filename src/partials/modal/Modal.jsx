import { PathHelper } from "@/helpers";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactAPI } from "@/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const schemaContact = yup
  .object({
    Fullname: yup.string().required("Vui lòng nhập họ tên."),
    Phone1: yup.string().required("Vui lòng nhập số điện thoại."),
  })
  .required();

function Modal({ visible, onHide, values }) {
  const queryClient = useQueryClient();

  const params = new URLSearchParams(window.location.search);

  let BrowserId = Cookies.get("browserId");

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      Title: "Vòng quay may mắn",
      Fullname: "",
      Phone1: "",
      Content: values?.option || "",
      MemberID: "",
      BrowserId: BrowserId,
      Status: 0,
    },
    resolver: yupResolver(schemaContact),
  });

  useEffect(() => {
    setValue("Content", values?.option || "");
  }, [values]);

  const sendMutation = useMutation({
    mutationFn: (body) => ContactAPI.send(body),
  });

  const onSubmit = (values) => {
    sendMutation.mutate(
      {
        contact: values,
      },
      {
        onSuccess: (data) => {
          queryClient
            .invalidateQueries({ queryKey: ["CheckAuthen"] })
            .then(() => {
              reset();
              onHide();
              Swal.fire({
                title: "Đăng ký thành công !",
                text: "Chúng tôi sẽ sớm liên hệ lại vào số điện thoại của bạn. Xin cảm ơn.",
                icon: "success",
              });
            });
        },
      }
    );
  };

  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {visible && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-full max-h-full overflow-x-hidden overflow-y-auto md:inset-0">
            <motion.div
              className="relative p-4 w-full md:max-w-[450px] max-h-full z-20"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
            >
              <form
                className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="absolute -top-[20px] left-2/4 -translate-x-2/4 w-[260px] z-20">
                  <img
                    className="w-full"
                    src={PathHelper.toAbsolutePath("assets/12/TOP.png")}
                    alt=""
                  />
                </div>
                <div className="bg-[#bd0c21] rounded-t-[0.5rem] text-white text-center px-12 pt-14 pb-20 rounded-b-[50%] relative">
                  <div className="px-10 mb-3">
                    <div className="relative flex justify-center">
                      <div className="relative z-20 bg-[#bd0c21] px-3 font-light text-[14px]">
                        Bạn nhận được
                      </div>
                      <div className="absolute bottom-[6px] w-full h-[1px] bg-white"></div>
                    </div>
                  </div>
                  <div className="text-[18px] leading-8 md:text-[24px] md:leading-[36px] uppercase font-medium">
                    {values.option}
                  </div>
                  {params.get("EndDate") && (
                    <div className="absolute left-0 w-full text-center bottom-8">
                      HSD :
                      <span className="pl-1">
                        {moment(params.get("EndDate"), "DD-MM-YYYY").format(
                          "DD-MM-YYYY"
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-10 pt-10 pb-8 text-center">
                  Quý khách liên hệ hotline{" "}
                  <span className="text-primary">0375474333</span> và qua địa
                  chỉ 350 Bà Triệu để nhận phần quà!
                </div>
                {/* <div className="px-8 pt-10 pb-8 md:px-14">
                  <div className="relative">
                    <Controller
                      name="Fullname"
                      control={control}
                      render={({ field: { ref, ...field }, fieldState }) => (
                        <div className="mb-3.5">
                          <input
                            className={clsx(
                              "text-center w-full border border-[#E4E6EF] focus:outline-none rounded-lg px-3.5 py-3.5 transition normal-case",
                              fieldState?.invalid
                                ? "border-danger"
                                : "border-[#E4E6EF] focus:border-primary"
                            )}
                            type="text"
                            placeholder="Họ và tên"
                            autoComplete="off"
                            {...field}
                          />
                          {fieldState?.invalid && (
                            <div className="text-[12px] mt-1 text-danger">
                              {fieldState?.error?.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="Phone1"
                      control={control}
                      render={({ field: { ref, ...field }, fieldState }) => (
                        <div>
                          <NumericFormat
                            type="text"
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val.value || "");
                            }}
                            allowLeadingZeros={true}
                            className={clsx(
                              "text-center w-full border border-[#E4E6EF] focus:outline-none rounded-lg px-3.5 py-3.5 transition",
                              fieldState?.invalid
                                ? "border-danger"
                                : "border-[#E4E6EF] focus:border-primary"
                            )}
                            allowNegative={false}
                            placeholder="Số điện thoại"
                            autoComplete="off"
                            {...field}
                          />
                          {fieldState?.invalid && (
                            <div className="text-[12px] mt-1 text-danger">
                              {fieldState?.error?.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                    <div className="absolute w-full -bottom-[65px]">
                      <button
                        type="submit"
                        className={clsx(
                          "bg-[#bd0c21] text-white w-full uppercase rounded-full h-[48px] font-semibold relative transition",
                          sendMutation.isLoading ? "opacity-80" : "opacity-100"
                        )}
                        disabled={sendMutation.isLoading}
                      >
                        {!sendMutation.isLoading ? (
                          <span>Đăng ký ngay</span>
                        ) : (
                          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline text-white w-9 h-9 animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="absolute -right-[25px] md:-right-[80px] -bottom-5 md:-bottom-8">
                  <img
                    className="w-[70px] md:w-[130px]"
                    src={PathHelper.toAbsolutePath("assets/12/phai.png")}
                    alt=""
                  />
                </div>
                <div className="absolute -left-[25px] md:-left-[80px] -bottom-5 md:-bottom-8">
                  <img
                    className="w-[70px] md:w-[130px]"
                    src={PathHelper.toAbsolutePath("assets/12/trai.png")}
                    alt=""
                  />
                </div>
                <div className="absolute -bottom-[20px] left-2/4 -translate-x-2/4">
                  <button
                    type="button"
                    onClick={onHide}
                    className={clsx(
                      "bg-[#bd0c21] text-white uppercase rounded-full w-[100px] h-[48px] font-semibold relative transition",
                      sendMutation.isLoading ? "opacity-80" : "opacity-100"
                    )}
                  >
                    Đóng
                  </button>
                </div>
              </form>
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
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
