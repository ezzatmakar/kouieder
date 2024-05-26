"use client";
export const runtime = 'edge';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getAllAddresses } from "@/app/utils/account";
import { fetchGovs } from "@/app/api/general";
import Popup from "../../components/Popup";
import AddAddress from "../../components/account/AddAddress";
import SingleAddress from "../../components/account/SingleAddress";
import AddressesLoader from "../../components/account/AddressesLoader";

export default function addresses() {
  const t = useTranslations("common");
  let [isOpenAdress, setIsOpenAdress] = useState(false);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [govs, setGovs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getAllAddresses();
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
      setIsLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchGovsData = async () => {
      try {
        const govsData = await fetchGovs();
        setGovs(govsData);
      } catch (error) {
        // Handle the error case if fetching governments fails
      }
    };

    // Fetch governments only if they haven't been fetched before
    if (govs.length === 0) {
      fetchGovsData();
    }
  }, []);
  const resetAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getAllAddresses();
      setIsLoading(false);
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
  if (error) {
    return (
      <p className="font-semibold text-red-500">
        An error occurred: Authentication Failed!
      </p>
    );
  }

  function closeModal() {
    setIsOpenAdress(false);
  }

  function openModal() {
    setIsOpenAdress(true);
  }

  // console.log('addresses', addresses)
  return (
    <div>
      {/*  */}
      <div className="flex justify-between pb-5 mb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-xl md:text-3xl font-bold">{t("my_addresses")}</h1>
        {addresses.length > 0 && (
          <button
            className="inline-flex justify-center px-6 py-3 font-semibold text-gray-200 bg-primary-300 hover:bg-primary-100 hover:text-primary-300 text-base rounded-100 items-center whitespace-nowrap gap-10"
            onClick={openModal}
          >
            {t("add_address")}
            <svg
              width="10"
              height="9"
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
          </button>
        )}
      </div>
      {isLoading ? (
        <AddressesLoader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.length === 0 ? (
            <div className="w-full col-span-2">
              <p className="py-4 mb-5 text-lg text-gray-500">
                {t("no_address")}
              </p>
              <button
                onClick={openModal}
                className="inline-flex justify-center px-8 py-4 font-semibold text-white bg-primary-300 hover:bg-primary-400 text-xl rounded-lg items-center whitespace-nowrap gap-10"
              >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2868 11.6057H12.8578V2.17773H11.1438V11.6057H1.71484V13.3207H11.1438V22.7487H12.8578V13.3207H22.2868V11.6057Z" fill="white"/>
                </svg>

                {t("add_address")}
              </button>
            </div>
          ) : (
            addresses.map((address, index) => (
              // @ts-ignore
              <SingleAddress
                key={index}
                address={address}
                resetAddresses={resetAddresses}
                govs={govs}
              />
            ))
          )}
        </div>
      )}

      {isOpenAdress ? (
        <Popup isOpen={true} close={closeModal}>
          <AddAddress closeModal={closeModal} resetAddresses={resetAddresses} />
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
}
