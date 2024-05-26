"use client";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import CartSummary from "./CartSummary";
import StickyDivParent from "../StickyDivParent";
import CheckoutController from "./CheckoutController";
import EmptyCart from "../cart/EmptyCart";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { cartItems } = useShoppingCart();
  const { watch } = useForm();
  if (cartItems?.length === 0) return <EmptyCart />;
  return (
    <div className="mx-auto">
      <div className="flex flex-col-reverse overflow-hidden lg:flex-row">
        <div className="first relative w-full px-4 pt-0 md:px-8 md:pb-10 md:pt-12 lg:w-[66%]">
          <div className="max-w-[700px] ltr:ml-auto rtl:mr-auto">
            <div className="hidden pb-10 md:block">
              <h1 className="text-4xl font-semibold">{t("checkout")}</h1>
            </div>
            <CheckoutController />
          </div>
        </div>
        <div className="second flex w-full justify-center px-4 py-6 lg:w-[44%] lg:px-8 lg:py-36">
          <StickyDivParent>
            <CartSummary rate={watch("shipping_fee")} />
          </StickyDivParent>
        </div>
      </div>
      <div id="StopSticky" />
    </div>
  );
}
