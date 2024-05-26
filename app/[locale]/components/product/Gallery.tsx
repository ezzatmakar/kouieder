"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

interface GalleryProps {
  galleryImages?: string[];
  thumbView?: string;
}

export default function Gallery({
  galleryImages = [],
  thumbView = "vertical",
}: GalleryProps) {
  // const { i18n } = useTranslation();
  // const [language, setLanguage] = useState(i18n.language);
  const locale = useLocale();
  const t = useTranslations("common");
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2,
  };

  const settingsThumbs = {
    slidesToShow: thumbView === "vertical" ? 1 : 5,
    // slidesToShow: 1,
    variableWidth: true,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: "10px",
    vertical: thumbView === "vertical",
    infinite: false,
    verticalSwiping: thumbView === "vertical",
    // rtl: thumbView === "normal" && locale === "ar",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 5,
          centerPadding: "30px",
          adaptiveHeight: true,
          variableWidth: true,
        },
      },
    ],
    beforeChange: (current: any, next: any) => {
      setActiveSlideIndex(next);
    },
  };

  // console.log(galleryImages);
  if (galleryImages.length === 0) {
    galleryImages = ["/images/empty.jpg"];
  }

  return (
    <div
      className={`flex overflow-hidden gallery-slider-wrapper ${
        thumbView === "vertical" ? "md:flex-row gap-[14px] flex-col-reverse" : "gap-6 flex-col-reverse"
      }`}
    >
      <div
        className={`order-1 overflow-hidden md:rounded-3xl h-fit gallery ${
          thumbView === "vertical" ? "md:w-full" : "custom"
        }`}
      >
        <Slider
          {...settingsMain}
          asNavFor={nav2 as Slider}
          ref={(slider) => setSlider1(slider)}
        >
          {galleryImages.map((slide, index) => (
            <div className="slick-slide relative" key={index}>
              <Image
                className="slick-slide-image"
                src={slide}
                fill
                alt={`Image ${index}`}
                // width="0"
                // height="0"
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div
        className={`gallery-thumbnail-slider-wrap ${
          thumbView === "vertical" ? "md:w-[80px]" : "custom w-full"
        }`}
      >
        <Slider
          {...settingsThumbs}
          asNavFor={nav1 as Slider}
          ref={(slider) => setSlider2(slider)}
        >
          {galleryImages.map((slide, index) => (
            <div
              className={`thumbnail-slide rounded-xl overflow-hidden border-2 border-transparent md:h-[80px] md:!w-[80px] !w-14 h-14 ${index === activeSlideIndex ? "active-thumbnail border-primary-200" : ""}`}
              key={index}
            >
              <Image
                className="slick-slide-image h-full w-full object-cover"
                src={slide}
                alt={`Thumbnail ${index}`}
                width="0"
                height="0"
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
