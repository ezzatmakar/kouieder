"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { ErrorResponse, ProductData } from "@/types";
import { addBulkWishAPI, checkFBLogin, getWishAPI } from "@/app/utils/account";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";

interface FBLoginResponse {
  status: string;
  msg: string;
  msg_code: string;
  user_id: number;
  token: string;
  ERR?: string;
}

export default function SocialLogin() {
  const t = useTranslations("common");
  const locale = useLocale();
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_ID || "";
  const [isLoading, setIsLoading] = useState(true);

  const [googleaccess_token, setGoogleaccess_token] = useState<string | null>(
    null
  );
  const login = useGoogleLogin({
    onSuccess: (response) =>{
        // console.log('response',response)
      setGoogleaccess_token(response.access_token),
      fetchUserData(response.access_token)
    }
  });
  const fetchUserData = async (token:any) => {
    if (googleaccess_token) {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              'Origin': window.location.origin
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          fbLogin(userData.email, userData.sub, userData.name);
        } else {
          console.error(
            "Failed to fetch user data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const handleFacebookLogin = (response: any) => {
    console.log("handleFacebookLogin");
  };
  const handleFacebookonProfileSuccess = (response: any) => {
    fbLogin(response.email, response.id, response.name);
  };

  let localStorageWishlistItems;
  let updatedWishlistItems: number[] = [];
  if (typeof window !== "undefined") {
    localStorageWishlistItems = localStorage.getItem("wishlistItems");
    if (localStorageWishlistItems) {
      const wishlistItems = JSON.parse(
        localStorageWishlistItems
      ) as ProductData[];
      updatedWishlistItems = wishlistItems.map((item: ProductData) => item.id);
    }
  }
  const addBulkWishList = async () => {
    try {
      const response = await addBulkWishAPI(updatedWishlistItems);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
    } catch (error) {
      console.error("can't addBulkWishAPI");
    }
  };
  const fetchWishListData = async () => {
    try {
      const response = await getWishAPI();
      setIsLoading(false);
      if ((response as ErrorResponse).status === "error") {
        throw new Error((response as ErrorResponse).msg);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(response));
    } catch (error) {
      console.error("can't getWishAPI");
    }
    setIsLoading(false);
  };
  const handleLoginSuccess = (user_id: number, token: string) => {
    // Store user ID in a cookie
    Cookies.set("user_id", user_id.toString());
    Cookies.set("token", token);
    addBulkWishList();
    fetchWishListData();
    Cookies.set("isCurrentUser", "true", {
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    // Redirect to the dashboard or any other authorized page
    // navigate('/my-account');
    window.location.href = `${locale==='ar'?'':'/en'}/my-account`;
  };
  const fbLogin = async (email: any, id: any, name: any) => {
    try {
      const response = (await checkFBLogin(email, id, name)) as FBLoginResponse;
      const trimmedMsg = response.msg.trim(); // Trim leading and trailing spaces
      if (response.status) {
        if (response.msg_code === "login_error") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: response.msg,
          }));
        } else if (response.msg_code === "login_success") {
          console.log("Success Login with FB");
          handleLoginSuccess(response.user_id, response.token);
        } else if (trimmedMsg === "Account Created") {
            console.log("Success Login with Google");
            handleLoginSuccess(response.user_id, response.token);
          } else {
          //   scrollToFirst();
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "An error occurred.",
          }));
        }
        setIsLoading(false);
      } else if (response.ERR === "ERR_No_Payload") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "No payload received.",
        }));
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul className="flex flex-wrap justify-between gap-4 -mx-2 md:flex-nowrap">
        <li className="w-full px-2">
          <FacebookLogin
            appId={appId}
            fields="name,email,picture"
            onSuccess={(response) => {
              handleFacebookLogin(response);
            }}
            onProfileSuccess={(response) => {
              handleFacebookonProfileSuccess(response);
            }}
            render={(renderProps) => (
              <button
                className="rounded-lg border-2 border-gray-300 py-2 md:py-4 px-4 md:px-6 text-primary-300 flex items-center w-full text-sm font-medium justify-between flex-row transition-all hover:border-3 hover:bg-primary-300 hover:border-primary-300 hover:text-white"
                onClick={renderProps.onClick}
              >
               
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1950_2271)">
                    <path
                      d="M23.082 0H1.819C1.09 0 0.5 0.591 0.5 1.319V22.582C0.5 23.311 1.09 23.901 1.819 23.901H13.266V14.645H10.151V11.038H13.266V8.378C13.266 5.291 15.152 3.61 17.905 3.61C19.224 3.61 20.358 3.708 20.688 3.752V6.978L18.778 6.979C17.28 6.979 16.99 7.691 16.99 8.735V11.038H20.562L20.097 14.645H16.99V23.901H23.081C23.81 23.901 24.4 23.31 24.4 22.582V1.319C24.4 0.59 23.809 0 23.081 0"
                      fill="#3B5998"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1950_2271">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                {t("login_with_facebook")}
              </button>
            )}
          />
        </li>
        <li className="w-full px-2">
          <button
            onClick={() => login()}
            className="rounded-lg border-2 border-gray-300 py-2 md:py-4 px-4 md:px-6 text-primary-300 flex items-center w-full text-sm font-medium justify-between flex-row transition-all hover:border-3 hover:bg-primary-300 hover:border-primary-300 hover:text-white"
          >
           
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                fill="#4285F4"
              />
              <path
                d="M11.9999 22.9996C14.9699 22.9996 17.4599 22.0196 19.2799 20.3396L15.7099 17.5696C14.7299 18.2296 13.4799 18.6296 11.9999 18.6296C9.13993 18.6296 6.70993 16.6996 5.83993 14.0996H2.17993V16.9396C3.98993 20.5296 7.69993 22.9996 11.9999 22.9996Z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.0903C5.62 13.4303 5.49 12.7303 5.49 12.0003C5.49 11.2703 5.62 10.5703 5.84 9.91031V7.07031H2.18C1.43 8.55031 1 10.2203 1 12.0003C1 13.7803 1.43 15.4503 2.18 16.9303L5.03 14.7103L5.84 14.0903Z"
                fill="#FBBC05"
              />
              <path
                d="M11.9999 5.38C13.6199 5.38 15.0599 5.94 16.2099 7.02L19.3599 3.87C17.4499 2.09 14.9699 1 11.9999 1C7.69993 1 3.98993 3.47 2.17993 7.07L5.83993 9.91C6.70993 7.31 9.13993 5.38 11.9999 5.38Z"
                fill="#EA4335"
              />
            </svg>
            {t("login_with_google")}
          </button>
        </li>
      </ul>
    </div>
  );
}
