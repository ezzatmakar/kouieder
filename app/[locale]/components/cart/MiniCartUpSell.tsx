"use client";
import { useTranslations } from "next-intl";
// import AlsoLikeSlider from "../AlsoLikeSlider";
import dynamic from "next/dynamic";
import AlsoLikeSliderLoader from "../AlsoLikeSliderLoader";
const AlsoLikeSlider = dynamic(() => import("../AlsoLikeSlider"), {
  ssr: false,
  loading: () => <AlsoLikeSliderLoader />,
});

export default function MiniCartUpSell() {
  const t = useTranslations("common");

  return (
    <div className="mb-5 mt-10">
      <div className="mx-4 overflow-hidden rounded-[20px] md:mx-10">
        <h4 className="border-b border-gray-100 bg-primary-100 px-8 pb-3 pt-5 text-start text-2xl font-bold">
          {t("may_also_like")}
        </h4>
        <div className="mini_cart_upsell_items bg-primary-103">
          <AlsoLikeSlider />
        </div>
      </div>
    </div>
  );
}
