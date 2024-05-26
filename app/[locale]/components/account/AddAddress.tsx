"use client";
import { fetchAreas, fetchGovs } from "@/app/api/general";
import { INPUT_CLASSES, LABEL_CLASSES } from "@/app/commonUIClasses";
import { addAddress } from "@/app/utils/account";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import Loader from "../Loader";
import Msg from "../Msg";
import SelectInput from "../SelectInput";

interface Address {
  address_id: string;
  status: string;
  gov_id: string;
  area_id: string;
  full_address: string;
  apartment_type: string;
  building_number: string;
  floor: string;
  apartment: string;
}

export default function AddAddress({ closeModal, resetAddresses }: any) {
  const t = useTranslations("fields");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [govs, setGovs] = useState([]);
  const [areas, setAreas] = useState([]);
  let [selectedGovId, setSelectedGovId] = useState("");
  let [selectedAreaId, setSelectedAreaId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useForm<Address>();
  const isUAE = typeof window !== "undefined" && window.location.hostname.includes("uae.");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGovs();
      if (response) {
        setGovs(response.govs);
      } else {
        // Handle the case when fetching the cities fails
      }
    };
    fetchData();
  }, []);

  selectedGovId = watch("gov_id");
  useEffect(() => {
    const fetchAreasByGovId = async () => {
      if (selectedGovId) {
        const response = await fetchAreas(selectedGovId);
        if (response === "Err in payload") {
          return;
        }
        if (response) {
          setAreas(response);
        } else {
          // Handle the case when fetching the areas fails
        }
      } else {
        setAreas([]);
      }
    };

    fetchAreasByGovId();
  }, [selectedGovId]);
  selectedAreaId = watch("area_id");
  const apartment_type = watch("apartment_type");

  const formData = watch();
  const handleAddAddressSubmit = async () => {
    try {
      // Trigger form validation for the AddAddress form fields
      const isValid = await trigger([
        'gov_id',
        'area_id',
        'full_address',
        'apartment_type',
        'building_number',
        'floor',
        'apartment',
      ]);
  
      if (isValid) {
        // If the form is valid, submit the AddAddress form
        await onSubmitAddress(formData);
      }
    } catch (error) {
      console.error('Error submitting AddAddress form:', error);
    }
  };

  const onSubmitAddress: SubmitHandler<Address> = async (data: Address) => {
    // console.log(data);
    try {
      setIsLoading(true);
      const updatedAddress = await addAddress(data);
      setIsLoading(false);
      setMessage("Added Address successfully");
      closeModal();
      resetAddresses();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (updatedAddress !== null && updatedAddress !== undefined) {
        const updatedAddressTyped = updatedAddress as Address;
        setValue("gov_id", updatedAddressTyped.gov_id);
        setValue("area_id", updatedAddressTyped.area_id);
        setValue("full_address", updatedAddressTyped.full_address);
        setValue("apartment_type", updatedAddressTyped.apartment_type);
        setValue("floor", updatedAddressTyped.floor);
        setValue("apartment", updatedAddressTyped.apartment);
      }
    } catch (error) {
      setIsLoading(false);
      // Handle the case when updating address fails
    }
  };
  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute -inset-4 z-20 flex items-start justify-center bg-gray-200 bg-opacity-75 pt-20">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <h3 className="px-4 py-4 text-2xl font-bold md:px-10">{t("add_address")}</h3>
      <hr className="absolute -left-6 -right-6" />
      {message && <Msg color="green" message={message} />}
      <form onSubmit={handleSubmit(onSubmitAddress)} className="px-4 pt-6 md:px-10" id="addAddressForm">
        <div className="space-y-6">
          <div>
            <label htmlFor="gov" className={LABEL_CLASSES}>
              {t("city")}
            </label>
            <SelectInput
              value={watch("gov_id") || ""}
              options={[
                { label: t("select_city"), value: "" },
                ...govs.map((item: any) => ({
                  label: locale === "ar" ? item.gov_name : item.gov_name_en,
                  value: item.gov_id,
                })),
              ]}
              register={register("gov_id", {
                required: { value: true, message: t("gov_id_required") },
              })}
            />
          </div>
          <div>
            <label htmlFor="area" className={LABEL_CLASSES}>
              {t("area")}
            </label>
            <SelectInput
              value={watch("area_id") || ""}
              options={[
                { label: t("select_area"), value: "" },
                ...areas?.map((area: any) => ({
                  label: locale === "ar" ? area.city_name : area.city_name_en,
                  value: area.city_id,
                })),
              ]}
              register={register("area_id", {
                required: { value: true, message: t("area_id_required") },
              })}
            />
          </div>
          <div>
            <label htmlFor="full_address" className={LABEL_CLASSES}>
              {t("street_name")}
            </label>
            <input
              type="text"
              id="full_address"
              {...register("full_address", {
                required: { value: true, message: t("street_name_required") },
              })}
              className={`${INPUT_CLASSES} ${
                errors.full_address && "border-red-500"
              }`}
            />
          </div>

          <div>
            <label htmlFor="apartment_type" className={LABEL_CLASSES}>
              {t("apartment_type")}
            </label>
            <div className="flex gap-4">
              <label
                htmlFor="Flat"
                className="inline-block cursor-pointer text-lg text-black"
              >
                <div className="relative flex items-center gap-2 py-1 ltr:pl-6 rtl:pr-6">
                  <input
                    type="radio"
                    id="Flat"
                    className="peer hidden"
                    value="flat"
                    defaultChecked
                    {...register("apartment_type")}
                  />
                  <div className="invisible absolute top-1 peer-checked:visible ltr:left-0 rtl:right-0">
                    <RiRadioButtonLine className="peer-checked:bg-gray-700" />
                  </div>
                  <div className="visible absolute top-1 peer-checked:invisible ltr:left-0 rtl:right-0">
                    <RiCheckboxBlankCircleLine className="peer-checked:bg-gray-700" />
                  </div>
                  <span className="text-base font-medium">
                    {t("apartment")}
                  </span>
                </div>
              </label>
              <label
                htmlFor="Villa"
                className="inline-block cursor-pointer text-lg text-black"
              >
                <div className="relative flex items-center gap-2 py-1 ltr:pl-6 rtl:pr-6">
                  <input
                    type="radio"
                    id="Villa"
                    className="peer hidden"
                    value="villa"
                    {...register("apartment_type")}
                  />
                  <div className="invisible absolute top-1 mt-0.5 peer-checked:visible ltr:left-0 rtl:right-0">
                    <CgRadioChecked className="peer-checked:text-gray-200" />
                  </div>
                  <div className="visible absolute top-1 mt-0.5 peer-checked:invisible ltr:left-0 rtl:right-0">
                    <CgRadioCheck className="peer-checked:text-gray-200" />
                  </div>
                  <span className="text-base font-medium">{t("villa")}</span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
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
                    className={`${INPUT_CLASSES} ${
                      errors.apartment && "border-red-500"
                    }`}
                  />
                  {errors.apartment && errors.apartment.type === "required" && (
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
          <hr className="absolute -left-6 -right-6" />
          <div className="py-6">
            <button
              type="button"
              onClick={handleAddAddressSubmit} 
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg bg-primary-300 px-8 py-4 text-xl font-semibold text-white hover:bg-primary-400"
            >
              {t("add_address")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
