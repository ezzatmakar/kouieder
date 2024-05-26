"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductLoader from "./product/ProductLoader";
import ProductWidget from "./product/ProductWidget";
import Slider from "react-slick";
import { fetchFilterProducts, getUpSellingProducts } from "@/app/api/general";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import PrevArrow from "./icons/PrevArrow";

interface Props {
  productID: number;
  title: string;
  isEmpty: boolean;
  categorySlug: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const PRODUCT_LOADERS_COUNT = 5;

let arrowClasses =
  "absolute top-[170px] -translate-y-full bg-white border-2 border-gray-400 rounded-full p-3 text-primary-300 z-20 cursor-pointer hover:bg-primary-400 hover:border-primary-400 hover:text-white transition-all";
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

export default function UpSellingProducts({
  productID,
  title,
  isEmpty,
  categorySlug,
}: Props) {
  // const { t, i18n } = useTranslation();
  const locale = useLocale();
  const t = useTranslations("common");
  const direction = locale === "en" ? "ltr" : "rtl";
  const [upSellingProducts, setUpSellingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // State to store the tallestHeight
  const [tallestHeight, setTallestHeight] = useState<number>(0);

  const calculateHeights = () => {
    const elements = document.getElementsByClassName("get-height-extra");
    const newHeights: number[] = [];

    for (let i = 0; i < elements.length; i++) {
      newHeights.push(elements[i].clientHeight);
    }

    const newTallestHeight = Math.max(...newHeights);
    setTallestHeight(newTallestHeight);
  };

  useEffect(() => {
    calculateHeights();
    window.addEventListener("load", calculateHeights);
    window.addEventListener("resize", calculateHeights);
    return () => {
      window.removeEventListener("load", calculateHeights);
      window.removeEventListener("resize", calculateHeights);
    };
  }, [upSellingProducts]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await getUpSellingProducts(productID);
      if (Array.isArray(products)) {
        setUpSellingProducts(products);
      } else {
        // If getUpSellingProducts returns null, fetch mock products
        const filterData = {
          selectedCategories: "",
          minPrice: 0,
          maxPrice: 100000000,
          pageNumber: 1,
          products_per_page: 20,
          criteria: "date",
          arrangement: "arrangement",
        };
        const mockProducts = await fetchFilterProducts(filterData);
        setUpSellingProducts(mockProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  let isMobileView = false;
  if (typeof window !== "undefined") {
    isMobileView = window.innerWidth < 768;
  }
  const shouldRenderSlider = upSellingProducts.length > 5;

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    pauseOnHover: true,
    dots: false,
    adaptiveHeight: true,
    // rtl: locale === "en" ? false : true,
    // rtl: true,
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

  const firstFourProducts = upSellingProducts.slice(0, 5);

  return (
    <>
      <div className={`${isEmpty === true ? "hidden" : ""}`} ref={ref}>
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 md:px-0">
          {title && (
            <div className="mb-7 flex items-center justify-between px-3 md:px-0">
              <h2 className="text-2xl font-bold tracking-tight text-black">
                {t(title)}
              </h2>
              <Link prefetch={false}
                className="border-gray-400 mt-auto inline-block rounded-lg border-2 border-solid px-4 py-2 text-center text-primary-300 hover:border-primary-300 hover:bg-primary-300 hover:text-white"
                // to={`/category/${categorySlug}`}
                href={`/offers`}
              >
                <span className="whitespace-nowrap font-semibold md:text-base">
                  {t("load_more")}
                </span>
              </Link>
            </div>
          )}
          {loading ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-4 sm:grid-cols-2 md:-mx-3 lg:grid-cols-5 xl:gap-x-6">
              {Array.from({ length: PRODUCT_LOADERS_COUNT }).map((_, index) => (
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
                <Slider {...sliderSettings} adaptiveHeight className="extraProducts -mx-2">
                  {upSellingProducts.map((productData: any, index: number) => (
                    <div key={index} className={`h-full px-2`} dir={direction}>
                      <div
                        className="get-height-extra h-full"
                        // style={{ minHeight: `${tallestHeight}px` }}
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
                  {upSellingProducts.map((productData: any, index: number) => (
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
              <div className="mt-3 px-4 md:hidden">
                <Link prefetch={false}
                  href={`/category/${categorySlug}`}
                  className="border-gray-400 mt-auto block rounded-lg border-2 border-solid px-4 py-1 text-center text-primary-300 hover:border-primary-300 hover:bg-primary-300 hover:text-white"
                >
                  <span className="whitespace-nowrap font-semibold md:text-base">
                    {t("load_more")}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
