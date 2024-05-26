"use client";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";

export default function PrivacySection({ pageInfo }: any) {
  const t = useTranslations();
  const locale = useLocale();
  const breadcrumbs = {
    pages: [
      { name: t("common.home"), href: "/" },
      { name: t("corporate.privacy_policy"), href: "#" },
    ],
  };

  const content =
    locale === "ar"
      ? pageInfo?.description_ar || "missing"
      : pageInfo?.description;
  const paragraphs = content.split("\r\n\r\n");
  return (
    <section className="w-full pb-24 ">
      <div className="pt-4 pb-5 md:pb-16">
        <div className="container px-4 mx-auto details md:px-24">
          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
          <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">
            {t("corporate.privacy_policy")}
          </h1>
        </div>
      </div>
      <div className="w-full bg-white ">
        <div className="flex flex-col">
          <div className="container px-4 mx-auto md:px-24">
            <div className="wysiwyg">
              {paragraphs.map((paragraph: any, index: any) => (
                <div
                  key={index}
                  className="mb-4 text-base leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: paragraph,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
