"use client";
import { Key } from "react";
import HeroGallery from "./HeroGallery";

export default function HeroSection({
  HeroImages,
  MobileImages,
}: any) {
  return (
    <>
      <div className="px-3 pt-3 md:px-0">
        <HeroGallery mobileImages={MobileImages} desktopImages={HeroImages} />
      </div>
    </>
  );
}
