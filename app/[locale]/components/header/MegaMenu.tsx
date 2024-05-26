"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "@/navigation";
import { CategoryType, ProductData } from "@/types";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { fetchCats, fetchFilterProducts } from "@/app/api/general";
import catsData from "@/app/api/json-generated/cats.json"
import ProductWidgetBestSellingLoader from "../product/ProductWidgetBestSellingLoader";
import ProductWidgetBestSelling from "../product/ProductWidgetBestSelling";

export default function MegaMenu() {
  // debugger;
  const t = useTranslations("common");
  const locale = useLocale();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [cats, setCats] = useState(catsData);
  const [loading, setLoading] = useState(true);
  const [extraProducts, setExtraProducts] = useState<ProductData[]>([]);
  // const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState<null | CategoryType>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetchCats();
  //       setCats(response);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const categoriesWithSubcategories = cats.filter(
    (category: any) => category?.subcategories.length > 0
  );

  const filterData = {
    selectedCategories: "",
    minPrice: 0,
    maxPrice: 100000000,
    pageNumber: 1,
    products_per_page: 3,
    criteria: "date",
    arrangement: "arrangement",
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await fetchFilterProducts(filterData);
        // console.log('products>>', products)
        setExtraProducts(products);
      } catch (error) {
        console.error("Error fetching extra products:", error);
      } finally {
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
          // if (height > 220) {
          //     setHeaderHeight(133);
          // } else {
          // }
          setHeaderHeight(height);
        }
      };
      if (typeof window !== "undefined") {
        updateHeaderHeight();
        window.requestAnimationFrame(updateHeaderHeight);
        window.addEventListener("resize", updateHeaderHeight);
        return () => {
          window.removeEventListener("resize", updateHeaderHeight);
        };
      }
    }, 500);
  }, []);
  // console.log('hoveredCategory>>',hoveredCategory)
  return (
    <div>
      <Popover className="">
        {({ open, close }) => {
          document.body.classList.toggle("overflow-y-hidden", open);
          if (open) {
            window.scrollTo({
              top: 0,
            });
          }
          return (
            <>
              <Popover.Button
                className={` ${
                  open ? "" : "text-opacity-90"
                } inline-flex items-center px-4 gap-3 py-2 font-medium focus:outline-none bg-gray-200 whitespace-nowrap hover:bg-primary-100 text-[18px] rounded-100 text-white`}
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                <div className="flex items-center h-8 min-w-8">
                  <img
                    src="/images/icons/cats.webp"
                    alt={"all products"}
                    width="24"
                    height="24"
                    className=""
                  />
                </div>
                <span className="rtl:pt-1">{t("all_products")}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } h-6 w-6 text-orange-300 transition duration-150 ease-in-out`}
                  aria-hidden="true"
                />
              </Popover.Button>
              {/* <Popover.Overlay className="fixed inset-0 bg-black opacity-25" /> */}
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
                  className="fixed bottom-0 left-0 z-20 w-screen px-4 transform sm:px-0 popover-content -mt-[1px]"
                  style={{ top: headerHeight }}
                >
                  <div className="relative flex">
                    <Popover.Button
                      onClick={() => setPopoverOpen(!popoverOpen)}
                    >
                      <div className="fixed inset-0 z-30 bg-black opacity-90" />
                    </Popover.Button>
                    <div
                      className="relative z-40 mx-auto overflow-hidden overflow-y-scroll no-scrollbar max-w-screen-2xl"
                      style={{ maxHeight: `calc(100vh - ${headerHeight})` }}
                    >
                      <div className="">
                        <div>
                          <div className="flex bg-primary-300 divide-x divide-gray-100">
                            <div className="flex xl:text-base font-semibold text-gray-200 bg-white divide-x divide-gray-100">
                              <ul className="p-4">
                                <li className="w-[300px]">
                                  <Link prefetch={false}
                                    href="/offers"
                                    className="flex items-center px-2 py-1 rounded-2xl hover:bg-primary-300"
                                    onClick={() => {
                                      close(), setPopoverOpen(!popoverOpen);
                                    }}
                                  >
                                    <span className="p-3">
                                      <img
                                        src="/images/sm-logo.webp"
                                        width={24}
                                        height={24}
                                        alt="icon"
                                      />
                                    </span>
                                    <span className="ml-4">
                                      {t("offers_and_discounts")}
                                    </span>
                                  </Link>
                                </li>
                                <li className="w-[300px]">
                                  <Link prefetch={false}
                                    href="/best-selling"
                                    className="flex items-center px-2 py-1 rounded-2xl hover:bg-primary-300"
                                    onClick={() => {
                                      close(), setPopoverOpen(!popoverOpen);
                                    }}
                                  >
                                    <span className="p-2">
                                      <img
                                        src="/images/sm-logo.webp"
                                        width={24}
                                        height={24}
                                        alt="icon"
                                      />
                                    </span>
                                    <span className="ml-4">
                                      {t("best_selling")}
                                    </span>
                                  </Link>
                                </li>
                                {categoriesWithSubcategories.map(
                                  (category, index) => (
                                    <li
                                      key={index}
                                      className="w-[300px]"
                                      onMouseEnter={() =>
                                        setHoveredCategory(category)
                                      }
                                    >
                                      <Link prefetch={false}
                                        // @ts-ignore
                                        href={`/category/${category.slug}`}
                                        onClick={() => {
                                          close(),
                                          setPopoverOpen(!popoverOpen);
                                        }}
                                        className={`flex items-center justify-between px-2 py-1 rounded-2xl hover:bg-primary-300 ${
                                          (hoveredCategory as any)?.slug ===
                                          (category as any).slug
                                            ? "bg-primary-300"
                                            : ""
                                        }`}
                                      >
                                        <span className="flex items-center">
                                          <span className="p-2">
                                            <img
                                              src="/images/sm-logo.webp"
                                              width={24}
                                              height={24}
                                              alt="icon"
                                            />
                                          </span>
                                          <span>
                                            {locale === "en"
                                              ? (category as any)?.name
                                              : (category as any)?.ar_name}
                                          </span>
                                        </span>
                                        <span className="p-2">
                                          <ChevronLeftIcon className="w-6 h-6" />
                                        </span>
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                              {hoveredCategory ? (
                                <ul className="p-4">
                                  <li className="w-[300px]">
                                    <Link prefetch={false}
                                      // @ts-ignore
                                      href={`/category/${hoveredCategory.slug}`}
                                      className="flex items-center justify-between px-2 py-0 rounded-2xl hover:bg-primary-300"
                                      onClick={() => {
                                          close(),
                                        setPopoverOpen(!popoverOpen);
                                      }}
                                    >
                                      <span className="ml-4">
                                        {t("all_type")}{" "}
                                        {locale === "en"
                                          ? (hoveredCategory as any)?.name
                                          : (hoveredCategory as any)?.ar_name}
                                      </span>
                                      <span className="p-2">
                                        <ChevronLeftIcon className="w-6 h-6" />
                                      </span>
                                    </Link>
                                  </li>
                                  {hoveredCategory &&
                                    (
                                      hoveredCategory as {
                                        subcategories: any[];
                                      }
                                    ).subcategories &&
                                    (
                                      hoveredCategory as {
                                        subcategories: any[];
                                      }
                                    ).subcategories.map(
                                      (subCategory: any, index: any) => (
                                        <li className="w-[300px]" key={index}>
                                          <Link prefetch={false}
                                            href={`/category/${subCategory.slug}`}
                                            className="flex items-center justify-between px-2 py-0 rounded-2xl hover:bg-primary-300"
                                            onClick={() => {
                                              close(),
                                              setPopoverOpen(!popoverOpen);
                                            }}
                                          >
                                            <span className="ml-4">
                                              {locale === "en"
                                                ? subCategory.name
                                                : subCategory.ar_name}
                                            </span>
                                            <span className="p-2">
                                              <ChevronLeftIcon className="w-6 h-6" />
                                            </span>
                                          </Link>
                                        </li>
                                      )
                                    )}
                                </ul>
                              ) : (
                                <ul className="p-4">
                                  <li className="w-[300px]"></li>
                                </ul>
                              )}
                            </div>
                            <div className="w-full">
                              <div className="px-4 py-4">
                                <h3 className="pb-4 text-2xl font-bold border-b border-gray-100">
                                  {t("best_selling")}
                                </h3>
                                <div className="flex flex-wrap gap-6 py-6 xl:grid xl:grid-cols-12">
                                  <div className="grid grid-cols-2 col-span-5 gap-6 xl:grid-cols-1">
                                    {loading ? (
                                      <>
                                        <ProductWidgetBestSellingLoader />
                                        <ProductWidgetBestSellingLoader />
                                        <ProductWidgetBestSellingLoader />
                                      </>
                                    ) : (
                                      <>
                                        {extraProducts.map(
                                          (productData: any, index) => (
                                            <div key={index}>
                                              <ProductWidgetBestSelling
                                                product={productData}
                                              />
                                            </div>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                  <div className="col-span-7">
                                    <div className="w-[516px] h-[400px] relative rounded-3xl shadow overflow-hidden max-w-full">
                                      <img
                                        className="absolute top-0 left-0 object-cover w-full h-full"
                                        src="/images/mega_banner.webp"
                                      />
                                      <div className="absolute bottom-5 inline-flex items-center gap-6 p-6 left-5 right-5 text-center text-gray-200 bg-white rounded-2xl">
                                        <div className="inline-flex flex-col items-center gap-3">
                                          <div className="2xl:text-xl text-[18px] font-semibold">
                                            خصم يصل إلى
                                          </div>
                                          <div className="font-bold leading-10 uppercase 2xl:text-7xl text-5xl">
                                            40%
                                          </div>
                                        </div>
                                        <div className="inline-flex flex-col items-center justify-start gap-6">
                                          <div className="2xl:text-2xl text-xl font-bold text-center ">
                                            على جميع انواع التمور
                                          </div>
                                          <div className="text-base font-semibold text-gray-50">
                                            * لفترة محدودة أو نفاذ الكمية
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </div>
  );
}
