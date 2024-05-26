"use client";
import { updatePassword } from "@/app/utils/account";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Msg from "../Msg";
import EyeIcon from "../icons/EyeIcon";
import { INPUT_CLASSES } from "@/app/commonUIClasses";

interface PasswordResponse {
  status: string;
  msg: string;
}
export default function ChangePassword({ closePassword }: any) {
  const t = useTranslations("account");
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const togglePassword3 = () => {
    setPasswordShown3(!passwordShown3);
  };
  const handleChangePassword = async (data: any) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      setErrorMessage(t("dont_match"));
      return;
    }
    if (newPassword === currentPassword) {
      setErrorMessage(t("password_same"));
      return;
    }
    // Call the updatePassword function with the necessary data
    const response = await updatePassword(currentPassword, newPassword);

    if (response && (response as PasswordResponse).status === "success") {
      // console.log("Password updated successfully");
      reset();
      closePassword();
    } else if (response && (response as PasswordResponse).status === "error") {
      const errorMessage = (response as PasswordResponse).msg;
      setErrorMessage(t(errorMessage));
      // console.log("Authentication failed");
    } else {
      // console.log("Password update failed");
    }
  };

  return (
    <div>
      <h3 className="px-10 py-4 text-3xl font-bold">
        {t("change_password")}
      </h3>
      <hr className="absolute -left-6 -right-6" />
      <div className="px-10 py-6 mt-3">
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="space-y-6">
            {errorMessage && <Msg color="red" message={errorMessage} />}
            <div>
              <label
                htmlFor="currentPassword"
                className="block mb-1 text-sm text-gray-400 capitalize"
              >
                {t("enterCurrentPassword")}
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordShown1 ? "text" : "password"}
                  className={`${INPUT_CLASSES} ${
                    errors.currentPassword && "border-red-500"
                  }`}
                  id="currentPassword"
                  {...register("currentPassword", { required: true })}
                />
                <span
                  onClick={togglePassword1}
                  className="absolute -translate-y-1/2 cursor-pointer ltr:right-2 rtl:left-2 top-1/2"
                >
                  <EyeIcon />
                </span>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {t("currentPasswordRequired")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-1 text-sm text-gray-400 capitalize"
              >
                {t("enterNewPassword")}
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordShown2 ? "text" : "password"}
                  className={`${INPUT_CLASSES} ${
                    errors.newPassword && "border-red-500"
                  }`}
                  id="newPassword"
                  autoComplete="new-password"
                  {...register("newPassword", {
                    required: t("password_required"),
                    minLength: {
                      value: 5,
                      message: t("password_length"),
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                      message: t("password_pattern"),
                    },
                  })}
                />
                <span
                  onClick={togglePassword2}
                  className="absolute -translate-y-1/2 cursor-pointer ltr:right-2 rtl:left-2 top-1/2"
                >
                  <EyeIcon />
                </span>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {/* {t("enterNewPasswordRequired")} */}
                  {errors.newPassword && typeof errors.newPassword.message === 'string' && (
                    errors.newPassword.message
                  )}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm text-gray-400 capitalize"
              >
                {t("confirmNewPassword")}
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordShown3 ? "text" : "password"}
                  className={`${INPUT_CLASSES} ${
                    errors.confirmPassword && "border-red-500"
                  }`}
                  id="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                />
                <span
                  onClick={togglePassword3}
                  className="absolute -translate-y-1/2 cursor-pointer ltr:right-2 rtl:left-2 top-1/2"
                >
                  <EyeIcon />
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {t("confirmPasswordRequired")}
                </p>
              )}
            </div>
            <hr className="absolute -left-6 -right-6" />
            <div className="pt-6 md:mt-10">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-xl font-semibold text-white bg-primary-300 hover:bg-primary-400 rounded-lg whitespace-nowrap"
              >
                {t("change_password")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
