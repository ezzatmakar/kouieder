import { BTN_WHITE_CLASSES } from "@/app/commonUIClasses";
import { API_ENDPOINT } from "@/app/config";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Spinner from "../icons/Spinner";
import Wallet from "../icons/Wallet";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useSharedState } from "@/app/SharedStateContext";

export default function PointGets({
  user_id,
  currency,
  maxWalletDiscount,
}: any) {
  const t = useTranslations("common");
  const storedPointRedeem = Cookies.get("pointRedeem");
  const storedPoints = Cookies.get("points");
  const storedPointsFactor = Cookies.get("PointsFactor");
  const [factor, setPointsFactor] = useState<number>(2 ?? 0);
  const [points, setPoints] = useState<number | null>(
    parseFloat(storedPoints ?? "0")
  );
  const [pointRedeem, setPointRedeem] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { walletDiscount, setWalletDiscount } = useSharedState();
  const fetchCashAndPointRedeem = () => {
    fetch(`${API_ENDPOINT}/my-account/wallet/check-fullpayment.php`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        currency: currency,
      }),
      headers: {
        "Content-Type": "application/json",
        'Origin': window.location.origin
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPointRedeem(data.cash);
        setIsLoading(false);
        Cookies.set("pointRedeem", data.cash);
      })
      .catch((error) => {
        console.error("Error fetching cash:", error);
        setIsLoading(false);
      });
  };

  const fetchFactors = () => {
    fetch(`${API_ENDPOINT}/my-account/wallet/get-highest-rank.php`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
      }),
      headers: {
        "Content-Type": "application/json",
        'Origin': window.location.origin
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let redeemFactor = 1;
        if (currency === "AED") {
          redeemFactor = parseFloat(data.redeem_AED_x);
        } else if (currency === "EGP") {
          redeemFactor = parseFloat(data.redeem_EGP_x);
        }
        setPointsFactor(redeemFactor);
        setPoints(pointRedeem! * redeemFactor);
        Cookies.set("PointsFactor", redeemFactor.toString());
        Cookies.set("points", (pointRedeem! * redeemFactor).toString());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gain and redeem factors:", error);
        setIsLoading(false);
      });
  };
  // console.log("pointRedeem", pointRedeem);
  const handleDiscountButtonClick = () => {
    // console.log("HERE");
    if (pointRedeem !== null) {
      setWalletDiscount(pointRedeem.toString()); // Set the walletDiscount using the setter
    }
  };
  const handleCancelDiscountButtonClick = () => {
    setWalletDiscount("0".toString());
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      if (storedPointRedeem) {
        setPointRedeem(parseFloat(storedPointRedeem));
      } else {
        await fetchCashAndPointRedeem();
      }

      if (!storedPointsFactor) {
        await fetchFactors();
      }

      setIsLoading(false);
    };

    fetchInitialData();
  }, [user_id, currency, storedPointRedeem, storedPointsFactor]);
  useEffect(() => {
    if (currency !== "AED" && currency !== "EGP") {
      console.error("Unsupported currency:", currency);
      return;
    }

    const updateCurrencyData = async () => {
      setIsLoading(true);
      if (currency !== "AED" && currency !== "EGP") {
        return;
      }

      if (currency === "AED") {
        setPointsFactor(parseFloat(storedPointsFactor || "1"));
      } else if (currency === "EGP") {
        setPointsFactor(parseFloat(storedPointsFactor || "1"));
      }

      if (pointRedeem) {
        setPoints(pointRedeem * factor);
      } else {
        await fetchCashAndPointRedeem();
      }

      setIsLoading(false);
    };

    if(pointRedeem !== null && (pointRedeem > parseFloat(maxWalletDiscount))){
      handleCancelDiscountButtonClick();
      // console.log("HEARRR")
    }else{
      // console.log("HEARRR ELSE")
    }
    updateCurrencyData();
  }, [currency, storedPointsFactor, pointRedeem, factor]);

  return (
    <div>
      {pointRedeem !== null && pointRedeem < parseFloat(maxWalletDiscount) && pointRedeem != 0 ? (
        <div className="flex items-center justify-between px-4 py-4 gap-6 bg-primary-910">
          <div className="flex items-center gap-4">
            <Wallet />

            {isLoading ||
            points === null ||
            points === 0 ||
            pointRedeem === null ? (
              <p className="w-full text-xs font-semibold text-black md:text-base">
                {t("u_have")}{" "}
                <span className="inline-block mx-2 w-3 h-3">
                  <Spinner />
                </span>{" "}
                {t("redeem_txt")}{" "}
                <span className="inline-block mx-2 w-3 h-3">
                  <Spinner />
                </span>{" "}
                {currency}
              </p>
            ) : (
              <p className="w-full text-xs font-semibold text-black md:text-base">
                {t("u_have")} {points} {t("redeem_txt")} {pointRedeem}{" "}
                {currency}
                {/* max {maxWalletDiscount} */}
              </p>
            )}
          </div>
          {parseFloat(walletDiscount) > 0 ? (
            <button
              type="button"
              className={`${BTN_WHITE_CLASSES}`}
              onClick={handleCancelDiscountButtonClick}
            >
              {t("cancel_discount")}
            </button>
          ) : (
            <button
              type="button"
              className={`${BTN_WHITE_CLASSES}`}
              onClick={handleDiscountButtonClick}
            >
              {t("discount_amount")}
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
