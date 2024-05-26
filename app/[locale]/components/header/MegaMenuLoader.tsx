import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function MegaMenuLoader() {
  return (
    <span className="text-opacity-90 animate-pulse inline-flex items-center px-4 gap-3 py-2 font-medium focus:outline-none bg-gray-200 whitespace-nowrap hover:bg-primary-100 text-[18px] rounded-100 text-white">
      <div className="flex items-center h-8 min-w-8">
        <img
          src="/images/icons/cats.webp"
          alt={"all products"}
          width="24"
          height="24"
          className=""
        />
      </div>
      <span className="rtl:pt-1 w-16"></span>
      <ChevronDownIcon
        className={`h-6 w-6 text-orange-300 transition duration-150 ease-in-out`}
        aria-hidden="true"
      />
    </span>
  );
}
