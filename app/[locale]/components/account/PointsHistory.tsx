"use client";
import React, { useEffect, useState } from "react";
import PointHistoryItem from "./PointHistoryItem";
import { useTranslations } from "next-intl";
import { WalletHistoryItem } from "@/types";

const PointsHistory = ({ history }: { history: WalletHistoryItem[] }) => {
  const t = useTranslations("account");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="py-8">
      {isClient ? (
        <>
          <h2 className="pb-2 mb-4 text-xl font-bold">{t("points_history")}</h2>
          <div className="w-full border border-gray-400 rounded-[32px] p-3">
            <table className="w-full ltr:text-left rtl:text-right">
              <thead>
                <tr>
                  <th className="py-3 border-b border-gray-100 px-6">
                    {t("points")}
                  </th>
                  <th className="py-3 border-b border-gray-100">{t("date")}</th>
                  <th className="py-3 border-b border-gray-100">
                    {t("reason")}
                  </th>
                  <th className="py-3 border-b border-gray-100 px-6 text-end">
                    {t("total_points")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(history) && history.length > 0 ? (
                  history.map((item: WalletHistoryItem, index: any) => (
                    <PointHistoryItem key={index} item={item} />
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PointsHistory;
