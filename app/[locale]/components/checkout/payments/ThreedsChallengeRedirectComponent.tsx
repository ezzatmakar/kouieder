"use client";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import { API_ENDPOINT, FRONTEND_ENDPOINT } from "@/app/config";
import { useLocale } from "next-intl";

export async function checkMPGS(sessionID: string) {
  const url: string = `${API_ENDPOINT}/payment/MPGS/status.php`;
  const data: any = {
    sessionID: sessionID,
  };
  const headers = {
    "Content-Type": "application/json",
    Origin: FRONTEND_ENDPOINT,
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

function ThreedsChallengeRedirectComponent({ response, sessionID }: any) {
  const locale = useLocale();
  const [creqValue, setCreqValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetCart } = useShoppingCart();

  useEffect(() => {
    if (response) {
      const threedsChallengeRedirect = document.getElementById("divOtp");
      if (threedsChallengeRedirect) {
        threedsChallengeRedirect.innerHTML = response.html || "";
        eval(threedsChallengeRedirect?.textContent || "");
        console.log(threedsChallengeRedirect, "response");
      }

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response.html, "text/html");
      const creqInput = htmlDoc.querySelector('input[name="creq"]');
      if (creqInput instanceof HTMLInputElement) {
        const value = creqInput.value;
        setCreqValue(value);
      }
    }
  }, [response]);

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      console.log(event);
      if (event.source !== iframe.contentWindow) {
        return;
      }
      try {
        const receivedData = JSON.parse(event.data);
        console.log(receivedData);

        if (receivedData.result == "SUCCESS") {
          setIsLoading(true);
          setTimeout(() => {
            checkMPGS(sessionID)
              .then((result) => {
                if (result.orderID) {
                  const orderID = result.orderID;
                  const thanksURL = `${
                    locale === "ar" ? "" : "/en"
                  }/thanks?orderID=${orderID}`;
                  // setTimeout(() => {
                  //   resetCart();
                  //   window.location.href = thanksURL;
                  // }, 2000);
                } else {
                  console.log("No status found");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }, 8000);
        } else {
          console.log("event source: ", event.source);
          console.log("event data: ", event.data);
        }
      } catch (error) {
        console.error("Error parsing received data:", error);
      }
    };

    const iframe = document.getElementById(
      "challengeFrame"
    ) as HTMLIFrameElement;
    if (iframe) {
      window.addEventListener("message", handleIframeMessage);

      return () => {
        window.removeEventListener("message", handleIframeMessage);
      };
    }
  }, [response]);

  return (
    <div>
      <div id="divOtp" className=""></div>
      {isLoading ? (
        <div className="absolute -inset-4 z-20 flex items-start justify-center bg-gray-200 bg-opacity-75 pt-20">
          <Loader />
        </div>
      ) : null}
    </div>
  );
}

export default ThreedsChallengeRedirectComponent;
