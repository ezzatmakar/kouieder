"use client";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sort({ onSortOptionChange }: any) {
  const t = useTranslations("common");
  const sortOptions = [
    {
      name: "best_seller",
      criteria: "date",
      arrangement: "DESC",
      current: true,
    },
    { name: "newest", criteria: "date", arrangement: "DESC", current: false },
    { name: "oldest", criteria: "date", arrangement: "ASC", current: false },
    {
      name: "priceLowToHigh",
      criteria: "price",
      arrangement: "ASC",
      current: false,
    },
    {
      name: "priceHighToLow",
      criteria: "price",
      arrangement: "DESC",
      current: false,
    },
  ];

  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions.find((option) => option.current)
  );
  const [selectedSortOptionName, setSelectedSortOptionName] = useState("");

  const handleSortOptionClick = (option: any) => {
    setSelectedSortOption((prevOption) => {
      const updatedOptions = sortOptions.map((sortOption) => {
        return {
          ...sortOption,
          current: sortOption === option,
        };
      });
      onSortOptionChange(option);
      return updatedOptions.find((sortOption) => sortOption.current);
    });
  };
  const handleSortOptionClickMobile = (option: any) => {
    setSelectedSortOption((prevOption) => {
      const updatedOptions = sortOptions.map((sortOption) => {
        return {
          ...sortOption,
          current: sortOption === option,
        };
      });
      // onSortOptionChange(option);
      return updatedOptions.find((sortOption) => sortOption.current);
    });
  };

  useEffect(() => {
    if (selectedSortOption) {
      setSelectedSortOptionName(selectedSortOption.name);
    }
  }, [selectedSortOption]);

  // console.log('selectedSortOption', selectedSortOption)
  // console.log('selectedSortOptionName', selectedSortOptionName)
  return (
    <Menu as="div" className="inline-block text-left md:relative">
      {({ open, close }) => (
        <>
          <div>
            <Menu.Button className="group inline-flex justify-between gap-4 rounded-lg border-primary-200 px-2 py-2.5 text-xs font-medium text-primary-200 md:border-2 md:text-sm md:hover:border-primary-200 md:md:hover:bg-primary-200 md:md:hover:text-white">
              {selectedSortOptionName
                ? t(`sortOptions.${selectedSortOptionName}`)
                : ""}
              <RiArrowDownSLine
                className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          {open && (
            <div className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden" />
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="md:transform-none opacity-0 md:scale-95"
            enterTo="md:transform-none opacity-100 md:scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="md:transform-none opacity-100 md:scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="shadow-custom fixed bottom-0 right-0 z-30 w-full origin-top-right overflow-hidden rounded-t-3xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none md:absolute md:bottom-auto md:mt-2 md:w-72 md:rounded-2xl ltr:md:left-auto ltr:md:right-0 rtl:md:left-0 rtl:md:right-auto">
              <div className="">
                <div className="mb-2 flex justify-end border-b border-gray-50 p-4 md:hidden">
                  <button
                    onClick={close}
                    type="button"
                    className={`text-gray-400 md:hover:text-gray-500 rounded-full border border-gray-300 p-2 outline-none`}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-2 p-4 md:block md:p-0">
                  {sortOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "md:bg-[#edf3f5] bg-primary-300 " : "",
                            selectedSortOptionName === option.name
                              ? "md:bg-[#edf3f5] bg-primary-300 text-white"
                              : "",
                            "flex justify-between items-center px-4 md:py-2 py-4 cursor-pointer md:rounded-none rounded-xl"
                          )}
                        //   onClick={() => handleSortOptionClick(option)}
                        //   onClick={() => typeof window !== "undefined" && window.innerWidth < 999 ? handleSortOptionClickMobile(option) : handleSortOptionClick(option)}
                          onClick={(event) => {
                            event.preventDefault();
                            typeof window !== "undefined" && window.innerWidth < 999 ? handleSortOptionClickMobile(option) : handleSortOptionClick(option);
                          }}
                        >
                          <span
                            className={classNames(
                              "block text-xl cursor-pointer font-medium md:text-black"
                            )}
                          >
                            {t(`sortOptions.${option.name}`)}
                          </span>
                          {selectedSortOptionName === option.name ? (
                            <RiCheckLine />
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                <div className="block border-t border-gray-50 p-4 md:hidden">
                  <button
                    type="button"
                    onClick={() => {
                        onSortOptionChange(selectedSortOption);
                        close(); // Close the menu after triggering the change
                    }}
                    className="flex w-full justify-center rounded-lg bg-primary-300 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-400"
                  >
                    {t("confirm")}
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
