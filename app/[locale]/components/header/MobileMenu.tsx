"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
// import { fetchCats, fetchNav } from '~/utils/general';
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/navigation";
// import { useTranslation } from 'react-i18next';
// import CurrencySwitcher from '~/components/CurrencySwitcher';
import { fetchCats, fetchNav } from "@/app/api/general";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import CurrencySwitcher from "../CurrencySwitcher";

interface SubCategory {
  name: string;
  ar_name?: string;
  ar_category_name?: string;
  slug: string;
  // Other properties if applicable
}

interface Category {
  name: string;
  ar_name?: string;
  ar_category_name?: string;
  slug: string;
  link_to_category?: any;
  subcategories: SubCategory[];
  level_one_subcategories?: any[];
  // Other properties if applicable
}

export default function MobileMenu({ data }: any) {
  const t = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState(88);
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState([]);
  const [flashSale, setflashSale] = useState(false);

  // const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [navSuppoting, setNavSupporting] = useState([]);
  const [mainMenu, setMainMenu] = useState([]);
  const user_id = Cookies.get("user_id");

  // const location = useLocation();
  const pathname = usePathname();
  const handlaMenuOpen = () => {
    setOpen(!open);
    if (!open) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optionally, you can use 'auto' for immediate scroll
      });
    }
  };
  useEffect(() => {
    document.body.classList.toggle("overflow-y-hidden", open);

    return () => {
      // Clean up the class when the component unmounts
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [open]);
  useEffect(() => {
    const targetDiv = document.getElementById("FlashSale");

    if (targetDiv) {
      setTop(278);
      setflashSale(true)
    } else {
      setflashSale(false)
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCats();
      if (response) {
        setCats(response);
      } else {
        // Handle the case when fetching the cities fails
      }
    };
    fetchData();
  }, []);
  const categoriesWithSubcategories = cats.filter(
    (category: any) => category.subcategories.length > 0
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchNav();
      if (response) {
        setNavSupporting(response.supporting_menu);
        setMainMenu(response.main_menu);
      } else {
        // Handle the case when fetching the cities fails
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const updateHeaderHeight = () => {
        const navbarElement = document.querySelector("header") as HTMLElement;
        if (navbarElement) {
          const height = navbarElement.offsetHeight;
          // if (height > 144) {
          //   setHeaderHeight(149);
          // } else {
          // }
          setHeaderHeight(height);
        }
      };
      if (typeof window !== "undefined") {
        updateHeaderHeight();
        window.requestAnimationFrame(updateHeaderHeight);
        window.addEventListener("resize", updateHeaderHeight);
        window.addEventListener("scroll", updateHeaderHeight);
        return () => {
          window.removeEventListener("resize", updateHeaderHeight);
          window.removeEventListener("scroll", updateHeaderHeight);
        };
      }
    }, 500);
  }, []);
  return (
    <div>
      <button type="button" className="p-2 text-white" onClick={handlaMenuOpen}>
        <span className="sr-only">Open menu</span>
        {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
        <div className={`nav-icon3 ${open ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <React.Fragment>
        {/* Mobile menu */}
        <Transition show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={handlaMenuOpen}
          >
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={`fixed inset-0  ${flashSale ? "top-[278px]" : "top-[134px]"} bg-black bg-opacity-90`}
                onClick={() => handlaMenuOpen}
              />
            </Transition.Child>

            <div
              className="fixed bottom-0 left-0 z-20 w-screen transform"
              style={{ top: `${top}px` }}
            >
              <Transition.Child
                enter="transition ease duration-500 transform"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0 overflow-y-scroll max-h-full"
                leave="transition ease duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
              >
                <div
                  className={`border-t border-gray-100 ${flashSale ? " overflow-y-auto" : ""}`}
                  style={{ maxHeight: `calc(100vh - ${top}px)` }}
                >
                  <div className="relative bg-white text-base font-semibold">
                    <h3 className="border-b border-gray-100 px-4 py-3 text-2xl font-bold">
                      {t("categories")}
                    </h3>
                    <div className="">
                      <ul className="space-y-1 px-4 py-2">
                        <li className="w-full">
                          <Link prefetch={false}
                            href="/offers"
                            className="flex items-center gap-4 rounded-2xl p-2"
                            onClick={() => {
                              setOpen(false);
                            }}
                            data-testid="menu-item-link"
                          >
                            {/* <span className="p-2">
                              <img
                                src="/images/icons/interest.webp"
                                alt="icon"
                              />
                            </span> */}
                            <span>{t("offers_and_discounts")}</span>
                          </Link>
                        </li>
                        <li className="w-full">
                          <Link prefetch={false}
                            href="/best-selling"
                            className="flex items-center gap-4 rounded-2xl p-2"
                            onClick={() => {
                              setOpen(false);
                            }}
                            data-testid="menu-item-link"
                          >
                            <span>{t("best_selling")}</span>
                          </Link>
                        </li>
                        {data?.main_menu?.map((category: any, index: any) => (
                          <li key={index} className="w-full">
                            {category.level_one_subcategories?.length > 0 ? (
                              <span
                                onClick={() => setHoveredCategory(category)}
                                className={`flex items-center gap-4 p-2 cursor-pointer rounded-2xl  ${hoveredCategory?.slug === category.slug
                                  ? ""
                                  : "bg-primary-103"
                                  }`}
                              >
                                <span>
                                  {category.type === "page"
                                    ? `${locale === "ar"
                                      ? category.page_title_ar
                                      : category.page_title
                                    }`
                                    : `${locale === "ar"
                                      ? category.ar_category_name
                                      : category.link_to_category.name
                                    }`}
                                </span>
                                <span className="ltr:ml-auto ltr:rotate-180 rtl:mr-auto">
                                  <ChevronLeftIcon className="h-6 w-6" />
                                </span>
                              </span>
                            ) : (
                              <Link prefetch={false}
                                href={`/category/${category.link_to_category.slug}`}
                                onClick={() => {
                                  setOpen(false);
                                }}
                                className={`flex items-center gap-4 p-2 cursor-pointer rounded-2xl  ${hoveredCategory?.slug === category.slug
                                  ? ""
                                  : "bg-primary-103"
                                  }`}
                              >
                                <span>
                                  {category.type === "page"
                                    ? `${locale === "ar"
                                      ? category.page_title_ar
                                      : category.page_title
                                    }`
                                    : `${locale === "ar"
                                      ? category.ar_category_name
                                      : category.link_to_category.name
                                    }`}
                                </span>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {hoveredCategory ? (
                      <div className="absolute inset-0 bg-white">
                        <h3 className="border-b border-gray-100 px-4 py-3 text-2xl font-bold">
                          {locale === "en"
                            ? hoveredCategory.link_to_category.name
                            : hoveredCategory.ar_category_name}
                        </h3>
                        <button
                          onClick={() => setHoveredCategory(null)}
                          type="button"
                          className="text-gray-400 hover:text-gray-500 absolute top-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 p-2 outline-none ltr:right-5 ltr:rotate-180 rtl:left-5"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.50469 14.1154L1.79069 8.40005C1.73655 8.34844 1.69346 8.28638 1.66401 8.21762C1.63457 8.14886 1.61939 8.07485 1.61939 8.00005C1.61939 7.92526 1.63457 7.85124 1.66401 7.78248C1.69346 7.71373 1.73655 7.65166 1.79069 7.60005L7.50469 1.88672L8.30469 2.68672L3.56202 7.42939L15.3334 7.42938L15.3334 8.57272L3.56269 8.57272L8.30535 13.3154L7.50469 14.1154Z"
                              fill="#163300"
                            />
                          </svg>
                        </button>

                        <ul className="space-y-1 p-4">
                          <li className="w-full">
                            <Link prefetch={false}
                              href={`/category/${hoveredCategory.link_to_category.slug}`}
                              className="flex items-center gap-4 rounded-2xl p-2"
                              onClick={() => {
                                setOpen(false);
                              }}
                              data-testid="menu-item-link"
                            >
                              <span>
                                {t("all_type")}{" "}
                                {locale === "en"
                                  ? hoveredCategory.link_to_category.name
                                  : hoveredCategory.ar_category_name}
                              </span>
                              <span className="ltr:ml-auto ltr:rotate-180 rtl:mr-auto">
                                <ChevronLeftIcon className="h-6 w-6" />
                              </span>
                            </Link>
                          </li>
                          {hoveredCategory.level_one_subcategories &&
                            hoveredCategory.level_one_subcategories[0].level_two_subcategories?.map(
                              (subCategory: any, index: any) => (
                                <li className="w-full" key={index}>
                                  <Link prefetch={false}
                                    href={`/category/${subCategory.link.slug}`}
                                    className="flex items-center gap-4 rounded-2xl p-2"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                  >
                                    <span>
                                      {locale === "en"
                                        ? subCategory.ar_subcategory_name
                                        : subCategory.ar_subcategory_name}
                                    </span>
                                  </Link>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="bg-primary-102 px-4 py-6 pb-4">
                    <div
                      className="divide-y-1 grid gap-6 divide-gray-100"
                      style={{ paddingBottom: "12px" }}
                    >
                      <div>
                        {navSuppoting.map((item: any, index: any) => (
                          <Link prefetch={false}
                            href={`/${item.page_link}`}
                            className={`block mb-2 lg:inline-block lg:mt-0 font-semibold text-sm text-primary-300 ${location.pathname === `/${item.page_link}`
                              ? "underline"
                              : "hover:underline"
                              }`}
                            key={index}
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            {locale === "ar"
                              ? item.page_title_ar
                              : item.page_title}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 py-4">
                        <CurrencySwitcher inMobile />

                        <Link prefetch={false}
                          href={`/${user_id ? "my-account" : "login"}`}
                          className="flex justify-center rounded-lg bg-primary-300 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-400"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <span>
                            {user_id ? (
                              t("my_account")
                            ) : (
                              <>
                                {t("login")} {t("or")} {t("sign_up")}
                              </>
                            )}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </React.Fragment>
      {/* End Mobile menu */}
    </div>
  );
}
