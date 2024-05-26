"use client";
import { useState } from "react";
import { usePayment } from "@/hooks/usePayment";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useSharedState } from "@/app/SharedStateContext";
import { useUser } from "@/app/UserContext";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import CheckoutBreadcrumbs from "./CheckoutBreadcrumbs";
import PaymentForm from "./PaymentForm";
import Button from "../Button";
import CustomRadioBtnCheck from "../icons/CustomRadioBtnCheck";
import CustomRadioBtnUnCheck from "../icons/CustomRadioBtnUnCheck";
import Popup from "../Popup";
import Loading from "../../loading";
import ThreedsChallengeRedirectComponent from "./payments/ThreedsChallengeRedirectComponent";
import { handlePurchase } from "@/app/fb-pixel";
import { API_ENDPOINT } from "@/app/config";

const paymentMethods = [
  { name: "credit_card", logo: "/images/icons/cc_Icons.webp" },
  { name: "vod_cash", logo: "/images/icons/vod_cash.webp" },
  { name: "etisalat_cash", logo: "/images/icons/etisalat_cash.webp" },
  { name: "insta_pay", logo: "/images/icons/insta_pay.webp" },
  { name: "valu", logo: "/images/icons/valu.webp" },
  { name: "cod", logo: "/images/icons/cod.webp" },
];

interface PaymentMethodsProps {
  onUpdateStep: (val: any) => void;
  stepOne: boolean;
  clientData: any;
}

const PaymentMethodForm = ({
  onUpdateStep,
  stepOne,
  clientData,
}: PaymentMethodsProps) => {
  const { sessionId, isLoading, error, totalAmount } = usePayment();
  const t = useTranslations("fields");
  const tCheckout = useTranslations("checkout");
  const { cartItems, totalPrice } = useShoppingCart();
  const { walletDiscount } = useSharedState();
  const { userInfo, locationInfo } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTP, setIsOTP] = useState(false);
  const [responseCreditCard, setResponseCreditCard] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const contentIds = cartItems.map((item: any) => item.id);
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

  const initialCurrency = "EGP";

  const onSubmit = async () => {
    const formData = getValues();

    if (formData.payment_method === "cod") {
      // @ts-ignore
      clientData.payment = {
        method: "COD",
        orderData: {
          amount: totalAmount,
          currency: initialCurrency,
        },
        wallet_discount: walletDiscount ? walletDiscount : 0,
      };
    }

    if (formData.payment_method === "wallet") {
      // @ts-ignore
      clientData.payment = {
        method: "wallet",
        orderData: {
          amount: totalPrice,
          currency: initialCurrency,
        },
      };
    }

    if (formData.payment_method === "credit_card") {
      // @ts-ignore
      clientData.payment = {
        method: "cc",
        orderData: {
          amount: totalAmount,
          currency: initialCurrency,
        },
        sessionID: sessionId,
        wallet_discount: walletDiscount ? walletDiscount : 0,
      };
    }

    try {
      const res = await fetch(`${API_ENDPOINT}/checkout.php`, {
        method: "POST",
        body: JSON.stringify(clientData),
      });

      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await res.json();

          if (
            responseData.status === "success" &&
            responseData.code === "200"
          ) {
            // const orderID = responseData.order_id;

            handlePurchase(
              contentIds,
              contents,
              totalPrice,
              effectiveUserInfo,
              locationInfo
            );
          } else if (
            responseData.status === "success" &&
            responseData.hasOwnProperty("html")
          ) {
            setIsOTP(true);
            setResponseCreditCard(responseData);
          } else if (responseData.status === "err") {
            const errorExplanation = responseData.obj.error.explanation;
            setErrorMessage(errorExplanation);
          } else {
            // console.log("API call failed");
            setErrorMessage("Try submitting again");
          }
        } else {
          // Handle non-JSON response, possibly HTML or other content types
          // console.log("Received unexpected content type:", contentType);
          // You can handle this case as needed
        }
      } else {
        // console.log("API call failed");
      }
    } catch (error) {
      // console.log("An error occurred", error);
    }
  };

  const handlePayClick = async () => {
    const payment_method = watch("payment_method");

    if (payment_method === "credit_card") {
      if (sessionId) {
        // @ts-ignore
        PaymentSession.updateSessionFromForm("card");

        onSubmit();
      }

      const output = await trigger(["terms", "sessionId"]);

      if (output === true) {
        onSubmit();
      }
    }

    if (payment_method === "cod" || payment_method === "wallet") {
      const output = await trigger(["terms"]);
      if (output === true) {
        onSubmit();
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {isOTP && (
        <Popup isOpen={isOTP} width="full" close={() => setIsOTP(false)}>
          <ThreedsChallengeRedirectComponent
            response={responseCreditCard}
            sessionID={sessionId}
          />
        </Popup>
      )}
      <CheckoutBreadcrumbs stepOne={stepOne} onUpdateStep={onUpdateStep} />
      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="step-two">
          <h2 className="mb-6 border-b border-gray-100 py-4 text-base font-bold text-black md:text-2xl">
            {tCheckout("payment_method")}
          </h2>

          <ul>
            {paymentMethods.map((method: any) => {
              const activeMethod =
                method.name !== "credit_card" && method.name !== "cod";

              return (
                <li key={method.name} className="py-2">
                  <label
                    htmlFor={method.name}
                    className={`block text-black ${
                      activeMethod ? "opacity-25" : ""
                    }`}
                  >
                    <div className="relative flex flex-col">
                      <input
                        type="radio"
                        id={method.name}
                        className="peer hidden"
                        value={method.name}
                        {...register("payment_method")}
                        defaultChecked={method.name === "cod"}
                        disabled={activeMethod}
                      />
                      <CustomRadioBtnCheck />
                      <CustomRadioBtnUnCheck />
                      <span className="border-gray-400 flex cursor-pointer items-center justify-between rounded-2xl border-2 py-6 text-xl font-semibold uppercase peer-checked:border-[3px] peer-checked:border-primary-300 ltr:pl-14 ltr:pr-6 rtl:pl-6 rtl:pr-14">
                        {t(method.name)}
                        <img src={method.logo} alt={method.name} />
                      </span>

                      {method.name === "credit_card" && (
                        <div className="h-0 overflow-hidden peer-checked:h-auto peer-checked:p-2">
                          <PaymentForm
                            sessionId={sessionId}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>

          {/* Errors */}
          <div className="py-6">
            <div className="flex items-center gap-2">
              <input
                id="default-checkbox"
                type="checkbox"
                className={`w-4 h-4 text-blue-600 bg-white border border-gray-300 rounded-sm ${
                  errors.terms ? "border-red-500 checkout-error" : ""
                }`}
                {...register("terms", {
                  required: true,
                })}
                data-testid="checkbox-terms"
              />
              <label
                htmlFor="default-checkbox"
                className="text-xl font-semibold text-black"
              >
                {tCheckout("terms")}
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-xs text-red-500">
                {tCheckout("terms_required")}
              </p>
            )}
          </div>

          <hr className="absolute left-0 right-0 h-1 w-full border-t-2 border-gray-200" />

          <div className="relative py-6">
            <Button
              name={tCheckout("complete_order")}
              width="full"
              type="submit"
              extraclass={`mt-5 pb-4 pt-5 leading-5 ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={handlePayClick}
              testid="button-submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentMethodForm;
