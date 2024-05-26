"use client";
import { addReview } from "@/app/api/general";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { useLocale, useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Msg from "../Msg";
import { useUser } from "@/app/UserContext";
import RoundedCheck from "../icons/RoundedCheck";

function ProductReviewForm({ productId,setIsSuccess }: any) {
  const t = useTranslations("fields");

  const [textAreaCount, changeTextAreaCount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { userInfo } = useUser();
  let selectedRating = watch("selectedRating");
  let reviewerFName = userInfo?.first_name ? userInfo.first_name : "";
  let reviewerLName = userInfo?.last_name ? userInfo.last_name : "";
  let reviewerName = reviewerFName + reviewerLName;
  let reviewerEmail = userInfo?.email ? userInfo.email : "";
  // console.log('selectedRating',selectedRating)
  const recalculate = (e: any) => {
    const count = e.target.value.length;
    changeTextAreaCount(count);
  };
  const onSubmit = async (data: any) => {
    // console.log("data", data);
    const { reviewContent, selectedRating } = data;

    const result = await addReview(
      productId,
      reviewerName,
      reviewerEmail,
      reviewContent,
      selectedRating
    );
    if (result === 1) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    // Handle the result or any errors here
    // console.log("API Response:", result);
  };
  // const result = addReview(productID,reviewerName,reviewerEmail,reviewContent,rating);

  return (
    <div className="comments-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="commentform"
          className="comment-form"
        >
          <div className="emojis hidden">
            <ul className="new-emojis mx-auto my-9 flex max-w-[450px] grid-cols-5 gap-x-3 md:grid">
              <li className="relative w-16 md:w-auto">
                <input
                  type="radio"
                  // name="rating"
                  checked
                  {...register("selectedRating")}
                  value={1}
                  className="!important absolute left-0 top-0 h-full w-full opacity-0"
                />
                <div
                  className={`flex flex-col items-center ${
                    selectedRating == 1
                      ? " border-2 border-primary-200"
                      : " border-2 border-transparent"
                  } bg-white p-2.5 text-sm md:text-base text-gray-50 rounded-[20px] whitespace-nowrap`}
                >
                  <span>🤩</span>
                  {t("excellent")}
                </div>
              </li>
              <li className="relative w-16 md:w-auto">
                <input
                  type="radio"
                  {...register("selectedRating")}
                  value={2}
                  className="!important absolute left-0 top-0 h-full w-full opacity-0"
                />
                <div
                  className={`flex flex-col items-center ${
                    selectedRating == 2
                    ? " border-2 border-primary-200"
                    : " border-2 border-transparent"
                  } bg-white p-2.5 text-sm md:text-base text-gray-50 rounded-[20px] whitespace-nowrap`}
                >
                  <span>😄</span>
                  {t("good")}
                </div>
              </li>
              <li className="relative w-16 md:w-auto">
                <input
                  type="radio"
                  // name="rating"
                  // checked={selectedRating == 3}
                  {...register("selectedRating")}
                  value={3}
                  className="!important absolute left-0 top-0 h-full w-full opacity-0"
                />
                <div
                  className={`flex flex-col items-center ${
                    selectedRating == 3
                    ? " border-2 border-primary-200"
                    : " border-2 border-transparent"
                  } bg-white p-2.5 text-sm md:text-base text-gray-50 rounded-[20px] whitespace-nowrap`}
                >
                  <span>🙂</span>
                  {t("normal")}
                </div>
              </li>
              <li className="relative w-16 md:w-auto">
                <input
                  type="radio"
                  // name="rating"
                  checked={selectedRating == 4}
                  {...register("selectedRating")}
                  value={4}
                  className="!important absolute left-0 top-0 h-full w-full opacity-0"
                />
                <div
                  className={`flex flex-col items-center ${
                    selectedRating == 4
                    ? " border-2 border-primary-200"
                    : " border-2 border-transparent"
                  } bg-white p-2.5 text-sm md:text-base text-gray-50 rounded-[20px] whitespace-nowrap`}
                >
                  <span>🙁</span>
                  {t("bad")}
                </div>
              </li>
              <li className="relative w-16 md:w-auto">
                <input
                  type="radio"
                  // name="rating"
                  checked={selectedRating == 5}
                  {...register("selectedRating")}
                  value={5}
                  className="!important absolute left-0 top-0 h-full w-full opacity-0"
                />
                <div
                  className={`flex flex-col items-center ${
                    selectedRating == 5
                    ? " border-2 border-primary-200"
                    : " border-2 border-transparent"
                  } bg-white p-2.5 text-sm md:text-base text-gray-50 rounded-[20px] whitespace-nowrap`}
                >
                  <span>😫</span>
                  {t("very_bad")}
                </div>
              </li>
            </ul>
          </div>
          {/* <div className="mb-8 flex gap-x-9">
          <p className="w-full">
            <label htmlFor="author" className={LABEL_CLASSES}>
              {t("user_name")}
            </label>
            <input
              className={INPUT_CLASSES}
              {...register("reviewerName", {
                required: true,
              })}
              type="text"
            />
            {errors.reviewerName && (
              <span className="text-red-500">{t("user_name_required")}</span>
            )}
          </p>
          <p className="w-full">
            <label htmlFor="email" className={LABEL_CLASSES}>
              {t("email_address")}
            </label>
            <input
              type="email"
              className={`${INPUT_CLASSES} ${errors.email && "border-red-500"}`}
              {...register("reviewerEmail", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("email_address_format"),
                },
              })}
            />
          </p>
          {errors.reviewerEmail && (
            <p className="mt-1 text-xs text-red-500">
              {t("email_address_required")}
            </p>
          )}
        </div> */}

          <div className="relative w-full">
            <label htmlFor="comment" className={LABEL_CLASSES}>
              {t("leave_review")}
            </label>
            <textarea
              id="comment"
              className={`${INPUT_CLASSES} resize-none overflow-hidden md:h-[119px]`}
              {...register("reviewContent", {
                required: true,
              })}
              onChange={(e) => {
                recalculate(e);
              }}
            />
            {errors.reviewContent && (
              <span className="text-red-500">
                {t("reviewContent_required")}
              </span>
            )}
            <p className="absolute bottom-4 text-sm leading-none text-gray-50 ltr:right-3 rtl:left-3">
              {textAreaCount}/150
            </p>
          </div>
          <p className="form-submit">
            <button
              type="submit"
              className="mt-9 w-full rounded-lg bg-primary-300 py-2.5 text-center text-xl font-normal text-white hover:bg-primary-400"
            >
              {t("add_review")}
            </button>
          </p>
        </form>
      {/* <p className="mt-6 text-base font-medium text-[#979797]">
        {t('no_reviews_yet')}
      </p> */}
    </div>
  );
}

export default ProductReviewForm;
