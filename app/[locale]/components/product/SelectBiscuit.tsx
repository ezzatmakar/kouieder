import { RadioGroup } from "@headlessui/react";
import { RiCheckLine } from "react-icons/ri";
import { useLocale } from "next-intl";
// import { useState } from "react";
// import { v4 } from "uuid";
// import SizeGuide from "../SizeGuide";
interface SelectBiscuitProps {
  biscuits: any;
  selectBiscuit: any;
  onselectBiscuitChange: (biscuite: string) => void;
  small?: boolean;
  inMobileDialog?: boolean;
  // other props...
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectBiscuit({
  biscuits,
  selectBiscuit,
  onselectBiscuitChange,
  small,
  inMobileDialog,
}: SelectBiscuitProps) {
  const biscuitsList = Array.isArray(biscuits) ? biscuits : Object.values(biscuits);
  if (!selectBiscuit && biscuitsList.length > 0) {
    selectBiscuit = biscuitsList[0].slug;
    // onselectBiscuitChange(selectBiscuit)
  }
  const locale = useLocale();
  return (
    <div>
      {/* <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <SizeGuide />
            </div> */}

      <RadioGroup value={selectBiscuit} onChange={onselectBiscuitChange}>
        <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
        {/* <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"> */}
        <div
          className={`flex overflow-x-scroll no-scrollbar ${small ? "gap-x-2" : "gap-x-3"} ${
            inMobileDialog ? "flex-col" : ""
          }`}
        >
          {biscuitsList.map((biscuite: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={biscuite.slug}
              // disabled={!size.inStock}
              className={({ active }) =>
                classNames(
                  selectBiscuit == biscuite.slug && !inMobileDialog
                    ? "text-primary-100 bg-primary-100 border-primary-200"
                    : "bg-gray-100 border-transparent text-black",
                  small
                  ? "border-2 py-1.5 px-1 lg:px-2 lg:py-2 md:text-xs text-[10px] bg-gray-100 shadow-sm justify-center"
                  : inMobileDialog && selectBiscuit === biscuite.slug
                  ? "bg-primary-300 w-full !border-none text-gray-200 flex justify-between items-center p-4"
                  : inMobileDialog
                  ? "w-full !border-none text-gray-200 flex justify-between items-center p-4"
                  : "border-2 py-2.5 px-4 md:px-3 md:text-base text-sm shadow-sm justify-center",

                  "group cursor-pointer relative flex items-center  focus:outline-none font-semibold rounded-xl"
                  
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      selectBiscuit == biscuite.slug ? "text-primary-300" : "",
                      inMobileDialog?"":"",
                      "whitespace-nowrap"
                    )}
                  >
                    {locale === "ar" ? biscuite.arabic_name : biscuite.english_name}
                  </RadioGroup.Label>
                  <span
                    className={classNames(
                      // selectBiscuit == size
                      //   ? ""
                      //   : "",
                      inMobileDialog ? "hidden" : "",
                      "pointer-events-none absolute -inset-px rounded-xl"
                    )}
                    aria-hidden="true"
                  />
                  {selectBiscuit == biscuite.slug && inMobileDialog ? <RiCheckLine /> : ""}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
