import React from "react";

export default function GalleryLoader() {
  return (
    <div className="animate-pulse">
      <div className="gallery-slider-wrapper flex flex-row gap-6 overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="h-14 w-16 rounded-xl bg-primary-300 md:h-28 md:w-28" />
          <div className="h-14 w-16 rounded-xl bg-primary-300 md:h-28 md:w-28" />
          <div className="h-14 w-16 rounded-xl bg-primary-300 md:h-28 md:w-28" />
        </div>
        <div className="relative flex w-full gap-5 bg-primary-300 before:inline-block before:pt-[100%] before:content-[''] md:rounded-3xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="block h-20 w-20 bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/sm-logo.webp')`,
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
