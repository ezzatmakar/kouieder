"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";
import { fetchUserInfo, updateProfile } from "@/app/utils/account";
import Msg from "../Msg";
import ProfileLoader from "./ProfileLoader";
import SelectInput from "../SelectInput";
import Button from "../Button";
import { INPUT_CLASSES } from "@/app/commonUIClasses";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";
import Popup from "../Popup";
import ChangePassword from "./ChangePassword";
import { useUser } from "@/app/UserContext";
import { UserInfo } from "@/types";

// interface UserInfo {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   birth_day: Number;
//   birth_month: Number;
//   birth_year: Number;
//   gender: string;
// }
interface UserInfoResponse {
  status: string;
  msg: string;
  // Add other properties here as needed
}
export default function ProfileForm() {
  const { updateUserInfo,userInfo } = useUser();
  const t = useTranslations();
  const locale = useLocale();
  const [userId, setUserId] = useState("");
  // const [userInfo, setUserInfo] = useState({});
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserInfo>({
    defaultValues: userInfo as UserInfo,
  });

  const getUserInfo = async () => {
    setIsLoading(true);
    const response = await fetchUserInfo();
    if ((response as UserInfoResponse)?.status === "error") {
      setErrorMessage((response as UserInfoResponse).msg);
    } else if ((response as UserInfoResponse)?.status === "success") {
      setMessage(t("account.profile_updated_successfully"));
    } else if (!(response as UserInfoResponse)?.status) {
      // setUserInfo(response as UserInfo);
      updateUserInfo(response as UserInfo);
      //   setValues();
    } else {
      setErrorMessage("An error occurred while fetching user orders.");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const user_id = Cookies.get("user_id");
    if (!user_id) {
      // navigate('/login');
      window.location.href = `${locale==='ar'?'':'/en'}/login`;
      return;
    }
    setUserId(user_id);
    getUserInfo();
  }, []);
  // console.log("userInfo", userInfo);
  const onSubmit: SubmitHandler<UserInfo> = async (data: UserInfo) => {
    // console.log('data',data)
    try {
      setIsLoading(true);
      const updatedUserInfo = await updateProfile(data);
      setIsLoading(false);
      if (updatedUserInfo !== undefined) {
        // setUserInfo(updatedUserInfo as UserInfo);
        // window.location.reload();
        // updateUserInfo(updatedUserInfo as UserInfo);
        getUserInfo();
        setMessage(t("account.profile_updated_successfully"));
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Handle the case when updatedUserInfo is undefined
      }
    } catch (error) {
      setIsLoading(false);
      // Handle the case when updating user information fails
    }
  };

  let [isOpenPassword, setIsOpenPassword] = useState(false);
  function closePassword() {
    setIsOpenPassword(false);
  }
  function openPassword() {
    setIsOpenPassword(true);
  }

  return (
    <div className="py-4">
      {message && <Msg color="green" message={message} />}
      <div className="relative">
        {isLoading && <ProfileLoader />}
        {!isLoading &&
          (errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 pb-5 border-b-2 border-gray-200 border-solid lg:max-w-xl shadow-custom-desktop md:rounded-[32px] md:border md:border-gray-400 md:px-9 md:pt-9 md:pb-16 md:bg-transparent md:mt-10">
                {!userInfo && (
                  <div className="col-span-2">
                    <p>{t("userInfo_loading")}</p>
                  </div>
                )}
                <div>
                  <label
                    htmlFor=""
                    className="block mb-1 text-sm text-gray-400 capitalize"
                  >
                    {t("fields.first_name")}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className={`${INPUT_CLASSES} ${
                        errors.first_name ? "border-red-500" : ""
                      }`}
                      {...register("first_name", {
                        required: {
                          value: true,
                          message: t("fields.first_name_required"),
                        },
                      })}
                      defaultValue={userInfo?.first_name}
                      data-testid="input-first_name"
                    />
                    {errors.first_name &&
                      errors.first_name.type === "required" && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.first_name.message}
                        </p>
                      )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block mb-1 text-sm text-gray-400 capitalize"
                  >
                    {" "}
                    {t("fields.last_name")}{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className={`${INPUT_CLASSES} ${
                        errors.last_name && "border-red-500"
                      }`}
                      {...register("last_name", {
                        required: {
                          value: true,
                          message: t("fields.last_name_required"),
                        },
                      })}
                      defaultValue={userInfo?.last_name}
                      data-testid="input-last_name"
                    />
                    {errors.last_name &&
                      errors.last_name.type === "required" && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.last_name.message}
                        </p>
                      )}
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor=""
                    className="block mb-1 text-sm text-gray-400 capitalize"
                  >
                    {" "}
                    {t("fields.phone_number")}{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      placeholder=""
                      className={`${INPUT_CLASSES} ${
                        errors.phone && "border-red-500"
                      }`}
                      {...register("phone", {
                        // minLength: 11,
                        minLength: {
                          value: 11,
                          message: t("fields.phone_length"),
                        },
                        required: {
                          value: true,
                          message: t("fields.phone_required"),
                        },
                      })}
                      defaultValue={userInfo?.phone}
                      data-testid="input-phone"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor=""
                    className="block mb-1 text-sm text-gray-400 capitalize"
                  >
                    {" "}
                    {t("fields.email_address")}{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      className={`${INPUT_CLASSES} ${
                        errors.email && "border-red-500"
                      }`}
                      {...register("email", {
                        required:
                          locale === "ar"
                            ? "يجب ادخال البريد الإلكتروني"
                            : "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message:
                            locale === "ar"
                              ? "صيغة البريد الإلكتروني غير صحيحة"
                              : "Invalid email format",
                        },
                      })}
                      defaultValue={userInfo?.email}
                      readOnly
                    />
                    {errors.email && errors.email.type === "required" && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor=""
                    className="block mb-1 text-sm text-gray-400 capitalize"
                  >
                    {" "}
                    {t("fields.birth_date")}{" "}
                  </label>
                  <div className="flex gap-3 mt-1">
                    <div className="w-1/3">
                      <SelectInput
                        value={userInfo?.birth_day}
                        options={[
                          { label: t("fields.day"), value: "" },
                          ...Array.from({ length: 31 }, (_, index) => ({
                            label: (index + 1).toString().padStart(2, "0"),
                            value: (index + 1).toString().padStart(2, "0"),
                          })),
                        ]}
                        register={register("birth_day")}
                      />
                    </div>

                    <div className="w-1/3">
                      <SelectInput
                        value={userInfo?.birth_month}
                        options={[
                          { label: t("fields.month"), value: "" },
                          ...Array.from({ length: 12 }, (_, i) => ({
                            label: String(i + 1).padStart(2, "0"),
                            value: String(i + 1).padStart(2, "0"),
                          })),
                        ]}
                        register={register("birth_month")}
                      />
                    </div>
                    <div className="w-1/3">
                      <SelectInput
                        value={userInfo?.birth_year}
                        options={[
                          { label: t("fields.year"), value: "" },
                          ...Array.from({ length: 74 }, (_, i) => ({
                            label: String(2023 - i),
                            value: String(2023 - i),
                          })),
                        ]}
                        register={register("birth_year")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex gap-4">
                    <label
                      htmlFor="gender_male"
                      className="inline-block text-lg text-black cursor-pointer"
                    >
                      <div className="relative flex items-center py-1 ltr:pl-6 rtl:pr-6">
                        <input
                          type="radio"
                          id="gender_male"
                          value="M"
                          className="hidden peer"
                          defaultChecked={userInfo?.gender =='M'}
                          {...register("gender")}
                          data-testid="radio-male"
                        />
                        <div className="invisible peer-checked:visible absolute ltr:left-0 rtl:right-0 top-1 mt-0.5">
                          <CgRadioChecked className="peer-checked:text-gray-200" />
                        </div>
                        <div className="visible peer-checked:invisible absolute ltr:left-0 rtl:right-0 top-1 mt-0.5">
                          <CgRadioCheck className="peer-checked:text-gray-200" />
                        </div>
                        <span className="text-base font-medium">
                          {t("fields.gender_m")}
                        </span>
                      </div>
                    </label>
                    <label
                      htmlFor="gender_female"
                      className="inline-block text-lg text-black cursor-pointer"
                    >
                      <div className="relative flex items-center gap-2 py-1 ltr:pl-6 rtl:pr-6">
                        <input
                          type="radio"
                          id="gender_female"
                          value="F"
                          className="hidden peer"
                          defaultChecked={userInfo?.gender =='F'}
                          {...register("gender")}
                          data-testid="radio-female"
                        />
                        <div className="invisible peer-checked:visible absolute ltr:left-0 rtl:right-0 top-1 mt-0.5">
                          <CgRadioChecked className="peer-checked:text-gray-200" />
                        </div>
                        <div className="visible peer-checked:invisible absolute ltr:left-0 rtl:right-0 top-1 mt-0.5">
                          <CgRadioCheck className="peer-checked:text-gray-200" />
                        </div>
                        <span className="text-base font-medium">
                          {t("fields.gender_f")}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <Button
                    name={t("common.save_changes")}
                    type="submit"
                    width="full"
                  />
                  <button
                    className="mt-6 font-semibold underline"
                    onClick={openPassword}
                    type="button"
                  >
                    {t("account.change_password")}
                  </button>
                </div>
              </div>
            </form>
          ))}
        {isOpenPassword ? (
          <Popup isOpen={true} closePassword={closePassword}>
            <ChangePassword closePassword={closePassword} />
          </Popup>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
