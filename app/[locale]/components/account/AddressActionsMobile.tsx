import { useState } from "react";
// import { Dialog } from '@headlessui/react'
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";

export default function AddressActionsMobile({
  edit,
  makeDefault,
  removeAddress,
  title,
}: any) {
  let [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations("fields");
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  const openModal = () => {
    setIsOpen(true);
    setIsModalOpen(true);
  };
  const handleEdit = () => {
    edit();
    closeModal();
  };
  return (
    <div className="absolute top-0 !mt-0 cursor-pointer ltr:right-1 rtl:left-1">
      <span>
        <button className="w-12 h-12" onClick={openModal}>
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
        </button>
      </span>
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/75 z-10" aria-hidden="true" />

        <div className="fixed inset-0 w-screen overflow-y-auto  z-20">
          <div className="flex min-h-full items-center justify-center">
            <Dialog.Panel className="mt-auto rounded bg-white rounded-t-3xl w-full">
              <Dialog.Title>
                <div className="px-6 py-5 border-b border-gray-100 relative">
                  <h3 className="text-xl font-bold">{title}</h3>

                  <button
                    onClick={closeModal}
                    className="absolute p-2 -m-2 text-gray-400 border border-gray-300 rounded-full outline-none hover:text-gray-500 top-5 ltr:right-5 rtl:left-5"
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </Dialog.Title>

              <div className="relative p-4 space-y-4">
                <div className="space-y-2">
                  <div
                    className="flex items-center p-[14px] justify-start w-full text-xl font-medium text-black cursor-pointer"
                    onClick={handleEdit}
                  >
                    <span className="block">{t("edit")}</span>
                  </div>
                  <div
                    className="flex items-center p-[14px] justify-start w-full text-xl font-medium text-black cursor-pointer"
                    onClick={removeAddress}
                  >
                    <span className="block">{t("remove")}</span>
                  </div>
                </div>
                <div className="p-4 pt-6 border-t border-gray-100">
                  <button
                    onClick={closeModal}
                    className="flex items-center justify-center w-full px-8 py-3 text-xl font-semibold text-gray-200 bg-white hover:bg-gray-200 hover:text-white border-2 border-gray-400 rounded-100 whitespace-nowrap"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
