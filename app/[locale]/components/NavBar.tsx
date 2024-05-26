"use client";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { StrictMode, Suspense, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useScrollDirection } from "./header/useScrollDirection";
import FlashSaleBanner from "./FlashSaleBanner";

const MobileMenu = dynamic(() => import("./header/MobileMenu"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-white">
      <div className={`nav-icon3`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ),
});
const MyAccountToggle = dynamic(() => import("./account/MyAccountToggle"), {
  ssr: false,
});

const CartNav = dynamic(() => import("./header/CartNav"), {
  ssr: false,
  loading: () => (
    <span className="block h-9 w-9 md:w-12">
      <span className="relative flex h-9 w-9 animate-pulse items-center justify-center rounded-lg bg-primary-300 shadow-xl transition-all md:h-12 md:w-12"></span>
    </span>
  ),
});
const CurrencySwitcher = dynamic(() => import("./CurrencySwitcher"), {
  ssr: false,
});
const Search = dynamic(() => import("./Search"), {
  ssr: false,
  loading: () => (
    <span className="flex h-9 w-9 cursor-pointer items-center justify-center text-primary-300 hover:bg-primary-100 md:h-12 md:w-12">
      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
    </span>
  ),
});
const NoInternetConnection = dynamic(() => import("./NoInternetConnection"), {
  ssr: false,
});
const SelectDelivery = dynamic(() => import("./SelectDelivery"), {
  ssr: false,
});

export default function NavBar({ data }: any) {
  const [isClient, setIsClient] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const loading = false;
  const pathname = usePathname();
  const locale = useLocale();
  const scrollDirection = useScrollDirection();
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const mainnavbarRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const isCartPage = pathname === "/cart";

  const getCategoryFromId = (id: any) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(`cat_slug_${id}`);
      return element !== null;
    }
  };

  useEffect(() => {
    const isCheckout = pathname.includes("checkout");
    setIsCheckoutPage(isCheckout);
  }, [pathname]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition >= 225);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current && mainnavbarRef.current && headerRef.current) {
        const scrollPosition = window.scrollY;
        const isScrollingUp = scrollPosition < lastScrollY;
        if (scrollPosition > 100) {
          navbarRef.current.classList.add("toBeFixed");
          if (isScrollingUp) {
            mainnavbarRef.current.classList.add("toBeFixedMain");
            headerRef.current.classList.add("toBeFixedHeader");
          } else {
            mainnavbarRef.current.classList.remove("toBeFixedMain");
            headerRef.current.classList.remove("toBeFixedHeader");
          }
        } else {
          navbarRef.current.classList.remove("toBeFixed");
          mainnavbarRef.current.classList.remove("toBeFixedMain");
          headerRef.current.classList.remove("toBeFixedHeader");
        }
        lastScrollY = scrollPosition;
      }
    };
    let lastScrollY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });

        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollDirection]);
  return (
    <StrictMode>
      <div className="bg-white">
        <NoInternetConnection />
        {isCheckoutPage ? null : <FlashSaleBanner />}
      </div>
      <header id="header" ref={headerRef}>
        {isCheckoutPage ? null : (
          <div className="px-4">
            <div
              className={`container mx-auto max-w-screen-2xl ${data?.promotion_content ? "" : "md:block hidden"
                }`}
            >
              <div className="block w-full flex-grow gap-6 border-b border-primary-100 py-3 lg:flex lg:w-auto lg:items-center lg:justify-between">
                <div className="flex items-center gap-x-5">
                  {/* Change Currncy */}
                  <div className="hidden lg:flex">
                    <CurrencySwitcher />
                  </div>
                  {/* Discount */}
                  {data?.promotion_content && (
                    <div className="w-full md:w-auto">
                      {loading ? (
                        <>
                          <div className="animate-pulse py-2 text-center">
                            <div className="m-auto h-4 w-48 rounded-full bg-black"></div>
                          </div>
                        </>
                      ) : (
                        <p className="whitespace-nowrap rounded-lg bg-[#D22760] px-3 py-1 text-center text-[13px] font-bold text-white">
                          {data?.promotion_content!}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <nav className="no-scrollbar hidden gap-5 overflow-y-scroll whitespace-nowrap text-[13px] text-primary-300 lg:flex">
                  <Suspense
                    fallback={
                      <>
                        <div className="animate-pulse">
                          <div className="h-3 w-24 rounded-full bg-slate-100"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="h-3 w-24 rounded-full bg-slate-100"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="h-3 w-24 rounded-full bg-slate-100"></div>
                        </div>
                        <div className="animate-pulse">
                          <div className="h-3 w-24 rounded-full bg-slate-100"></div>
                        </div>
                      </>
                    }
                  >
                    {data?.supporting_menu?.map((item: any, index: any) => (
                      <Link
                        prefetch={false}
                        href={`/${item?.page_link}`}
                        data-testid="menu-item-link"
                        className={`block mt-4 lg:inline-block lg:mt-0 font-semibold ${pathname === `/${item?.page_link}`
                            ? "underline"
                            : "hover:underline"
                          }`}
                        key={index}
                      >
                        {locale === "ar" ? item.page_title_ar : item.page_title}
                      </Link>
                    ))}
                  </Suspense>
                </nav>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="px-2 md:px-4" id="mainnavbar" ref={mainnavbarRef}>
            <div className="child-sticky">
              <nav
                aria-label="Top"
                className={`mx-auto ${isCheckoutPage ? "max-w-full" : "max-w-screen-2xl"
                  }`}
              >
                <div className="">
                  <div
                    className={`flex items-center justify-between md:gap-6 py-3 ${isCheckoutPage ? "" : "py-6"
                      }`}
                  >
                    {isCheckoutPage ? (
                      <div className="flex w-full items-center  justify-center">
                       
                        <div className="md:w-[66%] md:px-8 relative flex justify-center">
                          {/* Logo */}
                          <div className="flex items-center justify-center">
                            <Link
                              prefetch={false}
                              href={"/"}
                              data-testid="logo-link"
                            >
                              <Image
                                src="/images/logo.webp"
                                alt="Logo"
                                className="w-[150px]"
                                width={410}
                                height={80}
                                priority
                              />
                            </Link>
                          </div>
                          <div className="md:flex absolute end-0 hidden ">
                          <CurrencySwitcher />
                        </div>
                        </div>
                       
                        <div className="hidden md:px-8 lg:w-[44%]">
                          <div className="max-w-full md:w-[470px]">
                            <div
                              className={`flex items-center gap-6 justify-end ${locale === "en" ? "lg:ml-auto" : "lg:mr-auto"
                                }`}
                            >
                              <div className="hidden lg:block">
                                <MyAccountToggle />
                              </div>

                              {isCheckoutPage ? null : (
                                <div className={`flex`}>
                                  <Search />
                                </div>
                              )}

                              {isCartPage ? null : (
                                <>
                                  <CartNav
                                    isSticky={
                                      isSticky && scrollDirection === "down"
                                    }
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {isCheckoutPage ? null : (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="ltr:mr-auto rtl:ml-auto lg:hidden">
                            <MobileMenu data={data} />
                          </div>
                          <div className="order-2 flex items-center pe-5 ltr:ml-auto rtl:mr-auto lg:order-1 lg:w-1/3 lg:gap-x-5 ltr:lg:ml-0 rtl:lg:mr-0">
                            <div className="flex">
                              <Search />
                            </div>
                            <div className="hidden lg:block">
                              <SelectDelivery singleProduct={false} />
                            </div>
                          </div>

                          <div className="ltr:ml-auto rtl:mr-auto lg:order-2 ltr:lg:ml-0 rtl:lg:mr-0">
                            <div className="flex items-center gap-x-2 lg:mx-0">
                              <Link
                                prefetch={false}
                                href={"/"}
                                data-testid="logo-link"
                                className="block w-full"
                              >
                                <Image
                                  src="/images/logo.webp"
                                  alt="imagesLogo"
                                  className="m-auto w-[120px] lg:w-[200px]"
                                  width={410}
                                  height={80}
                                  priority
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="order-3 flex items-center justify-end lg:w-1/3 lg:gap-x-10">
                            <div className="hidden lg:block">
                              <MyAccountToggle />
                            </div>
                            {isCartPage ? null : (
                              <>
                                <CartNav
                                  isSticky={
                                    isSticky && scrollDirection === "down"
                                  }
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
          {isCheckoutPage ? null : (
            <div id="navbar" ref={navbarRef}>
              <div className="child-sticky bg-primary-300 pt-3 shadow-md md:pt-4">
                <nav
                  aria-label="Bottom"
                  className="container mx-auto max-w-screen-2xl justify-center gap-8 text-base text-white lg:flex"
                >
                  <ul className="list_menu scrollbar-hide flex max-w-screen-2xl justify-start gap-x-4 overflow-scroll whitespace-nowrap px-3 md:justify-center md:overflow-visible md:px-0">
                    {loading ? (
                      <>
                        <div className="animate-pulse py-4">
                          <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="animate-pulse py-4">
                          <div className="h-7 w-36 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="animate-pulse py-4">
                          <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="animate-pulse py-4">
                          <div className="h-7 w-24 rounded-full bg-gray-200"></div>
                        </div>
                      </>
                    ) : (
                      data?.main_menu?.map((item: any, index: any) => (
                        <li
                          key={index}
                          className={`relative font-bold flex items-center gap-x-4 hover:text-primary-201 menu_titleParent ${pathname === `/${item.page_link}` ||
                              pathname ===
                              `/category/${item?.link_to_category?.slug}` ||
                              (getCategoryFromId(item?.link_to_category?.slug) &&
                                isClient)
                              ? "text-primary-201"
                              : ""
                            }`}
                        >
                          <div className="menu_title hoverFromCenter group pb-3 text-xs md:pb-4 md:text-base">
                            <Link
                              prefetch={false}
                              className={`relative ${item.level_one_subcategories
                                  ? "flex items-center gap-x-2"
                                  : ""
                                }`}
                              href={
                                item.type === "page"
                                  ? `/${item.page_link}`
                                  : item?.link_to_category?.slug
                                    ? `/category/${item?.link_to_category?.slug}`
                                    : `/offers`
                              }
                              key={index}
                            >
                              {item.small_extra_label === "sale" && (
                                <svg
                                  width="28"
                                  height="28"
                                  viewBox="0 0 28 28"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.9798 2.22C14.8863 1.12654 13.1135 1.12654 12.02 2.22L11.2707 2.96933C10.483 3.75698 9.41474 4.19948 8.30083 4.19948H6.9999C5.4535 4.19948 4.1999 5.45308 4.1999 6.99948V8.30041C4.1999 9.41432 3.7574 10.4826 2.96975 11.2703L2.22 12.02C1.12653 13.1135 1.12654 14.8863 2.22 15.9798L2.96975 16.7295C3.7574 17.5172 4.1999 18.5855 4.1999 19.6994V20.9995C4.1999 22.5459 5.4535 23.7995 6.9999 23.7995H8.29999C9.4139 23.7995 10.4822 24.242 11.2698 25.0296L12.02 25.7798C13.1135 26.8733 14.8863 26.8733 15.9798 25.7798L16.73 25.0296C17.5176 24.242 18.5859 23.7995 19.6998 23.7995H20.9999C22.5463 23.7995 23.7999 22.5459 23.7999 20.9995V19.6994C23.7999 18.5855 24.2424 17.5172 25.0301 16.7295L25.7798 15.9798C26.8733 14.8863 26.8733 13.1135 25.7798 12.02L25.0301 11.2703C24.2424 10.4826 23.7999 9.41432 23.7999 8.30041V6.99948C23.7999 5.45308 22.5463 4.19948 20.9999 4.19948H19.699C18.5851 4.19948 17.5168 3.75698 16.7291 2.96933L15.9798 2.22ZM17.9648 10.5765C18.3937 9.93314 18.2198 9.06393 17.5765 8.63503C16.9331 8.20614 16.0639 8.37998 15.635 9.02332L10.035 17.4233C9.60614 18.0667 9.77998 18.9359 10.4233 19.3648C11.0667 19.7937 11.9359 19.6198 12.3648 18.9765L17.9648 10.5765ZM9.0999 12.5999C10.2597 12.5999 11.1999 11.6597 11.1999 10.4999C11.1999 9.3401 10.2597 8.3999 9.0999 8.3999C7.9401 8.3999 6.9999 9.3401 6.9999 10.4999C6.9999 11.6597 7.9401 12.5999 9.0999 12.5999ZM20.9999 17.4999C20.9999 18.6597 20.0597 19.5999 18.8999 19.5999C17.7401 19.5999 16.7999 18.6597 16.7999 17.4999C16.7999 16.3401 17.7401 15.3999 18.8999 15.3999C20.0597 15.3999 20.9999 16.3401 20.9999 17.4999Z"
                                    fill={item.label_color}
                                  />
                                </svg>
                              )}
                              {item.type === "page"
                                ? `${locale === "ar"
                                  ? item.page_title_ar
                                  : item.page_title
                                }`
                                : `${locale === "ar"
                                  ? item.ar_category_name
                                  : item.link_to_category.name
                                }`}
                              {item.level_one_subcategories && (
                                <ChevronDownIcon className="hidden h-4 w-4 text-white md:block" />
                              )}
                            </Link>
                            {item.level_one_subcategories && (
                              <div
                                className="menu_sub max-w-[650px absolute right-[-250%] top-[40px] z-[999] hidden min-w-[650px] bg-[#FAF6F0] group-hover:block"
                                style={{
                                  boxShadow:
                                    "0px 10px 20px rgba(32, 32, 32, 0.25)",
                                }}
                              >
                                <div className="flex justify-between p-10">
                                  <div
                                    className={`w-1/2  ${locale === "ar" ? "pl-7" : "pr-7"
                                      }`}
                                  >
                                    <h3 className="text-[32px] font-bold text-primary-300">
                                      {locale === "ar"
                                        ? item.ar_category_name
                                        : item.link_to_category.name}
                                    </h3>
                                    <div className="py-8">
                                      {item.level_one_subcategories[0].level_two_subcategories?.map(
                                        (subItem: any, subIndex: any) => (
                                          <Link
                                            prefetch={false}
                                            key={subIndex}
                                            href={`/category/${subItem?.link?.slug}`}
                                            className="flex w-full items-center justify-between border-b p-3 text-[16px] font-semibold text-primary-200 hover:text-primary-300"
                                          >
                                            {`${locale === "ar"
                                                ? subItem.ar_subcategory_name
                                                : subItem.link.name
                                              }`}

                                            <div
                                              className={`${locale === "ar"
                                                  ? ""
                                                  : "rotate-180"
                                                }`}
                                            >
                                              <svg
                                                width="21"
                                                height="22"
                                                viewBox="0 0 21 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M13.125 17.125L7 11L13.125 4.875"
                                                  stroke="#5167A2"
                                                  strokeWidth="1.75"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </div>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                    <div>
                                      <a
                                        href={`/category/${item.category_banner_link.slug}`}
                                        className="block w-full rounded-lg bg-primary-300 py-2 text-center text-lg font-normal text-white hover:bg-primary-400"
                                      >
                                        {locale === "ar"
                                          ? `جميع ${item.ar_category_name}`
                                          : `All ${item.link_to_category.name}`}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="w-1/2">
                                    <a
                                      href={`/category/${item.category_banner_link.slug}`}
                                    >
                                      <img
                                        src={item.category_banner_image}
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <span className="menu_dots mb-2 block h-[5px] w-[5px] bg-[#D4DCF1] md:h-[7px] md:w-[7px]"></span>
                        </li>
                      ))
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </StrictMode>
  );
}
