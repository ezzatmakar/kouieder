"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ShopListTop({
  grid,
  setGrid,
  setMobileFiltersOpen,
  title,
  handleSortOptionChange,
  categorySlug,
}: any) {
  const t = useTranslations("common");
  useEffect(() => {
    // Function to add class to the matching li element
    const highlightCategory = () => {
      // Remove the class from all previously highlighted elements
      const highlightedElements = document.querySelectorAll(".text-primary-201");
      highlightedElements.forEach((element) => {
        element.classList.remove("text-primary-201");
      });

      // Highlight the current category
      const liElements = document.querySelectorAll(".menu_titleParent a");
      liElements.forEach((li: any) => {
        if (li.getAttribute("href") === `/category/${categorySlug}/`) {
          li.classList.add("text-primary-201");
        }
      });
    };

    highlightCategory();

    // Cleanup function to remove the highlight when unmounting or when categorySlug changes
    return () => {
      const highlightedElements = document.querySelectorAll(".text-primary-201");
      highlightedElements.forEach((element) => {
        element.classList.remove("text-primary-201");
      });
    };
  }, [categorySlug]);
  return (
    <div>
      <div className="flex flex-col flex-wrap items-baseline justify-between py-2 md:flex-row md:py-6">
        {title ? (
          <h1 className="text-2xl font-bold tracking-tight text-black md:text-4xl">
            {title}
          </h1>
        ) : categorySlug === "best-sellers" ? (
          <h1 className="text-2xl font-bold tracking-tight text-black md:text-4xl">
            {" "}
            {t("best_selling")}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold tracking-tight text-black md:text-4xl">
            {" "}
            {t("new_arrivals")} {t("in")} {categorySlug}
          </h1>
        )}
      </div>
    </div>
  );
}
