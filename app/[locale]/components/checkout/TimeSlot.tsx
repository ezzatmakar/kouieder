"use client";
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import RadioArrow from "../icons/RadioArrow";
import { CUSTOM_RADIO_CLASSES } from "@/app/commonUIClasses";
import Calendar from "../icons/Calendar";

export default function TimeSlot({
  register,
  errors,
  setValue,
  watch,
  control,
}: any) {
  const locale = useLocale();
  const t = useTranslations("common");

  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
    // setValue("order_date", newValue.startDate); // Use setValue to update the form value
    setValue("order_date_selected", newValue.startDate); // Use setValue to update the form value
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let order_date = "Today";
  let order_date_selected;
  order_date = watch("order_date");
  order_date_selected = watch("order_date_selected");
  const isDatePickerDisabled = order_date === "deliver_today";

  return (
    <div>
      {order_date === "Today" ? (
        ""
      ) : (
        <input
          type="text"
          className="hidden"
          {...register("order_date_selected", {
            required: {
              value: true,
              message: t("order_date_selected_required"),
            },
          })}
          data-testid="order-date-selected-input"
        />
      )}
      <ul className="grid w-full grid-cols-2 gap-3 md:gap-6">
        <li>
          <input
            type="radio"
            id="deliver_today"
            value={"Today"}
            className="peer hidden"
            defaultChecked
            {...register("order_date", {
              required: { value: true, message: t("order_date_required") },
            })}
            data-testid="radio-Today"
          />
          <label
            htmlFor="deliver_today"
            className={`${CUSTOM_RADIO_CLASSES}`}
            data-testid="label-Today"
          >
            <div className="block">
              <div className="w-full text-sm font-semibold md:text-xl">
                {t("today")}
              </div>
              <div className="w-full text-xs font-semibold md:text-base">{t("within_60_min")}</div>
            </div>
            {/* <span className="hidden md:block">
              <RadioArrow />
            </span> */}
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="deliver_date"
            value={"Specific Date"}
            className="peer hidden"
            {...register("order_date", {
              required: { value: true, message: t("order_date_required") },
            })}
            data-testid="radio-Specific-Date"
          />
          <label
            htmlFor="deliver_date"
            className={ `${CUSTOM_RADIO_CLASSES} gap-4`}
            data-testid="label-Specific-Date"
          >
            <Calendar/>
            <div className="date-picker block">
              <div className="w-full text-sm font-semibold md:text-xl">
                {t("choose_date")}
              </div>
              <Datepicker
                i18n={locale}
                containerClassName="customm relative"
                inputClassName="w-full bg-transparent py-3 text-[10px] md:text-sm"
                useRange={false}
                asSingle={true}
                value={dateValue}
                onChange={handleValueChange}
                minDate={tomorrow}
                disabled={isDatePickerDisabled}
                readOnly={true}
                data-testid="datepicker"
              />
              {errors.order_date_selected &&
                errors.order_date_selected.type === "required" && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.order_date_selected.message}
                  </p>
                )}
            </div>
            {/* <span className="hidden md:block">
              <RadioArrow />
            </span> */}
          </label>
        </li>
      </ul>
      {/* {errors.order_date_selected && errors.order_date_selected.type === "required" && (
        <p className="mt-1 text-xs text-red-500">{errors.order_date_selected.message}</p>
      )} */}
      {/* {errors.order_date && errors.order_date.type === "required" && (
        <p className="mt-1 text-xs text-red-500">{errors.order_date.message}</p>
      )} */}
    </div>
  );
}
