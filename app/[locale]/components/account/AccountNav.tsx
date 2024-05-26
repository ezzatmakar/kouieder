"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import HeartMenu from "../icons/HeartMenu";
import HomeMenu from "../icons/HomeMenu";
import LocationMenu from "../icons/LocationMenu";
import LogoutMenu from "../icons/LogoutMenu";
import ShoppingBagMenu from "../icons/ShoppingBagMenu";
import UserMenu from "../icons/UserMenu";
import WalletMenu from "../icons/WalletMenu";

import { useLocale, useTranslations } from "next-intl";
// import { Link } from "@/navigation";
// import { Link } from "@/navigation";
import { useUser } from "@/app/UserContext";
import { INPUT_CLASSES } from "@/app/commonUIClasses";
import { fetchUserInfo, getUserWallet } from "@/app/utils/account";
import { Link, usePathname } from "@/navigation";
import { UserInfo, UserWallet } from "@/types";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

export default function AccountNav({ customCall = false }: any) {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membershipClass, setMembershipClass] = useState("");
  const { userInfo, updateUserInfo } = useUser();
  const [userWallet, setUserWallet] = useState<UserWallet>();
  // const { updateUserInfo } = useUser();
  useEffect(() => {
    const user_id = Cookies.get("user_id");
    const token = Cookies.get("token");
    if (!user_id) {
      // navigate('/login');
      window.location.href = `${locale === "ar" ? "" : "/en"}/login`;
      return;
    }
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        //   setUserInfo(userInfo as UserInfo);
        updateUserInfo(userInfo as UserInfo);
        setMembershipClass((userInfo as UserInfo)?.rank as string);
      } else {
        // Handle the case when fetching user information fails
      }
    };

    getUserInfo();
  }, []);
  const t = useTranslations("account");
  const [isLoading, setIsLoading] = useState(true);

  const { first_name = "", last_name = "" } = userInfo || {};

  useEffect(() => {
    if (userInfo && userInfo.first_name !== "") {
      setIsLoading(false);
    }
  }, [userInfo]);

  const navItems = [
    { path: "/my-account", label: t("home"), icon: <HomeMenu /> },
    {
      path: "/my-account/orders",
      label: t("orders_returns"),
      icon: <ShoppingBagMenu />,
    },
    {
      path: "/my-account/wishlist",
      label: t("my_wishlist"),
      icon: <HeartMenu />,
    },
    {
      path: "/my-account/addresses",
      label: t("shipping_addresses"),
      icon: <LocationMenu />,
    },
    {
      path: "/my-account/wallet",
      label: t("my_wallet"),
      icon: <WalletMenu />,
    },
    {
      path: "/my-account/profile",
      label: t("account_info"),
      icon: <UserMenu />,
    },
  ];

  const pathname = usePathname();

  const isActiveNavItem = (path: string) => {
    return (
      pathname === path ||
      (pathname.startsWith(path) &&
        pathname.includes("/orders/") &&
        path !== "/my-account")
    );
  };
  const activeNavItem = navItems.find((item) => isActiveNavItem(item.path));
  const isUAE =
    typeof window !== "undefined" && window.location.hostname.includes("uae.");
  const initialCurrency = isUAE ? "AED" : "EGP";
  useEffect(() => {
    const callUserWallet = async () => {
      const userWalletData = await getUserWallet(initialCurrency);
      if (userWalletData) {
        setUserWallet(userWalletData as UserWallet);
      } else {
      }
    };

    callUserWallet();
  }, []);
  const handleLogout = () => {
    Cookies.remove("user_id");
    Cookies.remove("token");
    localStorage.removeItem("wishlistItems");
    localStorage.removeItem("userInfo");
    // window.location.reload();
    window.location.href = `${locale === "ar" ? "" : "/en"}/`;
  };
  const handleOptionSelect = (selectedValue: any) => {
    const handleOptionSelectURL = `${selectedValue}`;
    const completeURL = window.location.origin + handleOptionSelectURL;
    window.location.assign(completeURL);
  };
  let membershipClasses = "bg-gradient-to-r from-gray-200 to-white";
  if (membershipClass === "platinum") {
    membershipClasses = "bg-gradient-to-r from-black to-[#414141]";
  }
  if (membershipClass === "gold") {
    membershipClasses =
      "bg-gradient-to-b from-primary-600 to-primary-600 text-white";
  }
  if (membershipClass === "silver") {
    membershipClasses = "bg-gradient-to-r from-gray-200 to-white";
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full py-5 space-y-2 text-gray-500 bg-primary-103 md:bg-white md:w-72 lg:w-96 shadow-custom-desktop md:rounded-[32px]">
      <div className="divide-y divide-gray-100">
        {/* Info */}
        {isLoading ? (
          <div className="flex items-center px-8">
            <div className="">
              <div className="py-0.5">
                <div className="w-20 h-8 rounded-lg bg-gray-50"></div>
              </div>
              <div className="py-2">
                <div className="w-24 bg-gray-200 rounded-lg h-9"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8">
            <div
              className={`px-3 py-0.5 rounded-lg justify-center items-center gap-2 inline-flex text-gray-50 shadow ${membershipClasses}`}
            >
              <div className="flex items-center justify-center gap-1">
                <div className="text-base font-semibold leading-relaxed">
                  {t(`${membershipClass}`)}
                </div>
              </div>
            </div>

            <div className="py-2 mt-2">
              <h2 className="text-3xl font-semibold capitalize">
                {t("hey")} {first_name}
              </h2>
            </div>
          </div>
        )}

        <div>
          <ul className="hidden px-4 text-base md:block">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  prefetch={false}
                  href={item.path}
                  className={`flex items-center p-2 space-x-2 rounded-md font-semibold ${
                    isActiveNavItem(item.path)
                      ? "bg-primary-103"
                      : "hover:bg-primary-103"
                  }`}
                >
                  <span className="p-2 text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="capitalize mx-8 pt-2 pb-4 border-b border-gray-100 text-base font-bold">
            {t("title_need_help")} {first_name}
          </h2>
          <ul className="hidden px-4 pt-2 pb-4 space-y-1 text-base font-semibold text-primary-200 md:block">
            <li>
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                href="/faqs"
                className="flex items-center p-2 underline rounded-md hover:bg-primary-300 hover:text-white"
              >
                <span>{t("faqs")}</span>
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                href="/contact-us"
                className="flex items-center p-2 underline rounded-md hover:bg-primary-300 hover:text-white"
              >
                <span>{t("need_help")}</span>
              </Link>
            </li>
          </ul>
        </div>

        <>
          <ul className="hidden px-8 py-6 space-y-1 text-base font-semibold text-gray-200 md:block">
            <li>
              <button
                className="flex items-center py-2.5 px-5 gap-3 text-primary-100 rounded-lg border-2 border-primary-100 hover:bg-primary-300 hover:text-white hover:border-primary-300"
                onClick={handleLogout}
              >
                <span>{t("log_out")}</span>
                <LogoutMenu />
              </button>
            </li>
          </ul>

          {/* For Mobile */}
          <div className="block px-4 pt-6 md:hidden">
            <div className="w-full">
              <div
                className={`${INPUT_CLASSES} cursor-pointer flex justify-between items-center bg-white`}
                onClick={openModal}
              >
                {activeNavItem ? activeNavItem.label : ""}
                <Image
                  src="/images/icons/chevron-down.svg"
                  // layout="fill"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  quality={100}
                  alt="icon"
                  width={16}
                  height={16}
                />
              </div>

              <Dialog
                open={isModalOpen}
                onClose={closeModal}
                className="relative z-50"
              >
                <div
                  className="fixed inset-0 bg-black/75 z-10"
                  aria-hidden="true"
                />

                <div className="fixed inset-0 w-screen overflow-y-auto  z-20">
                  <div className="flex min-h-full items-center justify-center">
                    <Dialog.Panel className="mt-auto rounded bg-white rounded-t-3xl w-full">
                      <Dialog.Title>
                        <div className="px-4 py-5 border-b border-gray-100 relative">
                          <h3 className="text-xl font-bold">{t("menu")}</h3>

                          <button
                            onClick={closeModal}
                            className="absolute p-2 -m-2 text-gray-400 border border-gray-300 rounded-full outline-none hover:text-gray-500 top-5 ltr:right-5 rtl:left-5"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </Dialog.Title>

                      <div className="relative p-4 space-y-4">
                        <ul className="px-0 pt-2 pb-4 space-y-4 text-base">
                          {navItems.map((item) => (
                            <li key={item.path}>
                              <Link
                                prefetch={false}
                                href={item.path}
                                onClick={closeModal}
                                className={`flex items-center p-2 space-x-2 rounded-md font-semibold ${
                                  isActiveNavItem(item.path)
                                    ? "bg-primary-100 "
                                    : "hover:bg-primary-100 hover:text-white"
                                }`}
                              >
                                <span className="p-2 text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          ))}
                          <li>
                            <button
                              className="flex items-center py-2.5 px-5 gap-3 text-primary-200 rounded-lg border-2 border-primary-200 hover:bg-primary-300 hover:text-white hover:border-primary-300"
                              onClick={handleLogout}
                            >
                              <span>{t("log_out")}</span>
                              <LogoutMenu />
                            </button>
                          </li>
                        </ul>
                        <div className="p-4 pt-6 border-t border-gray-100">
                          <button
                            onClick={closeModal}
                            className="flex items-center justify-center w-full px-8 py-3 text-xl font-semibold text-white bg-primary-300 hover:bg-primary-400 hover:text-white border-2 border-primary-300 rounded-lg whitespace-nowrap"
                          >
                            {t("cancel")}
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
