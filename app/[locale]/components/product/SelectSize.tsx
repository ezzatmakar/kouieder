import { RadioGroup } from "@headlessui/react";
import { RiCheckLine } from "react-icons/ri";
import { useLocale } from "next-intl";
// import { useState } from "react";
// import { v4 } from "uuid";
// import SizeGuide from "../SizeGuide";
interface SelectSizeProps {
  sizes: any;
  selectedSize: any;
  onSelectedSizeChange: (size: string) => void;
  small?: boolean;
  inMobileDialog?: boolean;
  // other props...
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectSize({
  sizes,
  selectedSize,
  onSelectedSizeChange,
  small,
  inMobileDialog,
}: SelectSizeProps) {
  const sizesList = Array.isArray(sizes) ? sizes : Object.values(sizes);
  if (!selectedSize && sizesList.length > 0) {
    selectedSize = sizesList[0].slug;
    // onSelectedSizeChange(selectedSize)
  }
  // debugger;
  const locale = useLocale();
  return (
    <div>
      {/* <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <SizeGuide />
            </div> */}

      <RadioGroup value={selectedSize} onChange={onSelectedSizeChange}>
        <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
        {/* <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"> */}
        <div
          className={`flex overflow-x-scroll no-scrollbar ${small ? "gap-x-2" : "gap-x-3 gap-y-3"} ${
            inMobileDialog ? "flex-col" : ""
          }`}
        >
          {sizesList.map((size: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={size.slug}
              // disabled={!size.inStock}
              className={({ active }) =>
                classNames(
                  selectedSize == size.slug && !inMobileDialog
                    ? "text-primary-100 bg-primary-100 border-primary-200"
                    : "bg-gray-100 border-transparent text-black",
                  small
                  ? "border-2 py-1.5 px-1 lg:px-2 lg:py-2 md:text-xs text-[10px] bg-gray-100 shadow-sm justify-center"
                  : inMobileDialog && selectedSize === size.slug
                  ? "!border-primary-200 border-2 w-full text-gray-200 flex justify-between items-center p-4"
                  : inMobileDialog
                  ? "w-full !border-none text-black flex justify-between items-center p-4"
                  : "border-2 py-2.5 px-4 md:px-3 md:text-base text-sm shadow-sm justify-center",
                  "group cursor-pointer relative flex items-center focus:outline-none font-semibold rounded-xl"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      selectedSize == size.slug? "text-primary-300" : "",
                      inMobileDialog?"":"",
                      "whitespace-nowrap"
                    )}
                  >
                    {locale === "ar" ? size.arabic_name : size.english_name}
                  </RadioGroup.Label>
                  <span
                    className={classNames(
                      // selectedSize == size
                      //   ? ""
                      //   : "",
                      inMobileDialog ? "hidden" : "",
                      "pointer-events-none absolute -inset-px rounded-xl"
                    )}
                    aria-hidden="true"
                  />
                  {selectedSize == size.slug && inMobileDialog ? <RiCheckLine /> : ""}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
