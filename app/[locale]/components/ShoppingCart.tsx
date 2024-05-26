"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import MiniCartTools from './cart/MiniCartTools';
// import FormatCurrency from '~/utils/FormatCurrency';
// import MiniCartItemLoader from './cart/MiniCartItemLoader';
import useShoppingCart from "@/app/stores/useShoppingCart";
import MiniCartItem from "./cart/MiniCartItem";
import MiniCartTools from "./cart/MiniCartTools";
import MiniCartUpSell from "./cart/MiniCartUpSell";
import FormatCurrency from "./FormatCurrency";
import { Link } from "@/navigation";
import Cookies from "js-cookie";
import { useSharedState } from "@/app/SharedStateContext";
import { checkFreeShipping, checkStockForBranch } from "@/app/api/general";
export default function ShoppingCart({
  isOpen: initialOpenState,
  children,
  close,
  width,
}: any) {
  // const ShoppingCart = ({isOpen, close}:any) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const locale = useLocale();
  const t = useTranslations("common");
  const {
    cartItems,
    removeFromCart,
    decreaseCartQuantity,
    addToCart,
    totalPrice,
    totalPriceUAE,
  } = useShoppingCart();

  const {
    selectedAreaRatePROV,
    setSelectedAreaRate,
    selectedBranchIdPROV,
    selectedAreaIdPROV,
    couponFreeShipping
  } = useSharedState();
  const [allowFreeShipping, setAllowFreeShipping] = useState(false);
  const [orderLimit, setOrderLimit] = useState(0);
  const [shippingFees, setShippingFees] = useState(
    parseFloat(selectedAreaRatePROV || "0")
  );

  function closeModal() {
    // console.log('closing')
    setIsOpen(false);
    setTimeout(() => {
      close();
    }, 100);
  }

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
    } else {
      setShippingFees(parseFloat(selectedAreaRatePROV || "0"));
    }
  }, [allowFreeShipping, totalPrice, orderLimit, selectedAreaRatePROV,couponFreeShipping]);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  const selectedAreaRateFromCookie = useState(
    Cookies.get("selectedAreaRate")
  )[0];
  useEffect(() => {
    const checkCartStock = async () => {
      try {
        const areaId = selectedAreaIdPROV;
        const branchId = selectedBranchIdPROV;
        // const items = cartItems.map((item: any) => item.id.toString());
        const items = cartItems.map((item: any) => item.id ? item.id.toString() : "");

        // Check stock for the items in the cart
        const stockData = await checkStockForBranch(areaId, branchId, items);

        // Process stock data (e.g., update item availability status)
        // console.log("Stock data:", stockData);
      } catch (error) {
        console.error("Error checking stock for cart items:", error);
      }
    };

    // Call the function when the component mounts or when cart items change
    checkCartStock();
  }, [cartItems,selectedBranchIdPROV]);
  // console.log("shippingFees", shippingFees);
  // console.log("allowFreeShipping", allowFreeShipping);
  // console.log("totalPrice", totalPrice);
  // console.log("selectedBranchIdPROV", selectedBranchIdPROV);
  return (
    <div>
      {/* {open && ( */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as="button"
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-90"
              onClick={closeModal}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 flex ltr:left-0 rtl:right-0 md:max-w-[600px]">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-out duration-500 sm:duration-700"
                  enterFrom={`rtl:translate-x-full ltr:-translate-x-full`}
                  enterTo="translate-x-0"
                  leave="transform transition ease-in duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo={`rtl:-translate-x-full ltr:translate-x-full`}
                >
                  <Dialog.Panel className="pointer-events-auto h-full w-screen max-w-[600px] transform transition-all">
                    <div className="z-10 hidden items-center p-4 ltr:left-2 rtl:left-2 md:absolute md:flex md:ltr:left-full md:rtl:right-full">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 block p-2 font-light text-primary-300 outline-none transition-all md:text-white"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="no-scrollbar relative flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-5">
                        {cartItems.length > 0 ? (
                          <div className="flex items-start justify-between border-b border-[#C6C6C6] px-5 pb-5">
                            <Dialog.Title className="flex items-center gap-x-3 text-3xl font-bold text-primary-300">
                              <svg
                                width="27"
                                height="32"
                                viewBox="0 0 27 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.6999 0.800781C9.50254 0.800781 6.0999 4.20342 6.0999 8.40078V10.3008H4.19991C3.23177 10.3008 2.41845 11.0287 2.31153 11.991L0.411532 29.091C0.351851 29.6281 0.523736 30.1652 0.884168 30.5679C1.2446 30.9706 1.75947 31.2008 2.29991 31.2008H25.0999C25.6404 31.2008 26.1552 30.9706 26.5157 30.5679C26.8761 30.1652 27.048 29.6281 26.9883 29.091L25.0883 11.991C24.9814 11.0287 24.1681 10.3008 23.1999 10.3008H21.2999V8.40078C21.2999 4.20342 17.8973 0.800781 13.6999 0.800781ZM17.4999 10.3008V8.40078C17.4999 6.3021 15.7986 4.60078 13.6999 4.60078C11.6012 4.60078 9.8999 6.3021 9.8999 8.40078V10.3008H17.4999ZM6.0999 16.0008C6.0999 14.9514 6.95056 14.1008 7.9999 14.1008C9.04924 14.1008 9.8999 14.9514 9.8999 16.0008C9.8999 17.0501 9.04924 17.9008 7.9999 17.9008C6.95056 17.9008 6.0999 17.0501 6.0999 16.0008ZM19.3999 14.1008C18.3506 14.1008 17.4999 14.9514 17.4999 16.0008C17.4999 17.0501 18.3506 17.9008 19.3999 17.9008C20.4492 17.9008 21.2999 17.0501 21.2999 16.0008C21.2999 14.9514 20.4492 14.1008 19.3999 14.1008Z"
                                  fill="#5066A2"
                                />
                              </svg>

                              {t("cart")}
                            </Dialog.Title>
                            <div className="flex items-center md:hidden">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 block p-2 font-light text-primary-300 outline-none transition-all md:text-white"
                                onClick={closeModal}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-8 w-8"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        ):
                        <div className="absolute right-1 top-1 flex items-center md:hidden">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 block p-2 font-light text-primary-300 outline-none transition-all md:text-white"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                          </button>
                        </div>}

                        {cartItems && cartItems.length > 0 ? (
                          <div className="my-8 px-4 md:px-10">
                            <div className="flow-root">
                              <ul role="list" className="-my-6">
                                {cartItems.map((item: any, index: any) => (
                                  <li
                                    key={index}
                                    className="border-b border-gray-200 py-6"
                                  >
                                    <MiniCartItem
                                      id={item.id}
                                      price={item.price}
                                      quantity={item.quantity}
                                      slug={item.slug}
                                      thumbnail={item.thumbnail}
                                      name={item.name}
                                      ar_name={item.ar_name}
                                      // @ts-ignore
                                      removeFromCart={removeFromCart}
                                      decreaseCartQuantity={
                                        decreaseCartQuantity
                                      }
                                      addToCart={addToCart}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-auto flex h-[90%] items-center justify-center">
                            <p className="text mt-0.5 text-slate-500">
                              {t("empty_cart")}
                            </p>
                          </div>
                        )}
                        {cartItems.length > 0 ? (
                          <>
                            <MiniCartUpSell />
                            <MiniCartTools />
                          </>
                        ):""}
                      </div>
                      {cartItems.length > 0 && (
                        <div className="top-shadow border-t border-gray-200">
                          <div className="space-y-3 border-b border-gray-200 px-5 py-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className="text-xs font-semibold text-gray-50 md:text-base">
                                {t("shipping_subtotal")}
                              </p>
                              <div className="text-base font-bold text-black">
                                {shippingFees !== 0 ? (
                                  <FormatCurrency
                                    value={shippingFees}
                                    valueUAE={shippingFees}
                                    bg={false}
                                    style="no-style"
                                  />
                                ) : (
                                  t("free_shipping")
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className="text-xs font-semibold text-gray-50 md:text-base">
                                {t("total")}
                              </p>
                              <div className="text-base font-bold text-black">
                                <FormatCurrency
                                  value={totalPrice + shippingFees}
                                  valueUAE={totalPriceUAE + shippingFees}
                                  bg={false}
                                  style="no-style"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row gap-4 px-4 py-5 text-center">
                            <Link prefetch={false}
                              href="/checkout"
                              // href="/"
                              data-testid="open_checkout-link"
                              onClick={closeModal}
                              className="flex w-1/2 items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-primary-300 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-400 md:text-xl"
                            >
                              {t("continue_shopping")}
                            </Link>
                            <Link prefetch={false}
                              href="/cart"
                              // href="/"
                              data-testid="open_cart-link"
                              onClick={closeModal}
                              className="flex w-1/2 items-center justify-center whitespace-nowrap rounded-lg border-2 border-primary-300 bg-transparent px-6 py-3 text-base font-semibold text-primary-300 shadow-sm hover:bg-primary-300 hover:text-white md:text-xl"
                            >
                              {t("view_cart")}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* )
      } */}
    </div>
  );
}
