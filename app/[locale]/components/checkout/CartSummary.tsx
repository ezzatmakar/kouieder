"use client";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { Link } from "@/navigation";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSharedState } from "@/app/SharedStateContext";
import { checkFreeShipping, checkStockForBranch } from "@/app/api/general";
import { BORDER_BTN, BORDER_ClASSES } from "@/app/commonUIClasses";
import FormatCurrency from "../FormatCurrency";
import CouponForm from "../cart/CouponForm";
import MiniCartItem from "../cart/MiniCartItem";
import PointGets from "../cart/PointGets";

const CartSummary = ({ thanks, rate = 0, orderData, note }: any) => {
  const locale = useLocale();
  const t = useTranslations("common");
  let {
    cartItems,
    totalAPI,
    totalDiscountAPI,
    totalPrice,
    totalPriceUAE,
    decreaseCartQuantity,
    addToCart,
    removeFromCart,
  } = useShoppingCart();

  const {
    setSelectedGovId,
    selectedGovIdPROV,
    selectedAreaIdPROV,
    setSelectedAreaId,
    selectedBranchIdPROV,
    selectedAreaRatePROV,
    walletDiscount,
    couponCode,
    couponDiscount,
    setCouponDiscount,
    setCouponCode,
    couponFreeShipping,
    setCouponFreeShipping,
  } = useSharedState();
  let [opencart, setOpencart] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [allowFreeShipping, setAllowFreeShipping] = useState(false);
  const [orderLimit, setOrderLimit] = useState(0);
  const [shippingFees, setShippingFees] = useState(
    parseFloat(selectedAreaRatePROV)
  );

  let checkoutTotal = totalPrice;

  const user_id = Cookies.get("user_id");
  const currency = Cookies.get("currency");

  const orderNoteFromCookie = Cookies.get("order_note");
  const selectedAreaRateFromCookie = useState(
    Cookies.get("selectedAreaRate")
  )[0];



  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await checkFreeShipping();
        if (response) {
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
    if ((allowFreeShipping && totalPrice >= orderLimit) || couponFreeShipping) {
      setShippingFees(0);
    } else {
      setShippingFees(parseFloat(selectedAreaRatePROV || "0"));
    }
  }, [
    allowFreeShipping,
    totalPrice,
    orderLimit,
    selectedAreaRatePROV,
    couponFreeShipping,
  ]);
  let totalSubTotal = thanks
    ? parseFloat(orderData?.order?.subtotal.toString())
    : parseFloat(checkoutTotal.toString());

  const isPercentageDiscount = couponDiscount && couponDiscount.includes("%");
  const percentage = isPercentageDiscount
    ? parseFloat(couponDiscount) / 100
    : 0;

  let discountAmount = isPercentageDiscount
    ? totalSubTotal * percentage
    : parseFloat(couponDiscount) || 0;

  let totalAmount = !user_id
    ? totalSubTotal + shippingFees - discountAmount
    : checkoutTotal + shippingFees - discountAmount;
  let maxWalletDiscount = totalAmount;

  let walletDiscountValue = !user_id ? 0 : parseFloat(walletDiscount);
  walletDiscountValue = Math.min(walletDiscountValue, maxWalletDiscount);
  let updatedTotalAmount = !user_id
    ? totalAmount
    : totalAmount - (isNaN(walletDiscountValue) ? 0 : walletDiscountValue);

  useEffect(() => {
    if (thanks) {
      totalSubTotal = parseFloat(orderData?.order?.subtotal);
      totalAmount = parseFloat(orderData?.order?.total);
      updatedTotalAmount = parseFloat(orderData?.order?.total);
      setShippingFees(parseFloat(orderData?.order?.shipping_fees));
      discountAmount = parseFloat(orderData?.order?.discount);
      cartItems = orderData?.order?.items ? orderData?.order?.items : [];
    }
  }, [thanks, orderData]);

  useEffect(() => {
    const checkCartStock = async () => {
      try {
        const areaId = selectedAreaIdPROV;
        const branchId = selectedBranchIdPROV;
        const items = cartItems.map((item: any) =>
          item.id ? item.id.toString() : ""
        );
        const stockDataResults = await checkStockForBranch(
          areaId,
          branchId,
          items
        );
        setStockData(stockDataResults);
      } catch (error) {
        console.error("Error checking stock for cart items:", error);
      }
    };

    checkCartStock();
  }, [selectedBranchIdPROV]);
  function toggleCart() {
    setOpencart(!opencart);
  }
  const handleCouponRemoval = async () => {
    setCouponDiscount("0");
    setCouponCode("");
    setCouponFreeShipping(false);
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`w-full ${thanks ? "md:w-[500px]" : "md:w-[470px] max-w-full"
        }`}
    >
      {isClient && (
        <div
          className={`${thanks ? "md:min-w-[500px]" : "md-w-[470px] max-w-full"
            } w-full`}
        >
          <div
            className={`overflow-hidden !md:shadow-none ${thanks
              ? "rounded-3xl md:py-0 py-4 pb-2"
              : "pb-4 md:rounded-[24px] rounded-xl border-2 border-primary-300 md:py-0 py-4"
              }`}
            style={{ boxShadow: "0px 20px 66px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="hidden border-b border-gray-100 px-4 py-4 md:flex md:px-6 md:py-6">
              <h2 className="flex w-full items-center justify-between font-bold capitalize md:text-2xl">
                <>
                  {thanks ? (
                    `${t("order_number")} #${thanks}`
                  ) : (
                    <div className="flex items-center gap-x-3 text-primary-300">
                      <svg
                        width="27"
                        height="31"
                        viewBox="0 0 27 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.6999 0.263672C9.50254 0.263672 6.0999 3.66631 6.0999 7.86367V9.76367H4.19991C3.23177 9.76367 2.41845 10.4916 2.31153 11.4539L0.411532 28.5539C0.351851 29.091 0.523736 29.6281 0.884168 30.0308C1.2446 30.4335 1.75947 30.6637 2.29991 30.6637H25.0999C25.6404 30.6637 26.1552 30.4335 26.5157 30.0308C26.8761 29.6281 27.048 29.091 26.9883 28.5539L25.0883 11.4539C24.9814 10.4916 24.1681 9.76367 23.1999 9.76367H21.2999V7.86367C21.2999 3.66631 17.8973 0.263672 13.6999 0.263672ZM17.4999 9.76367V7.86367C17.4999 5.76499 15.7986 4.06367 13.6999 4.06367C11.6012 4.06367 9.8999 5.76499 9.8999 7.86367V9.76367H17.4999ZM6.0999 15.4637C6.0999 14.4143 6.95056 13.5637 7.9999 13.5637C9.04924 13.5637 9.8999 14.4143 9.8999 15.4637C9.8999 16.513 9.04924 17.3637 7.9999 17.3637C6.95056 17.3637 6.0999 16.513 6.0999 15.4637ZM19.3999 13.5637C18.3506 13.5637 17.4999 14.4143 17.4999 15.4637C17.4999 16.513 18.3506 17.3637 19.3999 17.3637C20.4492 17.3637 21.2999 16.513 21.2999 15.4637C21.2999 14.4143 20.4492 13.5637 19.3999 13.5637Z"
                          fill="#5066A2"
                        />
                      </svg>
                      {t("cart_summary")}
                    </div>
                  )}
                </>
                {thanks ? (
                  ""
                ) : (
                  <Link
                    prefetch={false}
                    href={`/cart`}
                    className={`${BORDER_ClASSES} ${BORDER_BTN} bg-primary-100 text-primary-300 border-transparent hover:bg-primary-300 border-primary-300`}
                  >
                    {t("edit")}
                  </Link>
                )}
              </h2>
            </div>

            <h2
              className={`flex md:hidden  text-base font-bold capitalize justify-between items-center md:px-10 px-4 md:pb-6  ${opencart || thanks ? "border-b border-grayy-100  pb-4" : ""
                }`}
              onClick={toggleCart}
            >
              <>
                {thanks ? `${t("order_number")} #${thanks}` : t("cart_summary")}
              </>
              {thanks ? (
                ""
              ) : opencart ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6425 5.92897C10.578 5.8613 10.5004 5.80743 10.4145 5.77063C10.3285 5.73382 10.236 5.71484 10.1425 5.71484C10.049 5.71484 9.95648 5.73382 9.87054 5.77063C9.78459 5.80743 9.70702 5.8613 9.6425 5.92897L2.5 13.0715L3.5 14.0715L10.1425 7.42897L16.7858 14.0715L17.7858 13.0715L10.6425 5.92897Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6425 13.8581C10.578 13.9258 10.5004 13.9797 10.4145 14.0165C10.3285 14.0533 10.236 14.0723 10.1425 14.0723C10.049 14.0723 9.95648 14.0533 9.87054 14.0165C9.78459 13.9797 9.70702 13.9258 9.6425 13.8581L2.5 6.71564L3.5 5.71564L10.1425 12.3581L16.7858 5.71564L17.7858 6.71564L10.6425 13.8581Z"
                    fill="black"
                  />
                </svg>
              )}
            </h2>
            <div
              className={` md:block ${opencart || thanks ? "block" : "hidden"
                } `}
            >
              <div className="border-b border-gray-100 px-4 md:px-6">
                <ul
                  role="list"
                  className="no-scrollbar scrollbox max-h-[330px] divide-y divide-gray-100 overflow-auto"
                >
                  {!thanks && cartItems.map((item, index) => (
                    <li key={index} className="py-3">
                      <MiniCartItem
                        id={item.id}
                        price={
                          thanks
                            ? parseFloat(item.subtotal)
                            : parseFloat(item.price)
                        }
                        quantity={item.quantity}
                        slug={item.slug}
                        thumbnail={item.thumbnail}
                        decreaseCartQuantity={decreaseCartQuantity}
                        addToCart={addToCart}
                        name={item.name}
                        ar_name={item.ar_name}
                        stockData={stockData}
                        checkout
                      />
                    </li>
                  ))}
                  {thanks && orderData?.order?.items.map((item: any, index: number) => (
                    <li key={index} className="py-6">
                      <MiniCartItem
                        id={item.id}
                        price={
                          thanks
                            ? parseFloat(item.subtotal)
                            : parseFloat(item.price)
                        }
                        quantity={item.quantity}
                        slug={item.slug}
                        thumbnail={item.thumbnail}
                        decreaseCartQuantity={decreaseCartQuantity}
                        addToCart={addToCart}
                        name={item.name}
                        ar_name={item.ar_name}
                        thanks={true}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {thanks
                ? ""
                : user_id && (
                  <div className="PointGets-parent">
                    <PointGets
                      user_id={user_id}
                      currency={currency}
                      maxWalletDiscount={maxWalletDiscount}
                    />
                  </div>
                )}
              {!thanks && couponCode ? (
                <div className="flex justify-between px-4 pt-2 md:px-6">
                  <span className="font-semibold text-red-400">
                    {t("discount")}
                  </span>
                  <span className="text-red-400">
                    <span
                      className="cursor-pointer px-1 text-[10px] font-light text-black hover:underline"
                      onClick={handleCouponRemoval}
                    >
                      [{t("remove")}]
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
              ) : thanks ? (
                ""
              ) : (
                <div className="flex flex-wrap justify-between px-4 py-3 ">
                  <span
                    className="flex cursor-pointer gap-x-3 font-semibold text-gray-50 underline"
                    onClick={() => setOpenCoupon(true)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.6971 1.90216C12.7598 0.964904 11.2402 0.964904 10.3029 1.90216L9.66066 2.54444C8.98553 3.21957 8.06986 3.59886 7.11508 3.59886H6C4.67451 3.59886 3.6 4.67337 3.6 5.99886V7.11394C3.6 8.06872 3.22071 8.98439 2.54558 9.65952L1.90294 10.3022C0.965682 11.2394 0.965683 12.759 1.90294 13.6963L2.54558 14.3389C3.22071 15.014 3.6 15.9297 3.6 16.8845V17.9989C3.6 19.3243 4.67451 20.3989 6 20.3989H7.11435C8.06913 20.3989 8.98481 20.7781 9.65994 21.4533L10.3029 22.0963C11.2402 23.0335 12.7598 23.0335 13.6971 22.0963L14.3401 21.4533C15.0152 20.7781 15.9309 20.3989 16.8856 20.3989H18C19.3255 20.3989 20.4 19.3243 20.4 17.9989V16.8845C20.4 15.9297 20.7793 15.014 21.4544 14.3389L22.097 13.6963C23.0343 12.759 23.0343 11.2394 22.097 10.3022L21.4544 9.65952C20.7793 8.98439 20.4 8.06872 20.4 7.11394V5.99886C20.4 4.67337 19.3255 3.59886 18 3.59886H16.8849C15.9301 3.59886 15.0145 3.21957 14.3393 2.54444L13.6971 1.90216ZM15.3985 9.06486C15.7661 8.51342 15.6171 7.76838 15.0656 7.40076C14.5142 7.03313 13.7692 7.18214 13.4015 7.73358L8.60154 14.9336C8.23391 15.485 8.38292 16.2301 8.93436 16.5977C9.48579 16.9653 10.2308 16.8163 10.5985 16.2649L15.3985 9.06486ZM7.8 10.7992C8.79411 10.7992 9.6 9.99333 9.6 8.99922C9.6 8.00511 8.79411 7.19922 7.8 7.19922C6.80588 7.19922 6 8.00511 6 8.99922C6 9.99333 6.80588 10.7992 7.8 10.7992ZM18 14.9992C18 15.9933 17.1941 16.7992 16.2 16.7992C15.2059 16.7992 14.4 15.9933 14.4 14.9992C14.4 14.0051 15.2059 13.1992 16.2 13.1992C17.1941 13.1992 18 14.0051 18 14.9992Z"
                        fill="black"
                      />
                    </svg>
                    {t("have_promo")}
                  </span>
                  {openCoupon && (
                    <div className="relative w-full">
                      <button
                        type="button"
                        className="hover:text-gray-500 absolute bottom-full mb-2 rounded-full border border-black text-black ltr:right-5 rtl:left-2"
                        onClick={() => setOpenCoupon(false)}
                      >
                        <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <CouponForm />
                    </div>
                  )}
                </div>
              )}
              {orderNoteFromCookie && (
                <dl className="space-y-2 mx-4 py-6 md:space-y-6 border-b">
                  <dt className="text-base font-semibold text-gray-50">
                    {t("order_note")}
                  </dt>
                  <dd className="text-base font-semibold text-black !m-0">
                    {orderNoteFromCookie}
                  </dd>
                </dl>
              )}
              {orderData?.order?.notes && (
                <dl className="space-y-2 mx-4 py-6 md:space-y-6 border-b">
                  <dt className="text-base font-semibold text-gray-50">
                    {t("order_note")}
                  </dt>
                  <dd className="text-base font-semibold text-black !m-0">
                    {orderData?.order?.notes}
                  </dd>
                </dl>
              )}

              <dl className="space-y-2 px-4 py-6  md:space-y-6">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-semibold text-gray-50">
                    {t("subtotal")}
                  </dt>
                  <dd className="text-base font-bold text-black">
                    {!isNaN(totalSubTotal) && (
                      <FormatCurrency
                        value={totalSubTotal}
                        bg={false}
                        style="no-style"
                      />
                    )}
                  </dd>
                </div>

                {thanks && discountAmount != 0 ? (
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-semibold text-red-400">
                      {t("discount")}
                    </dt>
                    <dd className="text-base font-bold text-red-400">
                      -{" "}
                      {!isNaN(discountAmount) && (
                        <FormatCurrency
                          value={discountAmount}
                          valueUAE={discountAmount}
                          bg={false}
                          style="no-style"
                        />
                      )}
                    </dd>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-base font-semibold text-gray-50">
                    {t("shipping_subtotal")}
                  </dt>
                  <dd className="text-base font-bold text-black">
                    {!isNaN(shippingFees) &&
                      (shippingFees !== 0 ? (
                        <FormatCurrency
                          value={shippingFees}
                          valueUAE={shippingFees}
                          bg={false}
                          style="no-style"
                        />
                      ) : (
                        t("free_shipping")
                      ))}
                  </dd>
                </div>
                {parseFloat(walletDiscount) > 0 && !thanks && user_id ? (
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-semibold text-gray-50">
                      {t("wallet_discount")}
                    </dt>
                    <dd className="text-base font-bold text-red-400">
                      -{" "}
                      {parseFloat(walletDiscount) !== 0 ? (
                        <FormatCurrency
                          value={walletDiscountValue}
                          valueUAE={walletDiscountValue}
                          bg={false}
                          style="no-style"
                        />
                      ) : (
                        t("free_shipping")
                      )}
                    </dd>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-semibold text-gray-50">
                    {t("total")}
                  </dt>
                  <dd className="text-xl font-bold text-black md:text-3xl">
                    {!isNaN(updatedTotalAmount) && (
                      <FormatCurrency
                        value={updatedTotalAmount}
                        bg={false}
                        style="no-style"
                      />
                    )}
                  </dd>
                </div>
              </dl>
              {thanks ? (
                ""
              ) : (
                <div className="flex border-t border-gray-200 p-4 pb-0 text-center md:hidden">
                  <Link
                    prefetch={false}
                    href={`/cart`}
                    className={`${BORDER_ClASSES} ${BORDER_BTN}`}
                  >
                    {t("edit")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
