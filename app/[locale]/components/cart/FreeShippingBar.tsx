import { useTranslations } from "next-intl";
import React from "react";
import CheckFlat from "../icons/CheckFlat";

export default function FreeShippingBar({ orderLimit, totalAmount }: any) {
  const t = useTranslations("common");
  const percentage = (totalAmount / orderLimit) * 100;

  // Ensure the percentage does not exceed 100
  const widthPercentage = Math.min(percentage, 100);
  const remainingForFreeShipping = Math.max(0, orderLimit - totalAmount);
  // console.log("remainingForFreeShipping", remainingForFreeShipping);
  return (
    <>
      {totalAmount > orderLimit ? (
        <div className="flex flex-col gap-2.5 rounded-3xl border border-green-400 bg-green-400 bg-opacity-[8%] px-5 py-2.5 md:px-[30px]">
          <h3 className="flex items-center gap-2 text-base font-bold text-green-500 md:gap-4">
            <span className="inline-block w-5 md:w-7">
              <CheckFlat/>
              </span>
            {t("free_shipping_active")}
          </h3>
          <div className="h-3 w-full rounded-full bg-primary-10 md:h-[18px]">
            <div
              className="ease h-full w-2/3 rounded-full bg-green-500 text-center text-xs text-white transition-all"
              style={{ width: `100%` }}
            ></div>
          </div>
          <p className="text-sm text-green-500">{t('now_free')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 rounded-3xl border border-blueMed px-8 py-2.5">
          <h3 className="text-base font-bold text-primary-500">
            {t("free_shipping_more_than")} {orderLimit} {t("egp")}
          </h3>
          <div className="h-[18px] w-full rounded-full bg-primary-10">
            <div
              className="ease h-full w-2/3 rounded-full bg-primary-500 text-center text-xs text-white transition-all"
              style={{ width: `${widthPercentage}%` }}
            ></div>
          </div>
          {remainingForFreeShipping > 0 && (
            <p className="text-sm text-gray-300">
              {t("add")} {remainingForFreeShipping}{" "} {t("egp")}{" "}
              {t("for_free_shipping")}
            </p>
          )}
        </div>
      )}
    </>
  );
}
