"use client";
import { useState, useEffect } from "react";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useSharedState } from "@/app/SharedStateContext";
import { useForm } from "react-hook-form";
import { useUser } from "@/app/UserContext";
import { useLocale, useTranslations } from "next-intl";
import CheckoutBreadcrumbs from "./CheckoutBreadcrumbs";
import Link from "next/link";
import OrderType from "./OrderType";
import ShippingOptions from "./ShippingOptions";
import ShippingInfo from "./ShippingInfo";
import Button from "../Button";
import Loader from "../Loader";
import TimeSlot from "./TimeSlot";
import Cookies from "js-cookie";
import { handleInitiateCheckout, handlePurchase } from "@/app/fb-pixel";

const scrollToFirst = () => {
  setTimeout(() => {
    const element = document.querySelector(".checkout-error") as HTMLElement;
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = window.pageYOffset + rect.top - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      const parent = document.querySelector(".checkout-form") as HTMLElement;
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

interface ClientFormProps {
  onUpdateStep: (val: any) => void;
  onCollectFormData: (val: any) => void;
  stepOne: boolean;
}

const ClientInfoForm = ({
  onUpdateStep,
  onCollectFormData,
  stepOne,
}: ClientFormProps) => {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const { cartItems, totalPrice, resetCart } = useShoppingCart();
  const [isSingleUnavailableItem, setIsSingleUnavailableItem] = useState(false);
  const {
    walletDiscount,
    couponCode,
    couponDiscount,
    selectedAreaRatePROV,
    couponFreeShipping,
  } = useSharedState();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm();

  const { userInfo, locationInfo } = useUser();
  const contentIds = cartItems.map((item: any) => item.id);

  const user_id = Cookies.get("user_id");
  const orderNoteFromCookie = Cookies.get("order_note");

  const items = Object.values(cartItems).map((item) => ({
    itemID: item.id,
    qty: item.quantity,
    available: item.available,
  }));

  const contents = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    item_price: parseFloat(item.price),
  }));

  const effectiveUserInfo = userInfo || {
    first_name: watch("first_name"),
    last_name: watch("last_name"),
    email: watch("email"),
    phone: watch("phone"),
  };

  const handleClick = async () => {
    const output = await trigger([
      "first_name",
      "last_name",
      "email",
      "phone",
      "order_type",
      "order_date",
      "order_date_selected",
      "shipping_method",
      "full_address",
      "area_id",
      "gov_id",
      "area_name",
      "gov_name",
      "country",
      "building_no",
      "floor",
      "apartment",
      "building_number",
      "pick_from_branch",
    ]);

    if (output == true) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // onUpdateStep(false);
    } else {
      scrollToFirst();
    }
  };

  const onSubmit = async (formData: any) => {
    const clientData = {
      billing: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address_1: formData.full_address,
        area: formData.area_id,
        gov: formData.gov_id,
        country: formData.country,
        building_no: formData.building_number,
        floor_no: formData.floor,
        apartment_no: formData.apartment,
        property_type: formData.apartment_type,
        order_type: formData.order_type,
        receiver_name: formData.recipient_name,
        receiver_mobile: formData.recipient_mobile,
      },
      items,
      shipping: {
        rate: formData.shipping_method === "Branch" ? 0 : formData.shipping_fee,
        shipping_method: formData.shipping_method,
        order_from_branch: formData.pick_from_branch
          ? formData.pick_from_branch
          : "",
        delivery_date:
          formData.order_date === "Today"
            ? "Today"
            : formData.order_date_selected,
        note: orderNoteFromCookie ? orderNoteFromCookie : "",
      },
      order: {
        customerID: user_id ? user_id : 0,
        coupon: couponCode ? couponCode : "",
      },
    };

    onCollectFormData(clientData);
    onUpdateStep(false);
  };

  useEffect(() => {
    // Call handleViewContent when the component mounts
    if (locationInfo) {
      handleInitiateCheckout(
        contentIds,
        contents,
        totalPrice,
        effectiveUserInfo,
        locationInfo
      );
    }
  }, [locationInfo]);

  return (
    <>
      <CheckoutBreadcrumbs
        stepOne={stepOne}
        onUpdateStep={onUpdateStep}
        handleClick={handleClick}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        <div className="step-one">
          {isSingleUnavailableItem && (
            <p className="rounded-lg border border-red-500 bg-red-300 px-4 py-2 text-red-800">
              {t("isSingleUnavailableItem")}
            </p>
          )}
          <div className="py-2 md:py-3">
            <h2 className="mb-6 border-b border-gray-200 py-4 text-base font-bold text-black md:text-2xl">
              {t("order_type")}
            </h2>
            <OrderType
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>
          <div className="py-2 md:py-3">
            <h2 className="mb-6 flex items-center justify-between border-b border-gray-200 py-4 text-base font-bold text-black md:text-2xl">
              {t("shipping_information")}
              {!user_id && (
                <span className="flex flex-row-reverse gap-x-1 text-sm font-semibold text-gray-50 md:text-base">
                  <Link
                    prefetch={false}
                    href="/login"
                    className="text-primary-300 underline"
                  >
                    {t("login")}
                  </Link>
                  {t("already_user")}
                </span>
              )}
            </h2>
            <ShippingInfo
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>
          <div className="py-2 md:py-3">
            <h2 className="mb-6 border-b border-gray-200 py-4 text-base font-bold text-black md:text-2xl">
              {t("choose_order_date")}
            </h2>
            <TimeSlot
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
            />
          </div>
          <div className="mb-4 py-2 md:py-3">
            <h2 className="mb-6 border-b border-gray-200 py-4 text-base font-bold text-black md:text-2xl">
              {t("shipping_method")}
            </h2>
            <ShippingOptions
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          </div>
          <hr className="absolute left-0 right-0 h-1 w-full border-t-2 border-gray-200" />
          <div
            className={`py-6 ${
              isSingleUnavailableItem ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Button
              name={t("next_step")}
              width="full"
              type="submit"
              extraclass="pb-4 pt-5 leading-5"
              testid="button-next_step"
              onClick={handleClick}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ClientInfoForm;
