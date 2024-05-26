import React from "react";
import { WalletHistoryItem } from "@/types";
import { useTranslations } from "next-intl";

// Define the prop type
interface PointHistoryItemProps {
  item: WalletHistoryItem;
}

export default function PointHistoryItem({ item }: PointHistoryItemProps) {
  const t = useTranslations("account");
  const isPositive = item.type === "Increase";
  const colorClass = isPositive ? "text-[#32A94C]" : "text-[#F44336]";
  const iconPath = isPositive
    ? "M7 0L13.0622 6H0.937822L7 0Z"
    : "M7 6L0.937822 1.14193e-06L13.0622 8.1987e-08L7 6Z";

  return (
    <tr>
      <td className="py-2 px-6">
        <div className={`${colorClass} flex items-center gap-2`}>
          <svg
            width="14"
            height="6"
            viewBox="0 0 14 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={iconPath} fill={isPositive ? "#32A94C" : "#F44336"} />
          </svg>
          {item.points} {t("point")}
        </div>
      </td>
      <td className="py-2">{item.date}</td>
      <td className="py-2">{item.msg}</td>
      <td className="py-2 px-6 text-end">
        {item.points_after} {t("point")}
      </td>
    </tr>
  );
}
