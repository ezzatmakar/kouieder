"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ProductWidget from "./product/ProductWidget";
import { useLocale, useTranslations } from "next-intl";
import { API_ENDPOINT } from "@/app/config";
import ListLoader from "./ListLoader";
import Breadcrumbs from "./Breadcrumbs";
import ShopListTop from "./ShopListTop";
import CategoryFilter from "./CategoryFilter";
import Sort from "./Sort";
import { handleViewCategory } from "@/app/fb-pixel";
import { useUser } from "@/app/UserContext";
import { useSharedState } from "@/app/SharedStateContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductList({
  products,
  categorySlug,
  categoryInfo,
  title,
}: any) {
  const locale = useLocale();
  const t = useTranslations("common");
  const { selectedBranchIdPROV } = useSharedState();
  const [grid, setGrid] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productsFirst, setProducts] = useState(products);
  let [pageNumber, setPageNumber] = useState(2);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedCategories, setSelectedCategories] = useState(categorySlug);
  const [selectedSortOption, setSelectedSortOption] = useState({
    criteria: "date",
    arrangement: "DESC",
  });

  const { userInfo, locationInfo } = useUser();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoadingPage(false);
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [categorySlug]);

  useEffect(() => {
    if (locationInfo) {
      handleViewCategory(
        categoryInfo?.name ? categoryInfo.name : title,
        userInfo,
        locationInfo
      );
    }
  }, [locationInfo]);

  useEffect(() => {
    if (selectedBranchIdPROV) {
      setPageNumber(1);
      setTimeout(() => {
        fetchProducts(false, selectedCategories, selectedSortOption,selectedBranchIdPROV, 1);
      }, 500);
    }
  }, [selectedBranchIdPROV]);

  const fetchProducts = async (
    appendData = false,
    selectedCategories: any,
    selectedSortOption: any,
    branch_id: any,
    page = pageNumber
  ) => {
    const { criteria, arrangement } = selectedSortOption;
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Origin: "",
      };

      if (typeof window !== "undefined") {
        headers["Origin"] = window.location.origin;
      }
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify({
          category: selectedCategories,
          price_range: [minPrice, maxPrice],
          products_per_page: 20,
          page_number: page,
          branch_id: selectedBranchIdPROV,
          sort: {
            criteria,
            arrangement,
          },
        }),
      };

      const response = await fetch(`${API_ENDPOINT}/filter.php`, options);
      const newData = await response.json();

      setProducts((prevProducts: any[]) => {
        if (appendData && prevProducts) {
          return [...prevProducts, ...(newData as any[])];
        } else {
          return newData as any[];
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const handleSortOptionChange = (option: any) => {
    setSelectedSortOption(option);
    setIsLoading(true);
    setPageNumber(2);
    setTimeout(() => {
      fetchProducts(false, selectedCategories, option,selectedBranchIdPROV, 1);
    }, 500);
  };

  const handleLoadMore = (option: any) => {
    setIsLoading(true);
    setPageNumber(pageNumber + 1);
    setTimeout(() => {
      fetchProducts(true, selectedCategories, selectedSortOption,selectedBranchIdPROV, pageNumber + 1);
    }, 500);
  };

  const handleSelectedCategoriesChange = (selectedCategories: any) => {
    setSelectedCategories(selectedCategories);
    setIsLoading(true);
    setPageNumber(2);
    fetchProducts(false, selectedCategories, selectedSortOption,selectedBranchIdPROV, 1);
  };

  const breadcrumbs = [
    { name: t("home"), href: "/", position: 0 },
    {
      name:
        categorySlug === "best-sellers"
          ? t("best_selling")
          : categoryInfo
          ? locale === "ar"
            ? categoryInfo.ar_name
            : categoryInfo.name
          : t(title),
      href: "#",
      position: 1,
    },
  ];
  return (
    <div>
      <div className="overflow-hidden bg-white" key={categorySlug}>
        <main className="mx-auto px-3 2xl:container sm:px-6 lg:px-8">
          <div className="pt-2 md:pt-5">
            {isLoadingPage ? (
              <ListLoader />
            ) : (
              <>
                <Breadcrumbs breadcrumbs={breadcrumbs} className="" />
                <ShopListTop
                  grid={grid}
                  setGrid={setGrid}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                  handleSortOptionChange={handleSortOptionChange}
                  title={
                    categoryInfo
                      ? locale === "ar"
                        ? categoryInfo.ar_name
                        : categoryInfo.name
                      : t(title)
                  }
                  categorySlug={categorySlug}
                />
                <section aria-labelledby="products-heading" className="pb-24">
                  <div
                    className={`${
                      categoryInfo && categoryInfo.subcategories && categorySlug !== "best-sellers" && categoryInfo.subcategories.length == 0
                      ? "md:-mt-16 -mt-11"
                        : ""
                    }`}
                  >
                    <div
                      className={`z-[2] flex flex-wrap items-center justify-between gap-4 md:relative`}
                    >
                      {
                        categoryInfo && categorySlug !== "best-sellers" ? (
                          <>
                            <CategoryFilter
                              catInfo={categoryInfo}
                              handleSelectedCategoriesChange={
                                handleSelectedCategoriesChange
                              }
                              selectedCategories={selectedCategories}
                            />
                            <Sort onSortOptionChange={handleSortOptionChange} />
                          </>
                        ) : (
                          ""
                        )
                      }
                    </div>

                    <div className="relative z-[1] lg:col-span-3">
                      <div
                        className={classNames(
                          grid
                            ? "sm:grid-cols-1 lg:grid-cols-2"
                            : "sm:grid-cols-2 lg:grid-cols-4",
                          "grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8 mt-6 relative"
                        )}
                      >
                        {isLoading ? (
                          <div className="absolute inset-0 z-20 flex items-start justify-center bg-gray-200 bg-opacity-75 pt-20">
                            <Loader />
                          </div>
                        ) : (
                          ""
                        )}
                        {productsFirst &&
                          Array.isArray(productsFirst) &&
                          productsFirst.map((productData: any, index: any) => (
                            <React.Fragment key={index}>
                              <ProductWidget product={productData} />
                            </React.Fragment>
                          ))}
                        {productsFirst.length === 0 && "no products here"}
                      </div>
                      {productsFirst.length > (pageNumber) * 19 ? (
                        <div className="loadmore mt-10 flex items-center justify-center">
                          <button
                            onClick={handleLoadMore}
                            type="button"
                            className="mr-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-primary-200 px-5 py-2.5 text-center text-sm font-semibold text-primary-200 hover:bg-primary-200 hover:text-white"
                          >
                            {!isLoading ? (
                              t("load_more")
                            ) : (
                              <>
                                {t("loading")}
                                <Loader extraclass={"mr-2 h-4 w-4"} />
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
