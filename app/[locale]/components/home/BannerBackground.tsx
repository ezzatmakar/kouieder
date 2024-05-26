"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";

const BannerBackground = ({
  bannerdata,
  bgcolor,
  bgcolorlabel,
  textcolorlabel,
  href,
}: any) => {
  const t = useTranslations("common");
  const locale = useLocale();
  return (
    <div className="relative px-3 pb-24 pt-8 md:py-28">
      <div
        className={`flex items-center justify-between md:flex-row flex-col md:text-start text-center relative md:h-[150px] before:content-[""] before:absolute before:w-full before:md:h-[150px] before:h-full ${
          bgcolor ? bgcolor : "before:bg-[#EF7E7B]"
        }  before:rounded-2xl before:z-[-1]`}
      >
        {href ? (
          <Link prefetch={false} href={href} className="absolute inset-0 z-10"></Link>
        ) : (
          ""
        )}
        <div
          className={`xl:py-0 md:py-3 px-4 py-12 pb-0 ${
            locale === "ar" ? "md:pr-10" : "md:pl-10"
          }`}
        >
          <span
            className={`absolute  top-[-15px] text-xs py-2 px-3 rounded-lg ${
              bgcolorlabel ? bgcolorlabel : "bg-[#D22760]"
            } ${textcolorlabel ? textcolorlabel : "text-white"}
            ${locale === "ar" ? "right-10" : "left-10"}
            `}
          >
            {locale === "ar" ? bannerdata.taglineAr : bannerdata.tagline}
          </span>
          <h3 className="text-xl font-bold text-white xl:text-2xl xl:leading-10">
            {locale === "ar" ? bannerdata.titleAr : bannerdata.title}
          </h3>
          <p className="pt-2 font-light text-white xl:text-lg">
            {locale === "ar" ? bannerdata.subtitleAr : bannerdata.subtitle}
          </p>
        </div>
        <div>
          <img
            className={`absolute md:top-[0] md:bottom-auto bottom-[50px] rounded-2xl z-[-1] ${
              locale === "ar" ? "left-0" : "right-0"
            }`}
            src={bannerdata.image_icon_banner_background}
            alt=""
          />
          <img
            className="translate-y-12 md:translate-y-0 lg:pl-24"
            src={bannerdata.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BannerBackground;
