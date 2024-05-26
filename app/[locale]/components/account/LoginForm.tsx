"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Loader from "../Loader";
import SocialLogin from "./SocialLogin";
import { useLocale, useTranslations } from "next-intl";
import { ErrorResponse, ProductData } from "@/types";
import { addBulkWishAPI, getWishAPI, userLogin } from "@/app/utils/account";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import EyeIcon from "../icons/EyeIcon";
import Button from "../Button";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";

type FormData = {
  username: string;
  password: string;
  remember: number;
};

export default function LoginForm() {
  const t = useTranslations("fields");
  const locale = useLocale();
  const [passwordShown1, setPasswordShown1] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors },
  } = useForm<FormData>();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const scrollToFirst = () => {
    setTimeout(() => {
      const element = document.querySelector(".border-red-500") as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      } else {
        const parent = document.querySelector(".login-form") as HTMLElement;
        if (parent) {
          const rect = parent.getBoundingClientRect();
          const offset = window.pageYOffset + rect.top - 100;
          window.scrollTo({ top: offset, behavior: "smooth" });
        } else {
          const bodyRect = document.body.getBoundingClientRect();
          const offset = window.pageYOffset + bodyRect.top - 100;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    }, 500);
  };
  let localStorageWishlistItems;
  let updatedWishlistItems: number[] = [];
  if (typeof window !== "undefined") {
    localStorageWishlistItems = localStorage.getItem("wishlistItems");
    if (localStorageWishlistItems) {
      const wishlistItems = JSON.parse(
        localStorageWishlistItems
      ) as ProductData[];
      updatedWishlistItems = wishlistItems.map((item: ProductData) => item.id);
    }
  }
  const addBulkWishList = async () => {
    try {
      const response = await addBulkWishAPI(updatedWishlistItems);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
    } catch (error) {
      console.error("can't addBulkWishAPI");
    }
  };

  const fetchWishListData = async () => {
    try {
      const response = await getWishAPI();
      setIsLoading(false);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(response));
    } catch (error) {
      console.error("can't getWishAPI");
    }
    setIsLoading(false);
  };

  const handleLoginSuccess = (user_id: number, token: string) => {
    // Store user ID in a cookie
    Cookies.set("user_id", user_id.toString());
    Cookies.set("token", token);
    addBulkWishList();
    fetchWishListData();
    Cookies.set("isCurrentUser", "true", {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    // Redirect to the dashboard or any other authorized page
    // navigate('/my-account');
    window.location.href = `${locale==='ar'?'':'/en'}/my-account`;
  };

  const onSubmit = (formData: FormData) => {
    const remember = formData.remember ? 1 : 0;
    userLogin(formData)
      .then((responseData: any) => {
        if (responseData.status === "success" && responseData.msg) {
          if (responseData.msg_code === "login_error") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general:
                responseData.msg ===
                "There is a problem with the data, please check again!"
                  ? t("credential_error")
                  : "error",
            }));
          } else if (responseData.msg_code === "login_success") {
            console.log("Success Login");
            handleLoginSuccess(responseData.user_id, responseData.token);
          } else {
            scrollToFirst();
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: "An error occurred.",
            }));
          }
          setIsLoading(false);
        } else if (responseData.ERR === "ERR_No_Payload") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "No payload received.",
          }));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Failed to login:", error);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    const user_id = Cookies.get("user_id");
    if (user_id) {
      // navigate('/my-account');
      window.location.href = `${locale==='ar'?'':'/en'}/my-account`;
      return;
    }
  }, []);
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="absolute -inset-4 z-20 flex items-start justify-center bg-gray-200 bg-opacity-75 pt-20">
          <Loader />
        </div>
      ) : (
        ""
      )}

      <div className="shadow-custom-desktop relative mx-auto overflow-hidden bg-white px-4 py-4 md:rounded-[32px] md:px-10 md:py-10">
        <h1 className="mb-4 text-center text-2xl font-bold leading-none tracking-tight text-black md:mb-10 md:text-3xl">
          {t("login")}
        </h1>
        {errors.general && (
          <p className="my-2 rounded border border-red-500 bg-red-100 p-2 text-xs text-red-800">
            {errors.general}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="mb-5">
            <label htmlFor="username" className={LABEL_CLASSES}>
              {t("login_label")}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="username"
                autoComplete="username"
                // placeholder={t("login_label") as string}
                {...register("username", {
                  required: t("username_required"),
                })}
                className={`${INPUT_CLASSES} ${
                  formErrors.username && "border-red-500"
                }`}
                data-testid="input-username"
              />
              {formErrors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.username.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className={LABEL_CLASSES}>
              {t("password")}
            </label>
            <div className="relative mt-1">
              <input
                type={passwordShown1 ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                // placeholder={t("password") as string}
                {...register("password", {
                  required: t("password_required"),
                  // minLength: {
                  //   value: 5,
                  //   message: t("password_length")
                  // },
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
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <Button
              name={t("sign_in")}
              width="full"
              extraclass="mt-14 leading-5"
              type="submit"
              data-testid="button-submit"
            />
          </div>
        </form>
        <div className="text-center">
          <Link prefetch={false}
            href="/forgot"
            className="text-sm font-normal text-primary-300 underline md:text-base"
          >
            {t("forget_password")}
          </Link>
        </div>
        <div className="mt-14 border-t border-gray-200 pt-10">
          {/* <SocialLogin /> */}
        </div>
      </div>
    </div>
  );
}
