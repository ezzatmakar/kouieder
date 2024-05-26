"use client";
import { useEffect, useState } from "react";
import RoundedCheck from "../icons/RoundedCheck";
import { useTranslations } from "next-intl";
import { getOrderInfo } from "@/app/api/general";
import TrackingSteps from "../TrackingSteps";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import CartSummary from "./CartSummary";
import ExtraProducts from "../ExtraProducts";
import { useSearchParams } from "next/navigation";
import DateDisplay from "../DateDisplay";

type OrderStatus =
  | "processing"
  | "fulfilled"
  | "readyship"
  | "delivered"
  | "pending"
  | "on-hold"
  | "completed"
  | "cancelled"
  | "refunded"
  | "failed"
  | "checkout-draft";

export default function ThanksComponent() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID");
  const [orderData, setOrderData] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      const result = await getOrderInfo(orderID);
      setOrderData(result);
    };
    fetchData();
  }, [orderID]);

  const status: OrderStatus = orderData?.order?.status || "pending";
  const statusToStepMap: Record<
    OrderStatus,
    { step: number; message: string }
  > = {
    pending: { step: 1, message: "common.order_steps.pending" },
    processing: { step: 2, message: "common.order_steps.processing" },
    fulfilled: { step: 3, message: "common.order_steps.fulfilled" },
    readyship: { step: 3, message: "common.order_steps.fulfilled" },
    delivered: { step: 4, message: "common.order_steps.delivered" },
    "on-hold": { step: 1, message: "common.order_steps.on-hold" },
    completed: { step: 4, message: "common.order_steps.completed" },
    cancelled: { step: -1, message: "common.order_steps.cancelled" },
    refunded: { step: 5, message: "common.order_steps.refunded" },
    failed: { step: 6, message: "common.order_steps.failed" },
    "checkout-draft": { step: 7, message: "common.order_steps.checkout-draft" },
  };
  const { step, message } = statusToStepMap[status] || { step: 0, message: "" };

  function addDays(date: any, days: any) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
  const first_name = orderData?.billing?.first_name;
  const last_name = orderData?.billing?.last_name;
  const receiver_name = orderData?.billing?.receiver_name;
  const receiver_phone = orderData?.billing?.receiver_phone;
  const email = orderData?.billing?.email;
  const phone = orderData?.billing?.phone;
  const created_at = orderData?.billing?.created_at;
  const expected_delivery_date =
    orderData?.order?.delivery_date || addDays(created_at, 0);
  const payment_method = orderData?.order?.payment_method;
  const address = orderData?.billing?.address1;
  const gov = orderData?.billing?.gov_name;
  const area = orderData?.billing?.area_name;
  const neighborhood = orderData?.billing?.neighborhood;
  const apartment_type = orderData?.billing?.apartment_type;
  const floor = orderData?.billing?.floor_no;
  const apartment = orderData?.billing?.apartment_no;
  const building_no = orderData?.billing?.building_no;
  const branch = orderData?.order?.branch;
  const branchName = orderData?.order?.branch_name;
  // console.log('orderData',orderData)
  return (
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-5">
          <div className="flex flex-col items-center justify-center">
            <div className="hidden md:block">
              <RoundedCheck />
            </div>
            <div className="pt-4 text-center">
              <h1 className="mb-2 text-2xl font-bold uppercase tracking-wide text-black md:text-4xl">
                {t("fields.thank_you")}
              </h1>
              <h3 className="text-sm font-semibold tracking-wide text-black md:text-base">
                {t(message)}
              </h3>
              <p className="max-w-[500px] text-sm font-semibold text-gray-50 md:mt-2 md:text-base">
                {t("fields.thanks_para")}
              </p>
            </div>
          </div>
        </div>
        <div className="my-10">
          <TrackingSteps step={step} />
        </div>
        <div className="mb-4 flex flex-col-reverse items-start gap-5 md:mb-0 md:flex-row">
          <div className="mx-auto w-full">
            <div className="rounded-xl bg-primary-102 md:rounded-[32px] md:bg-primary-103">
              <div className="px-4 py-4 md:px-12 md:py-6">
                <h2 className="border-b border-gray-200 pb-4 text-2xl font-bold md:pt-10">
                  {t("fields.shipping_information")}
                </h2>
                <dl className="py-5 text-sm">
                  {receiver_name || receiver_phone ? (
                    <dd className="mt-2 text-black">
                      <div className="mb-2 inline-block w-1/2">
                        <label className="text-sm text-gray-50">
                          {t("fields.recipient_name")}
                        </label>
                        <span className="block text-base font-bold">
                          {receiver_name}
                        </span>
                      </div>
                      <div className="mb-2 inline-block w-1/2">
                        <label className="text-sm text-gray-50">
                          {t("fields.recipient_mobile")}
                        </label>
                        <span className="block text-base font-bold">
                          {receiver_phone}
                        </span>
                      </div>
                    </dd>
                  ) : (
                    ""
                  )}
                  <dd className="mt-2 text-black">
                    <div className="mb-2 inline-block w-1/2">
                      <label className="text-sm text-gray-50">
                        {t("fields.first_name")}
                      </label>
                      <span className="block text-base font-bold">
                        {first_name}
                      </span>
                    </div>
                    <div className="mb-2 inline-block w-1/2">
                      <label className="text-sm text-gray-50">
                        {t("fields.last_name")}
                      </label>
                      <span className="block text-base font-bold">
                        {last_name}
                      </span>
                    </div>
                    <div className="mb-2 inline-block w-full">
                      <label className="text-sm text-gray-50">
                        {t("fields.email_address")}
                      </label>
                      <span className="block text-base font-bold">{email}</span>
                    </div>
                    <div className="mb-2 inline-block w-full">
                      <label className="text-sm text-gray-50">
                        {t("fields.phone_number")}
                      </label>
                      <span className="block text-base font-bold">{phone}</span>
                    </div>
                  </dd>
                </dl>
                {/* <h2 className="border-b border-gray-200 pb-4 pt-10 text-2xl font-bold">{t('fields.payment_method')}</h2>
                                <dl className="py-5 text-sm">
                                    <dd className="mt-2 text-black">
                                        <div className="mb-2 inline-block w-1/2">
                                            <span className="block text-base font-bold">{payment_method}</span>
                                        </div>
                                    </dd>
                                </dl> */}
                <h2 className="border-b border-gray-200 pb-4 pt-4 text-2xl font-bold md:pt-10">
                  {t("fields.shipping_details")}
                </h2>
                <dl className="py-5 text-sm">
                  <dd className="black mt-2 space-y-2">
                    <div className="mb-2 block w-1/2">
                      <label className="text-sm text-gray-50">
                        {t("fields.expected_delivery_date")}
                      </label>
                      <span className="block text-base font-bold">
                        <DateDisplay created_time={expected_delivery_date} />
                      </span>
                    </div>
                    {branch === "Branch" && (
                      <div className="mb-2 inline-block w-1/3">
                        <label className="text-sm text-gray-50">
                          {t("fields.branch")}
                        </label>
                        <span className="block text-base font-bold">
                          {branchName}
                        </span>
                      </div>
                    )}
                    {gov && (
                      <div className="mb-2 inline-block w-1/3">
                        <label className="text-sm text-gray-50">
                          {t("fields.city")}
                        </label>
                        <span className="block text-base font-bold">{gov}</span>
                      </div>
                    )}
                    {area && (
                      <div className="mb-2 inline-block w-1/3">
                        <label className="text-sm text-gray-50">
                          {t("fields.area")}
                        </label>
                        <span className="block text-base font-bold">
                          {area ? area : "MISSING"}
                        </span>
                      </div>
                    )}
                    {address && (
                      <div className="mb-2 inline-block w-1/2">
                        <label className="text-sm text-gray-50">
                          {t("fields.street_name")}
                        </label>
                        <span className="block text-base font-bold">
                          {address ? address : "MISSING"}
                        </span>
                      </div>
                    )}
                    {apartment_type && (
                      <div className="mb-2 inline-block w-1/2">
                        <label className="text-sm text-gray-50">
                          {t("fields.apartment_type")}
                        </label>
                        <span className="block text-base font-bold">
                          {apartment_type
                            ? t(`fields.${apartment_type}`)
                            : "MISSING"}
                        </span>
                      </div>
                    )}
                    {apartment_type === "flat" ? (
                      <>
                        {building_no && (
                          <div className="mb-2 inline-block w-1/3">
                            <label className="text-sm text-gray-50">
                              {t("fields.building_number")}
                            </label>
                            <span className="block text-base font-bold">
                              {building_no ? building_no : "MISSING"}
                            </span>
                          </div>
                        )}

                        <div className="mb-2 inline-block w-1/3">
                          <label className="text-sm text-gray-50">
                            {t("fields.floor")}
                          </label>
                          <span className="block text-base font-bold">
                            {floor ? floor : "MISSING"}
                          </span>
                        </div>

                        <div className="mb-2 inline-block w-1/3">
                          <label className="text-sm text-gray-50">
                            {t("fields.apartment")}
                          </label>
                          <span className="block text-base font-bold">
                            {apartment ? apartment : "MISSING"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        {building_no && (
                          <div className="mb-2 inline-block w-1/3">
                            <label className="text-sm text-gray-50">
                              {t("fields.building_number")}
                            </label>
                            <span className="block text-base font-bold">
                              {building_no ? building_no : "MISSING"}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </dd>
                </dl>
                <div className="border-t border-gray-200 pt-6">
                  <Link
                    prefetch={false}
                    href={`/my-account/orders/${orderID}`}
                    className="inline-block w-full cursor-pointer rounded-lg bg-primary-300 px-10 py-4 text-center text-base font-semibold text-white hover:bg-primary-400 md:w-fit"
                  >
                    {t("fields.order_details")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden bg-red-100">
              <div className="flex p-10">
                <div className="flex flex-col">
                  <h3 className="mb-1 text-2xl font-bold text-[#CA4323]">
                    Congratulations!
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-gray-800">
                    You’ve earned
                    <strong>5768 rewards points </strong>
                    for your purchase today, and these points will be credited
                    to your account immediately.
                  </p>
                </div>
                <div className="w-1/5">
                  <img src="/images/thanks_gift.png" alt="img alt" />
                </div>
              </div>
              <div className="border-t border-gray-300 p-10">
                <p className="text-gray-400 text-xs font-semibold">
                  Enter a password below to create a Nine Crimes account. Keep
                  track of orders, add products to your wishlist, and have
                  exclusive access to promotions all the time.
                </p>
                <form id="create_account" action="#" method="post">
                  <div className="form">
                    <input
                      id="account_password"
                      type="password"
                      name="password"
                      required
                    />
                    <button type="submit" className="button_form">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <CartSummary
            thanks={orderID}
            orderData={orderData}
            rate={orderData?.order?.shipping_fees}
          />
        </div>
        <div id="StopSticky">
          <ExtraProducts
            title="shop_more"
            categorySlug="best-sellers"
            count={20}
            arrangement="ASC"
          />
        </div>
      </div>
    </div>
  );
}
