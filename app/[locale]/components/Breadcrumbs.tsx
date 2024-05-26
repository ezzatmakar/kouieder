"use client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Breadcrumbs({ breadcrumbs, className }: any) {
  const locale = useLocale();
  const t = useTranslations("common");

  // Create an array to hold breadcrumb items for structured data
  const structuredDataBreadcrumbs = breadcrumbs.map((item: any) => {
    return {
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.href,
    };
  });

  const structuredDataJSON = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: structuredDataBreadcrumbs,
  };
  const structuredDataString = JSON.stringify(structuredDataJSON, null, 2);

  return (
    <nav aria-label="Breadcrumbs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />
      <ol
        vocab="https://schema.org/"
        typeof="BreadcrumbList"
        className={classNames(
          "order-first list-none m-0 p-0 flex gap-2 md:text-sm text-xs font-semibold items-center capitalize no-scrollbar overflow-y-scroll w-full",
          className
        )}
      >
        {structuredDataBreadcrumbs.map((item: any, index: number) => (
          <Fragment key={index}>
            {index === 0 ? (
              ""
            ) : locale === "ar" ? (
              <span className="h-4 w-4 min-w-[20px]">
                <ChevronLeftIcon className="h-full w-full select-none text-slate-500" />
              </span>
            ) : (
              <span className="h-4 w-4 min-w-[20px]">
                <ChevronRightIcon className="h-full w-full select-none text-slate-500" />
              </span>
            )}
            {index + 1 === structuredDataBreadcrumbs.length ? (
              <li
                property="itemListElement"
                typeof="ListItem"
                className="whitespace-nowrap text-primary-200 hover:text-primary-300"
              >
                <Link prefetch={false} property="item" href={item.item}>
                  <span property="name">{item.name}</span>
                  <meta property="position" content={item.position} />
                </Link>
              </li>
            ) : (
              <li
                property="itemListElement"
                typeof="ListItem"
                className="whitespace-nowrap text-primary-200 hover:text-primary-300"
              >
                <Link prefetch={false} property="item" href={item.item}>
                  <span property="name">{item.name}</span>
                </Link>
                <meta property="position" content={item.position} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
