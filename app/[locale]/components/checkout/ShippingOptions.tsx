"use client";
import { useSharedState } from "@/app/SharedStateContext";
import {
  checkStockForBranch,
  fetchAreas,
  fetchBranches,
  fetchGovs,
} from "@/app/api/general";
import {
  CUSTOM_RADIO_CLASSES,
  INPUT_CLASSES,
  LABEL_CLASSES,
} from "@/app/commonUIClasses";
import { getAllAddresses } from "@/app/utils/account";
import { AddressData } from "@/types";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";
import Popup from "../Popup";
import SelectInput from "../SelectInput";
import AddAddress from "../account/AddAddress";
import SingleAddress from "../account/SingleAddress";
import RadioArrow from "../icons/RadioArrow";
import useShoppingCart from "@/app/stores/useShoppingCart";

export default function ShippingOptions({
  setValue,
  register,
  errors,
  watch,
}: any) {
  const locale = useLocale();
  const t = useTranslations("fields");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingArea, setIsLoadingArea] = useState(false);

  const [govs, setGovs] = useState<any[]>([]);
  const [stockData, setStockData] = useState(null);
  const [areas, setAreas] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const { cartItems } = useShoppingCart();
  const {
    setSelectedGovId,
    selectedGovIdPROV,
    selectedAreaIdPROV,
    setSelectedAreaId,
    selectedAreaRatePROV,
    setSelectedAreaRate,
    setSelectGovName,
    setSelectAreaName,
    setSelectedBranchId,
    selectedBranchIdPROV,
    selectGovName,
    selectAreaName,
  } = useSharedState();

  // Function to set form field values based on the selected address
  const setFieldValues = (values: any) => {
    setValue("apartment", values.apartment);
    setValue("apartment_type", values.apartment_type);
    setValue("floor", values.floor);
    setValue("gov_id", values.gov_id);
    setValue("area_id", values.area_id);
    setValue("full_address", values.full_address);
    setValue("building_number", values.building_number);
    setSelectedGovId(values.gov_id);
    setSelectedAreaId(values.area_id);
    setSelectGovName(locale === "ar" ? values.gov_name_ar : values.gov_name_en);
    setSelectAreaName(
      locale === "ar" ? values.area_name_ar : values.area_name_en
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGovs();
      if (response) {
        setGovs(response.govs);
      } else {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getBranches = async () => {
      const response = await fetchBranches();
      if (response) {
        // console.log("setBranches", response);
        setBranches(response);
      } else {
      }
    };
    getBranches();
  }, []);

  const selectedGovId = watch("gov_id") || selectedGovIdPROV;
  const order_type = watch("order_type");
  const apartment_type = watch("apartment_type");
  const shipping_method = watch("shipping_method");
  const selectedAreaId = watch("area_id");
  const pick_from_branch = watch("pick_from_branch");

  const formData = watch();

  useEffect(() => {
    if (shipping_method === "Branch") {
      setSelectedAreaRate("0");
      setValue("shipping_fee", 0);
    } else {
      fetchAreasByGovId();
    }
  }, [shipping_method]);

  const fetchAreasByGovId = async () => {
    setIsLoadingArea(true);
    if (selectedGovId) {
      const response = await fetchAreas(selectedGovIdPROV);
      if (response === "Err in payload") {
        return;
      }
      if (response) {
        setAreas(response);
        const selectedArea = response.find(
          (area: any) => area.city_id === selectedAreaIdPROV
        );
        if (selectedArea) {
          setValue("shipping_fee", selectedArea.city_rate);
          setSelectedAreaRate(selectedArea.city_rate);
        }
        setValue("area_name", selectAreaName);
        setValue("gov_name", selectGovName);
        setIsLoadingArea(false);
      } else {
        // Handle the case when fetching the areas fails
      }
    } else {
      setAreas([]);
    }
  };

  useEffect(() => {
    fetchAreasByGovId();
  }, [selectedGovIdPROV]);

  useEffect(() => {
    if (selectedGovId) {
      Cookies.set("selectedGovId", selectedGovId);
      setSelectedGovId(selectedGovId);
      const selectedGov = govs.find((gov) => gov.gov_id === selectedGovId);
      setSelectGovName(
        selectedGov
          ? locale === "ar"
            ? selectedGov.gov_name
            : selectedGov.gov_name_en
          : ""
      );
    }
  }, [selectedGovId]);

  useEffect(() => {
    Cookies.set("selectedAreaId", selectedAreaId);
    setSelectedAreaId(selectedAreaId);
    const selectedArea =
      shipping_method === "Branch"
        ? branches.find((branch: any) => branch.branch_id === pick_from_branch)
        : areas.find((area: any) => area.city_id === selectedAreaId);

    if (shipping_method === "Branch" && selectedArea) {
      console.log("selectedBranch", selectedArea);
      setSelectedAreaRate(selectedArea ? selectedArea.city_rate : 0);
      setValue("shipping_fee", selectedArea ? selectedArea.city_rate : 0);
      setSelectedBranchId(selectedArea.branch_id);
      setSelectedAreaId(selectedArea.city_id);
    } else if (selectedArea) {
      // console.log("selectedArea", selectedArea);
      setSelectedAreaRate(selectedArea ? selectedArea.city_rate : 0);
      setValue("shipping_fee", selectedArea ? selectedArea.city_rate : 0);
      setSelectedBranchId(selectedArea.branch_id);
      setSelectedAreaId(selectedArea.city_id);
    }

    setSelectAreaName(
      selectedArea
        ? locale === "ar"
          ? selectedArea.city_name
          : selectedArea.city_name_en
        : ""
    );
  }, [
    selectedAreaId,
    selectedAreaIdPROV,
    selectedGovId,
    selectedGovIdPROV,
    selectedBranchIdPROV,
    pick_from_branch,
  ]);

  useEffect(() => {
    const checkCartStock = async () => {
      try {
        const areaId = selectedAreaIdPROV;
        // const branchId = selectedBranchIdPROV;
        const items = cartItems.map((item: any) =>
          item.id ? item.id.toString() : ""
        );
        const stockDataResults = await checkStockForBranch(
          "0",
          pick_from_branch,
          items
        );
        setStockData(stockDataResults);
      } catch (error) {
        console.error("Error checking stock for cart items:", error);
      }
    };

    checkCartStock();
  }, [selectedBranchIdPROV, pick_from_branch]);

  // Check if cookies exist
  const selectedGovIdFromCookie = Cookies.get("selectedGovId");
  const selectedAreaIdFromCookie = Cookies.get("selectedAreaId");

  useEffect(() => {
    if (selectedGovIdFromCookie) {
      setValue("gov_id", selectedGovIdFromCookie);
      setValue("gov_name", selectGovName);
    }
    if (selectedAreaIdFromCookie) {
      setValue("area_id", selectedAreaIdFromCookie);
      setValue("area_name", selectAreaName);
    }
  }, []);

  useEffect(() => {
    if (!selectedGovId) {
      if (govs.length > 0) {
        const firstGov = govs[0];
        // console.clear();
        setSelectedGovId(firstGov.gov_id);
        setSelectGovName(
          firstGov
            ? locale === "ar"
              ? firstGov.gov_name
              : firstGov.gov_name_en
            : ""
        );
      }
    }
  }, [selectedGovId, govs, areas]);
  // Add logic to set default values if not present
  useEffect(() => {
    if (!selectedAreaId) {
      if (areas.length > 0) {
        const firstArea = areas[0];
        setSelectedAreaId(firstArea.city_id);
        setValue("shipping_fee", firstArea.city_rate);
        setSelectedAreaRate(firstArea.city_rate);
        setValue("area_id", firstArea.city_id);
        setValue(
          "area_name",
          firstArea
            ? locale === "ar"
              ? firstArea.city_name
              : firstArea.city_name_en
            : ""
        );
        setSelectAreaName(
          firstArea
            ? locale === "ar"
              ? firstArea.city_name
              : firstArea.city_name_en
            : ""
        );
      }
    }
  }, [selectedAreaId, areas, selectedGovId]);

  let [isOpenAdress, setIsOpenAdress] = useState(false);

  function closeModal() {
    setIsOpenAdress(false);
  }

  function openModal() {
    setIsOpenAdress(true);
  }
  const user_id = Cookies.get("user_id");
  const [addresses, setAddresses] = useState<AddressData[]>([]);

  useEffect(() => {
    // setIsLoading(true)
    const fetchData = async () => {
      try {
        const response: any | null = await getAllAddresses();
        setIsLoading(false);
        if (!response) {
          // Handle the case where response is null
          return;
        }
        if (response.status === "error") {
          throw new Error(response.msg);
        }
        setAddresses(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Set default field values when addresses are available
    if (addresses.length > 0) {
      setFieldValues(addresses[0]); // Set the field values for the first address
    }
  }, [addresses]);

  const resetAddresses = async () => {
    try {
      // setIsLoading(true);
      const response = await getAllAddresses();
      // setIsLoading(false);
      // @ts-ignore
      if (response.status === "error") {
        // @ts-ignore
        throw new Error(response.msg);
      }
      // @ts-ignore
      setAddresses(response);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    }
  };
  // console.log('SharedState',selectedBranchIdPROV)
  return (
    <div>
      <ul className="grid w-full grid-cols-2 gap-3 md:gap-6">
        <li className="relative">
          <input
            type="radio"
            id="shipping_method_delivery"
            value="Delivery"
            className="peer hidden"
            {...register("shipping_method")}
            defaultChecked
            data-testid="radio-Delivery"
          />
          <label
            htmlFor="shipping_method_delivery"
            className={`${CUSTOM_RADIO_CLASSES}`}
            data-testid="label-Delivery"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className="inline-block w-5 md:w-7">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 6.74139C3.5 6.24024 3.89457 5.83398 4.38129 5.83398H15.0543C15.5411 5.83398 15.9356 6.24024 15.9356 6.74139V6.87125H20.3818C20.6819 6.87125 20.9614 7.02853 21.1235 7.28863L24.3604 12.4829C24.4516 12.6291 24.5 12.7992 24.5 12.9729V19.1859C24.5 19.4266 24.4071 19.6574 24.2419 19.8276C24.0766 19.9978 23.8524 20.0934 23.6187 20.0933L22.1913 20.0933C21.7973 21.3202 20.6263 22.1673 19.313 22.1673C18.0063 22.1673 16.8403 21.3286 16.4407 20.1115L11.4974 20.1113C11.0978 21.3285 9.9318 22.1673 8.62502 22.1673C7.31177 22.1673 6.14065 21.3201 5.74676 20.0932L4.38122 20.0931C3.89453 20.0931 3.5 19.6868 3.5 19.1857V6.74139ZM5.74679 18.2784C6.14072 17.0515 7.31181 16.2044 8.62502 16.2044C9.94469 16.2044 11.1208 17.0599 11.509 18.2965H14.173L14.1729 12.986C14.1729 12.9815 14.1728 12.9771 14.1728 12.9727C14.1728 12.9682 14.1729 12.9638 14.1729 12.9594L14.1728 7.77867C14.1728 7.77215 14.1729 7.76563 14.173 7.75912V7.64879H5.26257V18.2784L5.74679 18.2784ZM15.9356 18.2966V13.8801H22.7374V18.2785L22.1913 18.2785C21.7974 17.0516 20.6263 16.2044 19.313 16.2044C17.9933 16.2044 16.8171 17.0599 16.429 18.2967L15.9356 18.2966ZM22.006 12.0653L19.9001 8.68606H15.9356V12.0653H22.006ZM8.62502 18.0192C7.88106 18.0192 7.36862 18.5916 7.36862 19.1859C7.36862 19.7801 7.88106 20.3525 8.62502 20.3525C9.36898 20.3525 9.88142 19.7801 9.88142 19.1859C9.88142 18.5916 9.36898 18.0192 8.62502 18.0192ZM19.313 18.0192C18.5691 18.0192 18.0566 18.5916 18.0566 19.1859C18.0566 19.7801 18.5691 20.3525 19.313 20.3525C20.057 20.3525 20.5694 19.7801 20.5694 19.1859C20.5694 18.5916 20.057 18.0192 19.313 18.0192Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div className="block">
                <div className="w-full text-sm font-semibold md:text-xl">
                  {t("ship_to_me")}
                </div>
                <p className="text-[10px] font-semibold md:text-base">
                  {t("message_to_me")}
                </p>
              </div>
            </div>
            {/* <span className="hidden md:block">
              <RadioArrow />
            </span> */}
          </label>
        </li>
        <li className="relative">
          <input
            type="radio"
            id="shipping_method_from_branch"
            {...register("shipping_method")}
            value="Branch"
            className="peer hidden"
            disabled={order_type === "gift"}
            data-testid="radio-Branch"
          />
          <label
            htmlFor="shipping_method_from_branch"
            className={`${
              order_type === "gift"
                ? "opacity-25 cursor-not-allowed pointer-events-none"
                : ""
            } ${CUSTOM_RADIO_CLASSES} h-full`}
            data-testid="label-Branch"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className="inline-block w-5 md:w-7">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.67148 4.09221C5.85313 3.72875 6.21883 3.5 6.61823 3.5H21.2298C21.6267 3.5 21.9905 3.72586 22.1733 4.08575L24.2607 8.19419C24.3401 8.35045 24.3811 8.52409 24.3803 8.70014C24.3728 10.2077 24.0926 11.5352 23.37 12.5055C23.0605 12.921 22.6918 13.2426 22.2767 13.4781V23.4138C22.2767 24.0137 21.8008 24.5 21.2136 24.5H6.61851C6.0314 24.5 5.55545 24.0137 5.55545 23.4138V13.4826C5.13451 13.2464 4.76161 12.9224 4.45108 12.5009C3.72892 11.5206 3.47422 10.183 3.50203 8.67422C3.50507 8.5094 3.54478 8.34746 3.61815 8.20065L5.67148 4.09221ZM7.68157 13.9848V22.3275H10.8223V17.1995C10.8223 16.5996 11.2982 16.1133 11.8853 16.1133H15.9654C16.5525 16.1133 17.0285 16.5996 17.0285 17.1995V22.3275H20.1506V13.9847C18.889 13.9766 17.7893 13.5347 17.0285 12.5494C16.2724 13.5398 15.1762 13.9848 13.9157 13.9848C12.6668 13.9848 11.5792 13.548 10.8223 12.5783C10.0584 13.5539 8.9482 13.9804 7.68157 13.9848ZM11.9467 9.78059C12.0527 10.4429 12.2401 10.8955 12.4595 11.1909C12.7416 11.5707 13.1663 11.8124 13.9157 11.8124C14.6652 11.8124 15.0878 11.5707 15.3676 11.1926C15.586 10.8974 15.7721 10.4444 15.876 9.78059H11.9467ZM18.1731 9.78059H22.1789C22.0808 10.4458 21.8962 10.897 21.6781 11.1898C21.3991 11.5645 20.9665 11.8124 20.1861 11.8124C19.4061 11.8124 18.9685 11.5644 18.6841 11.186C18.4635 10.8925 18.276 10.4422 18.1731 9.78059ZM22.1733 8.20065L20.5839 5.67246H7.26901L5.67603 8.20065H22.1733ZM5.67603 9.78059C5.75881 10.454 5.93669 10.9052 6.14973 11.1944C6.41813 11.5587 6.85108 11.8124 7.66192 11.8124C8.47234 11.8124 8.91122 11.5587 9.18594 11.1898C9.40192 10.8998 9.58312 10.4497 9.67182 9.78059H5.67603ZM14.9023 22.3275V18.2858H12.9484V22.3275H14.9023Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <div className="block">
                <div className="w-full whitespace-nowrap text-sm font-semibold md:text-xl">
                  {t("pick_from_branch")}
                </div>
              </div>
            </div>
          </label>
        </li>
      </ul>
      {shipping_method === "Branch" && order_type !== "gift" ? (
        <div className="mt-5 w-full">
          <label htmlFor="" className={LABEL_CLASSES}>
            {t("choose_branch")}
          </label>
          <div className="mt-1">
            <SelectInput
              value={watch("pick_from_branch")}
              options={[
                { label: t("choose_branch"), value: "" },
                ...branches.map((branch) => ({
                  label: branch.branch_name ?? "",
                  value: branch.branch_id ?? "",
                })),
              ]}
              register={register("pick_from_branch", {
                required: {
                  value: true,
                  message: t("pick_from_branch_required"),
                },
              })}
              error={
                errors.pick_from_branch &&
                errors.pick_from_branch.type === "required"
              }
            />
            {errors.pick_from_branch &&
              errors.pick_from_branch.type === "required" && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pick_from_branch.message}
                </p>
              )}
          </div>
        </div>
      ) : (
        <div>
          {user_id && addresses.length > 0 ? (
            <div className="mt-5">
              <div className="col-span-12">
                <h3 className="py-3 text-sm font-bold text-black md:text-xl">
                  {t("shipping_address")}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {addresses.map((address, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`address-${index}`}
                      name="selected-address"
                      value={index}
                      className="peer hidden"
                      checked={selectedAddressIndex === index}
                      onChange={() => {
                        setSelectedAddressIndex(index);
                        setFieldValues(address);
                      }}
                      data-testid="radio-address"
                    />
                    <label
                      htmlFor={`address-${index}`}
                      className="block cursor-pointer rounded-[12px] peer-checked:bg-[#ecefeb] peer-checked:shadow-primary-200"
                    >
                      <SingleAddress
                        checkout
                        key={index}
                        address={address}
                        resetAddresses={resetAddresses}
                        govs={govs}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={openModal}
                  type="button"
                  className="inline-flex items-center justify-center gap-10 whitespace-nowrap rounded-[8px] border border-gray-300 px-6 py-2 text-base font-semibold text-primary-300 hover:border-primary-300 hover:bg-primary-300 hover:text-white"
                >
                  <svg
                    // className="opacity-0"
                    width="15"
                    height="14"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.84619 0.642883V8.35717"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.692383 4.20331H9.00008"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t("add_address")}
                </button>
              </div>
              {isOpenAdress ? (
                <Popup isOpen={true} close={closeModal}>
                  <AddAddress
                    closeModal={closeModal}
                    resetAddresses={resetAddresses}
                  />
                </Popup>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <h3 className="py-3 text-sm font-bold text-black md:text-xl">
                  {t("shipping_address")}
                </h3>
              </div>
              {/* <div className="col-span-12">
                <label htmlFor="" className={LABEL_CLASSES}>
                  {t("gov")}
                </label>
                <div className="mt-1">
                  <select className={INPUT_CLASSES}>
                    <option value="">Egypt</option>
                    <option value="">Saudi Arabia</option>
                    <option value="">United Arab Emirates</option>
                  </select>
                </div>
              </div> */}

              <div className="col-span-12 md:col-span-6">
                <label className={LABEL_CLASSES}>{t("neighborhood")}</label>
                <div className="mt-1">
                  <div>
                    <SelectInput
                      value={selectedGovId}
                      options={[
                        { label: t("select_city"), value: "" },
                        ...govs.map((item: any) => ({
                          label:
                            locale === "ar" ? item.gov_name : item.gov_name_en,
                          value: item.gov_id,
                        })),
                      ]}
                      register={register("gov_id", {
                        required: {
                          value: true,
                          message: t("gov_id_required"),
                        },
                      })}
                    />
                  </div>
                  {errors.gov_id && errors.gov_id.type === "required" && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.gov_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <label htmlFor="" className={LABEL_CLASSES}>
                  {t("area")}
                </label>
                <div
                  className={`mt-1 ${
                    isLoadingArea ? "pointer-events-none" : ""
                  }`}
                >
                  <SelectInput
                    value={selectedAreaId}
                    options={[
                      { label: t("select_area"), value: "" },
                      ...areas?.map((area) => ({
                        label:
                          locale === "ar" ? area.city_name : area.city_name_en,
                        value: area.city_id,
                      })),
                    ]}
                    register={register("area_id", {
                      required: { value: true, message: t("area_id_required") },
                    })}
                  />
                  {errors.area_id && errors.area_id.type === "required" && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.area_id.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div>
                  <label htmlFor="" className={LABEL_CLASSES}>
                    {t("street_name")}
                  </label>
                  <input
                    type="text"
                    id="full_address"
                    {...register("full_address", {
                      required: {
                        value: true,
                        minLength: 10,
                        message: t("street_name_required"),
                      },
                    })}
                    className={`${INPUT_CLASSES} ${
                      errors.full_address && "border-red-500"
                    }`}
                  />
                  {errors.full_address &&
                    errors.full_address.type === "required" && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.full_address.message}
                      </p>
                    )}
                </div>
              </div>
              <div className="col-span-12">
                <h3 className={LABEL_CLASSES}>{t("property_type")}</h3>
                <div className="mt-1 space-x-5">
                  <div>
                    <div className="flex gap-6">
                      <label
                        htmlFor="Flat"
                        className="inline-block cursor-pointer text-black"
                      >
                        <div className="relative flex items-center gap-2 py-1">
                          <input
                            type="radio"
                            id="Flat"
                            className="peer hidden"
                            value="flat"
                            {...register("apartment_type")}
                            defaultChecked
                            data-testid="radio-flat"
                          />
                          <div className="top-1 mt-0.5 hidden text-gray-300 peer-checked:block peer-checked:text-primary-200 ltr:left-0 rtl:right-0">
                            <CgRadioChecked className="text-3xl" />
                          </div>
                          <div className="top-1 mt-0.5 block text-gray-300 peer-checked:hidden peer-checked:text-primary-200 ltr:left-0 rtl:right-0">
                            <CgRadioCheck className="text-3xl" />
                          </div>
                          <span className="text-base font-medium">
                            {t("apartment")}
                          </span>
                        </div>
                      </label>
                      <label
                        htmlFor="Villa"
                        className="inline-block cursor-pointer text-black"
                      >
                        <div className="relative flex items-center gap-2 py-1">
                          <input
                            type="radio"
                            id="Villa"
                            className="peer hidden"
                            value="villa"
                            {...register("apartment_type")}
                            data-testid="radio-villa"
                          />
                          <div className="top-1 mt-0.5 hidden text-gray-300 peer-checked:block peer-checked:text-primary-200 ltr:left-0 rtl:right-0">
                            <CgRadioChecked className="text-3xl" />
                          </div>
                          <div className="top-1 mt-0.5 block text-gray-300 peer-checked:hidden peer-checked:text-primary-200 ltr:left-0 rtl:right-0">
                            <CgRadioCheck className="text-3xl" />
                          </div>
                          <span className="text-base font-medium">
                            {t("villa")}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {apartment_type === "flat" ? (
                <>
                  <div className="col-span-4">
                    <label htmlFor="" className={LABEL_CLASSES}>
                      {t("building_number")}
                    </label>
                    <input
                      type="text"
                      className={`${INPUT_CLASSES} ${
                        errors.building_number && "border-red-500"
                      }`}
                      {...register("building_number", {
                        required: {
                          value: true,
                          message: t("building_number_required"),
                        },
                      })}
                      data-testid="radio-villa"
                    />
                    {errors.building_number &&
                      errors.building_number.type === "required" && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.building_number.message}
                        </p>
                      )}
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="" className={LABEL_CLASSES}>
                      {t("floor")}
                    </label>
                    <input
                      type="text"
                      id="floor"
                      className={`${INPUT_CLASSES} ${
                        errors.floor && "border-red-500"
                      }`}
                      {...register("floor", {
                        required: { value: true, message: t("floor_required") },
                      })}
                      data-testid="input-floor"
                    />
                    {errors.floor && errors.floor.type === "required" && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.floor.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="" className={LABEL_CLASSES}>
                      {t("apartment_number")}
                    </label>
                    <input
                      type="text"
                      {...register("apartment", {
                        required: {
                          value: true,
                          message: t("apartment_required"),
                        },
                      })}
                      data-testid="input-apartment"
                      className={`${INPUT_CLASSES} ${
                        errors.apartment && "border-red-500"
                      }`}
                    />
                    {errors.apartment &&
                      errors.apartment.type === "required" && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.apartment.message}
                        </p>
                      )}
                  </div>
                </>
              ) : (
                <div className="col-span-4">
                  <label htmlFor="" className={LABEL_CLASSES}>
                    {t("building_number")}
                  </label>
                  <input
                    type="text"
                    className={`${INPUT_CLASSES} ${
                      errors.building_number && "border-red-500"
                    }`}
                    {...register("building_number", {
                      required: {
                        value: true,
                        message: t("building_number_required"),
                      },
                    })}
                    data-testid="input-building_number"
                  />
                  {errors.building_number &&
                    errors.building_number.type === "required" && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.building_number.message}
                      </p>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
