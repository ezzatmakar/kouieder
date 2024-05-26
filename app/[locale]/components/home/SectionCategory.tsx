"use client";
import { useLocale } from "next-intl";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Image from "next/image";

const SectionCategory = ({ categorydata, sectiontitle }: any) => {
  // console.log(categorydata);
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <div className="py-6 md:py-14">
      <div className="pb-8 text-center md:pb-16">
        <img
          src="/images/sm-logo.webp"
          width={24}
          height={24}
          alt="icon"
          className="m-auto"
        />
        <h3 className="py-3 text-2xl font-bold">{locale === "ar" ? sectiontitle?.title_ar_list_category : sectiontitle?.title_list_category}</h3>
        <p className="text-gray-50">{locale === "ar" ? sectiontitle.subtitle_ar_list_category : sectiontitle.subtitle_list_category}</p>
      </div>
      <div className="scrollbar-hide -mx-3 flex gap-x-5 gap-y-16 overflow-x-scroll px-3 pt-8 md:mx-0 md:justify-center md:overflow-visible md:px-0 md:pt-0">
        {categorydata.map((item: any, index: any) => (
          <div className="w-full min-w-[150px] md:w-auto" key={index}>
            <Link prefetch={false}
              href={`/category/${item.category.slug}`}
              className={`block max-h-[150px] rounded-2xl text-center md:max-h-fit`}
              style={{ backgroundColor: item.background_category }}
            >
              <div className={`relative aspect-square -translate-y-10`}>
                  <Image
                    src={item.image_category}
                    className={`left-auto right-auto object-contain`}
                    alt={item.category.name}
                    fill
                  />
              </div>
              <p className="-translate-y-12 md:-translate-y-5">
                {`${
                    locale === "ar"
                      ? item.name_ar
                      : item.category.name
                  }`}
                  </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionCategory;
