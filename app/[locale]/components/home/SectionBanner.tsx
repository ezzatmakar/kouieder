"use client";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import Image from "next/image";

const SectionBanner = ({ bannerdata }: any) => {
  const locale = useLocale();

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-y-3 pt-3 md:flex-row-reverse md:flex-nowrap md:gap-x-3">
      <div className="w-full md:w-[546px]">
        <Link prefetch={false}
          href={`/category/${bannerdata[0].url.slug}`}
          className="group relative block aspect-square overflow-hidden rounded-3xl md:rounded-none"
        >
          <Image
            className="object-cover transition-all group-hover:scale-110"
            src={
              locale === "en"
                ? bannerdata[0].banner_en
                  ? bannerdata[0].banner_en
                  : "/images/placeholder.webp"
                : bannerdata[0].banner
            }
            alt={bannerdata[0].url.name}
            fill
          />
        </Link>
      </div>
      <div className="flex w-full flex-col justify-between gap-y-3 md:w-[580px]">
        <Link prefetch={false}
          href={`/category/${bannerdata[1].url.slug}`}
          className="group relative block aspect-[578/268] w-full overflow-hidden rounded-3xl md:rounded-none"
        >
          <Image
            className="object-cover transition-all md:group-hover:scale-105"
            src={
              locale === "en" ? bannerdata[1].banner_en : bannerdata[1].banner
            }
            alt={bannerdata[1].url.name}
            fill
          />
        </Link>
        <Link prefetch={false}
          href={`/category/${bannerdata[2].url.slug}`}
          className="group relative block aspect-[578/268] w-full overflow-hidden rounded-3xl md:rounded-none"
        >
          <Image
            className="object-cover transition-all md:group-hover:scale-105"
            src={
              locale === "en" ? bannerdata[2].banner_en : bannerdata[2].banner
            }
            alt={bannerdata[2].url.name}
            fill
          />
        </Link>
      </div>
    </div>
  );
};

export default SectionBanner;
