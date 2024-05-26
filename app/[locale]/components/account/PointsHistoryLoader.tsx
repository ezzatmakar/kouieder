// Your component file
import React from "react";
import { useTranslations } from "next-intl";

const PointsHistoryLoader = () => {
  const t = useTranslations("account");
  return (
    <div className="py-8">
      <h2 className="pb-2 mb-4 text-xl font-bold">{t("points_history")}</h2>
      <div className="w-full border border-gray-400 rounded-[32px] p-3">
        <table className="w-full ltr:text-left rtl:text-right">
          <thead>
            <tr>
              <th className="py-3 border-b border-gray-100 px-6">
                {t("points")}
              </th>
              <th className="py-3 border-b border-gray-100">{t("date")}</th>
              <th className="py-3 border-b border-gray-100">{t("reason")}</th>
              <th className="py-3 border-b border-gray-100 px-6 text-end">
                {t("total_points")}
              </th>
            </tr>
          </thead>
          <tbody className="animate-pulse">
              <tr>
                <td className="bg-gray-100 w-36 h-4"></td>
                <td className="bg-gray-100 w-36 h-4"></td>
                <td className="bg-gray-100 w-36 h-4"></td>
                <td className="bg-gray-100 w-36 h-4"></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsHistoryLoader;
