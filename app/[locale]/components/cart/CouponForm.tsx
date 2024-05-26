"use client";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Cookies from "js-cookie";
import { couponInfo } from "@/app/utils/account";
import { useSharedState } from "@/app/SharedStateContext";
import { useCurrency } from "@/CurrencyContext";

export default function CouponForm({}) {
  const t = useTranslations("common");
  const { totalPrice } = useShoppingCart();
  const { setCouponCode, setCouponDiscount, setCouponFreeShipping } =
    useSharedState();
  const [couponMsg, setCouponMsg] = useState("");
  const [couponCode, setCoupon] = useState("");

  const handleCouponApplication = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (couponCode.trim() === "") {
      setCouponMsg("Coupon code is required");
      return;
    }

    try {
      const response = (await couponInfo(couponCode)) as {
        discount_type?: string;
        discount_amount?: number;
        status?: string;
        msg?: string;
        free_shipping?: boolean;
        code?: number;
      };
      // console.log("response>>", response);
      if (response.discount_type === "percent") {
        const discountAmount = response.discount_amount;
        setCouponMsg(
          `Coupon applied successfully. ${discountAmount}% discount applied.`
        );
        setCouponDiscount(`${discountAmount?.toString() ?? "0"}%`);
        setCouponCode(couponCode);
        if (response.free_shipping) {
          setCouponFreeShipping(true);
        } else {
          setCouponFreeShipping(false);
        }
      } else if (response.discount_type === "fixed_cart") {
        const discountAmount = response.discount_amount ?? 0;
        if (totalPrice > discountAmount) {
          setCouponMsg(
            `Coupon applied successfully. ${discountAmount} discount applied.`
          );
          setCouponDiscount(discountAmount?.toString() ?? "0");
          setCouponCode(couponCode);
        } else {
          setCouponMsg(t("coupon_application_failed"));
        }
        if (response.free_shipping) {
          setCouponFreeShipping(true);
        } else {
          setCouponFreeShipping(false);
        }
      } else if (response.status === "error") {
        setCouponMsg(
          response.code === 400 ? t("coupon_application_failed") : ""
        );
      }
    } catch (error) {
      // Handle network or other errors
      setCouponMsg("Error: " + error);
    }
  };

  return (
    <form
      action=""
      method="post"
      className="flex w-full flex-wrap"
      onSubmit={handleCouponApplication}
    >
      <div className="coupon mt-2 flex w-full rounded-xl border border-gray-300 p-2">
        <input
          type="text"
          name="coupon_code"
          className="w-full bg-transparent p-2 outline-none"
          id="coupon_code"
          placeholder={t("Enter_Coupon_Code")}
          value={couponCode}
          onChange={(event) => setCoupon(event.target.value)}
          data-testid="input-coupon"
        />
        <button
          type="submit"
          className="rounded-[32px] bg-primary-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:hover:bg-primary-400 focus:outline-none focus:ring-4 sm:w-auto"
          name="apply_coupon"
          value="Apply coupon"
          data-testid="button-submit"
        >
          {t("add")}
        </button>
      </div>
      {couponMsg && (
        <p
          className={`flex p-2 text-sm rounded-lg w-full mt-2 ${
            couponMsg.includes("success") || couponMsg.includes("نجاح")
              ? "text-primary-800 bg-gray-100"
              : "text-red-800 bg-red-100"
          }`}
        >
          {couponMsg}
        </p>
      )}
    </form>
  );
}
