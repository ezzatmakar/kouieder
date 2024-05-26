"use client";
import { useCurrency } from "@/CurrencyContext";
import { FRONTEND_ENDPOINT } from "@/app/config";
import { useRouter } from "@/navigation";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import CurrencySwitcherMobile from "./CurrencySwitcherMobile";

const CurrencySwitcher = ({ inMobile }: any) => {
  // @ts-ignore
  // const { formatMessage } = useFormatter();
  // const router = useRouter();
  // @ts-ignore
  // const { pathname } = router;
  // const pathname = usePathname()
  const { currency, setCurrency } = useCurrency();
  const t = useTranslations("common");
  // const locale = useLocale();
  // const handleCurrencyChange = (newCurrency: any) => {
  //     setCurrency(newCurrency);
  // };

  const getFlagImage = (currencyCode: any) => {
    if (currencyCode === "AED") {
      return "/images/en.webp";
    } else if (currencyCode === "EGP") {
      return "/images/eg.webp";
    }
    return "";
  };

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleCurrencyChange = (newCurrency: any) => {
    // console.log("handleCurrencyChange", newCurrency);

    if (newCurrency === "AED") {
      // Only update the subdomain if the currency is 'AED'
      const newSubdomain = "uae"; // Update with your desired subdomain
      const newUrl = `https://${newSubdomain}.${FRONTEND_ENDPOINT}${pathname}`;
      router.replace(newUrl, { locale: locale });
    } else {
      const newUrl = `https://${FRONTEND_ENDPOINT}${pathname}`;
      router.replace(newUrl, { locale: locale });
    }

    // Always update the currency
    // setCurrency(newCurrency);
  };
  const onLocaleChange = (e: any) => {
    const newLocale = e;
    router.replace(pathname, { locale: newLocale });
  };

  let [isAddAdress, setIsAddAdress] = useState(false);

  // console.log('pathname', pathname)
  // console.log('locale', locale)
  const popoverButtonRef = useRef(null);

  // Function to handle closing the popover
  const handlePopoverClose = () => {
    // Call close with the ref to focus the Popover.Button after closing
    close();
  };
  return (
    <div>
      <Popover className="CurrencySwitcher relative">
        {({ open }) => (
          <>
            <Popover.Button
              ref={popoverButtonRef}
              className={`${
                open ? "" : "text-opacity-90"
              } inline-flex gap-1 items-center py-2 md:py-0 text-sm whitespace-nowrap font-medium focus:outline-none w-full bg-white md:!bg-transparent md:rounded-none rounded-100 justify-between md:border-none border-2 border-gray-300 px-4`}
            >
              {/* <div className="min-w-8 flex items-center md:h-8">
                <Image
                  src={getFlagImage(currency)}
                  alt={currency}
                  width={16}
                  height={16}
                />
              </div> */}
              
                {locale === "ar" ? <Image src="/images/eg.webp" alt="eg flag" width={16} height={16} className="rounded-full"/> : <Image src="/images/en.webp" alt="eg flag" width={16} height={16} className="rounded-full"/>}
              <span className="text-primary-300">
                {t("change_language")}
              </span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } h-3 w-3 text-primary-300 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </Popover.Button>
            {!inMobile && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="fixed bottom-0 top-0 z-[999999] flex w-full transform items-end ltr:left-0 rtl:right-0 md:absolute md:bottom-auto md:top-full md:w-96 md:max-w-xs">
                  {inMobile && (
                    <Popover.Button onClick={() => close()}>
                      <div className="fixed inset-0 z-10 bg-black opacity-25" />
                    </Popover.Button>
                  )}
                  <div className="shadow-custom z-20 w-full overflow-hidden rounded-t-3xl bg-white md:rounded-3xl">
                    {inMobile && (
                      <div className="relative border-b border-gray-100 px-6 py-5">
                        <h3 className="text-xl font-bold">
                          {t("country")} {t("and")} {t("language")}
                        </h3>
                        <Popover.Button
                          onClick={() => close()}
                          type="button"
                          className="text-gray-400 hover:text-gray-500 absolute top-5 -m-2 rounded-full border border-gray-300 p-2 outline-none ltr:right-5 rtl:left-5"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </Popover.Button>
                      </div>
                    )}
                    <div className="relative space-y-4 p-4">
                      {/* <div className="space-y-4">
                        <h4 className="border-b border-gray-100 py-3 text-xl font-medium text-slate-900">
                          {t("country")} {t("and")} {t("currency")}
                        </h4>
                        <div
                          className={`flex items-center justify-between flex-row-reverse w-full text-base font-medium text-black cursor-pointer transition-all px-3 rounded-2xl ${
                            currency === "EGP"
                              ? "bg-primary-300"
                              : "hover:bg-primary-300"
                          }`}
                          onClick={() => handleCurrencyChange("EGP")}
                          data-testid="change_currency_egp-button"
                        >
                          <div className="min-w-16 flex h-12 items-center">
                            <Image
                              src={getFlagImage("EGP")}
                              alt={"EGP"}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="block">{t("egypt")} (EGP)</span>
                            <div className="min-w-16 flex h-12 items-center">
                              {currency === "EGP" ? <RiCheckLine /> : ""}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-between flex-row-reverse w-full text-base font-medium text-black cursor-pointer transition-all px-3 rounded-2xl  ${
                            currency === "AED"
                              ? "bg-primary-300"
                              : "hover:bg-primary-300"
                          }`}
                          onClick={() => handleCurrencyChange("AED")}
                          data-testid="change_currency_aed-button"
                        >
                          <div className="min-w-16 flex h-12 items-center">
                            <Image
                              src={getFlagImage("AED")}
                              alt="AED"
                              width="24"
                              height="24"
                              className=""
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="block">{t("aed")} (AED)</span>
                            <div className="min-w-16 flex h-12 items-center">
                              {currency === "AED" ? <RiCheckLine /> : ""}
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="space-y-4">
                        <h4 className="border-b border-gray-100 py-3 text-xl font-medium text-slate-900">
                          {t("language")}
                        </h4>
                        <div
                          className={`flex items-center justify-between flex-row-reverse w-full text-base font-medium text-black cursor-pointer transition-all px-3 rounded-2xl  ${
                            locale === "en"
                              ? "bg-primary-300"
                              : "group hover:bg-primary-300"
                          }`}
                          onClick={() => onLocaleChange("en")}
                          data-testid="change_lang_en-button"
                        >
                          <div className="min-w-16 flex h-12 items-center">
                            <Image
                              src={"/images/en.svg"}
                              alt={"web"}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className={`flex gap-3 items-center group-hover:text-white ${locale === "en"? "text-white": ""}`}>
                            <span className="block">{t("lng_en")}</span>
                            <div className="min-w-16 flex h-12 items-center text-white">
                              {locale === "en" ? <RiCheckLine /> : ""}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-between flex-row-reverse w-full text-base font-medium text-black cursor-pointer transition-all px-3 rounded-2xl  ${
                            locale === "ar"
                              ? "bg-primary-300"
                              : "group hover:bg-primary-300"
                          }`}
                          onClick={() => onLocaleChange("ar")}
                          data-testid="change_lang_ar-button"
                        >
                          <div className="min-w-16 flex h-12 items-center">
                            <Image
                              src={"/images/eg.svg"}
                              alt={"web"}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className={`flex gap-3 items-center group-hover:text-white ${locale !== "en"? "text-white": ""}`}>
                            <span className="block">{t("lng_ar")}</span>
                            <div className="min-w-16 flex h-12 items-center text-white">
                              {locale !== "en" ? <RiCheckLine /> : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      {inMobile && (
                        <div className="border-t border-gray-100 p-4 pt-6">
                          <Popover.Button
                            onClick={() => close()}
                            className="flex w-full items-center justify-center whitespace-nowrap rounded-100 bg-gray-200 px-8 py-3 text-xl font-semibold text-white hover:bg-primary-100"
                          >
                            {t("confirm")}
                          </Popover.Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
            {inMobile &&
              (open ? (
                <CurrencySwitcherMobile
                  open={open}
                  close={handlePopoverClose}
                />
              ) : null)}
          </>
        )}
      </Popover>
    </div>
  );
};

export default CurrencySwitcher;
