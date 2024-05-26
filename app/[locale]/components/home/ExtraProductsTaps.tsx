"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import ExtraProducts from "../ExtraProducts";
// import ExtraProducts from './components/ExtraProducts';
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ExtraProductsTaps() {
  const t = useTranslations("common");
  const locale = useLocale();
  return (
    <div className="bg-white">
      <hr className="absolute left-0 right-0 text-gray-200" />
      <Tab.Group as="div" className="relative flex flex-col pt-6 md:pt-10" defaultIndex={0}>
        <div className="container mx-auto">
          <h3 className="py-5 text-center text-2xl font-bold">{locale === "ar" ? "نفسك في إيه؟" : "What are you choss?"}</h3> 
          <Tab.List className="grid grid-cols-3 flex-wrap justify-center gap-4 px-4 md:flex md:px-0">
            <Tab
              className={({ selected }) =>
                classNames(
                  "md:px-10 px-3 py-2 text-sm md:text-base font-medium leading-5 text-primary-300 focus:outline-none border-2 rounded-full border-primary-300 transition-colors duration-300 hover:bg-primary-300 hover:text-white",
                  selected ? " bg-primary-300 text-white" : ""
                )
              }
            >
              {t("best_selling")}
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "md:px-10 px-3 py-2 text-sm md:text-base font-medium leading-5 text-primary-300 focus:outline-none  border-2 rounded-full border-primary-300 transition-colors duration-300 hover:bg-primary-300 hover:text-white",
                  selected ? "bg-primary-300 text-white" : ""
                )
              }
            >
              {t("new_arrivals")}
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "md:px-10 px-3 py-2 text-sm md:text-base font-medium leading-5 text-primary-300 focus:outline-none  border-2 rounded-full border-primary-300 transition-colors duration-300 hover:bg-primary-300 hover:text-white",
                  selected ? "bg-primary-300 text-white" : " "
                )
              }
            >
              {t("we_chose_you")}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="container mx-auto">
            <Tab.Panel>
              <div className="mt-4 flex items-center justify-between px-3 md:hidden">
                <h2 className="text-xl font-bold tracking-tight text-black">
                  {t("best_selling")}
                </h2>
              </div>
              <ExtraProducts categorySlug="best-sellers" count={20} arrangement="ASC" />
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-4 flex items-center justify-between px-3 md:hidden">
                <h2 className="text-xl font-bold tracking-tight text-black">
                  {t("new_arrivals")}
                </h2>
              </div>
              <ExtraProducts count={20} />
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-4 flex items-center justify-between px-3 md:hidden">
                <h2 className="text-xl font-bold tracking-tight text-black">
                  {t("we_chose_you")}
                </h2>
              </div>
              <ExtraProducts count={20} />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
