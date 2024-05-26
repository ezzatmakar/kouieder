"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import Image from "next/image";

const CategoryBanner = ({ categorydata }: any) => {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    // <div className="container mx-auto">
    <div className="rounded-3xl bg-[#FFF5E5] p-4 md:px-[65px] md:py-10">
      <div className="flex flex-wrap items-stretch gap-2 md:flex-row-reverse md:flex-nowrap md:justify-center md:gap-4">
        <Link
          prefetch={false}
          className="group relative block aspect-[541/514] h-full w-full max-w-[525px] overflow-hidden rounded-xl md:w-5/12"
          href={`/category/${categorydata[0].url_banner_category.slug}`}
        >
          <Image
            className="w-full object-cover transition-all md:group-hover:scale-105"
            src={
              locale === "en"
                ? categorydata[0].image_en
                : categorydata[0].image_banner_category
            }
            alt={categorydata[0].url_banner_category.name}
            fill
          />
          <h3 className="absolute bottom-4 right-4 rounded-lg bg-[#D22760] px-3 py-2 text-xs text-white">
            {locale === "ar"
              ? categorydata[0].title_banner_category
              : categorydata[0].title_en_banner_category}
          </h3>
        </Link>
        <div className="flex h-full w-full flex-col gap-2 md:w-7/12 md:gap-4">
          <div className="grid h-1/2 grid-cols-2 gap-x-2 md:gap-x-4">
            <Link
              prefetch={false}
              className="group relative block aspect-[400/245] h-full w-full overflow-hidden rounded-xl"
              href={`/category/${categorydata[1].url_banner_category.slug}`}
            >
              <Image
                className="object-cover transition-all md:group-hover:scale-105"
                src={
                  locale === "en"
                    ? categorydata[1].image_en
                    : categorydata[1].image_banner_category
                }
                alt={categorydata[1].url_banner_category.name}
                fill
              />
              <h3 className="absolute bottom-4 right-4 rounded-lg bg-[#D22760] px-3 py-2 text-xs text-white">
                {locale === "ar"
                  ? categorydata[1].title_banner_category
                  : categorydata[1].title_en_banner_category}
              </h3>
            </Link>
            <Link
              prefetch={false}
              className="group relative block aspect-[400/245] h-full w-full overflow-hidden rounded-xl"
              href={`/category/${categorydata[2].url_banner_category.slug}`}
            >
              <Image
                src={
                  locale === "en"
                    ? categorydata[2].image_en
                    : categorydata[2].image_banner_category
                }
                alt={categorydata[2].url_banner_category.name}
                fill
                className="object-cover transition-all md:group-hover:scale-105"
              />
              <h3 className="absolute bottom-4 right-4 rounded-lg bg-[#D22760] px-3 py-2 text-xs text-white">
                {locale === "ar"
                  ? categorydata[2].title_banner_category
                  : categorydata[2].title_en_banner_category}
              </h3>
            </Link>
          </div>
          <div className="h-1/2">
            <Link
              prefetch={false}
              className="group relative block aspect-[823/245] h-full w-full overflow-hidden rounded-xl"
              href={`/category/${categorydata[3].url_banner_category.slug}`}
            >
              <Image
                className="object-cover transition-all md:group-hover:scale-105"
                src={
                  locale === "en"
                    ? categorydata[3].image_en
                    : categorydata[3].image_banner_category
                }
                alt={categorydata[3].url_banner_category.name}
                fill
              />
              <h3 className="absolute bottom-4 right-4 rounded-lg bg-[#D22760] px-3 py-2 text-xs text-white">
                {locale === "ar"
                  ? categorydata[3].title_banner_category
                  : categorydata[3].title_en_banner_category}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CategoryBanner;
