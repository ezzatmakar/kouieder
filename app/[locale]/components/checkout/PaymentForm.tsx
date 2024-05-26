"use client";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const initializePaymentSession = (sessionId: string) => {
  // @ts-ignore
  PaymentSession.configure({
    session: sessionId,
    fields: {
      card: {
        number: "#card-number",
        securityCode: "#security-code",
        expiryMonth: "#expiry-month",
        expiryYear: "#expiry-year",
      },
    },
    frameEmbeddingMitigation: ["javascript"],
    callbacks: {
      initialized: function (response: any) {
        // console.log('initialized');
      },
      formSessionUpdate: function (response: any) {
        // Handle form session update response
        if (response.status) {
          if ("ok" === response.status) {
            console.log("Session updated with data: " + response.session.id);
            // @ts-ignore
            document.querySelector([
              "#card-number",
              "#expiry-month",
            ]).style.borderColor = "green";
            if (response.sourceOfFunds.provided.card.securityCode) {
              console.log("Security code was provided.");
            }

            if (response.sourceOfFunds.provided.card.scheme === "MASTERCARD") {
              console.log("The user entered a Mastercard credit card.");
            }
          } else if ("fields_in_error" === response.status) {
            console.log("Session update failed with field errors.");
            if (response.errors.cardNumber) {
              // @ts-ignore
              document.querySelector("#card-number").style.borderColor = "red";
              // document.querySelector('#card-number').classList.add("border-red-500", "border");
              // console.log('number')
            }
            if (response.errors.expiryYear) {
              // @ts-ignore
              document.querySelector("#expiry-month").style.borderColor = "red";
            }
            if (response.errors.expiryMonth) {
              // @ts-ignore
              document.querySelector("#expiry-year").style.borderColor = "red";
            }
            if (response.errors.securityCode) {
              // @ts-ignore
              document.querySelector("#security-code").style.borderColor =
                "red";
            }
          } else if ("request_timeout" === response.status) {
            console.log(
              "Session update failed with request timeout: " +
                response.errors.message
            );
          } else if ("system_error" === response.status) {
            console.log(
              "Session update failed with system error: " +
                response.errors.message
            );
            console.log("Session update failed with system error: " + response);
          }
        } else {
          console.log("Session update failed: " + response);
        }
      },
      authenticationSuccessful: function (response: any) {
        // debugger;
        // Handle successful authentication
        console.log("3-D Secure authentication successful.");
      },
      authenticationFailed: function (response: any) {
        // Handle failed authentication
        console.log("3-D Secure authentication failed.");
      },
    },
    interaction: {
      displayControl: {
        formatCard: "EMBOSSED",
        invalidFieldCharacters: "REJECT",
      },
    },
  });

  // Add onBlur validation for each field
  const onBlurValidation = (selector: any, role: any) => {
    // @ts-ignore
    PaymentSession.validate("card", function (allresult: any) {
      if (allresult.card[role].isValid) {
        console.log("The field is valid");
        document.querySelector(selector).style.borderColor = "green";
      } else {
        console.log("The field is invalid");
        document.querySelector(selector).style.borderColor = "red";
      }
    });
  };
  // @ts-ignore
  PaymentSession.onBlur(
    ["card.number", "card.securityCode", "card.expiryYear", "card.expiryMonth"],
    function (selector: any, role: any) {
      onBlurValidation(selector, role);
    }
  );
};

const PaymentForm = ({ sessionId, register }: any) => {
  const t = useTranslations("fields");

  useEffect(() => {
    if (sessionId) {
      initializePaymentSession(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="border-b pb-10 pt-5">
      <h3 className="border-b border-gray-300 pb-2 text-xl font-bold leading-7 text-black">
        {t("card_data")}
        <span className="block text-sm">5123450000000008</span>
        <span className="block text-sm">01/39 100</span>
      </h3>
      <input
        type="text"
        className="hidden"
        {...register("sessionId", {
          required: true,
        })}
        // defaultValue={watch("sessionId")}
      />
      <div className="mt-5 grid grid-cols-4 gap-4">
        <div className="col-span-4 py-2">
          <label htmlFor="" className={LABEL_CLASSES}>
            {t("card_number")}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="card-number"
              placeholder="XXXX XXXX XXXX XXXX"
              readOnly
              className={INPUT_CLASSES}
            />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="" className={LABEL_CLASSES}>
            {t("expiry_month")}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="expiry-month"
              placeholder="MM"
              readOnly
              className={INPUT_CLASSES}
            />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="" className={LABEL_CLASSES}>
            {t("expiry_year")}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="expiry-year"
              placeholder="YY"
              readOnly
              className={INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="col-span-2 py-2">
          <label htmlFor="" className={LABEL_CLASSES}>
            {t("CSV")}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="security-code"
              placeholder="XXX"
              readOnly
              className={INPUT_CLASSES}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
