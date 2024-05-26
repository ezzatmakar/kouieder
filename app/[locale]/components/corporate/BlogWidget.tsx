"use client";
import { useLocale, useTranslations } from "next-intl";
import ProgressiveImage from "../ProgressiveImage";
import { Link } from "@/navigation";
import Image from "next/image";
import { useState } from "react";

export default function BlogWidget({ post }: any) {
  // const { t } = useTranslation();
  // const { i18n } = useTranslation();
  const locale = useLocale();
  const [src, setSrc] = useState(post.image ? post.image : "/images/placeholder.webp");
  const t = useTranslations("common");
  // console.log('post', post)
  function trimText(text: any) {
    const maxLength = 150;
    if (text.length > maxLength) {
      const trimmedText = text.substring(0, maxLength) + "...";
      return trimmedText;
    }
    return text;
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden">
      <Link prefetch={false} href={`/blog/${post.slug}`} className="block">
        {/* <ProgressiveImage src={post.image} placeholder={post.image} alt={post.title} className="w-full" /> */}
        <Image
          src={src}
          onError={() => setSrc('/images/placeholder.webp')}
          alt={post.title}
          className="h-[180px] w-full rounded-3xl object-cover group-hover:drop-shadow-xl md:h-[372px]"
          width={372}
          height={372}
        />
      </Link>
      <div className="flex h-full flex-col pt-3 md:pt-5">
        <span className="text-sm text-gray-50 md:text-base">Dec 22, 2023</span>
        <h3 className="mb-4">
          <Link prefetch={false}
            href={`/blog/${post.slug}`}
            className="inline-block text-lg font-bold md:text-xl xl:leading-9"
          >
            {locale === "ar" ? post.ar_title || post.title : post.title}
          </Link>
        </h3>
        <div
          className="mb-4 text-sm text-gray-50 md:text-base"
          dangerouslySetInnerHTML={{
            __html: trimText(
              locale === "ar" ? post.ar_content || post.content : post.content
            ),
          }}
        />
        <Link prefetch={false}
          href={`/blog/${post.slug}`}
          className="mt-auto block max-w-[100px] rounded-full bg-primary-300 py-2 text-center text-sm text-white !drop-shadow-none group-hover:bg-primary-400"
        >
          {t("read_more")}
        </Link>
      </div>
    </div>
  );
}
