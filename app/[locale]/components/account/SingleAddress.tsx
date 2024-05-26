"use client";
import { makeAddressDefault, removeAddress } from "@/app/utils/account";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import AddressLoader from "./AddressLoader";
import Popup from "../Popup";
import EditAddress from "./EditAddress";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import AddAddress from "./AddAddress";
import { AddressData } from "@/types";
import AddressActionsMobile from "./AddressActionsMobile";

interface SingleAddressProps {
  address?: AddressData;
  resetAddresses?: () => Promise<void>;
  govs?: string[];
  overview?: boolean;
  checkout?: boolean;
}

export default function SingleAddress({
  address,
  resetAddresses,
  govs,
  overview,
  checkout,
}: SingleAddressProps) {
  const t = useTranslations("fields");
  const locale = useLocale();
  let [isAddAdress, setIsAddAdress] = useState(false);
  let [isEditAdress, setIsEditAdress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMakeAddressDefault = async (addressId: any) => {
    try {
      const response = await makeAddressDefault(addressId);
      if (response) {
        setTimeout(() => {
          if (resetAddresses) {
            resetAddresses();
          }
        }, 1000);
      } else {
        // Address making default failed
        // Handle the failure case
      }
    } catch (error) {
      // Handle any error that occurred during the request
    }
  };

  const handleRemoveAddress = async (addressId: any) => {
    try {
      const response = await removeAddress(addressId);
      if (response) {
        setTimeout(() => {
          if (resetAddresses) {
            resetAddresses();
          }
        }, 1000);
      } else {
        // Address making default failed
        // Handle the failure case
      }
    } catch (error) {
      // Handle any error that occurred during the request
    }
  };


  function closeModal() {
    setIsAddAdress(false);
    setIsEditAdress(false);
  }
  function openEdit() {
    setIsEditAdress(true);
  }
  function openAdd() {
    setIsAddAdress(true);
  }

  if (!address) {
    return <AddressLoader />; // Or show a loading spinner
  }
  const {
    id,
    status,
    gov_id,
    area_id,
    full_address,
    building_number,
    apartment_type,
    floor,
    apartment,
  } = address;
  // const addressID = status === 'default' ? 'Default Address' : `Address #${id}`;
  const addressID =
    status === "default" ? t("defaultAddress") : `${t("address")} #${id}`;
  let areaName = "";
  let government_name = "";
  areaName = locale === "ar" ? address.area_name_ar : address.area_name_en;
  government_name = locale === "ar" ? address.gov_name_ar : address.gov_name_en;
  // console.log('single address',address)
  const triggerHandleRemoveAddress = () => {
    console.log('callremove')
    handleRemoveAddress(id);
  };
  const triggerHandleMakeAddressDefault = () => {
    console.log('defult')
    handleMakeAddressDefault(id);
  };
  return (
    <div
      className={`relative space-y-2 border border-gray-400 rounded-[12px] divide-y divide-gray-400 ${
        checkout ? "" : "bg-white"
      }`}
      key={locale}
    >
      {address.status === "error" ? (
        <div className="px-4 py-20 text-center">
          <span className="mb-1 text-base font-semibold">

            {t("no_address")}
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap px-4 py-5 gap-x-6 gap-y-2">
            <div className="w-full mb-1 text-base font-semibold flex items-center gap-x-2">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.462891" width="28" height="28" rx="4.66667" fill="#D4DCF1"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.23268 8.79127C11.7044 6.31958 15.7118 6.31958 18.1835 8.79127C20.6552 11.263 20.6552 15.2704 18.1835 17.7421L13.7081 22.2175L9.23268 17.7421C6.76098 15.2704 6.76098 11.263 9.23268 8.79127ZM13.7081 15.075C14.7068 15.075 15.5164 14.2654 15.5164 13.2667C15.5164 12.268 14.7068 11.4583 13.7081 11.4583C12.7094 11.4583 11.8997 12.268 11.8997 13.2667C11.8997 14.2654 12.7094 15.075 13.7081 15.075Z" fill="#5066A2"/>
              </svg>
              {addressID}
            </div>
            {checkout ? (
              <div className="text-base text-gray-300">
                {apartment_type !== "villa" ? (
                  <>
                    <p>
                      {t("apartment")} {apartment}
                    </p>
                    <p>
                      {building_number} {full_address} - {t("floor")} {floor}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {t("villa")} {building_number}
                    </p>
                    <p>{full_address}</p>
                  </>
                )}
                <p>{areaName ? areaName : `ID: ${area_id}`}</p>
                <p>
                  {government_name}، {t("egypt")}
                </p>
              </div>
            ) : overview ? (
              <div className="text-base md:text-xl font-medium text-gray-400">
                {apartment_type !== "villa" ? (
                  <>
                    <p>
                      {t("apartment")} {apartment} - {building_number}{" "}
                      {full_address} - {t("floor")} {floor}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {t("villa")} {building_number} - {full_address}
                    </p>
                  </>
                )}
                <p>{areaName ? areaName : `ID: ${area_id}`}</p>
                <p>
                  {government_name}، {t("egypt")}
                </p>
              </div>
            ) : (
              <>
                {/* City / gov name */}
                <div className="inline-block align-top">
                  <label className="text-xs text-gray-700">{t("city")}</label>
                  {isLoading ? (
                    <div className="w-20 mt-1 animate-pulse">
                      <div className="h-2 bg-gray-200 rounded-md"></div>
                    </div>
                  ) : (
                    <span className="block text-sm font-bold">
                      {government_name}
                    </span>
                  )}
                </div>

                {/* Area */}
                <div className="inline-block align-top">
                  <label className="text-xs text-gray-700">{t("area")}</label>
                  {isLoading ? (
                    <div className="w-20 mt-1 animate-pulse">
                      <div className="h-2 bg-gray-200 rounded-md"></div>
                    </div>
                  ) : (
                    <span className="block text-sm font-bold">
                      {areaName || "MISSING"}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="block w-full">
                  <label className="text-xs text-gray-700">
                    {t("street_name")}
                  </label>
                  <span className="block text-sm font-bold">
                    {full_address}
                  </span>
                </div>

                {/* Bulid num */}
                <div className="inline-block align-top">
                  <label className="text-xs text-gray-700">
                    {t("building_number")}
                  </label>
                  <span className="block text-sm font-bold">
                    {building_number}
                  </span>
                </div>

                {apartment_type !== "villa" ? (
                  <>
                    <div className="inline-block align-top">
                      <label className="text-xs text-gray-700">
                        {t("floor")}
                      </label>
                      <span className="block text-sm font-bold">{floor}</span>
                    </div>
                    <div className="inline-block align-top">
                      <label className="text-xs text-gray-700">
                        {t("apartment")}
                      </label>
                      <span className="block text-sm font-bold">
                        {apartment}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="inline-block align-top ">
                    <label className="text-xs text-gray-700">
                      {t("apartment_type")}
                    </label>
                    <span className="block text-sm font-bold capitalize">
                      {apartment_type}
                    </span>
                  </div>
                )}
              </>
            )}
            {isAddAdress ? (
              <Popup isOpen={true} close={closeModal}>
                <AddAddress
                  closeModal={closeModal}
                  resetAddresses={resetAddresses}
                />
              </Popup>
            ) : (
              ""
            )}

            {isEditAdress ? (
              <Popup isOpen={true} close={closeModal}>
                <EditAddress
                  closeModal={closeModal}
                  address={address}
                  resetAddresses={resetAddresses}
                />
              </Popup>
            ) : (
              ""
            )}
          </div>
          {overview ? (
            <div className="flex px-4 py-5">
              <Link prefetch={false}
                href="/my-account/addresses"
                className="inline-flex items-center py-2.5 px-5 gap-3 rounded-[32px] border-2 border-gray-400 hover:bg-gray-200 font-semibold ltr:ml-auto rtl:mr-auto hover:text-white hover:border-gray-200 transition-all"
              >
                {t("edit")}
                {/* <RiEditBoxLine className="ml-2" /> */}
              </Link>
            </div>
          ) : checkout ? (
            ""
          ) : (
            <>
              <span className="absolute top-0 !mt-0 cursor-pointer ltr:right-1 rtl:left-1 border-none hidden md:block">
                <Menu as="div" className="relative">
                  <Menu.Button className="w-12 h-12">
                    <svg
                      width="23"
                      height="5"
                      viewBox="0 0 23 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-auto"
                    >
                      <circle
                        cx="2.5"
                        cy="2.5"
                        r="2.5"
                        transform="rotate(-90 2.5 2.5)"
                        fill="black"
                      />
                      <circle
                        cx="11.5"
                        cy="2.5"
                        r="2.5"
                        transform="rotate(-90 11.5 2.5)"
                        fill="black"
                      />
                      <circle
                        cx="20.5"
                        cy="2.5"
                        r="2.5"
                        transform="rotate(-90 20.5 2.5)"
                        fill="black"
                      />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute ltr:right-0 rtl:left-0 z-10 overflow-hidden text-black origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg whitespace-nowrap">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={openEdit}
                            className={`${
                              active && "bg-blue-500 text-white"
                            }  w-full block pl-3 pr-7 py-2`}
                          >
                            {t("edit_address")}
                          </button>
                        )}
                      </Menu.Item>
                      {status === "default" ? (
                        ""
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleMakeAddressDefault(id)}
                              className={`${
                                active && "bg-blue-500 text-white"
                              }  w-full block pl-3 pr-7 py-2`}
                            >
                              {t("make_default")}
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleRemoveAddress(id)}
                            className={`${
                              active && "bg-red-100"
                            } w-full block pl-3 pr-7 py-2 text-red-500 text-left`}
                          >
                            <span>{t("remove")}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </span>
              <div className="block md:hidden !mt-0 border-none">
                <AddressActionsMobile removeAddress={triggerHandleRemoveAddress} edit={openEdit} makeDefault={triggerHandleMakeAddressDefault} title={addressID}/>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
