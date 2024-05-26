"use client";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { chargeUserWallet } from "@/app/utils/account";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../Loader";
import Msg from "../Msg";

interface ChargeWallet {
  coupon: string;
}

export default function RedeemWallet() {
  const t = useTranslations("fields");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<ChargeWallet>();
  const isUAE =
    typeof window !== "undefined" && window.location.hostname.includes("uae.");

  const formData = watch();
  // console.log("formData");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleCouponApplication = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (couponCode.trim() === "") {
      setCouponMsg("Coupon code is required");
      return;
    }

    try {
      const response = (await chargeUserWallet(couponCode)) as {
        status: string;
        msg?: string;
      };

      if (response.status === "success") {
        // Coupon applied successfully
        setCouponMsg(t("coupon_applied_successfully"));
      } else if (response.status === "failed") {
        // Coupon application failed
        // setCouponMsg(response.msg || t("coupon_application_failed"));
        setCouponMsg(
          response.msg === "Coupon code is incorrect"
            ? t("coupon_application_failed")
            : response.msg === "Coupon is expired"
            ? t("coupon_application_expired")
            : response.msg ?? ""
        );
      } else if (response.status === "error") {
        // Coupon application failed
        // setCouponMsg(response.msg || t("coupon_application_failed"));
        setCouponMsg(
          response.msg === "Coupon Applied Before "
            ? t("coupon_added_before")
            : response.msg === "Coupon is expired"
            ? t("coupon_application_expired")
            : response.msg ?? ""
        );
      } else {
        // Other error or unexpected response
        setCouponMsg(
          response.msg === "Coupon code is incorrect"
            ? t("coupon_application_failed")
            : response.msg === "Coupon is expired"
            ? t("coupon_application_expired")
            : response.msg ?? ""
        );
      }
    } catch (error) {
      // Handle network or other errors
      setCouponMsg("Error: " + error);
    }
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <h3 className="px-10 py-4 text-2xl font-bold">
        {t("have_promo_wallet")}
      </h3>
      <hr className="absolute -left-6 -right-6" />
      {message && <Msg color="green" message={message} />}
      <form
        onSubmit={handleCouponApplication}
        className="px-10 pt-6"
        id="addAddressForm"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="gov" className={LABEL_CLASSES}>
              {t("have_promo_wallet_label")}
            </label>

            <input
              type="text"
              name="coupon_code"
              className={`${INPUT_CLASSES} ${
                errors.coupon && "border-red-500"
              }`}
              placeholder={t("Enter_Coupon_Code")}
              onChange={(event) => setCouponCode(event.target.value)}
            />
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
          <hr className="absolute -left-6 -right-6" />
          <div className="py-6 ">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-xl font-semibold bg-primary-300 hover:bg-primary-400 rounded-lg whitespace-nowrap"
            >
              {t("redeem_code")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
