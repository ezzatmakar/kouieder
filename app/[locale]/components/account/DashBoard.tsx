"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  RiEdit2Fill,
  RiEdit2Line,
  RiEditBoxLine,
  RiEditFill,
  RiUserLine,
} from "react-icons/ri";
import { useTranslations } from "next-intl";
import { fetchUserInfo, getDefaultAddress } from "@/app/utils/account";
// import Msg from "../Msg";
import ReferralBox from "./ReferralBox";
import OrdersTable from "./OrdersTable";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import SingleAddress from "./SingleAddress";
import { AddressData, UserInfo } from "@/types";
import dynamic from "next/dynamic";
import OrdersTableLoader from "./OrderTableLoader";
import { API_ENDPOINT, FRONTEND_ENDPOINT } from "@/app/config";
import LocationMenu from "../icons/LocationMenu";
import UserMenu from "../icons/UserMenu";
const Msg = dynamic(() => import("../Msg"), { ssr: false });

export default function DashBoard({ userOrders }: any) {
  const t = useTranslations("account");
  const [address, setAddress] = useState<AddressData | null>(null);

  // const [userInfo, setUserInfo] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMsg, setIsMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Check if the 'isNewUser' cookie exists
  const isNewUserCookie = Cookies.get("isNewUser");
  const isCurrentUserCookie = Cookies.get("isCurrentUser");
  if (isNewUserCookie) {
    setIsMsg(true);
    setMsg("thankYouForJoining");
    Cookies.remove("isNewUser");
  }
  if (isCurrentUserCookie) {
    setIsMsg(true);
    setMsg("welcomeBack");
    Cookies.remove("isCurrentUser");
  }
  useEffect(() => {
    const fetchData = async () => {
      const responseAddress = await getDefaultAddress();
      setAddress(responseAddress as AddressData);
    };
    fetchData();
    
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setUserInfo(userInfo as UserInfo);
        setIsLoading(false);
      } else {
        // Handle the case when fetching user information fails
      }
    };
    getUserInfo();
  }, []);
  const storedPointRedeem = Cookies.get("pointRedeem");
  const storedPoints = Cookies.get("points");
  const storedPointsFactor = Cookies.get("PointsFactor");
  const [factor, setPointsFactor] = useState<number>(2 ?? 0);
  const [points, setPoints] = useState<number | null>(
    parseFloat(storedPoints ?? "0")
  );
  const [pointRedeem, setPointRedeem] = useState<number | null>(null);
  const user_id = Cookies.get("user_id");
  const currency = Cookies.get("currency");

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
  const fetchCashAndPointRedeem = () => {
    fetch(`${API_ENDPOINT}/my-account/wallet/check-fullpayment.php`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
        currency: currency,
      }),
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setPointRedeem(data.cash);
        Cookies.set("pointRedeem", data.cash);
      })
      .catch((error) => {
        console.error("Error fetching cash:", error);
      });
  };
  const fetchFactors = () => {
    fetch(`${API_ENDPOINT}/my-account/wallet/get-highest-rank.php`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user_id,
      }),
      headers,
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
    updateCurrencyData();
  }, [currency, storedPointsFactor, pointRedeem, factor]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isMsg && <Msg color="green" message={t(`${msg}`)} />}
      {isClient ? (
        <>
          <div className="flex flex-wrap justify-between gap-10 border-b border-gray-100 border-solid md:py-8 py-4">
            <div className="flex flex-col">
              <h1 className="mb-4 md:text-3xl text-xl font-bold">
                {t("account_home")}
              </h1>
              <p className="md:text-xl text-base text-gray-50">
                {t("account_home_subtitle")}
              </p>
            </div>
            <div className="flex items-center justify-between w-full max-w-full gap-3 p-3 border-2 border-gray-400 md:hidden md:border-gray-200 md:bg-primary-300 md:p-6 rounded-2xl">
              <span className="text-sm tracking-wider md:text-xl text-gray-50">
                {t("wallet_balance")}
              </span>
              {/* <span className="ml-20 text-3xl font-bold text-primary-900"><FormatCurrency value={400} /></span> */}
              <div
                className="flex flex-col gap-3 text-right"
                style={{ direction: "ltr" }}
              >
                <div className="text-sm font-bold">
                  <span className="text-xl">{points} POINTS </span>(
                  {pointRedeem} {currency})
                </div>
                <div className="bg-[#DADAD9] h-[6px] rounded-md relative">
                  <span className="absolute bg-gray-200 rounded-md right-0 w-1/3 h-[6px]"></span>
                </div>
                <p className="text-sm font-medium text-gray-50">
                  800 Points to Gold
                </p>
              </div>
            </div>
            <div className="items-center justify-between hidden max-w-full gap-3 p-6 bg-primary-103 border-2 border-[#A8B8E0] md:flex w-96 rounded-2xl">
              <span className="text-sm tracking-wider md:text-xl text-gray-50">
                {t("wallet_balance")}
              </span>
              <div
                className="flex flex-col gap-3 text-right"
                style={{ direction: "ltr" }}
              >
                <div className="text-2xl font-bold text-primary-300">
                  {pointRedeem} {currency}
                </div>
              </div>
            </div>
          </div>

          <div className="md:py-8 py-4 md:border-b border-gray-100 border-solid md:border-t-0 border-t">
            <div className="md:py-9 py-4">
              <h2 className="md:text-2xl text-xl font-bold">
                {t("share_friends_title")}
              </h2>
              <p className="md:text-xl text-base text-gray-50">
                {t("share_friends_subtitle")}
              </p>
            </div>
            <ReferralBox url={"/ref?76543345"} />
          </div>

          <div className="md:py-8 py-4 md:mt-10">
            <h2 className="pb-2 mb-4 text-xl font-bold border-b border-gray-100 border-solid">
              {t("my_orders")}
            </h2>
            <div className="w-full overflow-scroll no-scrollbar">
              {isLoading && <OrdersTableLoader />}
            </div>

            {!isLoading && userOrders.length === 0 && !errorMessage && (
              <>
                <p className="text-gray-500">{t("no_orders")}</p>
                <Link prefetch={false}
                  href="/"
                  className="inline-flex justify-center px-10 py-2 mt-4 text-sm font-semibold text-white bg-primary-300 md:text-base rounded-lg hover:bg-primary-400"
                >
                  {t("start_shopping")}
                </Link>
              </>
            )}

            {!isLoading && userOrders.length > 0 && !errorMessage && (
              <OrdersTable userOrders={userOrders} />
            )}
            {/* <OrdersTable userOrders={userOrders} /> */}
          </div>

          <div className="md:py-8 py-4 md:mt-10">
            <h2 className="pb-2 mb-4 text-xl font-bold border-b border-gray-100 border-solid">
              {t("account_info")}
            </h2>
            <div className="">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="bg-white border border-gray-400 rounded-lg divide-y divide-gray-400">
                    <div className="px-4 py-5 space-y-2">
                      <div className="flex items-center gap-2 mb-1 text-xl font-semibold">
                          <UserMenu />{" "}
                        <span className="text-base">{t("your_info")}</span>
                      </div>
                      <div className="block">
                        {isLoading ? (
                          <div className="w-20 mt-1 animate-pulse">
                            <div className="h-2 bg-gray-200 rounded-md"></div>
                          </div>
                        ) : (
                          <span className="block text-xl font-medium text-gray-400">
                            {userInfo?.first_name} {userInfo?.last_name}
                          </span>
                        )}
                      </div>
                      <div className="block">
                        {isLoading ? (
                          <div className="w-20 mt-1 animate-pulse">
                            <div className="h-2 bg-gray-200 rounded-md"></div>
                          </div>
                        ) : (
                          <span className="block text-xl font-medium text-gray-400">
                            {userInfo?.email}
                          </span>
                        )}
                      </div>
                      <div className="block">
                        {isLoading ? (
                          <div className="w-20 mt-1 animate-pulse">
                            <div className="h-2 bg-gray-200 rounded-md"></div>
                          </div>
                        ) : (
                          <span className="block text-xl font-medium text-gray-400">
                            {userInfo?.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex px-4 py-5">
                      <Link prefetch={false}
                        href="/my-account/profile"
                        className="inline-flex items-center py-2.5 px-5 gap-3 rounded-lg bg-primary-103 hover:bg-primary-300 font-semibold ltr:ml-auto rtl:mr-auto hover:text-white  transition-all"
                      >
                        {t("edit")}
                        {/* <RiEditBoxLine /> */}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  {/* <SingleAddress address={address} overview={true} /> */}
                  {address !== null ? (
                    <SingleAddress address={address} overview={true} />
                  ) : (
                    // You can provide a fallback or message when 'address' is null
                    <p>No address data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
