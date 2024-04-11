import WheelComponent from "@/components/wheel-lucky";
import { PathHelper } from "@/helpers";
import { UploadImages } from "@/partials/forms";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { NavLink } from "react-router-dom";

let data = [
  {
    option: "Tặng 1 DV Add on quang trị liệu PDT trị giá 490.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0.25,
    values: "A",
    id: "1",
    id_img: "img_1",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Tặng 1 DV add on RF cổ trị giá 990.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0.25,
    values: "",
    id: "2",
    id_img: "img_2",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#ffffff",
    visible: false,
  },
  {
    option: "Tặng 1 DV add on RF mắt 990.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "ADFG",
    id: "3",
    id_img: "img_3",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Giảm 20% cho toàn bộ sản phẩm",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "4",
    id_img: "img_4",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#FFFFFF",
    visible: false,
  },
  {
    option: "Mua 2 tặng 1 toàn bộ dịch vụ",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "5",
    id_img: "img_5",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Peel Pro tặng Detox Oxygen trị giá 1.200.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "6",
    id_img: "img_6",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#FFFFFF",
    visible: false,
  },
  {
    option: "Peel Peptide tặng Aqua Pure skin trị giá 900.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "7",
    id_img: "img_7",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Meso Therapy tặng Skin Repair trị giá 1.500.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "8",
    id_img: "img_8",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 30,
    color: "#FFFFFF",
    visible: false,
  },
  {
    option: "Giảm 30% dịch vụ Công nghệ cao",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "9",
    id_img: "img_9",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Chúc bạn may mắn lần sau",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "10",
    id_img: "img_10",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#FFFFFF",
    visible: false,
  },
  {
    option: "Tặng 1 buổi Hifu Full face trị giá 30.000.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "11",
    id_img: "img_11",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 10,
    color: "#000000",
    visible: false,
  },
  {
    option: "Tặng 1 buổi Thermage trị giá 15.000.000",
    x: 0,
    y: 0,
    rotation: 0,
    chance: 0,
    values: "",
    id: "12",
    id_img: "img_12",
    url: "",
    x_i: 0,
    y_i: 0,
    width_i: 0,
    height_i: 0,
    rotation_i: 0,
    percentage: 30,
    color: "#FFFFFF",
    visible: false,
  },
];

function Wheel1Page(props) {
  const { handleSubmit, watch, control, register } = useForm({
    defaultValues: {
      items: data,
      clickSounding: PathHelper.toAbsolutePath("assets/mp3/tick.mp3"),
      backgroundSounding: PathHelper.toAbsolutePath(
        "assets/mp3/backgroundsound.mp3"
      ),
      winnerSounding: PathHelper.toAbsolutePath(
        "assets/mp3/fanfare-winner.mp3"
      ),
      backgroundImage: PathHelper.toAbsolutePath("assets/12/vongquay.png"),
      buttonImage: PathHelper.toAbsolutePath("assets/12/quay.png"),
      arrowImage: PathHelper.toAbsolutePath("assets/12/muiten.png"),
      layoutBackground: PathHelper.toAbsolutePath("assets/12/maunen.jpg"),
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "items",
    }
  );

  const {
    items,
    backgroundSounding,
    winnerSounding,
    backgroundImage,
    buttonImage,
    arrowImage,
  } = watch();

  return (
    <div className="flex h-full">
      <div className="w-[400px] bg-white flex flex-col">
        <div className="px-4 py-5 text-lg font-semibold uppercase border-b">
          Cài đặt vòng quay
        </div>
        <div className="p-4 overflow-auto grow">
          <div>
            {fields.map((field, index) => (
              <div className="flex mb-3 last:mb-0" key={field.id}>
                <Controller
                  name={`items.${index}.option`}
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <input
                      className="w-full border border-[#E4E6EF] focus:border-primary focus:outline-none rounded px-3.5 py-3 transition"
                      type="text"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name={`items.${index}.percentage`}
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <div className="relative w-[100px] ml-3">
                      <NumericFormat
                        className="w-full border border-[#E4E6EF] focus:border-primary focus:outline-none rounded px-3.5 py-3 transition"
                        type="text"
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val.floatValue || "");
                        }}
                        allowNegative={false}
                        isAllowed={(inputObj) => {
                          const { floatValue } = inputObj;
                          if (floatValue < 0 || floatValue > 100) return;
                          return true;
                        }}
                        {...field}
                      />
                      <span className="absolute text-sm right-3 top-2/4 -translate-y-2/4 text-muted">
                        %
                      </span>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4">
              <Controller
                name="backgroundImage"
                control={control}
                render={({ field }) => (
                  <UploadImages name={field.name} value={field.value} />
                )}
              />
              <Controller
                name="buttonImage"
                control={control}
                render={({ field }) => (
                  <UploadImages name={field.name} value={field.value} />
                )}
              />
              <Controller
                name="arrowImage"
                control={control}
                render={({ field }) => (
                  <UploadImages name={field.name} value={field.value} />
                )}
              />
              <Controller
                name="layoutBackground"
                control={control}
                render={({ field }) => (
                  <UploadImages name={field.name} value={field.value} />
                )}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <NavLink
            state={{
              params: watch(),
            }}
            to="preview"
            className="block py-3.5 text-center text-white rounded bg-primary hover:bg-primary-hover transition"
          >
            Xem kết quả
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1">
        <WheelComponent
          backgroundImage={backgroundImage}
          buttonImage={buttonImage}
          arrowImage={arrowImage}
          data={items}
          onStopSpinning={(values) => console.log(values)}
          backgroundSounding={backgroundSounding}
          winnerSounding={winnerSounding}
          spinDuration={5000}
          classNames={{
            arrowImageClass: "w-[50px]",
            arrowImageWrapClass:
              "absolute -top-8 z-10 left-2/4 -translate-x-2/4",
            buttonWrapClass:
              "absolute z-20 w-[100px] h-100 left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center",
          }}
          spinDisabled
        />
      </div>
    </div>
  );
}

export default Wheel1Page;
