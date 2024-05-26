"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FB_PIXELID } from "./credentials";
import { useUser } from "@/app/UserContext";
import Cookies from "js-cookie";
import { FRONTEND_ENDPOINT } from "./config";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [locationInfo, setLocationInfo] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
  });

  const { userInfo } = useUser();
  const user_id = Cookies.get("user_id");
  if (user_id) {
    console.log("userInfo", userInfo);
  }
  useEffect(() => {
    const getGeoInfo = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setLocationInfo({
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
        });
      } catch (error) {
        console.error("Error fetching location information:", error);
      }
    };

    getGeoInfo(); // Fetch location information when the component mounts
  }, []);

  // Function to send the API request for AddToCart event
  const handleAddToCart = (product: any) => {
    if (typeof window !== "undefined") {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.track("AddToCart", {
            content_ids: [product.id],
            content_type: "product",
            currency: "EGP",
            value: product.price,
            email: userInfo?.email ? userInfo.email : "",
            first_name: userInfo?.first_name ? userInfo.first_name : "",
            last_name: userInfo?.last_name ? userInfo.last_name : "",
            phone: userInfo?.phone ? userInfo.phone : "",
            country: locationInfo.countryName,
            city: locationInfo.city,
          });

          // Send the API request for AddToCart
          sendApiRequest({
            action: "AddToCart",
            event_id: "AddToCart_AA_FE",
            client_user_agent: navigator.userAgent,
            event_source_url: window.location.href,
            email: userInfo?.email ? userInfo.email : "",
            first_name: userInfo?.first_name ? userInfo.first_name : "",
            last_name: userInfo?.last_name ? userInfo.last_name : "",
            phone: userInfo?.phone ? userInfo.phone : "",
            country: locationInfo.countryName,
            city: locationInfo.city,
            content_ids: product.id,
            content_name: product.name,
            content_type: "product",
            currency: "EGP",
            content_category: "coffee",
            contents: [
              { id: product.id, quantity: 1, item_price: product.price },
            ],
            total_price: product.price,
          });
        });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FB_PIXELID);
          ReactPixel.pageView();

          // Send the API request with locationInfo
          if (user_id) {
            if (userInfo && locationInfo.countryName !== "") {
              const apiData = {
                action: "PageView",
                event_id: "PageView_AA_FE",
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
            if (locationInfo.countryName !== "") {
              const apiData = {
                action: "PageView",
                event_id: "PageView_AA_FE",
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
  }, [pathname, searchParams, locationInfo.countryName, userInfo]);

  // Function to send the API request
  const sendApiRequest = (apiData: any) => {
    fetch(
      "https://backend.koueider.com/MitchAPI/tracking/facebook/conversion-api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": FRONTEND_ENDPOINT
        },
        body: JSON.stringify(apiData),
      }
    ).then((response) => {
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
  return null;
};