"use client";
import { useSharedState } from "@/app/SharedStateContext";
import { fetchAreas, fetchGovs } from "@/app/api/general";
import { LABEL_CLASSES } from "@/app/commonUIClasses";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeliveryCar from "./icons/kouider/DeliveryCar";

const Popup = dynamic(() => import("./Popup"), { ssr: false });
const SelectInput = dynamic(() => import("./SelectInput"), { ssr: false });

interface SelectDeliveryProps {
  singleProduct: boolean;
}

export default function SelectDelivery({ singleProduct }: SelectDeliveryProps) {
  const t = useTranslations("fields");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(() => {
    // Get the isOpen value from the cookie or default to true
    const storedIsOpen = Cookies.get("isOpen");
    return storedIsOpen ? JSON.parse(storedIsOpen) : true;
  });
  const [isClient, setIsClient] = useState(false);
  const [govs, setGovs] = useState<
    {
      gov_id: string;
      gov_name: string;
      gov_name_en: string;
    }[]
  >([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    setSelectedGovId,
    selectedGovIdPROV,
    selectedAreaIdPROV,
    selectedBranchIdPROV,
    selectGovName,
    setSelectGovName,
    selectAreaName,
    setSelectAreaName,
    setSelectedAreaId,
    setSelectedBranchId,
    setSelectedAreaRate,
  } = useSharedState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const selectedGovId = watch("gov_id") || selectedGovIdPROV;
  const selectedAreaId = watch("area_id");
  const selectedAreaRate = watch("shipping_fee");
  const isUAE =
    typeof window !== "undefined" && window.location.hostname.includes("uae.");

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
  }, [isUAE]);

  useEffect(() => {
    if (!selectedGovId) {
      if (govs.length > 0) {
        const firstGov = govs[0];
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

  useEffect(() => {
    const fetchAreasByGovId = async () => {
      if (selectedGovId) {
        const response = await fetchAreas(selectedGovId);
        setSelectedGovId(selectedGovId);
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
  }, [selectedGovId, govs]);

  useEffect(() => {
    if (selectedGovId) {
      Cookies.set("selectedGovId", selectedGovId);
    }
    if (selectedAreaId) {
      Cookies.set("selectedAreaId", selectedAreaId);
    }
  }, [selectedGovId, selectedAreaId]);

  useEffect(() => {
    if (selectedAreaId && areas.length) {
      const selectedArea = areas.find(
        (area: any) => area.city_id === selectedAreaId
      );
      setValue("shipping_fee", selectedArea ? selectedArea.city_rate : 0);
      setSelectedAreaRate(selectedArea ? selectedArea.city_rate : 0);
      setSelectedBranchId(selectedArea.branch_id);
      Cookies.set(
        "selectedAreaRate",
        selectedArea ? selectedArea.city_rate : 0
      );
    }
  }, [selectedAreaId, selectedGovId, selectedAreaRate]);

  useEffect(() => {
    // Set selected branch ID after selected area ID
    if (selectedAreaId) {
      const selectedArea = areas.find(
        (area) => area.city_id === selectedAreaId
      );
      if (selectedArea) {
        setSelectedBranchId(selectedArea.branch_id);
        // console.log('selectedAreaId')
        // console.log('selectedAreaId',selectedArea)
      }
    }
  }, [selectedAreaId, areas]);

  useEffect(() => {
    if (selectedGovId !== null && selectedGovId !== undefined) {
      const selectedGov = govs.find((gov) => gov.gov_id === selectedGovId);
      setSelectGovName(
        selectedGov
          ? locale === "ar"
            ? selectedGov.gov_name
            : selectedGov.gov_name_en
          : ""
      );
    }
  }, [selectedGovId, govs]);

  useEffect(() => {
    if (selectedAreaId !== null && selectedAreaId !== undefined) {
      const selectedArea = areas.find(
        (area: any) => area.city_id === selectedAreaId
      );
      setSelectAreaName(
        selectedArea
          ? locale === "ar"
            ? selectedArea.city_name
            : selectedArea.city_name_en
          : ""
      );
    }
  }, [selectedAreaId, areas, selectedGovId, govs]);

  const selectedGovIdFromCookie = Cookies.get("selectedGovId");
  const selectedAreaIdFromCookie = Cookies.get("selectedAreaId");
  const selectedAreaRateFromCookie = Cookies.get("selectedAreaRate");

  useEffect(() => {
    if (selectedAreaId && !selectedGovIdFromCookie) {
      Cookies.set("selectedAreaId", selectedAreaId);
    }
  }, [selectedGovId, selectedAreaId]);

  useEffect(() => {
    if (selectedGovIdFromCookie) {
      setValue("gov_id", selectedGovIdFromCookie);
    }
    if (selectedAreaIdFromCookie) {
      setValue("area_id", selectedAreaIdFromCookie);
    }
    if (selectedAreaRateFromCookie) {
      setValue("shipping_fee", selectedAreaRateFromCookie);
      setSelectedAreaRate(selectedAreaRateFromCookie);
    }
  }, []);

  // Add logic to set default values if not present
  useEffect(() => {
    if (!selectedAreaId) {
      if (areas.length > 0) {
        const firstArea = areas[0];
        // console.log('firstArea',firstArea)
        setSelectedAreaId(firstArea.city_id);
        setSelectedBranchId(firstArea.branch_id);
        setValue("shipping_fee", firstArea.city_rate);
        setSelectedAreaRate(firstArea.city_rate);
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
  // console.log('selectedAreaId',selectedAreaId)
  // console.log('selectedAreaIdPROV',selectedAreaIdPROV)
  // console.log('selectedBranchIdPROV',selectedBranchIdPROV)

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    Cookies.set("isOpen", isOpen);
  }, [isOpen]);
  useEffect(() => {
    if (isOpen && !isModalOpen) {
      setIsModalOpen(true);
    }
  }, [isOpen]);
  const closeModal = () => {
    setIsOpen(false);
    setIsModalOpen(false);
    setIsClicked(false);
  };

  const openModal = () => {
    setIsOpen(true);
    setIsModalOpen(true);
    setIsClicked(true);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {singleProduct ? (
        <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border-2 border-primary-201 bg-primary-101 p-5">
          <div className="flex items-center gap-x-2">
            <div>
              <DeliveryCar />
            </div>
            <p className="text-xs font-semibold md:text-base">
              {t("shipping_in_2h")}{" "}
              {isClient ? (
                <span className="underline">
                  {selectAreaName}, {selectGovName}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <button
            className="whitespace-nowrap rounded-lg bg-primary-201 px-5 py-2.5 text-sm font-semibold text-white md:text-base"
            onClick={openModal}
          >
            {t("change_area")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`${
            isClicked ? "z-[999]" : ""
          } bg-white relative flex gap-2 px-3 py-2 text-[13px] text-primary-300 border-2 rounded-lg border-primary-300 items-center whitespace-nowrap`}
          onClick={openModal}
        >
          {t("delivery")}{" "}
          {selectGovName && selectAreaName
            ? `${t("to")} ${selectGovName} - ${selectAreaName}`
            : ""}
          <ChevronDownIcon className="h-4 w-4 text-primary-300" />
        </button>
      )}
      {isOpen ? (
        <Popup isOpen={isModalOpen} close={closeModal} absolute hight>
          <div className="divide-y divide-gray-200">
            <div className="px-8 py-5">
              <h3 className="text-xl font-bold">{t("choose_branch")}</h3>
            </div>
            <div className="space-y-4 px-8 pb-5">
              <input
                type="text"
                className="hidden"
                value={watch("shipping_fee")}
                {...register("shipping_fee")}
              />
              <div>
                <label className={LABEL_CLASSES}>{t("city")}</label>
                <SelectInput
                  value={selectedGovId}
                  options={[
                    { label: t("select_city"), value: "" },
                    ...govs.map((item: any) => ({
                      label: locale === "ar" ? item.gov_name : item.gov_name_en,
                      value: item.gov_id,
                    })),
                  ]}
                  register={register("gov_id")}
                />
              </div>
              <div>
                <label className={LABEL_CLASSES}>{t("area")}</label>
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
                  register={register("area_id")}
                />
              </div>
            </div>
            <div className="px-8 py-5">
              <button
                onClick={closeModal}
                className="w-full whitespace-nowrap rounded-lg bg-primary-300 px-8 py-4 text-center text-base font-medium text-white hover:bg-primary-400"
              >
                {t("choose_branch")}
              </button>
            </div>
          </div>
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
}
