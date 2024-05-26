"use client";
import Tooltip from "../Tooltip";
import { useEffect, useRef, useState } from "react";
import { TagIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { RiCheckLine } from "react-icons/ri";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useSharedState } from "@/app/SharedStateContext";
import { couponInfo } from "@/app/utils/account";
import { useCurrency } from "@/CurrencyContext";
// import useShoppingCart from "~/stores/cartStore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniCartTools() {
  // let [openCoupone, setOpenCoupone] = useState(true)
  const t = useTranslations("common");
  const { totalPrice } = useShoppingCart();
  const [openNote, setOpenNote] = useState(true);
  const [openCoupon, setOpenCoupon] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [msg, setMsg] = useState("");
  const { couponCode, setCouponCode, setCouponDiscount,setCouponFreeShipping } = useSharedState();
  const [couponMsg, setCouponMsg] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleCouponRemoval = async () => {
    setCouponDiscount("0");
    setCouponCode("");
    setCouponFreeShipping(false);
  };
  const toggleCoupon = () => {
    setOpenCoupon(!openCoupon);
  };

  const applyCoupon = () => {
    setCouponApplied(true);
  };

  const editCoupon = () => {
    handleCouponRemoval();
  };

  const deleteCoupon = () => {
    setCouponApplied(false);
    handleCouponRemoval();
  };

  function toggleNote() {
    setOpenNote(!openNote);
  }
  const textareaRef = useRef(null);
  const [textAreaCount, changeTextAreaCount] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm();
  const [NoteApplied, setNoteApplied] = useState(!!Cookies.get("order_note"));

  const { currency } = useCurrency();
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  useEffect(() => {
    const savedNote = Cookies.get("order_note");
    if (savedNote) {
      setValue("order_note", savedNote);
    }
  }, [setValue]);

  const onSubmitNote = (data: any) => {
    Cookies.set("order_note", data.order_note);
    setNoteApplied(true);
    toggleNote();
    setMsg("note_added");
    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const deleteNote = () => {
    Cookies.remove("order_note");
    setValue("order_note", "");
    setNoteApplied(false);
  };
  const editNote = () => {
    // @ts-ignore
    textareaRef.current.focus();
    if (isDirty) {
      handleSubmit(onSubmitNote)();
    }
  };

  const handleCouponApplication = async (event: React.FormEvent) => {
    event.preventDefault();

    if (coupon.trim() === "") {
      setCouponMsg("Coupon code is required");
      return;
    }

    try {
      const response = (await couponInfo(coupon)) as {
        discount_type?: string;
        discount_amount?: number;
        uae_amount?: number;
        status?: string;
        msg?: string;
        code?: number;
      };
      if (response.discount_type === "percent") {
        const discountAmount = isUAE || currency === "AED"
          ? response.uae_amount
          : response.discount_amount;
        setCouponMsg(
          `Coupon applied successfully. ${discountAmount}% discount applied.`
        );
        setCouponDiscount(`${discountAmount?.toString() ?? "0"}%`);
        setCouponCode(coupon);
        applyCoupon();
        toggleCoupon();
        setMsg("coupon_added");
        setCouponApplied(true);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      } else if (response.discount_type === "fixed_cart") {
        const discountAmount = isUAE || currency === "AED"
          ? response.uae_amount ?? 0
          : response.discount_amount ?? 0;
        if (totalPrice > discountAmount) {
          setCouponMsg(
            `Coupon applied successfully. ${discountAmount} discount applied.`
          );
          setCouponDiscount(discountAmount?.toString() ?? "0");
          setCouponCode(coupon);
          applyCoupon();
          toggleCoupon();
          setMsg("coupon_added");
          setCouponApplied(true);
          setTimeout(() => {
            setMsg("");
          }, 3000);
        }else{
          setCouponMsg(t("coupon_application_failed"));
          setCouponApplied(false);
        }
      } else if (response.status === "error") {
        setCouponMsg(
          response.code === 400 ? t("coupon_application_failed") : ""
        );
        setCouponApplied(false);
      }
    } catch (error) {
      setCouponMsg("Error: " + error);
      setCouponApplied(false);
    }
  };

  const recalculate = (e: any) => {
    const count = e.target.value.length;
    changeTextAreaCount(count);
  };

  // console.log("couponCode", couponCode);
  // console.log("coupon>>>", coupon);
  return (
    <div className="parent border-t border-gray-100">
      <div className="mx-4 flex flex-col gap-y-3 pt-8 md:mx-10">
        <Tooltip message={"add_note"}>
          {NoteApplied && (
            <div className="pointer-events-none absolute top-[-7px]">
              <svg
                className="h-4 w-4"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="14" fill="#EBC743" />
                <path
                  d="M20.7858 9.35596L11.9642 18.1418L7.5 13.6418L6.5 14.6418L11.4642 19.6418C11.5292 19.7088 11.6068 19.7623 11.6927 19.799C11.7785 19.8358 11.8708 19.8551 11.9642 19.856C12.0575 19.8551 12.1498 19.8358 12.2357 19.799C12.3215 19.7623 12.3992 19.7088 12.4642 19.6418L21.7858 10.356L20.7858 9.35596Z"
                  fill="#163300"
                />
              </svg>
            </div>
          )}
          <div
            className="inline-flex cursor-pointer items-center justify-center gap-x-3"
            onClick={toggleNote}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.9001 11.1504V2.75039C16.9001 1.59059 15.9599 0.650391 14.8001 0.650391L2.2001 0.650391C1.0403 0.650391 0.100098 1.59059 0.100098 2.75039L0.100098 11.1504C0.100098 12.3102 1.0403 13.2504 2.2001 13.2504H5.35009L8.50009 16.4004L11.6501 13.2504H14.8001C15.9599 13.2504 16.9001 12.3102 16.9001 11.1504ZM3.2501 4.85039C3.2501 4.27049 3.7202 3.80039 4.30009 3.80039L12.7001 3.80039C13.28 3.80039 13.7501 4.27049 13.7501 4.85039C13.7501 5.43029 13.28 5.90039 12.7001 5.90039L4.30009 5.90039C3.7202 5.90039 3.2501 5.43029 3.2501 4.85039ZM4.30009 8.00039C3.7202 8.00039 3.2501 8.47049 3.2501 9.05039C3.2501 9.63029 3.7202 10.1004 4.30009 10.1004L7.45009 10.1004C8.02999 10.1004 8.50009 9.63029 8.50009 9.05039C8.50009 8.47049 8.02999 8.00039 7.45009 8.00039H4.30009Z" fill="#EF9E52"/>
            </svg>
            <p className="text-lg text-gray-50 hover:underline">{t("title_add_note")}</p>
          </div>
        </Tooltip>
        <Tooltip message={"add_coupone"}>
          {couponApplied || couponCode ? (
            <div className="pointer-events-none absolute top-[-7px]">
              <svg
                className="h-4 w-4"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="14" fill="#EBC743" />
                <path
                  d="M20.7858 9.35596L11.9642 18.1418L7.5 13.6418L6.5 14.6418L11.4642 19.6418C11.5292 19.7088 11.6068 19.7623 11.6927 19.799C11.7785 19.8358 11.8708 19.8551 11.9642 19.856C12.0575 19.8551 12.1498 19.8358 12.2357 19.799C12.3215 19.7623 12.3992 19.7088 12.4642 19.6418L21.7858 10.356L20.7858 9.35596Z"
                  fill="#163300"
                />
              </svg>
            </div>
          ):""}
          <div
            className="inline-flex cursor-pointer items-center justify-center gap-x-3"
            onClick={toggleCoupon}
          >
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-8.85156e-07 1.24999L-5.24541e-07 9.49991C4.1961e-05 9.6988 0.0790852 9.88953 0.219743 10.0302L11.4694 21.28C11.5391 21.3498 11.6218 21.4051 11.7128 21.4428C11.8039 21.4806 11.9015 21.5 12 21.5C12.0986 21.5 12.1962 21.4806 12.2872 21.4428C12.3783 21.4051 12.461 21.3498 12.5306 21.28L20.7804 13.0301C20.921 12.8895 21 12.6987 21 12.4999C21 12.301 20.921 12.1103 20.7804 11.9696L9.53073 0.719747C9.46102 0.650011 9.37823 0.594705 9.28712 0.556999C9.19601 0.519291 9.09835 0.499923 8.99975 0.5L0.749978 0.5C0.551071 0.5 0.360311 0.579018 0.219663 0.719667C0.0790145 0.860319 -8.93851e-07 1.05108 -8.85156e-07 1.24999ZM6.74981 5.74995C6.74981 6.04662 6.66184 6.33662 6.49702 6.58329C6.3322 6.82997 6.09794 7.02222 5.82386 7.13575C5.54978 7.24928 5.24819 7.27899 4.95722 7.22111C4.66626 7.16323 4.39899 7.02037 4.18922 6.8106C3.97945 6.60082 3.83659 6.33355 3.77872 6.04258C3.72084 5.75161 3.75054 5.45001 3.86407 5.17593C3.9776 4.90184 4.16985 4.66758 4.41652 4.50276C4.66319 4.33793 4.95319 4.24996 5.24985 4.24996C5.64767 4.24996 6.02919 4.408 6.31048 4.6893C6.59178 4.9706 6.74981 5.35213 6.74981 5.74995Z" fill="#EF9E52"/>
            </svg>

            <p className="text-lg text-gray-50 hover:underline">{t("title_add_coupone")}</p>
          </div>
        </Tooltip>
      </div>
      <div
        className={classNames(
          openCoupon
            ? "opacity-0 translate-y-1 duration-200 ease-out pointer-events-none"
            : "opacity-100 translate-y-0 duration-150 ease-in",
          "fixed md:absolute left-0 right-0 bottom-0 top-0 transform z-20 transition-all"
        )}
      >
        <div
          onClick={() => toggleCoupon()}
          className="fixed inset-0 z-20 bg-black opacity-25"
        />
        <div className="rounded-t-x absolute bottom-0 left-0 right-0 z-20 rounded-t-xl bg-white">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 m-5 rounded-lg p-2"
              onClick={toggleCoupon}
            >
              <span className="sr-only">Close coupon</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <form
            //  onSubmit={handleSubmit(onSubmitCoupon)}
            method="post"
            onSubmit={handleCouponApplication}
          >
            <div className="coupon flex w-full flex-col border-t border-[#C6C6C6] px-8 pb-10 pt-10 md:px-10">
              <p className="text-base font-semibold text-gray-50">
                {" "}
                {t("add_coupone")}
              </p>

              {/* <Controller
                name="coupon_code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="mb-6 mt-2">
                    <input
                      {...field}
                      type="text"
                      className="border-gray-400 w-full rounded-2xl border-2 px-4 py-2 focus:outline-none"
                      id="coupon_code"
                    />
                  </div>
                )}
              /> */}
              <div className="mb-6 mt-2">
                {couponCode?
                <input
                  type="text"
                  name="coupon_code"
                  className="w-full rounded-lg border-2 border-gray-100 px-4 py-2 focus:outline-none"
                  id="coupon_code"
                  placeholder={t("Enter_Coupon_Code")}
                  value={couponCode}
                  onChange={(event) => setCoupon(event.target.value)}
                  data-testid="input-coupon"
                  readOnly
                />
                :
                <input
                  type="text"
                  name="coupon_code"
                  className="w-full rounded-lg border-2 border-gray-100 px-4 py-2 focus:outline-none"
                  id="coupon_code"
                  placeholder={t("Enter_Coupon_Code")}
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  data-testid="input-coupon"
                />
                }
                {couponMsg && (
                  <p
                    className={`flex p-2 text-sm rounded-lg w-full mt-2 ${
                      couponMsg.includes("success") ||
                      couponMsg.includes("نجاح")
                        ? "text-primary-800 bg-gray-100"
                        : "text-red-800 bg-red-100"
                    }`}
                  >
                    {couponMsg}
                  </p>
                )}
              </div>
              {couponApplied || couponCode && (
                <div className="mt-2 flex w-full justify-between gap-x-3">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-primary-300 text-white hover:bg-primary-400"
                    onClick={editCoupon}
                  >
                    {t("edit_coupone")}
                  </button>
                  <button
                    type="button"
                    className="ml-2 flex w-full items-center justify-between rounded-lg bg-primary-300 px-6 py-4 text-black"
                    onClick={deleteCoupon}
                  >
                    {t("delete_coupone")}
                    <TrashIcon className="h-4 w-4 text-black" />
                  </button>
                </div>
              )}

              <button
                type="submit"
                className={`${
                  couponApplied || couponCode ? "hidden" : ""
                } text-white bg-primary-300 hover:bg-primary-400 rounded-lg focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-5 py-[18px] text-center`}
                name="apply_coupon"
                defaultValue="Apply coupon"
              >
                {t("add")}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={classNames(
          openNote
            ? "opacity-0 translate-y-1 duration-200 ease-out pointer-events-none"
            : "opacity-100 translate-y-0 duration-150 ease-in",
          "fixed md:absolute left-0 right-0 bottom-0 top-0 transform z-20 transition-all"
        )}
      >
        <div
          onClick={() => toggleNote()}
          className="fixed inset-0 z-20 bg-black opacity-25"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-xl bg-white">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 m-5 rounded-lg p-2"
              onClick={toggleNote}
            >
              <span className="sr-only">Close Note</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmitNote)}>
            <div className="flex w-full flex-col gap-2 border-t border-[#C6C6C6] px-8 pb-10 pt-10 md:px-10">
              <p className="text-base font-semibold text-gray-50">
                {t("add_note")}
              </p>
              <Controller
                name="order_note"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="relative mb-2">
                    <textarea
                      {...field}
                      ref={textareaRef}
                      cols={30}
                      rows={10}
                      id="order_note"
                      className="h-[119px] w-full resize-none rounded-lg border-2 border-gray-300 p-4 focus:outline-none"
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
                        className="absolute top-4 rounded-full bg-gray-100 p-[2px] hover:bg-primary-400 hover:text-white ltr:right-4 rtl:left-4"
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
              {NoteApplied && (
                <div className="flex w-full justify-between gap-x-3">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-primary-300 text-white hover:bg-primary-400"
                    onClick={() => {
                      editNote();
                    }}
                  >
                    {t("edit_note")}
                  </button>
                  <button
                    type="button"
                    className="group ml-2 flex w-full items-center justify-between rounded-lg bg-gray-100 px-6 py-4 text-primary-300 hover:bg-primary-300 hover:text-white"
                    onClick={deleteNote}
                  >
                    {t("delete_note")}
                    <TrashIcon className="h-4 w-4 text-primary-300 group-hover:text-white" />
                  </button>
                </div>
              )}
              <button
                type="submit"
                className={`${
                  NoteApplied ? "hidden" : ""
                } text-white bg-primary-300 hover:bg-primary-400 rounded-lg focus:ring-4 focus:outline-none text-xl font-semibold w-full sm:w-auto px-5 py-[18px] text-center `}
                name="add_note"
                defaultValue="Add"
              >
                {t("add")}
              </button>
            </div>
          </form>
        </div>
      </div>
      {msg && (
        <div className="absolute left-0 right-0 top-0 z-10">
          <p
            className={`flex items-center px-6 py-3 font-semibold text-base md:text-xl gap-2 ${
              msg === "note_added" ? "bg-primary-300 text-gray-200" : ""
            } ${msg === "coupon_added" ? "bg-primary-50 text-white" : ""}`}
          >
            <RiCheckLine />
            {t(msg)}
          </p>
        </div>
      )}
    </div>
  );
}
