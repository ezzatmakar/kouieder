"use client";
import React, { useEffect, useState } from "react";
import { getBranches } from "@/app/api/corporateAPI";
import { ApiLocation, Location } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RiArrowUpDownLine, RiCheckLine } from "react-icons/ri";
import LocationMenu from "../icons/LocationMenu";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function LocationFilter({ types, selectedType, handleTypeChange }: any) {
  const t = useTranslations("common");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-between gap-4 py-2.5 px-5 text-sm font-medium text-gray-200 group md:hover:text-white md:hover:bg-gray-200 rounded-100 border-2 border-gray-400 hover:border-gray-200">
          {t(selectedType)}
          <RiArrowUpDownLine
            className="flex-shrink-0 w-5 h-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 ltr:md:right-0 rtl:md:left-0 rtl:md:right-auto w-72 mt-2 origin-top-right bg-white rounded-2xl shadow-custom overflow-hidden ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            {types.map((type: string) => (
              <Menu.Item key={type}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      selectedType === type ? "bg-gray-100" : "",
                      "flex justify-between items-center px-4 py-2 cursor-pointer"
                    )}
                    onClick={() => handleTypeChange(type)}
                  >
                    <span
                      className={classNames(
                        "block text-xl cursor-pointer font-medium text-black"
                      )}
                    >
                      {t(type)}
                    </span>
                    {selectedType === type ? <RiCheckLine /> : ""}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function LocationTabs() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [apiLocations, setApiLocations] = useState<ApiLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoadingPage(true);
      try {
        const items = await getBranches();
        setApiLocations((prevItems) => [...prevItems, ...items]);
      } catch (error) {
        console.error("Error fetching extra products:", error);
      } finally {
        setIsLoadingPage(false);
      }
    };

    fetchData();
  }, []);

  const locations: Location[] = apiLocations.reduce(
    (result: Location[], apiLocation: ApiLocation) => {
      const city = apiLocation.extra_data.city;
      const existingCity = result.find((item) => item.name === city);

      const place = {
        type: apiLocation.extra_data.type,
        place_name: locale ==="ar" ?  apiLocation.extra_data.name_ar : apiLocation.extra_data.name,
        details: locale ==="ar" ? apiLocation.extra_data.address_ar:apiLocation.extra_data.address,
        number: apiLocation.extra_data.phone,
        direction: apiLocation.extra_data.location,
        branch: apiLocation.extra_data.type === "branch",
      };

      if (existingCity) {
        existingCity.places.push(place);
      } else {
        result.push({
          name: city,
          label: city,
          places: [place],
        });
      }

      return result;
    },
    []
  );

  const locationTypes = ["all", "branch", "booth"];

  const handleTypeChange = (typeName: any) => {
    setSelectedType(typeName);
  };
  const handleTabClick = (tabName: any) => {
    setSelectedTab(tabName);
  };

  const filteredLocations =
    selectedTab === "all"
      ? locations
      : locations.filter((loc) => loc.name === selectedTab);

  const filteredPlaces = Array.isArray(filteredLocations)
    ? filteredLocations
        .filter((loc) =>
          loc.places.some(
            (place) => selectedType === "all" || place.type === selectedType
          )
        )
        .flatMap((loc) =>
          loc.places.filter(
            (place) => selectedType === "all" || place.type === selectedType
          )
        )
    : [];

  return (
    <>
      {/* <div className="pb-6 border-b">
        <div className="max-w-screen-2xl px-4 mx-auto lg:px-24 flex justify-between flex-wrap gap-4 flex-col md:flex-row">
          <div className="flex gap-3 overflow-y-scroll no-scrollbar max-w-[100vw] scrollbar-hide -mx-4 px-4">
            <div
              className={`text-gray-200 md:text-xl text-base font-semibold uppercase justify-center items-center px-4 py-2.5 rounded-100 inline-flex cursor-pointer ${
                selectedTab === "all" ? "bg-gray-100" : "bg-primary-300"
              }`}
              onClick={() => handleTabClick("all")}
            >
              {t("common.all")}
            </div>

            {locations.map((location) => (
              <div
                key={location.name}
                className={`px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex cursor-pointer ${
                  selectedTab === location.name ? "bg-gray-100" : "bg-primary-300"
                }`}
                onClick={() => handleTabClick(location.name)}
              >
                <div className="justify-end items-center gap-2.5 inline-flex">
                  <div className="flex items-center justify-center gap-1 text-gray-200">
                    <div className={`text-xl font-semibold uppercase`}>
                      {t(
                        location.label
                          ? `fields.cities.${location.label}`
                          : "fields.cities.other"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <LocationFilter
              selectedType={selectedType}
              handleTypeChange={handleTypeChange}
              types={locationTypes}
            />
          </div>
        </div>
      </div> */}
      <div className="container max-w-screen-2xl px-4 mx-auto lg:px-24 lg:pt-12 lg:pb-24 py-4">
        {isLoadingPage?
        <p className="text-center">LOADING</p>
        :
        <div className="relative ">
         <div>
          <img className="m-auto w-full min-h-[750px] object-cover rounded-3xl"
                  src="/images/map.png"
                  alt=""
            />
         </div>
          <div className="absolute right-10 top-10 bg-white w-[500px] h-[650px] rounded-3xl">
            {/* <div className="flex items-center gap-x-3 p-5 pb-0">
                <div className="w-1/2">
                  <select name="" id="" className="w-full bg-white relative flex gap-2 px-3 py-2 text-base text-primary-300 border-2 rounded-lg border-primary-100 items-center whitespace-nowrap">
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <select name="" id="" className="w-full bg-white relative flex gap-2 px-3 py-2 text-base text-primary-300 border-2 rounded-lg border-primary-100 items-center whitespace-nowrap">
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                    <option value="cairo">cairo</option>
                  </select>
                </div>
            </div> */}
            <div className="flex  flex-wrap flex-col gap-x-6 gap-y-6 p-5">
              {filteredPlaces.length === 0 ? (
                <p className="text-center w-full">No places available <br /> try different filters</p>
              ) : (
                filteredPlaces.map((place: any, index: any) => (
                  <div
                    key={index}
                    className={` w-full rounded-3xl py-5 px-6 ${
                      place.branch ? "border border-[#A8B8E0]" : ""
                    }`}
                  >
                    {/* <span
                      className={`rounded px-2 text-xs md:text-base font-semibold ${
                        place.branch
                          ? "bg-primary-100 text-white"
                          : " bg-[#F9A000] text-black"
                      }`}
                    >
                      {t(`common.${place.type}`)}
                    </span> */}
                    <p className="mt-2 mb-1 text-base md:text-xl font-bold text-primary-300 flex items-center gap-x-2">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.20088 0.464844C6.27181 0.464844 4.51363 1.6037 3.71817 3.36115L2.66369 5.69273C1.64708 6.56841 0.981201 7.86858 0.981201 9.32015C0.981201 11.0976 1.97629 12.6429 3.42526 13.4725C3.41489 13.5344 3.4094 13.5971 3.40885 13.6599V20.8609C3.40885 22.8345 5.02984 24.4648 7.00346 24.4648H19.0058C20.9794 24.4648 22.6004 22.8345 22.6004 20.8609V13.6599C22.6008 13.5916 22.5953 13.5234 22.584 13.4561C24.0176 12.6225 24.9999 11.0861 24.9999 9.32015C24.9999 7.90058 24.3525 6.64316 23.376 5.77006L22.1927 3.16666C21.4508 1.5276 19.8114 0.464844 18.0123 0.464844H8.20088ZM8.20088 2.86438H18.0123C18.875 2.86438 19.6506 3.37185 20.0064 4.15787L21.2811 6.96514C21.3634 7.14332 21.4881 7.29861 21.6444 7.41739C22.2285 7.86323 22.6004 8.53984 22.6004 9.32015C22.6004 10.6597 21.5403 11.722 20.2009 11.722C18.8614 11.722 17.8014 10.6597 17.8014 9.32015C17.8014 7.7189 15.3995 7.7189 15.3995 9.32015C15.3995 10.6597 14.3394 11.722 12.9999 11.722C11.6605 11.722 10.6004 10.6597 10.6004 9.32015C10.6029 8.65756 10.0679 8.11834 9.40534 8.11569H9.38659C8.72034 8.11315 8.1796 8.6539 8.18214 9.32015C8.18214 10.6597 7.12206 11.722 5.78261 11.722C4.44314 11.722 3.38073 10.6597 3.38073 9.32015C3.38073 8.53014 3.77052 7.84231 4.36492 7.39865C4.52548 7.27903 4.65357 7.12114 4.7375 6.93936L5.9068 4.34299C6.31616 3.43862 7.20815 2.86438 8.20088 2.86438ZM9.39596 12.1719C10.2771 13.2924 11.475 14.1216 12.9999 14.1216C14.5109 14.1216 15.7151 13.31 16.5969 12.2071C17.4787 13.3115 18.6887 14.1216 20.2009 14.1216V20.8609C20.2009 21.5377 19.6826 22.0653 19.0058 22.0653H16.6039V19.6658C16.6039 17.6922 14.9736 16.0618 12.9999 16.0618C11.0263 16.0618 9.40534 17.6922 9.40534 19.6658V22.0653H7.00346C6.32664 22.0653 5.79901 21.5377 5.79901 20.8609V14.1216C7.31624 14.1156 8.51808 13.2885 9.39596 12.1719ZM12.9999 18.4613C13.6768 18.4613 14.2044 18.989 14.2044 19.6658V22.0653H11.8049V19.6658C11.8049 18.989 12.3231 18.4613 12.9999 18.4613Z" fill="#5066A2"/>
                        </svg>

                      {place.place_name}
                    </p>
                    <p className="text-sm md:text-base text-gray-50">
                      {place.details}
                    </p>
                    <div className="flex mt-3">
                      {/* <a
                        href={`tel:${place.number}`}
                        className="flex md:text-base text-xs font-semibold text-primary-100 gap-x-2"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.012 7.39453C15.7979 4.4662 13.3337 2.14453 10.3337 2.14453C7.33372 2.14453 4.86955 4.4662 4.65538 7.39453C3.40538 7.68036 2.47705 8.75203 2.47705 10.002C2.47705 11.252 3.40538 12.3237 4.65538 12.6087C4.86955 15.5379 7.33372 17.8587 10.3337 17.8587H12.4771V16.4304H10.3337C7.97705 16.4304 6.04788 14.502 6.04788 12.1445V7.85953C6.04788 5.50286 7.97705 3.57453 10.3337 3.57453C12.6912 3.57453 14.6195 5.50286 14.6195 7.85953V11.967C14.6202 12.1562 14.6957 12.3375 14.8295 12.4713C14.9632 12.6051 15.1445 12.6805 15.3337 12.6812C16.9054 12.6812 18.1912 11.467 18.1912 10.0029C18.1912 8.75286 17.2629 7.6812 16.0129 7.39536L16.012 7.39453ZM3.90538 10.002C3.90538 9.53787 4.19122 9.14453 4.61955 8.93036V11.0737C4.19122 10.8587 3.90538 10.4662 3.90538 10.002ZM16.0479 11.0737V8.93036C16.4771 9.14453 16.7629 9.53787 16.7629 10.002C16.7629 10.4662 16.4771 10.8587 16.0479 11.0737Z"
                            fill="#126E49"
                          />
                        </svg>
                        {place.number}
                      </a>
                      <hr className="w-[1px] h-auto mx-4 bg-gray-100" /> */}
                      <a
                        href={place.direction}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex md:text-base text-xs font-semibold text-primary-300 gap-x-2"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_416_31880)">
                            <path
                              d="M9.23754 12.2157C9.02848 11.7024 8.60954 11.3033 8.08674 11.1194L2.21486 9.05346C2.1978 9.04746 2.19023 9.04199 2.18798 9.04025C2.1855 9.03833 2.18405 9.0367 2.18268 9.03467C2.17927 9.02964 2.17278 9.01596 2.17249 8.99449C2.1722 8.97303 2.17832 8.95917 2.18159 8.95405C2.18291 8.95199 2.18431 8.95032 2.18674 8.94833C2.18895 8.94654 2.19637 8.94086 2.21325 8.93441L16.3286 3.53706C16.3416 3.53209 16.3495 3.53112 16.3529 3.53087C16.3566 3.53061 16.3597 3.53088 16.3629 3.53159C16.37 3.53317 16.3823 3.5383 16.395 3.55038C16.4076 3.56246 16.4134 3.57452 16.4153 3.58154C16.4161 3.58467 16.4166 3.58771 16.4165 3.59143C16.4164 3.5949 16.4158 3.60281 16.4115 3.61605L11.7046 17.9764C11.6989 17.9935 11.6936 18.0012 11.6919 18.0035C11.6901 18.006 11.6885 18.0075 11.6865 18.0089C11.6815 18.0124 11.668 18.0192 11.6465 18.02C11.6251 18.0207 11.6111 18.0149 11.6059 18.0118C11.6038 18.0105 11.6021 18.0091 11.6001 18.0067C11.5982 18.0046 11.5924 17.9973 11.5856 17.9805L9.23754 12.2157Z"
                              stroke="#126E49"
                              strokeWidth="1.87317"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_416_31880">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.333496)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        {t('common.directions')}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        }
      </div>
    </>
  );
}

export default function LocationTabsContainer() {
  return <LocationTabs />;
}
