"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ShareButtons({ text }: any) {
  const t = useTranslations("common");
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  const shareUrl = window.location.href;

  const toggleSocialButtons = () => {
    setShowSocialButtons(!showSocialButtons);
  };
  return (
    <div className="flex items-center gap-6">
      <button
        className="inline-flex gap-4 px-4 py-2 rounded-[32px] text-gray-200 bg-primary-300 items-center"
        onClick={toggleSocialButtons}
      >
        {text}
        <RiArrowRightUpLine />
      </button>
      {showSocialButtons && (
        <div className="flex gap-4">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      )}
    </div>
  );
}
