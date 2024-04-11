import { UploadsAPI } from "@/api";
import { PathHelper } from "@/helpers";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useState } from "react";

function UploadImages({ value, name }) {
  const [completed, setCompleted] = useState(0);
  const uploadMutation = useMutation({
    mutationFn: (body) =>
      UploadsAPI.upload(body, (progress) => {
        setCompleted(progress);
      }),
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    var bodyFormData = new FormData();
    bodyFormData.append("file", files[0]);
    uploadMutation.mutate(bodyFormData, {
      onSuccess: ({ data }) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          onChange(data.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={name}
        className="relative flex flex-col items-center justify-center w-full h-20 md:h-32 border-[1px] border-gray-300 border-dashed rounded-lg cursor-pointer"
      >
        {value && (
          <div className="absolute w-full h-full p-1">
            <img className="object-contain w-full h-full" src={value} />
          </div>
        )}
        {!value && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-muted"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-xs text-muted">SVG, PNG, JPG</p>
          </div>
        )}

        <div
          className={clsx(
            "absolute top-0 right-0 flex items-center justify-center w-full h-full bg-gray-100 z-10 transition",
            uploadMutation.isLoading
              ? "opacity-1 visible"
              : "opacity-0 invisible"
          )}
        >
          <div className="flex flex-col items-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-white animate-spin dark:text-graydark-800 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <div className="mt-3 text-[11px]">
              Đang tải ...
              <span className="text-primary pl-1.5 font-semibold font-inter">
                {completed}%
              </span>
            </div>
          </div>
        </div>

        <input
          id={name}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {/* <Controller
                      name="Images1"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="Images1"
                          type="file"
                          className="hidden"
                          //{...field}
                          onChange={(e) => {
                            var file = e.target.files[0];
                            let reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function () {
                              field.onChange(reader.result);
                            };
                            reader.onerror = function (error) {
                              console.log("Error: ", error);
                            };
                          }}
                        />
                      )}
                    /> */}
      </label>
    </div>
  );
}

export default UploadImages;
