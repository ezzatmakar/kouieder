"use client";
import { useLocale, useTranslations } from "next-intl";
import { SetStateAction, useState } from "react";

export default function CategoryFilter({
    catInfo = "",
    handleSelectedCategoriesChange,
    selectedCategories,
  }: any) {
    const locale = useLocale();
    const t = useTranslations("common");
    let catSlug = catInfo.slug;
    const catSubs = catInfo.subcategories ? catInfo.subcategories : [];
    let catName = locale === "ar" ? catInfo.ar_name : catInfo.name;
    const [selectedTab, setSelectedTab] = useState(selectedCategories);
    const handleTabClick = (tabName: SetStateAction<string>) => {
      setSelectedTab(tabName);
    };
    const handleCategoryChange = (categoryValue: any) => {
      const updatedCategories = Array.isArray(selectedCategories)
        ? selectedCategories.includes(categoryValue)
          ? selectedCategories.filter(
              (selectedCategory: any) => selectedCategory !== categoryValue
            ).join(',') // Convert array to string
          : categoryValue
        : categoryValue;
    
      handleSelectedCategoriesChange(updatedCategories);
    };
    if(catSubs.length < 1){
      return <div/>;
    }
  return (
    <div className="scrollbar-hide flex gap-4 overflow-x-scroll">
      <div
        className={`px-4 py-2.5 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all ${
          selectedTab === catSlug || selectedCategories.includes(catSlug)
            ? "bg-primary-300 text-white pointer-events-none"
            : "bg-gray-100 text-primary-300 hover:bg-gray-200"
        }`}
        onClick={() => {
          setSelectedTab(catSlug);
          handleCategoryChange(catSlug);
        }}
      >
        <div className="inline-flex items-center justify-end gap-2.5">
          <div className="flex items-center justify-center gap-1">
            <div
              className={`whitespace-nowrap text-sm font-semibold uppercase md:text-base`}
            >
              {t("all_type")} {catName}
            </div>
            {/* {selectedTab === catSlug &&
                            <span><RiCloseCircleFill className="text-xl" /></span>
                        } */}
          </div>
        </div>
      </div>
      {catSubs.map((item: any, index: any) => (
        <div
          key={index}
          className={`px-4 py-2.5 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all ${
            selectedCategories.includes(item.slug)
              ? "bg-primary-300 text-white pointer-events-none"
              : "bg-gray-100 text-primary-300 hover:bg-gray-200"
          }`}
          onClick={() => {
            setSelectedTab(item.slug);
            handleCategoryChange(item.slug);
          }}
        >
          <div className="inline-flex items-center justify-end gap-2.5">
            <div className="flex items-center justify-center gap-1">
              <div
                className={`whitespace-nowrap text-sm font-semibold uppercase md:text-base`}
              >
                {locale === "ar" ? item.ar_name : item.name}
              </div>
              {/* {selectedTab === item.slug &&
                                <span><RiCloseCircleFill className="text-xl" /></span>
                            } */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
