"use client";
export const runtime = "edge";
import { Fragment, useEffect, useState } from "react";
// import Button from "~/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { getOrderInfo } from "@/app/api/general";
import Loader from "../../../components/Loader";
import Status from "../../../components/account/Status";
import TrackingSteps from "../../../components/TrackingSteps";
import FormatCurrency from "../../../components/FormatCurrency";
import Button from "../../../components/Button";
import Popup from "../../../components/Popup";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import Img from "@/app/[locale]/components/icons/Img";

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

const productMOC = {
  id: 1,
  name: "Cold Brew Bottle",
  description:
    "This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.",
  href: "#",
  quantity: 1,
  price: "$32.00",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg",
  imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
};

interface Product {
  type: string;
  name: string;
  quantity: number;
  subtotal: number;
  total: number;
  attr?: Array<{ name: string; value: string }>;
  thumbnail?: string;
  slug?: string;
}

// export default function Order() {
export default function Order({ params }: { params: { orderId: string } }) {
  const t = useTranslations();
  const locale = useLocale();
  const order_id = params.orderId;
  const router = useRouter();
  // const { orderId } = router;

  // console.log("orderId>>", params.orderId);
  // console.log("order_id>>", order_id);
  const [orderData, setOrderData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // @ts-ignore
        const orderDetails = await getOrderInfo(parseInt(order_id));
        // Update the orderDetails state with the fetched data
        setOrderData(orderDetails);
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the data fetching process
        console.error("Error fetching order details:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  let [isOpenCancel, setIsOpenCancel] = useState(false);
  let [isCancel, setIsCancel] = useState(false);
  let [isSelectReturn, setIsSelectReturn] = useState(false);
  let [isReturn, setIsReturn] = useState(false);

  function closeSelectReturn() {
    setIsSelectReturn(false);
  }
  function openSelectReturn() {
    setIsSelectReturn(true);
  }

  function closeReturn() {
    setIsReturn(false);
  }
  function openReturn() {
    setIsReturn(true);
  }

  function closeModalCancel() {
    setIsOpenCancel(false);
  }
  function openModalCancel() {
    setIsOpenCancel(true);
  }

  function closeConfirmCancel() {
    setIsCancel(false);
  }
  function openConfirmCancel() {
    setIsCancel(true);
  }

  if (isLoading) {
    return (
      <div className="relative min-h-[300px]">
        <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
          <Loader />
        </div>
      </div>
    );
  }
  // console.log("orderData>>", orderData);
  if (!orderData) {
    return <div>{t("order.order_error")}</div>;
  }

  // Check if 'billing' exists in 'orderData'
  if (!orderData.billing) {
    return <div>{t("order.billing_info_not_available")}</div>;
  }
  const { billing, order } = orderData;
  // Destructure billing properties
  const {
    first_name,
    last_name,
    email,
    phone,
    created_at,
    gov_name,
    gov_name_en,
    area_name,
    area_name_en,
    country,
    address1,
    floor_no,
    apartment_no,
  } = billing;

  // Destructure order properties
  const {
    status,
    items,
    subtotal,
    total,
    discount,
    payment_method,
    fees,
    shipping_fees,
  } = order;

  const statusToStepMap: Record<
    OrderStatus,
    { step: number; message: string }
  > = {
    pending: { step: 1, message: t("common.order_steps.pending") },
    processing: { step: 1, message: t("common.order_steps.processing") },
    fulfilled: { step: 2, message: t("common.order_steps.fulfilled") },
    readyship: { step: 3, message: "common.order_steps.fulfilled" },
    delivered: { step: 3, message: t("common.order_steps.delivered") },
    "on-hold": { step: 1, message: t("common.order_steps.onHold") },
    completed: { step: 4, message: t("common.order_steps.completed") },
    cancelled: { step: -1, message: t("common.order_steps.cancelled") },
    refunded: { step: 5, message: t("common.order_steps.refunded") },
    failed: { step: 6, message: t("common.order_steps.failed") },
    "checkout-draft": {
      step: 7,
      message: t("common.order_steps.checkoutDraft"),
    },
  };
  const { step, message } = statusToStepMap[status as OrderStatus] || {
    step: 0,
    message: "",
  };
  return (
    <div>
      <div className="flex flex-col py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-4xl font-bold uppercase">
          {t("common.order_number")} #{order_id}
        </h1>
        {/* <h3 className="mt-5 text-base font-semibold tracking-wide text-gray-900">{message}</h3> */}
      </div>
      <div className="py-5">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-50">
              {t("common.status_name")}:
            </span>
            <Status name={status} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-50">{t("common.date")}:</span>
            <strong className="font-bold text-black">{created_at}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-50">{t("common.items")}:</span>
            <strong className="font-bold text-black">{items.length}</strong>
          </div>
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-50">
              {t("common.points_earned")}:
            </span>
            <strong className="font-bold text-black">
              2000 {t("common.point")} (<FormatCurrency value={100} />)
            </strong>
          </div> */}
        </div>

        {/* proccess */}
        <div className="py-12">
          <TrackingSteps step={step} />
        </div>

        {/* Items */}
        <div className="items-list section">
          {items.map((product: Product, index: number) => (
            <div
              key={index}
              className="flex gap-6 p-8 bg-gray-200 border-b border-gray-200"
            >
              {product.thumbnail ? (
                <img className="w-24 h-24" src={product.thumbnail} alt={product.name} />
              ) : (
                <span className="flex items-center justify-center flex-none object-cover object-center w-20 h-20 rounded-lg sm:w-32 sm:h-32">
                  <Img />
                </span>
              )}
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col gap-2">
                  <h4 className="mb-4 font-medium text-black">
                    <Link prefetch={false} href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h4>
                  {product.attr && product.attr.length > 0 && (
                    <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                      {product.attr.map((attribute: any, attrIndex: number) => (
                        <div key={attrIndex} className="flex">
                          <dt className="font-medium text-gray-900 capitalize">
                            {attribute.name}
                          </dt>
                          <dd className="ml-2 text-gray-700">
                            {attribute.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="flex gap-2">
                    <dd className="text-black">
                      <FormatCurrency value={product.subtotal} />
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-900">
                      {t("common.qty")}:
                    </dt>
                    <dd className="text-black">{product.quantity}</dd>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <dl className="flex space-x-4 text-base divide-x divide-gray-200 sm:space-x-6">
                    <div className="flex">
                      <dd className="text-black">
                        <FormatCurrency value={product.total} />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="py-5">
          <h4 className="text-xl font-bold">{t("fields.shipping_details")}</h4>
          <dl className="py-5 text-sm">
            <dd className="flex flex-col gap-4 mt-2 text-black">
              <div className="flex gap-4">
                <div className="inline-block">
                  <label className="text-sm text-gray-50">
                    {t("fields.gov")}
                  </label>
                  <span className="block text-sm font-bold">
                    {locale === "ar" ? gov_name : gov_name_en}
                  </span>
                </div>
                {/* <div className="inline-block">
                    <label className="text-sm text-gray-50">
                      {t("fields.neighborhood")}
                    </label>
                    <span className="block text-sm font-bold">{area}</span>
                  </div> */}
                <div className="inline-block">
                  <label className="text-sm text-gray-50">
                    {t("fields.area")}
                  </label>
                  <span className="block text-sm font-bold">
                    {locale === "ar" ? area_name : area_name_en}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="inline-block">
                  <label className="text-sm text-gray-50">
                    {t("fields.street_name")}
                  </label>
                  <span className="block text-sm font-bold">{address1}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="inline-block">
                  <label className="text-sm text-gray-50">
                    {t("fields.floor")}
                  </label>
                  <span className="block text-sm font-bold">{floor_no}</span>
                </div>
                <div className="inline-block">
                  <label className="text-sm text-gray-50">
                    {t("fields.apartment")}
                  </label>
                  <span className="block text-sm font-bold">
                    {apartment_no}
                  </span>
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div className="py-5 border-t border-gray-200">
          <h4 className="text-xl font-bold text-black">
            {t("checkout.payment_method")}
          </h4>
          <dd className="mt-2 text-gray-700">
            <p>
              {payment_method === "Cash On Delivery"
                ? t("fields.cod")
                : payment_method}
            </p>
            {payment_method === "Credit/Debit Card" && (
              <p>
                <span aria-hidden="true">•••• </span>
                <span className="sr-only">Ending in </span>1545
              </p>
            )}
          </dd>
        </div>

        <h3 className="sr-only">{t("checkout.summary")}</h3>

        <dl className="pt-10 space-y-6 text-sm border-t border-gray-200">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-900">
              {t("common.subtotal")}
            </dt>
            <dd className="text-black">
              <FormatCurrency value={subtotal} />
            </dd>
          </div>
          {discount !== 0 && (
            <div className="flex justify-between">
              <dt className="flex font-medium text-gray-900">
                {t("common.discount")}
                {/* <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2">
                  STUDENT50
                </span> */}
              </dt>
              <dd className="text-black">
                - <FormatCurrency value={discount} />
              </dd>
            </div>
          )}
          {shipping_fees !== null && (
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">
                {t("common.shipping_subtotal")}
              </dt>
              <dd className="text-black">
                <FormatCurrency value={shipping_fees} />
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-lg font-medium text-gray-900 uppercase">
              {t("common.total")}
            </dt>
            <dd className="text-lg font-bold text-black">
              <FormatCurrency value={total} />
            </dd>
          </div>
        </dl>

        <div className="flex pt-5 mt-5 space-x-2 border-t border-gray-200">
          {/* <Button name={t("account.buy_again")} style="solid" />
            <Button
              name={t("account.return_product")}
              style="border"
              onClick={openSelectReturn}
            /> */}
          {/* <Button
              name={t("account.cancel_order")}
              style="border"
              onClick={openModalCancel}
            />
          </div> */}
        </div>
        {isOpenCancel ? (
          <Popup isOpen={true} close={closeModalCancel}>
            <h3 className="mb-5 text-xl font-medium leading-6 text-gray-900">
              Cancel Order #354896
            </h3>
            <div>
              <label
                htmlFor="way"
                className="block text-sm font-medium text-gray-700"
              >
                Choose why you want to cancel your order.
              </label>
              <select
                id="way"
                name="way"
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-200 sm:text-sm"
              >
                <option>Changed My Mind</option>
                <option>Other Reason</option>
              </select>
            </div>
            <div className="mt-5">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Write briefed cancelation reason (Optional)
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={3}
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder=""
              ></textarea>
            </div>
            <div className="mt-5">
              <Button
                name="Cancel Order"
                width="full"
                style="solid-red"
                onClick={() => {
                  closeModalCancel();
                  openConfirmCancel();
                }}
              />
            </div>
          </Popup>
        ) : (
          ""
        )}

        <Transition appear show={isCancel} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-30"
            onClose={closeConfirmCancel}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <button
                      onClick={closeConfirmCancel}
                      type="button"
                      className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 ltr:right-2 rtl:left-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                    <svg
                      width="29"
                      height="32"
                      viewBox="0 0 29 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-auto"
                    >
                      <path
                        d="M1 7.00024H4H28"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25 7V28C25 28.7957 24.6839 29.5587 24.1213 30.1213C23.5587 30.6839 22.7956 31 22 31H7C6.20435 31 5.44129 30.6839 4.87868 30.1213C4.31607 29.5587 4 28.7957 4 28V7M8.5 7V4C8.5 3.20435 8.81607 2.44129 9.37868 1.87868C9.94129 1.31607 10.7044 1 11.5 1H17.5C18.2956 1 19.0587 1.31607 19.6213 1.87868C20.1839 2.44129 20.5 3.20435 20.5 4V7"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.5 14.5V23.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 14.5V23.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">
                      Order Canceled
                    </h3>
                    <p className="text-center text-gray-400">
                      Order #354896 canceled successfully
                    </p>
                    <div className="mt-5 text-center">
                      <Button name="Back To Home" style="solid" href="/" />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isSelectReturn} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-30"
            onClose={closeSelectReturn}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <button
                      onClick={closeSelectReturn}
                      type="button"
                      className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 ltr:right-2 rtl:left-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">
                      Return Order #354896
                    </h3>
                    <div className="px-6 py-3 -mx-6 border-t border-b border-gray-200">
                      <p className="mb-4 text-gray-400">
                        Please select items you want to return
                      </p>
                      <div className="items-list section">
                        <label
                          key={productMOC.id}
                          className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none"
                        >
                          <input type="checkbox" name="select" id="select_1" />
                          <img
                            src={productMOC.imageSrc}
                            alt={productMOC.imageAlt}
                            className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                          />
                          <div className="flex flex-col flex-auto">
                            <div>
                              <h4 className="mb-2 font-medium text-gray-900">
                                <a href={productMOC.href}>{productMOC.name}</a>
                              </h4>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Size
                                  </dt>
                                  <dd className="ml-2 text-gray-700">M</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Color
                                  </dt>
                                  <dd className="ml-2 text-gray-700">Green</dd>
                                </div>
                              </dl>
                            </div>
                            <div className="flex flex-col items-start justify-end flex-1 mt-6">
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Quantity
                                  </dt>
                                  <dd className="ml-2 text-gray-700">1</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Price
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={32} />
                                  </dd>
                                </div>
                              </dl>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Total
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={32 * 1} />
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </label>
                        <label
                          key={productMOC.id}
                          className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none"
                        >
                          <input type="checkbox" name="select" id="select_2" />
                          <img
                            src={productMOC.imageSrc}
                            alt={productMOC.imageAlt}
                            className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                          />
                          <div className="flex flex-col flex-auto">
                            <div>
                              <h4 className="mb-2 font-medium text-gray-900">
                                <a href={productMOC.href}>
                                  {productMOC.name} 3
                                </a>
                              </h4>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Size
                                  </dt>
                                  <dd className="ml-2 text-gray-700">M</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Color
                                  </dt>
                                  <dd className="ml-2 text-gray-700">Green</dd>
                                </div>
                              </dl>
                            </div>
                            <div className="flex flex-col items-start justify-end flex-1 mt-6">
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Quantity
                                  </dt>
                                  <dd className="ml-2 text-gray-700">3</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Price
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={40} />
                                  </dd>
                                </div>
                              </dl>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Total
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={40 * 3} />
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </label>
                        <label
                          key={productMOC.id}
                          className="flex items-center py-6 space-x-6 border-t border-gray-200 select-none"
                        >
                          <input type="checkbox" name="select" id="select_3" />
                          <img
                            src={productMOC.imageSrc}
                            alt={productMOC.imageAlt}
                            className="flex-none object-cover object-center w-20 h-20 bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                          />
                          <div className="flex flex-col flex-auto">
                            <div>
                              <h4 className="mb-2 font-medium text-gray-900">
                                <a href={productMOC.href}>{productMOC.name}</a>
                              </h4>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Size
                                  </dt>
                                  <dd className="ml-2 text-gray-700">M</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Color
                                  </dt>
                                  <dd className="ml-2 text-gray-700">Green</dd>
                                </div>
                              </dl>
                            </div>
                            <div className="flex flex-col items-start justify-end flex-1 mt-6">
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Quantity
                                  </dt>
                                  <dd className="ml-2 text-gray-700">2</dd>
                                </div>
                                <div className="flex pl-4 sm:pl-6">
                                  <dt className="font-medium text-gray-900">
                                    Price
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={32} />
                                  </dd>
                                </div>
                              </dl>
                              <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-900">
                                    Total
                                  </dt>
                                  <dd className="ml-2 text-gray-700">
                                    <FormatCurrency value={32 * 2} />
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center pt-3 mt-3">
                      <input id="default-checkbox" type="checkbox" />
                      <label
                        htmlFor="default-checkbox"
                        className="ml-2 text-sm text-gray-900"
                      >
                        Agree to return{" "}
                        <Link prefetch={false} href="/terms" className="underline">
                          terms & conditions
                        </Link>
                      </label>
                    </div>
                    <div className="mt-5 text-center">
                      <Button
                        name="Return Order"
                        style="solid"
                        width="full"
                        // onClick={closeSelectReturn}
                        onClick={() => {
                          closeSelectReturn();
                          openReturn();
                        }}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isReturn} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={closeReturn}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <button
                      onClick={closeReturn}
                      type="button"
                      className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-2 ltr:right-2 rtl:left-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                    <svg
                      width="32"
                      height="26"
                      viewBox="0 0 32 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-auto"
                    >
                      <path
                        d="M1.88281 2.31091V10.1955H9.76742"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M30.7928 23.3365V15.4519H22.9082"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.4947 8.8815C26.8282 6.99811 25.6955 5.31424 24.2022 3.98702C22.709 2.6598 20.9038 1.73248 18.9552 1.29159C17.0067 0.850699 14.9782 0.910609 13.059 1.46573C11.1398 2.02085 9.39257 3.05308 7.98024 4.46612L1.88281 10.1956M30.793 15.452L24.6956 21.1815C23.2833 22.5945 21.536 23.6268 19.6169 24.1819C17.6977 24.737 15.6692 24.7969 13.7206 24.356C11.772 23.9151 9.9669 22.9878 8.47365 21.6606C6.98039 20.3334 5.84768 18.6495 5.18121 16.7661"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="mt-2 mb-2 text-xl font-medium leading-6 text-center text-gray-900">
                      Order Returned
                    </h3>
                    <p className="text-center text-gray-400">
                      Order #354896 returned successfully
                    </p>
                    <div className="mt-5 text-center">
                      <Button name="Back To Home" style="solid" href="/" />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
