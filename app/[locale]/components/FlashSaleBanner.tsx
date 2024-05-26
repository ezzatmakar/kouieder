import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { checkFlashSale } from "@/app/api/general";

export default function FlashSaleBanner() {
  const t = useTranslations("common");
  const [flashData, setFlashData] = useState(null);

  useEffect(() => {
    const checkFlash = async () => {
      try {
        const flashDataResults = await checkFlashSale();
        setFlashData(flashDataResults);
      } catch (error) {
        console.error("Error checking stock for cart items:", error);
      }
    };

    checkFlash();
  }, []);

  if (!flashData || flashData?.length <= 0) {
    return null;
  }
  return (
    <div id="FlashSale" className="flex flex-col items-center justify-center gap-2.5 bg-primary-500 pb-4 pt-2 text-center text-white md:pb-9 md:pt-4">
      <span className="text-sm md:text-base">{t("offers_untill")}</span>
      {flashData && (
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-10">
          <span className="text-[18px] font-black md:text-[32px]">{t("flash_offer")}</span>
          <Timer deadline={(flashData as any).end_date} alt />
          <span className="text-[18px] font-black md:text-[32px]">
            {t("discount_untill")} {(flashData as any).discount_percentage}
            {"%"}
          </span>
        </div>
      )}
    </div>
  );
}
