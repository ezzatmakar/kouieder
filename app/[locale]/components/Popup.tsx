"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useLocale } from "next-intl";

export default function Popup({
  isOpen,
  children,
  close,
  width,
  hight = false,
  absolute,
}: any) {
  // const [isOpen, setIsOpen] = useState(initialOpenState);

  const locale = useLocale();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0 bg-black  ${
                absolute ? "bg-opacity-70" : "bg-opacity-90"
              }`}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={`flex min-h-full md:p-4 h-full ${
                absolute
                  ? "items-start justify-start max-w-[1440px] m-auto"
                  : "items-end justify-center md:items-center"
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-24 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-24 md:scale-95"
              >
                <Dialog.Panel
                  className={`w-full align-middle transition-all transform bg-white shadow-xl rounded-t-3xl md:rounded-2xl ${
                    width === "full" ? "max-w-3xl" : "max-w-lg"
                  } ${
                    hight ? "h-auto" : "h-[80vh] md:h-full md:h-none max-h-full"
                  } ${
                    absolute
                      ? "absolute arrow_top top-[130px] max-w-[420px] md:rounded-md border-4 border-primary-300"
                      : "md:overflow-hidden overflow-x-hidden overflow-y-scroll no-scrollbar"
                  }`}
                >
                  <button
                    onClick={close}
                    type="button"
                    className={`absolute z-10 p-2 -m-2 text-primary-100 outline-none hover:text-primary-300 transition-all top-5 ${
                      locale === "en" ? "right-5" : "left-5"
                    }`}
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
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
