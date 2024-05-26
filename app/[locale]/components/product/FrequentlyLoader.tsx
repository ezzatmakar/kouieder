import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import React from "react";

export default function FrequentlyLoader() {
  const t = useTranslations("common");
  return (
    <div className="animate-pulse">
      <div className="w-full p-4 md:border-t-2 md:pt-4 md:p-0 md:mt-6">
        <div className="px-4 py-6 mt-6 bg-primary-300 border-gray-100 md:border-0 md:pt-0 md:mt-3 md:bg-transparent md:rounded-xl">
          <h2 className="md:mb-2 text-base font-bold text-black md:text-xl">
            {t("bought_together_title")}
          </h2>
          <div className="flex flex-wrap md:flex-nowrap gap-5">
            <div className="flex items-center justify-center overflow-y-scroll no-scrollbar py-3 px-3">
              <div className="w-20 h-20 p-5 border-2 rounded-[10px] cursor-pointer relative bg-primary-300"></div>
              {<PlusIcon className="w-6 h-6" />}
              <div className="w-20 h-20 p-5 border-2 rounded-[10px] cursor-pointer relative bg-primary-300"></div>
              {<PlusIcon className="w-6 h-6" />}
              <div className="w-20 h-20 p-5 border-2 rounded-[10px] cursor-pointer relative bg-primary-300"></div>
              {<PlusIcon className="w-6 h-6" />}
              <div className="w-20 h-20 p-5 border-2 rounded-[10px] cursor-pointer relative bg-primary-300"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-32 h-6 bg-primary-300 rounded-xl" />
              <div className="w-32 h-8 bg-primary-300 rounded-xl" />
              <div className="w-48 h-11 bg-gray-200 rounded-full" />
            </div>
          </div>
          <div>
            <ul className="space-y-4">
                <li className="w-1/2 h-6 bg-gray-200 rounded-full" />
                <li className="w-1/2 h-6 bg-gray-200 rounded-full" />
                <li className="w-1/2 h-6 bg-gray-200 rounded-full" />
                <li className="w-1/2 h-6 bg-gray-200 rounded-full" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
