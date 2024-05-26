"use client";
export const runtime = "edge";
import { getUserWallet } from "@/app/utils/account";
import { UserWallet } from "@/types";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import LoyaltyProgram from "../../components/account/LoyaltyProgram";
import PointsHistoryLoader from "../../components/account/PointsHistoryLoader";
import RedeemWallet from "../../components/account/RedeemWallet";

const PointsHistory = dynamic(
  () => import("../../components/account/PointsHistory"),
  {
    ssr: false,
    loading: () => <PointsHistoryLoader />,
  }
);
export default function wallet() {
  const t = useTranslations("account");
  let [isOpenAddPoints, setIsOpenAddPoints] = useState(false);
  const [userWallet, setUserWallet] = useState<UserWallet>();
  function closeAddPoints() {
    setIsOpenAddPoints(false);
  }

  function openAddPoints() {
    setIsOpenAddPoints(true);
  }

  const initialCurrency = "EGP";
  // useEffect(() => {
  //   const callUserWallet = async () => {
  //     const userWalletData = await getUserWallet(initialCurrency);
  //     if (userWalletData) {
  //       setUserWallet(userWalletData as UserWallet);
  //     } else {
  //     }
  //   };

  //   callUserWallet();
  // }, []);
  // if (!userWallet) {
  //   return <p>loading</p>;
  // }
  return (
    <div>
      <div className="border-b-1 flex flex-wrap items-center justify-between gap-4 border-solid border-gray-200 py-5 pb-10">
        <div>
          <h1 className="text-xl font-bold md:text-3xl">{t("my_wallet")}</h1>
          <p className="text-gray-400 mt-2 max-w-md">{t("wallet_desc")}</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-10 whitespace-nowrap rounded-lg bg-primary-300 px-6 py-2 text-base font-semibold text-white hover:bg-primary-400"
          onClick={openAddPoints}
        >
          <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.2868 9.60573H11.8578V0.177734H10.1438V9.60573H0.714844V11.3207H10.1438V20.7487H11.8578V11.3207H21.2868V9.60573Z" fill="white"/>
          </svg>

          {t("charge_wallet")}
         
        </button>
        {isOpenAddPoints ? (
          <Popup isOpen={true} close={closeAddPoints}>
            <RedeemWallet />
          </Popup>
        ) : (
          ""
        )}
        {/* <Transition appear show={isOpenAddPoints} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={closeAddPoints}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-14 py-8 text-left align-middle shadow-xl transition-all">
                    <button
                      onClick={closeAddPoints}
                      type="button"
                      className="text-gray-400 hover:text-gray-500 absolute top-2 -m-2 p-2 outline-none ltr:right-2 rtl:left-2"
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
                    <h3 className="px-10 py-4 text-2xl font-bold">
                      Do You Have Points Code?
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Add code and point will be added to your wallet balance
                    </p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <input
                          type="text"
                          id="code"
                          placeholder="Add Code"
                          className="w-full border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
                        />
                      </div>
                      <p className="flex items-center text-sm uppercase text-[#6C757D]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                            stroke="#6C757D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 10.8V8"
                            stroke="#6C757D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 5.19995H8.00794"
                            stroke="#6C757D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Can’t Use Code More Than One Time
                      </p>
                      <button
                        className="inline-flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700"
                        onClick={closeAddPoints}
                      >
                        Apply Code
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition> */}
      </div>

      <div className="border-b-2 border-solid border-gray-200 py-6 md:py-12">
        <div className="border-gray-400 flex w-full max-w-full items-center justify-between gap-3 rounded-2xl border-2 p-3 md:border-gray-200 md:p-6">
          <span className="whitespace-nowrap text-sm tracking-wider text-gray-50 md:text-xl">
            {t("wallet_balance")}
          </span>
          {/* <span className="text-primary-900 ml-20 text-3xl font-bold"><FormatCurrency value={400} /></span> */}
          <div className="flex w-full flex-col items-end gap-3 text-right">
            <div
              className="text-sm font-bold md:text-xl"
              style={{ direction: "ltr" }}
            >
              <span className="text-3xl">{userWallet?.points} POINTS </span>(
              {userWallet?.cash} {initialCurrency})
            </div>
            <div className="relative h-[6px] w-full max-w-2xl rounded-md bg-[#DADAD9]">
              <span className="absolute h-[6px] w-1/3 rounded-md bg-gray-200 ltr:right-0 rtl:left-0"></span>
            </div>
            <p className="text-sm font-medium text-gray-50">
              {userWallet?.next_level_info.next_level_points} Points to{" "}
              {userWallet?.next_level_info.next_level_name}
            </p>
          </div>
        </div>
      </div>

      <LoyaltyProgram />
      <PointsHistory history={userWallet?.history || []} />
    </div>
  );
}
