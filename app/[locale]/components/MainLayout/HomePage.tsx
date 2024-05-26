"use client";
import { useLocale, useTranslations } from "next-intl";
import HeroSection from "../HeroSection";
import SectionBanner from "../home/SectionBanner";
import SectionCategory from "../home/SectionCategory";
import ExtraProductsTaps from "../home/ExtraProductsTaps";
import BannerBackground from "../home/BannerBackground";
import CategoryBanner from "../home/CategoryBanner";
import SectionAbout from "../home/SectionAbout";
import BlogList from "../BlogList";

export default function HomePage({ data }: any) {
  const t = useTranslations();
  const locale = useLocale();
  const sectionTitle = data;
  const listBanner = data?.subhero_category;

  const listCategory = data.list_category;

  const dataBannerFirst = {
    tagline: data.banner_background[0].label_text_banner_background,
    taglineAr: data.banner_background[0].label_text_ar_banner_background,

    title: data.banner_background[0].title_banner_background,
    titleAr: data.banner_background[0].title_ar_banner_background,

    subtitle: data.banner_background[0].subtitle_banner_background,
    subtitleAr: data.banner_background[0].subtitle_ar_banner_background,

    image: data.banner_background[0].image_banner_background,
    image_icon: data.banner_background[0].image_icon_banner_background,
  };

  const listCategoryBanner = data.banner_category;
  const listAbout = data.about;

  const dataBannerSecond = {
    tagline: data.banner_background[1].label_text_banner_background,
    taglineAr: data.banner_background[1].label_text_ar_banner_background,

    title: data.banner_background[1].title_banner_background,
    titleAr: data.banner_background[1].title_ar_banner_background,

    subtitle: data.banner_background[1].subtitle_banner_background,
    subtitleAr: data.banner_background[1].subtitle_ar_banner_background,

    image: data.banner_background[1].image_banner_background,
    image_icon: data.banner_background[1].image_icon_banner_background,
  };

  const product = data;

  return (
    <div>
      <HeroSection
        HeroImages={
          locale === "en"
            ? data.banner_gallery
                .map(
                  (banner: { desktop_banner_en: any }) =>
                    banner.desktop_banner_en
                )
                .filter((image: any) => image !== false)
            : data.banner_gallery
                .map((banner: { desktop_banner: any }) => banner.desktop_banner)
                .filter((image: any) => image !== false)
        }
        MobileImages={
          locale === "en"
            ? data.banner_gallery
                .map(
                  (banner: { mobile_banner_en: any }) => banner.mobile_banner_en
                )
                .filter((image: any) => image !== false)
            : data.banner_gallery
                .map((banner: { mobile_banner: any }) => banner.mobile_banner)
                .filter((image: any) => image !== false)
        }
      />
      <div className="container mx-auto flex flex-col-reverse px-3 md:flex-col">
        <SectionBanner bannerdata={listBanner} />

        <SectionCategory
          categorydata={listCategory}
          sectiontitle={sectionTitle}
        />
      </div>
      <ExtraProductsTaps />
      <div className="mx-auto px-3 2xl:container">
        <BannerBackground
          bannerdata={dataBannerFirst}
          bgcolor={"before:bg-[#EF7E7B]"}
          bgcolorlabel={"bg-[#D22760]"}
          href={data.banner_background[0].link}
        />

        <CategoryBanner categorydata={listCategoryBanner} />
        <SectionAbout aboutdata={listAbout} />
        {locale === "ar" && (
          <div className="pt-10">
            <BlogList inHome />
          </div>
        )}
        <BannerBackground
          bannerdata={dataBannerSecond}
          bgcolor={
            "before:bg-primary-300 hover:before:bg-primary-400 before:transition-all"
          }
          bgcolorlabel={"bg-primary-201"}
          href={data.banner_background[1].link}
        />
      </div>
    </div>  
  );
}
