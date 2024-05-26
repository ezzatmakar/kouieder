import { useState } from "react";
// import { Dialog } from '@headlessui/react'
import { useCurrency } from "@/CurrencyContext";
import { FRONTEND_ENDPOINT } from "@/app/config";
import { usePathname, useRouter } from "@/navigation";
import { Dialog, Popover } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { RiCheckLine } from "react-icons/ri";

export default function CurrencySwitcherMobile({ open, close }: any) {
  let [isOpen, setIsOpen] = useState(open);

  const t = useTranslations("common");
  const getFlagImage = (currencyCode: any) => {
    if (currencyCode === "AED") {
      return "/images/aed.webp";
    } else if (currencyCode === "EGP") {
      return "/images/egypt.webp";
    }
    return "";
  };
  const { currency, setCurrency } = useCurrency();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleCurrencyChange = (newCurrency: any) => {
    // console.log("handleCurrencyChange");
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
    setCurrency(newCurrency);
  };
  const onLocaleChange = (e: any) => {
    const newLocale = e;
    router.replace(pathname, { locale: newLocale });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 z-10 bg-black/75" aria-hidden="true" />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="mt-auto w-full rounded rounded-t-3xl bg-white">
            <Dialog.Title>
              <div className="relative border-b border-gray-100 px-6 py-5">
                <h3 className="text-xl font-bold">{t("language")}</h3>

                <Popover.Button
                  onClick={() => setIsOpen(false)}
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
            </Dialog.Title>

            <div className="relative p-4">
              <div>
                <div
                  className="flex w-full cursor-pointer items-center justify-start p-[14px] text-xl font-medium text-black"
                  onClick={() => onLocaleChange("en")}
                >
                  <div className="flex items-center">
                    {locale === "en" ? (
                      <span className="m-auto flex h-[28px] w-[28px] items-center justify-center rounded-md bg-primary-100">
                        {" "}
                        <RiCheckLine />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <span className="block ltr:ml-3 ltr:mr-auto rtl:ml-auto rtl:mr-3">
                    {t("lng_en")}
                  </span>
                </div>
                <div
                  className="flex w-full cursor-pointer items-center justify-start border-t border-gray-300 p-[14px] text-xl font-medium text-black"
                  onClick={() => onLocaleChange("ar")}
                >
                  <div className="flex items-center">
                    {locale !== "en" ? (
                      <span className="m-auto flex h-[28px] w-[28px] items-center justify-center rounded-md bg-primary-100">
                        <RiCheckLine />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <span className="block ltr:ml-3 ltr:mr-auto rtl:ml-auto rtl:mr-3">
                    {t("lng_ar")}
                  </span>
                </div>
              </div>
              {/* <div className="border-t border-gray-100 p-4 pt-6">
                <Popover.Button
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center whitespace-nowrap rounded-100 bg-gray-200 px-8 py-3 text-xl font-semibold text-white hover:bg-primary-100"
                >
                  {t("confirm")}
                </Popover.Button>
              </div> */}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
