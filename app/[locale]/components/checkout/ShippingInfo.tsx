"use client";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { RiUserLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "@/app/utils/account";
import { UserInfo } from "@/types";

export default function ShippingInfo({ register, errors, setValue }: any) {
  const t = useTranslations("fields");

  const user_id = Cookies.get("user_id");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const setFieldValues = (values: UserInfo) => {
    setValue("first_name", values.first_name);
    setValue("last_name", values.last_name);
    setValue("email", values.email);
    setValue("phone", values.phone);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setUserInfo(userInfo as UserInfo);
        if (user_id) {
            setFieldValues(userInfo as UserInfo);
          }
      } else {
        // Handle the case when fetching user information fails
      }
    };
    getUserInfo();
  }, [user_id]);

  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("token");
    localStorage.removeItem("wishlistItems");
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  return (
    <div>
      {user_id ? (
        <div>
          <div className="flex items-center md:gap-8 gap-4">
            <div className="flex items-center md:p-4 p-2 justify-center w-16 h-16 text-xl bg-gray-200 rounded-full">
              <RiUserLine />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 flex-wrap">
                <span className="md:text-xl text-sm font-semibold text-black">
                  {userInfo?.first_name} {userInfo?.last_name}
                </span>
                <span className="md:text-xl text-sm font-semibold text-gray-50">
                  {userInfo?.email}
                </span>
              </div>
              {userInfo?.phone && (
                <div className="flex gap-2">
                  <span className="md:text-xl text-sm font-semibold text-gray-50">
                    {userInfo?.phone}
                  </span>
                </div>
              )}
              <div>
                <button
                  onClick={handleLogout}
                  className="md:text-xl text-sm font-semibold text-[#126E49] hover:underline"
                >
                  <span>{t("log_out")}</span>
                </button>
              </div>
            </div>
          </div>
          {userInfo?.phone ? (
            ""
          ) : (
            <div className="py-4">
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>
                  {" "}
                  {t("phone_number")}{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={`${INPUT_CLASSES} ${
                      errors.phone && "border-red-500 checkout-error"
                    }`}
                    {...register("phone", {
                      required: { value: true, message: t("phone_required") },
                      minLength: { value: 11, message: t("phone_length") },
                      maxLength: { value: 11, message: t("phone_length") },
                    })}
                    data-testid="phone-input"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          <div className="col-span-2">
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>
                {t("first_name")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`${INPUT_CLASSES} ${
                    errors.first_name ? "border-red-500 checkout-error" : ""
                  }`}
                  {...register("first_name", {
                    required: {
                      value: true,
                      message: t("first_name_required"),
                    },
                  })}
                  data-testid="first_name-input"
                />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>
                {" "}
                {t("last_name")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`${INPUT_CLASSES} ${
                    errors.last_name && "border-red-500 checkout-error"
                  }`}
                  {...register("last_name", {
                    required: { value: true, message: t("last_name_required") },
                  })}
                  data-testid="last_name-input"
                />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>
                {" "}
                {t("phone_number")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`${INPUT_CLASSES} ${
                    errors.phone && "border-red-500 checkout-error"
                  }`}
                  {...register("phone", {
                    required: { value: true, message: t("phone_required") },
                    minLength: { value: 11, message: t("phone_length") },
                    maxLength: { value: 11, message: t("phone_length") },
                  })}
                  data-testid="phone-input"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>
                {" "}
                {t("email_address")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  className={`${INPUT_CLASSES} ${
                    errors.email && "border-red-500 checkout-error"
                  }`}
                  {...register("email", {
                    required: {
                      value: true,
                      message: t("email_address_required"),
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("email_address_format"),
                    },
                  })}
                  data-testid="email-input"
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
