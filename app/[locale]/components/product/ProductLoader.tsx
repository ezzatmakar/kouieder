import React from "react";

export default function ProductLoader() {
  return (
    <div>
      <div
        role="status"
        className="max-w-sm animate-pulse overflow-hidden rounded-xl border-2 border-gray-100 md:rounded-3xl"
      >
        <div className="aspect-w-1 aspect-h-1 m-auto block bg-primary-100">
          <span className="flex items-center justify-center">
            <svg
              className="hidden h-12 w-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
            <span
              className="block h-20 w-20 bg-contain bg-center bg-no-repeat before:inline-block before:pt-[100%] before:content-['']"
              style={{
                backgroundImage: `url('/images/sm-logo.webp')`,
              }}
            ></span>
          </span>
        </div>
        <div className="p-3 md:px-5 md:py-5">
          <div className="mb-4 h-6 w-48 max-w-full rounded-full bg-gray-200" />
          <div className="mb-3 h-2 w-12 rounded-full bg-gray-200" />
          <div className="mb-5 h-4 w-48 rounded-full bg-gray-200" />
          <div className="h-14 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
