"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCloseCircleFill } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";
import { searchForm } from "@/app/api/general";
import Popup from "./Popup";
import { Link } from "@/navigation";

// import { searchForm } from "~/api/common";
// import { INPUT_CLASSES } from "~/commonUIClasses";
// import Popup from "./Popup";

export default function Search() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [isSearch, setIsSearch] = useState(false);
  // const [popoverOpen, setPopoverOpen] = useState(false);
  const { register, handleSubmit, watch } = useForm<any>();
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      // Prevent browser suggestions or other default behavior
      e.preventDefault();

      // Move the selection up or down in the list
      if (e.key === "ArrowUp") {
        setSelectedItemIndex((prevIndex) =>
          prevIndex <= 0 ? searchResults.length - 1 : prevIndex - 1
        );
      } else if (e.key === "ArrowDown") {
        setSelectedItemIndex((prevIndex) =>
          prevIndex >= searchResults.length - 1 ? 0 : prevIndex + 1
        );
      }
    } else if (e.key === "Enter") {
      // Prevent form submission if the search input is inside a form
      e.preventDefault();

      // Handle selection when the user presses Enter
      if (searchResults.length > 0 && selectedItemIndex >= 0) {
        // Perform the action you want to take when an item is selected
        // For example, navigate to the selected item's link
        const selectedItem = searchResults[selectedItemIndex] as {
          slug: string;
        };
        window.location.href = `${locale === "ar" ? "" : "/en"}/products/${
          selectedItem.slug
        }`;
      }
    }
  };

  const closeModal = () => {
    // console.log("closeModal");
    setIsSearch(false);
  };

  const openModal = () => {
    // console.log("openModal");
    setIsSearch(true);
  };

//   console.log("isSearch", isSearch);

  const clearValue = () => {
    setSearchValue("");
  };
  useEffect(() => {
    document.body.classList.toggle("overflow-y-hidden", isSearch);

    return () => {
      // Clean up the class when the component unmounts
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isSearch]);
  const keyword = watch("keyword");
  const onSubmit = async (data: string) => {
    // console.log('data', data)
    const searchResult = await searchForm(keyword, locale);
    // @ts-ignore
    setSearchResults(Array.isArray(searchResult) ? searchResult : []); // Check if searchResult is an array
    setSearchResults(searchResult);
  };

  return (
    <div>
      <span
        className="flex h-10 w-10 cursor-pointer items-center rounded-full text-primary-300 hover:bg-primary-100"
        onClick={openModal}
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="m-auto h-6 w-6" aria-hidden="true" />
      </span>
      <Popup isOpen={isSearch} close={closeModal} width="full">
        <div className="flex h-full flex-col divide-y divide-gray-200">
          <div className="px-8 py-5">
            <h3 className="text-2xl font-bold">{t("search")}</h3>
          </div>
          <div className="flex h-full max-h-full flex-col space-y-4 px-4 py-4 md:px-8 md:py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                {searchValue && (
                  <button
                    className={`absolute flex items-center justify-center w-6 h-6 top-2 ${
                      locale === "en" ? "right-2" : "left-2"
                    }`}
                    onClick={clearValue}
                  >
                    <RiCloseCircleFill className="text-xs text-gray-200" />
                  </button>
                )}
                <div
                  className={`absolute inset-y-0 flex items-center pointer-events-none ${
                    locale === "en" ? "pl-3 left-0" : "pr-3 right-0"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    className="text-gray-500 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className={`w-full py-2 border-2 border-gray-200 text-black outline-none rounded-100 placeholder:text-xs ${
                    locale === "en" ? "pr-5 pl-10" : "pl-5 pr-10"
                  }`}
                  placeholder={t("search_products")}
                  required
                  autoComplete="off"
                  // value={searchValue}
                  {...register("keyword")}
                  onKeyUp={
                    typeof window !== "undefined" && window.innerWidth > 999
                      ? handleSubmit(onSubmit)
                      : undefined
                  }
                  // onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
                {typeof window !== "undefined" && window.innerWidth < 999 && (
                  <div className="absolute bottom-0 left-0 right-0 border-t border-[#C6C6C6] p-4">
                    <button type="submit" className="flex w-full justify-center rounded-lg bg-primary-300 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-400">{t('the_search')}</button>
                  </div>
                )}
            </form>

            <ul className="no-scrollbar space-y-4 overflow-scroll md:p-4">
              {Array.isArray(searchResults) ? (
                searchResults.map((item, index) => (
                  <li className="w-full" key={index}>
                    <Link prefetch={false}
                      href={
                        // @ts-ignore
                        `/products/${item.slug}`
                      }
                      className={`flex items-center px-2 py-1 outline-none rounded-2xl hover:bg-primary-300 hover:text-white focus:bg-primary-300 justify-between ${
                        selectedItemIndex === index ? "bg-primary-300" : ""
                      }`}
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      <span className="">
                        {/* {t('all_type')}{" "} */}
                        {
                          // @ts-ignore
                          locale === "en" ? item.title : item.ar_title
                        }
                      </span>
                      <span className="md:p-2">
                        <ChevronLeftIcon className="h-6 w-6" />
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <p>{t("no_products")}</p>
              )}
            </ul>
          </div>
        </div>
      </Popup>
    </div>
  );
}
