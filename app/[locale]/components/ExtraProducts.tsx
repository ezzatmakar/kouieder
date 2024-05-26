"use client";
import React, { useState, useEffect, StrictMode } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { fetchFilterProducts } from "@/app/api/general";
import { Link } from "@/navigation";
import PrevArrow from "./icons/PrevArrow";
import ProductLoader from "./product/ProductLoader";

const ProductWidget = dynamic(() => import("./product/ProductWidget"), {
  ssr: false,
  loading: () => <ProductLoader />,
});
interface Props {
  categorySlug?: string;
  count?: number;
  slidesShow?: number;
  title?: string;
  mobTitle?: string;
  criteria?: string;
  arrangement?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const PRODUCT_LOADERS_COUNT = 5;

let arrowClasses = "absolute top-[170px] -translate-y-full text-white bg-primary-400 rounded-lg p-3 text-primary-300 z-20 cursor-pointer hover:bg-primary-400 transition-all";
const CustomPrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`right-1 translate-x-4 ${arrowClasses} ${className}`}
      onClick={onClick}
    >
      <PrevArrow />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`left-1 rotate-180 -translate-x-4 ${arrowClasses} ${className}`}
      onClick={onClick}
    >
      <PrevArrow />
    </div>
  );
};

export default function ExtraProducts({
  categorySlug,
  slidesShow = typeof window !== "undefined" && window.innerWidth > 999 ? 5 : 4,
  title,
  criteria = "date",
  arrangement = "arrangement",
}: Props) {
  const locale = useLocale();
  const direction = locale === "en" ? "ltr" : "rtl";
  const t = useTranslations("common");
  const [isClient, setIsClient] = useState(false);
  const [extraProducts, setExtraProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const filterData = {
    selectedCategories: categorySlug || "",
    minPrice: 0,
    maxPrice: 100000000,
    pageNumber: 1,
    criteria,
    arrangement,
  };
  // const [tallestHeight, setTallestHeight] = useState<number>(0);

  // const calculateHeights = () => {
  //   const elements = document.getElementsByClassName("get-height-extra");
  //   const newHeights: number[] = [];
  
  //   for (let i = 0; i < elements.length; i++) {
  //     newHeights.push(elements[i].clientHeight);
  //   }
  
  //   const newTallestHeight = Math.max(...newHeights);
  //   setTallestHeight(newTallestHeight);
  // };
  
  // useEffect(() => {
  //   calculateHeights();
  //   window.addEventListener("load", calculateHeights);
  //   window.addEventListener("resize", calculateHeights);
  //   return () => {
  //     window.removeEventListener("load", calculateHeights);
  //     window.removeEventListener("resize", calculateHeights);
  //   };
  // }, [extraProducts, inView]);
  const updateExtraProducts = async () => {
    setLoading(true);
    try {
      const products = await fetchFilterProducts(filterData);
      setExtraProducts(products);
    } catch (error) {
      console.error("Error fetching extra products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inView) {
      updateExtraProducts();
    }
  }, [inView]);

  let isMobileView = false;
  if (typeof window !== "undefined") {
    isMobileView = window.innerWidth < 768;
  }
  const shouldRenderSlider = extraProducts.length > slidesShow;

  const sliderSettings = {
    slidesToShow: slidesShow,
    slidesToScroll: slidesShow,
    infinite: true,
    arrows: true,
    pauseOnHover: true,
    dots: false,
    adaptiveHeight: true,
    rtl: locale === "en" ? false : true,
    prevArrow: <CustomPrevArrow currentSlide={0} />,
    nextArrow: <CustomNextArrow currentSlide={0} />,
    autoplaySpeed: 2000,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const firstFourProducts = extraProducts.slice(0, 4);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="extraProducts" ref={ref}>
      {isClient ? (
        <div className="px-1 pb-12 pt-4 md:px-4 md:pt-8 lg:px-0">
          {title && (
            <div className="mb-4 flex w-full items-center justify-between px-3 md:mb-7 md:px-0">
              <h2 className="text-xl font-bold tracking-tight text-black md:text-4xl">
                {t(title)}
              </h2>
              <Link prefetch={false}
                href={categorySlug ? `/category/${categorySlug}` : `/offers`}
                className="border-gray-400 mt-auto hidden rounded-lg border-2 border-solid px-4 py-2 text-center text-primary-300 md:inline-block md:hover:border-primary-300 md:hover:bg-primary-300 md:hover:text-white"
              >
                <span className="whitespace-nowrap font-semibold md:text-base">
                  {t("load_more")}
                </span>
              </Link>
            </div>
          )}
          {loading ? (
            <div
              className={`grid grid-cols-2 px-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-${slidesShow} xl:gap-x-6 md:-mx-3`}
            >
              {Array.from({ length: slidesShow }).map((_, index) => (
                <ProductLoader key={index} />
              ))}
            </div>
          ) : (
            <>
              {isMobileView ? (
                <div className="grid grid-cols-2 gap-y-3">
                  {firstFourProducts.map((productData: any) => (
                    <div key={productData.id} className={`h-full px-2 md:px-3`}>
                      <ProductWidget
                        product={productData}
                        isItemInWishlist={false}
                      />
                    </div>
                  ))}
                </div>
              ) : shouldRenderSlider ? (
                <Slider {...sliderSettings}>
                  {extraProducts.map((productData: any, index: number) => (
                    <div key={index} className={`h-full px-2`} dir={direction}>
                      <div
                        className="get-height-extra h-full"
                        // style={{ height: `${tallestHeight}px` }}
                      >
                        <ProductWidget
                          product={productData}
                          isItemInWishlist={false}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-2 gap-x-0 gap-y-10 px-4 sm:grid-cols-2 md:-mx-3 lg:grid-cols-5">
                  {extraProducts.map((productData: any, index: number) => (
                    <div key={index} className={`px-2`} dir={direction}>
                      <div
                        className="get-height-extra"
                        // style={{ minHeight: `${tallestHeight}px` }}
                      >
                        <ProductWidget
                          product={productData}
                          isItemInWishlist={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center px-4 pt-5 md:hidden">
                <Link prefetch={false}
                  href={categorySlug ? `/category/${categorySlug}` : `/offers`}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 border-primary-200 px-5 py-2.5 text-center text-sm font-semibold text-primary-200 md:hover:bg-primary-200 md:hover:text-white"
                >
                  <span className="whitespace-nowrap font-semibold md:text-base">
                    {t("load_more")}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
