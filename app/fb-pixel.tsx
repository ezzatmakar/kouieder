"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
// import { FB_PIXELID } from "./credentials";
import { useUser } from "@/app/UserContext";
import Cookies from "js-cookie";
import { FRONTEND_ENDPOINT } from "./config";
// import { FB_PIXELID } from "./credentials";

// Function to send the API request
  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
const sendApiRequest = (apiData: any) => {
  fetch(
    "https://backend.koueider.com/MitchAPI/tracking/facebook/conversion-api.php",
    {
      method: "POST",
      headers,
      body: JSON.stringify(apiData),
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("API request sent successfully");
      } else {
        console.error("Failed to send API request");
      }
    })
    .catch((error) => {
      console.error("Error sending API request:", error);
    });
};

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  // const [locationInfo, setLocationInfo] = useState({
  //   ip: "",
  //   countryName: "",
  //   countryCode: "",
  //   city: "",
  //   timezone: "",
  // });

  const { userInfo, locationInfo } = useUser();
  // if (user_id) {
  //   console.log("userInfo", userInfo);
  // }
  // const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || '';

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FB_PIXELID);
          ReactPixel.pageView();

          // Send the API request with locationInfo
          if (user_id) {
            if (userInfo && locationInfo && locationInfo.countryName !== "") {
              const apiData = {
                action: "PageView",
                eventID: "PageView_AA_FE",
                client_user_agent: navigator.userAgent,
                event_source_url: window.location.href,
                email: userInfo?.email ? userInfo.email : "",
                first_name: userInfo?.first_name ? userInfo.first_name : "",
                last_name: userInfo?.last_name ? userInfo.last_name : "",
                phone: userInfo?.phone ? userInfo.phone : "",
                country: locationInfo.countryName,
                city: locationInfo.city,
              };
              sendApiRequest(apiData);
            }
          } else {
            if (locationInfo && locationInfo.countryName !== "") {
              const apiData = {
                action: "PageView",
                eventID: "PageView_AA_FE",
                client_user_agent: navigator.userAgent,
                event_source_url: window.location.href,
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
                country: locationInfo.countryName,
                city: locationInfo.city,
              };

              sendApiRequest(apiData);
            }
          }
        });
    }
  }, [pathname, searchParams, locationInfo, userInfo]);

  return null;
};

// Function to send the API request for AddToCart event
export const handleAddToCart = (
  product: any,
  userInfo: any,
  locationInfo: any
) => {
  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";
  
  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXELID);

        // Check if user_id exists
        if (user_id) {
          ReactPixel.track("AddToCart", {
            eventID: "AddToCart_AA_FE",
            content_ids: [product.id],
            content_type: "product",
            currency: initialCurrency,
            value: product.price,
            email: userInfo?.email ? userInfo.email : "",
            first_name: userInfo?.first_name ? userInfo.first_name : "",
            last_name: userInfo?.last_name ? userInfo.last_name : "",
            phone: userInfo?.phone ? userInfo.phone : "",
            country: locationInfo?.countryName ?? "",
            city: locationInfo?.city ?? "",
          });

          // Send the API request for AddToCart
          sendApiRequest({
            action: "AddToCart",
            eventID: "AddToCart_AA_FE",
            client_user_agent: navigator.userAgent,
            event_source_url: window.location.href,
            email: userInfo?.email ? userInfo.email : "",
            first_name: userInfo?.first_name ? userInfo.first_name : "",
            last_name: userInfo?.last_name ? userInfo.last_name : "",
            phone: userInfo?.phone ? userInfo.phone : "",
            country: locationInfo?.countryName ?? "",
            city: locationInfo?.city ?? "",
            content_ids: product.id,
            content_name: product.name,
            content_type: "product",
            currency: initialCurrency,
            content_category: product.category_name,
            contents: [
              { id: product.id, quantity: 1, item_price: product.price },
            ],
            total_price: product.price,
          });
        } else {
          if (locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("AddToCart", {
              eventID: "AddToCart_AA_FE",
              content_ids: [product.id],
              content_type: "product",
              currency: initialCurrency,
              value: product.price,
              email: "",
              first_name: "",
              last_name: "",
              phone: "",
              country: locationInfo?.countryName ?? "",
              city: locationInfo?.city ?? "",
            });

            // Send the API request for AddToCart
            sendApiRequest({
              action: "AddToCart",
              eventID: "AddToCart_AA_FE",
              client_user_agent: navigator.userAgent,
              event_source_url: window.location.href,
              email: "",
              first_name: "",
              last_name: "",
              phone: "",
              country: locationInfo?.countryName ?? "",
              city: locationInfo?.city ?? "",
              content_ids: product.id,
              content_name: product.name,
              content_type: "product",
              currency: initialCurrency,
              content_category: product.category_name,
              contents: [
                { id: product.id, quantity: 1, item_price: product.price },
              ],
              total_price: product.price,
            });
          }
        }
      });
  }
};

// Function to send the API request for ViewCategory event
export const handleViewCategory = (
  category: string,
  userInfo: any,
  locationInfo: any
) => {
  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";

  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXELID);

        // Check if user_id exists
        if (user_id) {
          if (userInfo && locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("ViewCategory", {
              eventID: "ViewCategory_AA_FE",
              content_category: category,
              currency: initialCurrency,
              email: userInfo?.email ? userInfo.email : "",
              first_name: userInfo?.first_name ? userInfo.first_name : "",
              last_name: userInfo?.last_name ? userInfo.last_name : "",
              phone: userInfo?.phone ? userInfo.phone : "",
              country: locationInfo?.countryName ?? "",
              city: locationInfo?.city ?? "",
            });

            // Send the API request for ViewCategory
            sendApiRequest({
              action: "ViewCategory",
              eventID: "ViewCategory_AA_FE",
              client_user_agent: navigator.userAgent,
              event_source_url: window.location.href,
              email: userInfo?.email ? userInfo.email : "",
              first_name: userInfo?.first_name ? userInfo.first_name : "",
              last_name: userInfo?.last_name ? userInfo.last_name : "",
              phone: userInfo?.phone ? userInfo.phone : "",
              country: locationInfo?.countryName ?? "",
              city: locationInfo?.city ?? "",
              content_category: category,
              currency: initialCurrency,
            });
          }
        } else {
          if (locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("ViewCategory", {
              eventID: "ViewCategory_AA_FE",
              content_category: category,
              currency: initialCurrency,
              email: "",
              first_name: "",
              last_name: "",
              phone: "",
              country: locationInfo.countryName,
              city: locationInfo.city,
            });

            // Send the API request for ViewCategory
            sendApiRequest({
              action: "ViewCategory",
              eventID: "ViewCategory_AA_FE",
              client_user_agent: navigator.userAgent,
              event_source_url: window.location.href,
              email: "",
              first_name: "",
              last_name: "",
              phone: "",
              country: locationInfo?.countryName ?? "",
              city: locationInfo?.city ?? "",
              content_category: category,
              currency: initialCurrency,
            });
          }
        }
      });
  }
};


export const handleViewContent = (
  productSku: string[],
  productName: string,
  category: string,
  totalPrice: number,
  userInfo: any,
  locationInfo: any
) => {
  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";

  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXELID);

        const apiData = {
          action: "ViewContent",
          eventID: "ViewContent_AA_FE",
          client_user_agent: navigator.userAgent,
          event_source_url: window.location.href,
          content_ids: productSku,
          content_name: productName,
          content_type: "product",
          currency: initialCurrency,
          content_category: category,
          total_price: totalPrice,
          email: userInfo?.email ? userInfo.email : "",
          first_name: userInfo?.first_name ? userInfo.first_name : "",
          last_name: userInfo?.last_name ? userInfo.last_name : "",
          phone: userInfo?.phone ? userInfo.phone : "",
          country: locationInfo?.countryName ?? "",
          city: locationInfo?.city ?? "",
        };

        // Check if user_id exists
        if (user_id) {
          if (userInfo && locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("ViewContent", apiData);
          }
        } else {
          if (locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("ViewContent", apiData);
          }
        }

        // Send the API request for ViewContent
        sendApiRequest(apiData);
      });
  }
};


export const handleInitiateCheckout = (
  productSkus: string[],
  contents: { id: number; quantity: number; item_price: number }[],
  totalPrice: number,
  userInfo: any,
  locationInfo: any
) => {
  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";

  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXELID);

        const apiData = {
          action: "InitiateCheckout",
          eventID: "InitiateCheckout_AA_FE", // Use eventID instead of event_id
          client_user_agent: navigator.userAgent,
          event_source_url: window.location.href,
          content_ids: productSkus,
          currency: initialCurrency,
          contents: contents,
          total_price: totalPrice,
          email: userInfo?.email ? userInfo.email : "",
          first_name: userInfo?.first_name ? userInfo.first_name : "",
          last_name: userInfo?.last_name ? userInfo.last_name : "",
          phone: userInfo?.phone ? userInfo.phone : "",
          country: locationInfo?.countryName ?? "",
          city: locationInfo?.city ?? "",
        };

        // Check if user_id exists
        if (user_id) {
          if (userInfo && locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("InitiateCheckout", apiData);
          }
        } else {
          if (locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("InitiateCheckout", apiData);
          }
        }

        // Send the API request for InitiateCheckout
        sendApiRequest(apiData);
      });
  }
};

export const handlePurchase = (
  productSkus: string[],
  contents: { id: number; quantity: number; item_price: number }[],
  totalPrice: number,
  userInfo: any,
  locationInfo: any
) => {
  const FB_PIXELID = process.env.NEXT_PUBLIC_FB_PIXELID || "";
  const user_id = Cookies.get("user_id");
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";

  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXELID);

        const apiData = {
          action: "Purchase",
          eventID: "Purchase_AA_FE",
          client_user_agent: navigator.userAgent,
          event_source_url: window.location.href,
          content_ids: productSkus,
          currency: initialCurrency,
          contents: contents,
          total_price: totalPrice,
          email: userInfo?.email ? userInfo.email : "",
          first_name: userInfo?.first_name ? userInfo.first_name : "",
          last_name: userInfo?.last_name ? userInfo.last_name : "",
          phone: userInfo?.phone ? userInfo.phone : "",
          country: locationInfo?.countryName ?? "",
          city: locationInfo?.city ?? "",
        };

        // Check if user_id exists
        if (user_id) {
          if (userInfo && locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("Purchase", apiData);
          }
        } else {
          if (locationInfo && locationInfo.countryName !== "") {
            ReactPixel.track("Purchase", apiData);
          }
        }

        // Send the API request for Purchase
        sendApiRequest(apiData);
      });
  }
};