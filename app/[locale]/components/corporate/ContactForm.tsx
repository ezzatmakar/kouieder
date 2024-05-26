"use client";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../Button";
import Loader from "../Loader";
import { useLocale, useTranslations } from "next-intl";
import { contactUsForm } from "@/app/api/corporateAPI";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import Msg from "../Msg";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ContactForm() {
  const t = useTranslations("fields");
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSet] = useState(false);
  const [isMsg, setIsMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const textareaRef = useRef(null);
  const [textAreaCount, changeTextAreaCount] = useState(0);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [errors, setErrors] = useState({
    response: "",
    general: "",
  });
  const onSubmit = (formData: FormData) => {
    // @ts-ignore
    // console.log(formData); // Access form data here
    contactUsForm(formData)
      .then((responseData: any) => {
        // Perform the necessary actions after registration
        if (responseData === 1) {
          setIsMsg(true);
          setMsg(t("thank_you"));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "An error occurred.",
          }));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle the registration error
        console.log("Failed to register:", error);
      });
  };
  const recalculate = (e: any) => {
    const count = e.target.value.length;
    changeTextAreaCount(count);
  };
  return (
    <div className="relative w-full" key={locale}>
      {isLoading ? (
        <div className="absolute -inset-4 z-20 flex items-start justify-center bg-gray-200 bg-opacity-75 pt-20">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={
          // @ts-ignore
          handleSubmit(onSubmit)
        }
      >
        {errors.general && (
          <p className="my-2 rounded border border-red-500 bg-red-100 p-2 text-xs text-red-800">
            {errors.general}
          </p>
        )}
        {isMsg ? (
          <Msg color="green" message={`${msg}`} />
        ) : (
          <div className="grid grid-cols-2 gap-4 py-4 pb-5">
            <div>
              <label htmlFor="" className={`${LABEL_CLASSES}`}>
                {" "}
                {t("first_name")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`${INPUT_CLASSES} ${
                    formErrors.firstname && "border-red-500"
                  }`}
                  {...register("firstname", {
                    required: true,
                  })}
                />
                {formErrors.firstname && (
                  <p className="mt-1 text-xs text-red-500">
                    {t("first_name_required")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="" className={`${LABEL_CLASSES}`}>
                {" "}
                {t("last_name")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`${INPUT_CLASSES} ${
                    formErrors.lastname && "border-red-500"
                  }`}
                  {...register("lastname", {
                    required: true,
                  })}
                />
                {formErrors.lastname && (
                  <p className="mt-1 text-xs text-red-500">
                    {t("last_name_required")}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="" className={`${LABEL_CLASSES}`}>
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
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {t("email_required")}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="" className={`${LABEL_CLASSES}`}>
                {" "}
                {t("phone_number")}{" "}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder=""
                  className={`${INPUT_CLASSES} ${
                    formErrors.phone && "border-red-500"
                  }`}
                  {...register("phone", {
                    required: true,
                  })}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {t("phone_required")}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="" className={`${LABEL_CLASSES}`}>
                {" "}
                {t("note")}{" "}
              </label>
              <Controller
                name="msg"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative mb-2">
                    <textarea
                      {...field}
                      ref={textareaRef}
                      cols={30}
                      rows={10}
                      id="msg"
                      className="h-[119px] w-full resize-none rounded-2xl border-2 border-gray-300 p-4 focus:outline-none"
                      onChange={(e) => {
                        field.onChange(e);
                        recalculate(e);
                      }}
                      maxLength={150}
                    />
                    <p className="absolute bottom-4 text-sm leading-none text-gray-50 ltr:right-3 rtl:left-3">
                      {textAreaCount}/150
                    </p>
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange("");
                          changeTextAreaCount(0);
                        }}
                        className="absolute top-4 rounded-full bg-gray-200 p-[2px] text-white hover:bg-primary-100 ltr:right-4 rtl:left-4"
                      >
                        <XMarkIcon
                          className="h-3 w-3 font-bold"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="col-span-2">
              <Button name={t("send")} width="full" type="submit" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
