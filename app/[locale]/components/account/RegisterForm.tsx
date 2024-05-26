"use client";
import React, { useState } from "react";
import {
  RiArrowDownSLine,
  RiCheckboxBlankCircleLine,
  RiRadioButtonLine,
} from "react-icons/ri";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { userRegister } from "@/app/utils/account";
import Loader from "../Loader";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import EyeIcon from "../icons/EyeIcon";
import SelectInput from "../SelectInput";
import Button from "../Button";
import { Link } from "@/navigation";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  gender?: string;
  terms: string;
};

export default function RegisterForm() {
  const t = useTranslations("fields");
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  // const [formData, setFormData] = useState({
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     phone: '',
  //     password: '',
  //     birth_day: '',
  //     birth_month: '',
  //     birth_year: '',
  //     gender: '',
  //     terms: '',
  // });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    birth_day: "",
    birth_month: "",
    birth_year: "",
    gender: "",
    terms: "",
    response: "",
    general: "",
  });

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  // const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: value,
  //     }));
  // };

  const isValidEmail = (email: any) => {
    const trimmedEmail = email.trim();
    if (trimmedEmail === "") {
      return false;
    }
    const parts = trimmedEmail.split("@");
    if (parts.length !== 2) {
      return false;
    }
    const [localPart, domainPart] = parts;
    if (localPart === "" || domainPart === "") {
      return false;
    }
    if (!domainPart.includes(".")) {
      return false;
    }
    return true;
  };
  const isValidPhoneNumber = (phoneNumber: any) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    return digitsOnly.startsWith("0") && digitsOnly.length === 11;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //     setIsLoading(true);
  //     console.log('handle')
  //     e.preventDefault();
  //     if (validateForm()) {
  //         try {
  //             const response = await register({ formData });
  //             console.log('response', response)
  //             setIsLoading(false);
  //             if (response && response.status === "error") {
  //                 setErrors((prevErrors) => ({
  //                     ...prevErrors,
  //                     response: response.msg,
  //                 }));
  //             } else if (response && response.status === "success") {
  //                 console.log("Password reset email sent successfully");
  //             }
  //         } catch (error) {
  //             setIsLoading(false);
  //             console.log("An error occurred while calling forgotPassword API:", error);
  //         }
  //     } else {
  //         console.log('handle else n')
  //         setTimeout(() => {
  //             setIsLoading(false);
  //         }, 1000);
  //     }
  // };

  const scrollToFirst = () => {
    setTimeout(() => {
      const element = document.querySelector(".border-red-500") as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 300;
        window.scrollTo({ top: offset, behavior: "smooth" });
      } else {
        const parent = document.querySelector(".login-form") as HTMLElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          const offset = window.pageYOffset + rect.top - 300;
          window.scrollTo({ top: offset, behavior: "smooth" });
        } else {
          const bodyRect = document.body.getBoundingClientRect();
          const offset = window.pageYOffset + bodyRect.top - 300;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    }, 500);
  };
  const handleRegisterSuccess = (user_id: number, token: string) => {
    // Store user ID in a cookie
    Cookies.set("user_id", user_id.toString());
    Cookies.set("token", token);
    Cookies.set("isNewUser", "true", {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Redirect to the dashboard or any other authorized page
    // navigate('/my-account');
    window.location.href = `${locale === "ar" ? "" : "/en"}/my-account`;
  };

  const formData = watch();
  // console.log("formData>>",formData);
  const onSubmit = (formData: FormData) => {
    // console.log(formData);
    userRegister(formData)
      .then((responseData: any) => {
        // Perform the necessary actions after registration
        if (responseData.status === "success" && responseData.msg) {
          handleRegisterSuccess(responseData.user_id, responseData.token);
        } else if (responseData.status === "error" && responseData.msg_code) {
          scrollToFirst();
          if (responseData.msg_code === "register_error_email") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: t("email_already_exists"),
            }));
          } else if (responseData.msg_code === "register_error_phone") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: t("phone_number_already_exists"),
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: t("error_occurred"),
            }));
          }
        } else {
          scrollToFirst();
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: t("error_occurred"),
          }));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle the registration error
        console.log("Failed to register:", error);
      });
  };

  return (
    <div className="relative" key={locale}>
      {isLoading ? (
        <div className="absolute -inset-4 z-20 flex items-start justify-center bg-white bg-opacity-75 pt-20">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.general && (
          <p className="my-2 rounded border border-red-500 bg-red-100 p-2 text-xs text-red-800">
            {errors.general}
          </p>
        )}
        <div className="grid grid-cols-2 gap-4 py-4 pb-5 md:py-0 lg:max-w-xl">
          <div>
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("first_name")}{" "}
            </label>
            <div className="mt-1">
              <input
                type="text"
                className={`${INPUT_CLASSES} ${
                  formErrors.first_name && "border-red-500"
                }`}
                {...register("first_name", {
                  required: true,
                })}
                data-testid="input-first_name"
              />
              {formErrors.first_name && (
                <p className="mt-1 text-xs text-red-500">
                  {t("first_name_required")}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("last_name")}{" "}
            </label>
            <div className="mt-1">
              <input
                type="text"
                className={`${INPUT_CLASSES} ${
                  formErrors.last_name && "border-red-500"
                }`}
                {...register("last_name", {
                  required: true,
                })}
                data-testid="input-last_name"
              />
              {formErrors.last_name && (
                <p className="mt-1 text-xs text-red-500">
                  {t("last_name_required")}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("email_address")}{" "}
            </label>
            <div className="mt-1">
              <input
                type="email"
                className={`${INPUT_CLASSES} ${
                  formErrors.email && "border-red-500"
                }`}
                {...register("email", {
                  required: true,
                })}
                data-testid="input-email"
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {t("email_required")}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("phone_number")}{" "}
            </label>
            <div className="mt-1">
              <input
                type="number"
                // inputMode="numeric"
                // pattern="[0-9]*"
                placeholder=""
                className={`${INPUT_CLASSES} ${
                  formErrors.phone && "border-red-500"
                }`}
                // {...register('phone', {
                //     required: { value: true, message: t('phone_required') },
                //     valueAsNumber: true
                // })}
                {...register("phone", {
                  // minLength: 11,
                  minLength: {
                    value: 11,
                    message: t("phone_length"),
                  },
                  required: {
                    value: true,
                    message: t("phone_required"),
                  },
                })}
                data-testid="input-phone"
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("password")}{" "}
            </label>
            <div className="relative mt-1">
              <input
                type={passwordShown1 ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                {...register("password", {
                  required: t("password_required"),
                  minLength: {
                    value: 5,
                    message: t("password_length"),
                  },
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/,
                  //   message: t("password_pattern")
                  // }
                })}
                className={`${INPUT_CLASSES} ${
                  formErrors.password && "border-red-500"
                }`}
                data-testid="input-password"
              />
              <span
                onClick={togglePassword1}
                className="absolute top-2.5 flex h-8 w-8 cursor-pointer items-center justify-center ltr:right-2 rtl:left-2"
              >
                <EyeIcon />
              </span>
              {formErrors.password && (
                // <p className="mt-1 text-xs text-red-500">{formErrors.password.message}</p>
                <p className="mt-1 text-xs text-red-500">
                  {t("password_required")}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className={`astrik ${LABEL_CLASSES}`}>
              {" "}
              {t("birth_date")}{" "}
            </label>
            <div className="mt-1 flex gap-3">
              <div className="relative w-1/3">
                <SelectInput
                  options={[
                    { label: t("day"), value: "" }, // Add an empty option as the default
                    ...Array.from({ length: 31 }, (_, index) => ({
                      label: (index + 1).toString().padStart(2, "0"),
                      value: (index + 1).toString().padStart(2, "0"),
                    })),
                  ]}
                  register={register("birth_day")}
                />
              </div>
              <div className="relative w-1/3">
                <SelectInput
                  options={[
                    { label: t("month"), value: "" },
                    ...Array.from({ length: 12 }, (_, i) => ({
                      label: String(i + 1).padStart(2, "0"),
                      value: String(i + 1).padStart(2, "0"),
                    })),
                  ]}
                  register={register("birth_month")}
                />
              </div>
              <div className="relative w-1/3">
                <SelectInput
                  options={[
                    { label: t("year"), value: "" },
                    ...Array.from({ length: 74 }, (_, i) => ({
                      label: String(2023 - i),
                      value: String(2023 - i),
                    })),
                  ]}
                  register={register("birth_year")}
                />
              </div>
              {formErrors.birth_day && (
                <div className="error-message">
                  {formErrors.birth_day.message}
                </div>
              )}
              {formErrors.birth_month && (
                <div className="error-message">
                  {formErrors.birth_month.message}
                </div>
              )}
              {formErrors.birth_year && (
                <div className="error-message">
                  {formErrors.birth_year.message}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex gap-4">
              <label
                htmlFor="gender_male"
                className="inline-block cursor-pointer text-lg text-black"
              >
                <div className="relative flex items-center py-1 ltr:pl-6 rtl:pr-6">
                  <input
                    type="radio"
                    id="gender_male"
                    value="M"
                    className="peer hidden"
                    {...register("gender")}
                    data-testid="radio-male"
                  />
                  <div className="invisible absolute top-1 mt-0.5 peer-checked:visible ltr:left-0 rtl:right-0">
                    <CgRadioChecked className="peer-checked:text-gray-200" />
                  </div>
                  <div className="visible absolute top-1 mt-0.5 peer-checked:invisible ltr:left-0 rtl:right-0">
                    <CgRadioCheck className="peer-checked:text-gray-200" />
                  </div>
                  <span className="text-base font-medium">{t("gender_m")}</span>
                </div>
              </label>
              <label
                htmlFor="gender_female"
                className="inline-block cursor-pointer text-lg text-black"
              >
                <div className="relative flex items-center gap-2 py-1 ltr:pl-6 rtl:pr-6">
                  <input
                    type="radio"
                    id="gender_female"
                    value="F"
                    className="peer hidden"
                    {...register("gender")}
                    data-testid="radio-female"
                  />
                  <div className="invisible absolute top-1 mt-0.5 peer-checked:visible ltr:left-0 rtl:right-0">
                    <CgRadioChecked className="peer-checked:text-gray-200" />
                  </div>
                  <div className="visible absolute top-1 mt-0.5 peer-checked:invisible ltr:left-0 rtl:right-0">
                    <CgRadioCheck className="peer-checked:text-gray-200" />
                  </div>
                  <span className="text-base font-medium">{t("gender_f")}</span>
                </div>
              </label>
            </div>
            {formErrors.gender && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.gender.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-50 md:text-base">
              {t("gender_note")}
            </p>
          </div>
          <div className="col-span-2">
            <div>
              <div className="flex items-center gap-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className={`w-4 h-4 text-blue-600 bg-white border border-gray-300 rounded-sm ${
                    formErrors.terms ? "border-red-500" : ""
                  }`}
                  {...register("terms", {
                    required: true,
                  })}
                  data-testid="checkbox-terms"
                />
                <label
                  htmlFor="default-checkbox"
                  className="text-xs font-semibold text-black md:text-base"
                >
                  {t("i_agree")}{" "}
                  <Link prefetch={false}
                    href="/terms-conditions"
                    target="_blank"
                    className="text-[#179BD7] underline"
                  >
                    {t("terms")}
                  </Link>
                </label>
              </div>
              {formErrors.terms && (
                <p className="mt-1 text-xs text-red-500">
                  {t("terms_required")}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <Button
              name={t("sign_up")}
              width="full"
              type="submit"
              data-testid="button-submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
