"use client";
import { Link } from "@/navigation";
import React, { useEffect, useState } from "react";
import Note from "./Note";
import { useLocale, useTranslations } from "next-intl";
import useShoppingCart from "@/app/stores/useShoppingCart";
import Cookies from "js-cookie";
import CartItem from "./CartItem";
import FormatCurrency from "../FormatCurrency";
import { XMarkIcon } from "@heroicons/react/20/solid";
import CouponForm from "./CouponForm";
import Breadcrumbs from "../Breadcrumbs";
import PointGets from "./PointGets";
import { useSharedState } from "@/app/SharedStateContext";
import { checkFreeShipping } from "@/app/api/general";
import FreeShippingBar from "./FreeShippingBar";
import { RiCheckLine } from "react-icons/ri";

export default function CartPage() {
  const locale = useLocale();
  const t = useTranslations("common");

  const {
    selectedAreaRatePROV,
    setSelectedAreaRate,
    walletDiscount,
    couponCode,
    couponDiscount,
    setCouponDiscount,
    setCouponCode,
    couponFreeShipping,
    setCouponFreeShipping
  } = useSharedState();
  // console.log('couponFreeShipping',couponFreeShipping)
  const {
    cartItems,
    removeFromCart,
    decreaseCartQuantity,
    addToCart,
    totalAPI,
    addCoupon,
    removeCoupon,
    totalPrice,
    totalPriceUAE,
    totalDiscountAPI,
  } = useShoppingCart();
  const [openCoupon, setOpenCoupon] = useState(false);
  const [openNote, setOpenNote] = useState(true);
  const [orderNoteValue, setOrderNoteValue] = useState("");
  const [NoteApplied, setNoteApplied] = useState(!!Cookies.get("order_note"));
  const orderNoteFromCookie = Cookies.get("order_note");
  const [allowFreeShipping, setAllowFreeShipping] = useState(false);
  const [orderLimit, setOrderLimit] = useState(0);
  const [msg, setMsg] = useState("");
  const [shippingFees, setShippingFees] = useState(parseFloat(selectedAreaRatePROV || "0"));

  const user_id = Cookies.get("user_id");
  const currency = Cookies.get("currency");

  // Logic to adjust shipping fees based on free shipping and order limit

  // console.log("shippingFees", shippingFees);
  // console.log("allowFreeShipping", allowFreeShipping);
  // console.log("totalPrice", totalPrice);
  // console.log("orderLimit", orderLimit);
  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await checkFreeShipping();
        if (response) {
          // console.log("response", response);
          setAllowFreeShipping(response.allow_free_shipping);
          setOrderLimit(parseFloat(response.order_limit));
        }
      } catch (error) {
        console.error("Error fetching shipping info:", error);
      }
    };

    fetchShippingInfo();
  }, []);
  useEffect(() => {
    if ((allowFreeShipping && totalPrice >= orderLimit)||couponFreeShipping) {
      setShippingFees(0);
      // setSelectedAreaRate('0');
    } else {
      setShippingFees(parseFloat(selectedAreaRatePROV || "0"));
    }
  }, [allowFreeShipping, totalPrice, orderLimit, selectedAreaRatePROV,couponFreeShipping]);
  const applyNote = () => {
    Cookies.set("order_note", orderNoteValue);
    setNoteApplied(true);
  };
  
  const toggleNote = () => {
    setOpenNote(!openNote);
  };

  const SavedCouponCode = Cookies.get("SavedCouponCode");

  const handleCouponRemoval = async () => {
    setCouponDiscount("0");
    setCouponCode("");
    setCouponFreeShipping(false);
  };

  const selectedAreaRateFromCookie = useState(
    Cookies.get("selectedAreaRate")
  )[0];

  useEffect(() => {
    if (orderNoteFromCookie) {
      setOrderNoteValue(orderNoteFromCookie);
      setNoteApplied(true);
    }
  }, [shippingFees, selectedAreaRateFromCookie]);

  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: t("cart"), href: "#" },
    ],
  };
  let checkoutTotal = totalPrice;

  const isPercentageDiscount = couponDiscount.includes("%");
  const percentage = isPercentageDiscount
    ? parseFloat(couponDiscount) / 100
    : 0;
  const discountAmount = isPercentageDiscount
    ? checkoutTotal * percentage
    : parseFloat(couponDiscount) || 0;

  let totalAmount = checkoutTotal + shippingFees - discountAmount;
  let maxWalletDiscount = totalAmount;
  let walletDiscountValue = parseFloat(walletDiscount);
  walletDiscountValue = Math.min(walletDiscountValue, maxWalletDiscount);
  let updatedTotalAmount = user_id
    ? totalAmount
    : totalAmount - (isNaN(walletDiscountValue) ? 0 : walletDiscountValue);
  const [isClient, setIsClient] = useState(false);
  

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient && cartItems.length > 0 ? (
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
          <div className="border-b border-gray-100 py-3 md:border-none md:pb-6">
            <h1 className="text-2xl font-bold md:text-4xl">{t("cart")}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className="col-span-2">
              {allowFreeShipping && !couponFreeShipping && (
                <FreeShippingBar
                  totalAmount={totalAmount}
                  orderLimit={orderLimit}
                />
              )}
              <div className="flex flex-col px-4 sm:px-0">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    id={item.id}
                    quantity={item.quantity}
                    slug={item.slug}
                    price={parseFloat(item.price)}
                    thumbnail={item.thumbnail}
                    name={item.name}
                    ar_name={item.ar_name}
                    removeFromCart={removeFromCart}
                    decreaseCartQuantity={decreaseCartQuantity}
                    addToCart={addToCart}
                    firstOne={index===0}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-2 px-4 py-6 md:pt-8 lg:col-span-1">
              <div className="relative overflow-hidden rounded-xl border-2 border-primary-300 md:rounded-[24px] md:pt-2">
                <div className="flex items-center gap-x-3 border-b border-gray-200 p-4 md:px-10">
                  <svg width="22" height="26" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6999 0.263672C9.50254 0.263672 6.0999 3.66631 6.0999 7.86367V9.76367H4.19991C3.23177 9.76367 2.41845 10.4916 2.31153 11.4539L0.411532 28.5539C0.351851 29.091 0.523736 29.6281 0.884168 30.0308C1.2446 30.4335 1.75947 30.6637 2.29991 30.6637H25.0999C25.6404 30.6637 26.1552 30.4335 26.5157 30.0308C26.8761 29.6281 27.048 29.091 26.9883 28.5539L25.0883 11.4539C24.9814 10.4916 24.1681 9.76367 23.1999 9.76367H21.2999V7.86367C21.2999 3.66631 17.8973 0.263672 13.6999 0.263672ZM17.4999 9.76367V7.86367C17.4999 5.76499 15.7986 4.06367 13.6999 4.06367C11.6012 4.06367 9.8999 5.76499 9.8999 7.86367V9.76367H17.4999ZM6.0999 15.4637C6.0999 14.4143 6.95056 13.5637 7.9999 13.5637C9.04924 13.5637 9.8999 14.4143 9.8999 15.4637C9.8999 16.513 9.04924 17.3637 7.9999 17.3637C6.95056 17.3637 6.0999 16.513 6.0999 15.4637ZM19.3999 13.5637C18.3506 13.5637 17.4999 14.4143 17.4999 15.4637C17.4999 16.513 18.3506 17.3637 19.3999 17.3637C20.4492 17.3637 21.2999 16.513 21.2999 15.4637C21.2999 14.4143 20.4492 13.5637 19.3999 13.5637Z" fill="#5066A2"/>
                  </svg>
                  <h2 className="text-base font-bold capitalize text-primary-300 md:text-2xl">
                    {t("cart_summary")}
                  </h2>
                </div>
                <div className="flex flex-col px-4 py-2 md:mt-4 md:px-6">
                  <div className="flex justify-between py-3">
                    <span className="text-base font-semibold text-gray-50">
                      {t("shipping_subtotal")}
                    </span>
                    <span className="text-base font-bold text-black lg:text-xl">
                      {shippingFees !== 0 ? (
                        <FormatCurrency
                          value={shippingFees}
                          bg={false}
                          style="no-style"
                        />
                      ) : (
                        t("free_shipping")
                      )}
                    </span>
                  </div>
                  <div className="border-black-300 flex justify-between border-b py-3">
                    <span className="text-base font-semibold text-gray-50">
                      {t("subtotal")}
                    </span>
                    <span className="text-base font-bold text-black lg:text-xl">
                      <FormatCurrency
                        value={totalPrice}
                        valueUAE={totalPriceUAE}
                        bg={false}
                        style="no-style"
                      />
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3 md:px-6">
                  {couponCode ? (
                    <div className="border-black-300 mb-3 flex justify-between border-b pb-3">
                      <span className="text-base font-semibold text-red-400">
                        {t("discount")}
                      </span>
                      <span className="font-semibold text-red-400">
                        <span
                          className="cursor-pointer px-1 text-[10px] font-light text-black hover:underline"
                          onClick={handleCouponRemoval}
                        >
                          {t("remove")}
                        </span>
                        -
                        <FormatCurrency
                          value={discountAmount}
                          valueUAE={discountAmount}
                          bg={false}
                          style="no-style"
                        />
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex flex-wrap justify-between pb-4">
                      <span
                        className="flex cursor-pointer gap-x-3 font-semibold text-gray-50 underline"
                        onClick={() => setOpenCoupon(true)}
                        data-testid="open_coupon-button"
                      >
                        <svg
                          width="21"
                          height="22"
                          viewBox="0 0 21 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M-8.85156e-07 1.21288L-5.24541e-07 9.4628C4.1961e-05 9.66169 0.0790852 9.85243 0.219743 9.99304L11.4694 21.2429C11.5391 21.3127 11.6218 21.368 11.7128 21.4057C11.8039 21.4435 11.9015 21.4629 12 21.4629C12.0986 21.4629 12.1962 21.4435 12.2872 21.4057C12.3783 21.368 12.461 21.3127 12.5306 21.2429L20.7804 12.993C20.921 12.8524 21 12.6616 21 12.4628C21 12.2639 20.921 12.0732 20.7804 11.9325L9.53073 0.682638C9.46102 0.612901 9.37823 0.557596 9.28712 0.519889C9.19601 0.482181 9.09835 0.462814 8.99975 0.46289L0.749978 0.462891C0.551071 0.462891 0.360311 0.541908 0.219663 0.682558C0.0790145 0.82321 -8.93851e-07 1.01397 -8.85156e-07 1.21288ZM6.74981 5.71284C6.74981 6.00951 6.66184 6.29951 6.49702 6.54618C6.3322 6.79286 6.09794 6.98511 5.82386 7.09864C5.54978 7.21217 5.24819 7.24188 4.95722 7.184C4.66626 7.12612 4.39899 6.98326 4.18922 6.77349C3.97945 6.56371 3.83659 6.29644 3.77872 6.00547C3.72084 5.7145 3.75054 5.4129 3.86407 5.13882C3.9776 4.86473 4.16985 4.63047 4.41652 4.46565C4.66319 4.30082 4.95319 4.21285 5.24985 4.21285C5.64767 4.21285 6.02919 4.37089 6.31048 4.65219C6.59178 4.93349 6.74981 5.31502 6.74981 5.71284Z"
                            fill="#EF9E52"
                          />
                        </svg>

                        {t("have_promo")}
                      </span>
                      {openCoupon && (
                        <div className="w-full">
                          <button
                            type="button"
                            className="hover:text-gray-500 absolute top-2 rounded-full border border-black text-black ltr:right-0 rtl:left-0"
                            onClick={() => setOpenCoupon(false)}
                            data-testid="close_coupon-button"
                          >
                            <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <CouponForm />
                        </div>
                      )}
                    </div>
                  )}
                  {parseFloat(walletDiscount) > 0 && user_id ? (
                    <div className="border-black-300 mb-3 flex justify-between border-b pb-3">
                      <span className="text-base font-semibold text-red-400">
                        {t("wallet_discount")}
                      </span>
                      <span className="font-semibold text-red-400">
                        -
                        <FormatCurrency
                          value={walletDiscountValue}
                          valueUAE={walletDiscountValue}
                          bg={false}
                          style="no-style"
                        />
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center justify-between whitespace-nowrap">
                    <span className="text-base font-semibold text-gray-50">
                      {t("total")}
                    </span>
                    <span className="text-2xl font-bold text-black lg:text-[32px]">
                      <FormatCurrency
                        value={updatedTotalAmount}
                        bg={false}
                        style="no-style"
                      />
                    </span>
                  </div>
                </div>
                {/* {user_id && (
                  <div className="">
                    <PointGets
                      user_id={user_id}
                      currency={currency}
                      maxWalletDiscount={maxWalletDiscount}
                    />
                  </div>
                )} */}
                <div className="px-4 py-3 md:px-6">
                  <div className="py-4">
                    <Link prefetch={false}
                      href={`/checkout`}
                      data-testid="checkout-link"
                      className="pointer-events-auto block rounded-lg bg-primary-300 px-3 py-4 text-center text-xl text-white hover:bg-primary-400"
                    >
                      {t("order_now")}
                    </Link>
                  </div>
                </div>
                <Note
                  orderNoteValue={orderNoteValue}
                  setOrderNoteValue={setOrderNoteValue}
                  applyNote={applyNote}
                  // deleteNote={deleteNote}
                  toggleNote={toggleNote}
                  openNote={openNote}
                  NoteApplied={NoteApplied}
                  setNoteApplied={setNoteApplied}
                  orderNoteFromCookie={orderNoteFromCookie}
                  msg={msg}
                  setMsg={setMsg}
                />
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
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-auto flex min-h-[400px] flex-col items-center justify-center">
          <p className="text-lg text-slate-500">{t("empty_cart")}</p>
          <Link prefetch={false}
            href={`/offers`}
            className="mt-5 inline-flex justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold capitalize text-white hover:bg-slate-700"
          >
            {t("continue_shopping")}{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
