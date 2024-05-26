import { useState, useEffect, useRef } from "react";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useSharedState } from "@/app/SharedStateContext";
import { API_ENDPOINT } from "@/app/config";

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const { totalPrice } = useShoppingCart();
  const scriptLoaded = useRef(false);
  const sessionCreated = useRef(false);
  const { couponDiscount, selectedAreaRatePROV, couponFreeShipping } =
    useSharedState();

  const discount = couponDiscount
    ? (totalPrice * Number(couponDiscount.replace("%", " "))) / 100
    : 0;

  const shippingPrice = couponFreeShipping
    ? 0
    : selectedAreaRatePROV
    ? +selectedAreaRatePROV
    : 0;

  // calculate cart total amount
  const totalAmount = totalPrice - discount + shippingPrice;

  useEffect(() => {
    if (!scriptLoaded.current) {
      console.log("script Loaded in payment form");

      const script = document.createElement("script");
      // script.src =
      //   "https://ap-gateway.mastercard.com/form/version/74/merchant/121087HJWL5J/session.js";

      script.src =
        "https://ap-gateway.mastercard.com/form/version/74/merchant/Test303030/session.js";

      document.head.appendChild(script);

      scriptLoaded.current = true; // Set the flag to true once the script is loaded
    }
  }, []);

  useEffect(() => {
    const fetchSessionId = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_ENDPOINT}/payment/MPGS/create-session.php`,
          { method: "POST", body: JSON.stringify({ amount: totalAmount + 10 }) }
        );

        //  Error From Server
        if (res.status !== 200 || !res.ok) {
          throw new Error(
            `server error while fetch session id - ${res.status}`
          );
        }

        const result = await res.json();

        // Error From Endpoint
        if (result.status !== "success") {
          throw new Error(result.msg || "error while fetch session id!");
        }

        setSessionId(result.data.session.id);
      } catch (error: any) {
        console.log(error.message);
        setError(error.message);
      }

      setIsLoading(false);
    };

    if (!sessionCreated.current) {
      fetchSessionId();

      sessionCreated.current = true;
    }
  }, []);

  return { sessionId, isLoading, error, totalAmount };
};
