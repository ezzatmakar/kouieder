"use client";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import {
  RiHeartLine,
  RiHome2Line,
  RiMenuFill,
  RiShoppingBagLine,
  RiUserLine,
  RiWallet3Line,
} from "react-icons/ri";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import HomeMenu  from "../icons/HomeMenu";
import ShoppingBagMenu  from "../icons/ShoppingBagMenu";
import HeartMenu from "../icons/HeartMenu";
import LocationMenu from "../icons/LocationMenu";
import WalletMenu from "../icons/WalletMenu";
import UserMenu from "../icons/UserMenu";
import LogoutMenu from "../icons/LogoutMenu";

export default function MyAccountToggle() {
  // const { t } = useTranslation('account');
  // const { i18n } = useTranslation();
  const locale = useLocale();
  const t = useTranslations("account");
  // const user_id = useState(Cookies.get('user_id'));
  const user_id = Cookies.get("user_id");

  // const navItems = [
  //   { path: "/my-account", label: t("home"), icon: <RiMenuFill /> },
  //   {
  //     path: "/my-account/addresses",
  //     label: t("shipping_addresses"),
  //     icon: <RiHome2Line />,
  //   },
  //   {
  //     path: "/my-account/wallet",
  //     label: t("my_wallet"),
  //     icon: <RiWallet3Line />,
  //   },
  //   {
  //     path: "/my-account/wishlist",
  //     label: t("my_wishlist"),
  //     icon: <RiHeartLine />,
  //   },
  //   {
  //     path: "/my-account/orders",
  //     label: t("orders_returns"),
  //     icon: <RiShoppingBagLine />,
  //   },
  //   {
  //     path: "/my-account/profile",
  //     label: t("account_info"),
  //     icon: <RiUserLine />,
  //   },
  // ];
  const navItems = [
    { path: "/my-account",
     label: t("home"),
      icon: <HomeMenu /> 
    },
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
  useEffect(() => {
    const accountSpan = document.getElementById("accountSpan");
    if (accountSpan) {
      accountSpan.textContent = user_id ? t("my_account") : t("login");
    }
  }, [user_id]);

  // console.log('user_id',user_id)
  return (
    <div>
      {user_id ? (
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                inline-flex items-center px-0 py-2 text-[13px] focus:outline-none text-primary-300 gap-3 whitespace-nowrap`}
                data-testid="open_account_menu-button"
              >
                <span className="flex items-center h-8 min-w-8">
                    <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.2901 17.2949C20.3229 16.6377 21.1726 15.7299 21.7601 14.656C22.3477 13.582 22.6539 12.3769 22.6502 11.1527C22.6502 7.11023 19.3427 3.80273 15.3002 3.80273C11.2577 3.80273 7.95024 7.11023 7.95024 11.1527C7.95024 13.7252 9.26221 15.9829 11.3104 17.2949C8.10826 18.8176 5.85059 22.0724 5.85059 25.8527H7.95024C7.95024 21.8102 11.2577 18.5027 15.3002 18.5027C19.3427 18.5027 22.6502 21.8102 22.6502 25.8527H24.7499C24.7499 22.0724 22.4934 18.8176 19.2901 17.2949ZM10.0499 11.1527C10.0538 9.76145 10.6082 8.42825 11.592 7.44446C12.5758 6.46067 13.9089 5.90626 15.3002 5.90238C16.6915 5.90626 18.0247 6.46067 19.0085 7.44446C19.9923 8.42825 20.5467 9.76145 20.5506 11.1527C20.5467 12.544 19.9923 13.8772 19.0085 14.861C18.0247 15.8448 16.6915 16.3992 15.3002 16.4031C13.9089 16.3992 12.5758 15.8448 11.592 14.861C10.6082 13.8772 10.0538 12.544 10.0499 11.1527Z" fill="#5066A2"/>
                    </svg>
                </span>
                <span id="accountSpan">
                  {user_id ? t("my_account") : t("login")}
                </span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } h-5 w-5 text-orange-300 transition duration-150 ease-in-out`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  className={`absolute z-20 px-4 transform w-96 sm:px-0 ${
                    locale === "en"
                      ? "left-0 lg:left-auto lg:right-0"
                      : "right-0 lg:right-auto lg:left-0"
                  } ${user_id ? "max-w-sm" : "max-w-xs"}`}
                >
                  <div className="p-4 overflow-hidden bg-white rounded-3xl shadow-custom">
                    <div className="relative space-y-4">
                      {user_id ? (
                        <div className="text-base font-medium text-black">
                          {navItems.map((item, index) => (
                            <Link prefetch={false}
                              href={item.path}
                              className="flex items-center justify-start w-full gap-3 px-2 rounded-md cursor-pointer hover:bg-primary-103"
                              key={index}
                              data-testid="account-link"
                              onClick={close}
                            >
                              <div className="flex items-center h-16 min-w-16">
                                {item.icon}
                              </div>
                              <span className="block mr-auto">
                                {item.label}
                              </span>
                              <div className="flex items-center w-8 ltr:rotate-180">
                                <ChevronLeftIcon />
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-base font-medium text-black">
                          <Link prefetch={false}
                            href="/signup"
                            onClick={close}
                            data-testid="signup-link"
                            className="flex items-center justify-between w-full gap-3 px-2 rounded-md cursor-pointer hover:bg-primary-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center h-16 min-w-16">
                                <RiUserLine />
                              </div>
                              <span className="block">{t("sign_up")}</span>
                            </div>
                            <div className="flex items-center w-8 ltr:rotate-180">
                              <ChevronLeftIcon />
                            </div>
                          </Link>
                          <Link prefetch={false}
                            href="/login"
                            onClick={close}
                            data-testid="login-link"
                            className="flex items-center justify-between w-full gap-3 px-2 rounded-md cursor-pointer hover:bg-primary-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center h-16 min-w-16">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19.2901 17.2949C20.3229 16.6377 21.1726 15.7299 21.7601 14.656C22.3477 13.582 22.6539 12.3769 22.6502 11.1527C22.6502 7.11023 19.3427 3.80273 15.3002 3.80273C11.2577 3.80273 7.95024 7.11023 7.95024 11.1527C7.95024 13.7252 9.26221 15.9829 11.3104 17.2949C8.10826 18.8176 5.85059 22.0724 5.85059 25.8527H7.95024C7.95024 21.8102 11.2577 18.5027 15.3002 18.5027C19.3427 18.5027 22.6502 21.8102 22.6502 25.8527H24.7499C24.7499 22.0724 22.4934 18.8176 19.2901 17.2949ZM10.0499 11.1527C10.0538 9.76145 10.6082 8.42825 11.592 7.44446C12.5758 6.46067 13.9089 5.90626 15.3002 5.90238C16.6915 5.90626 18.0247 6.46067 19.0085 7.44446C19.9923 8.42825 20.5467 9.76145 20.5506 11.1527C20.5467 12.544 19.9923 13.8772 19.0085 14.861C18.0247 15.8448 16.6915 16.3992 15.3002 16.4031C13.9089 16.3992 12.5758 15.8448 11.592 14.861C10.6082 13.8772 10.0538 12.544 10.0499 11.1527Z" fill="#5066A2"/>
                                </svg>
                              </div>
                              <span className="block">{t("login")}</span>
                            </div>
                            <div className="flex items-center w-8 ltr:rotate-180">
                              <ChevronLeftIcon />
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <Link prefetch={false} href="/login" onClick={close} data-testid="login-link" className="inline-flex items-center px-0 py-2 text-[13px] focus:outline-none text-white gap-3 whitespace-nowrap">
          <span className="flex items-center h-8 min-w-8">
            {/* <RiUserLine /> */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2901 17.2949C20.3229 16.6377 21.1726 15.7299 21.7601 14.656C22.3477 13.582 22.6539 12.3769 22.6502 11.1527C22.6502 7.11023 19.3427 3.80273 15.3002 3.80273C11.2577 3.80273 7.95024 7.11023 7.95024 11.1527C7.95024 13.7252 9.26221 15.9829 11.3104 17.2949C8.10826 18.8176 5.85059 22.0724 5.85059 25.8527H7.95024C7.95024 21.8102 11.2577 18.5027 15.3002 18.5027C19.3427 18.5027 22.6502 21.8102 22.6502 25.8527H24.7499C24.7499 22.0724 22.4934 18.8176 19.2901 17.2949ZM10.0499 11.1527C10.0538 9.76145 10.6082 8.42825 11.592 7.44446C12.5758 6.46067 13.9089 5.90626 15.3002 5.90238C16.6915 5.90626 18.0247 6.46067 19.0085 7.44446C19.9923 8.42825 20.5467 9.76145 20.5506 11.1527C20.5467 12.544 19.9923 13.8772 19.0085 14.861C18.0247 15.8448 16.6915 16.3992 15.3002 16.4031C13.9089 16.3992 12.5758 15.8448 11.592 14.861C10.6082 13.8772 10.0538 12.544 10.0499 11.1527Z" fill="#5066A2"/>
            </svg>

          </span>
          {/* <span id="accountSpan">{t("login")}</span> */}
        </Link>
      )}
    </div>
  );
}
