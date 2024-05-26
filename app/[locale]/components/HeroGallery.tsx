"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useLocale } from "next-intl";
import Image from "next/image";

// import { v4 } from 'uuid';
// import i18n from 'i18next';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
interface GalleryImage {
  imageSrc: string;
}
interface GalleryHomeProps {
  desktopImages: GalleryImage[];
  mobileImages: GalleryImage[];
}

export default function HeroGallery({
  desktopImages = [],
  mobileImages,
}: GalleryHomeProps) {
  const locale = useLocale();
  // let isMobileView = true;
  const [isMobileView, setIsMobileView] = useState(true);
  useEffect(() => {
    // Check if the window object is available (client-side)
    if (typeof window !== "undefined") {
      // Determine isMobileView value based on window.innerWidth
      setIsMobileView(window.innerWidth < 768);
    }
  }, []);
  // if (typeof window !== 'undefined') {
  //     isMobileView = window.innerWidth < 768;
  // }

  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`md:right-12 right-4 absolute top-1/2 -translate-y-1/2 bg-primary-300 rounded-lg p-3 md:p-4 text-gray-200 md:text-white z-10 cursor-pointer md:hover:bg-primary-400 ${className}`}
        onClick={onClick}
      >
        <svg
          className="h-4 w-4 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6291 2.82887L22.2001 11.4019C22.2813 11.4793 22.3459 11.5724 22.3901 11.6755C22.4343 11.7787 22.457 11.8897 22.457 12.0019C22.457 12.1141 22.4343 12.2251 22.3901 12.3282C22.3459 12.4314 22.2813 12.5245 22.2001 12.6019L13.6291 21.1719L12.4291 19.9719L19.5431 12.8579L1.88608 12.8579L1.88608 11.1429L19.5421 11.1429L12.4281 4.02888L13.6291 2.82887Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={`md:left-12 left-4 rotate-180 absolute top-1/2 -translate-y-1/2 bg-primary-300 rounded-lg p-3 md:p-4 text-gray-200 md:text-white z-10 cursor-pointer md:hover:bg-primary-400 ${className}`}
        onClick={onClick}
      >
        <svg
          className="h-4 w-4 md:h-6 md:w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6291 2.82887L22.2001 11.4019C22.2813 11.4793 22.3459 11.5724 22.3901 11.6755C22.4343 11.7787 22.457 11.8897 22.457 12.0019C22.457 12.1141 22.4343 12.2251 22.3901 12.3282C22.3459 12.4314 22.2813 12.5245 22.2001 12.6019L13.6291 21.1719L12.4291 19.9719L19.5431 12.8579L1.88608 12.8579L1.88608 11.1429L19.5421 11.1429L12.4281 4.02888L13.6291 2.82887Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  };

  const settingsMain = {
    // rtl: true,
    slidesToShow: 1,
    slidesToScroll: -1,
    // fade: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dots: true,  // Add this line to enable dots

  };

  return (
    <div className="gallery-slider-wrapper overflow-hidden">
      <div className="block md:hidden">
        <Slider {...settingsMain} className="order-1">
          {mobileImages?.map((slide:any, index) => (
            <div className="pointer-events-none" key={index}>
              {/* <img
                                className="slick-slide-image w-full"
                                src={slide}
                            /> */}
              <Image
                src={slide}
                alt="alt"
                className="slick-slide-image w-full rounded-xl"
                loading={"eager"}
                priority={index === 0 ? true : true}
                width={1920}
                height={750}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                // layout="responsive"
              />
              
            </div>
          ))}
        </Slider>
      </div>
      <div className="container mx-auto hidden max-w-screen-2xl px-4 md:block">
        <Slider {...settingsMain} className="order-1">
          {desktopImages?.map((slide:any, index) => (
            <div className="pointer-events-none" key={index}>
              <div className="relative before:inline-block before:pt-[30%] before:content-['']">
                <Image
                  src={slide}
                  alt="alt"
                  className="slick-slide-image w-full"
                  // loading="lazy"
                  // layout="responsive"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0 ? true : false}
                  // priority
                  // width="1920"
                  // height="550"
                  sizes="100vw"
                  fill
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
