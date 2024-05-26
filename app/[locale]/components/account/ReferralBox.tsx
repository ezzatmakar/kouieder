"use client"
import { useTranslations } from "next-intl";

export default function ReferralBox({ url }: any) {
    const t = useTranslations('account');
    return (
        <div className="flex items-center p-3 border-gray-400 border rounded-2xl justify-between">
            <p className="text-[#AEAEAE] font-medium text-base">{url}</p>
            <button
                className="inline-flex justify-center px-4 py-2 text-base rounded-lg font-semibold text-white bg-primary-300 hover:bg-primary-400"
                onClick={() => navigator.clipboard.writeText(url)}
            >
                {t("copy_link")}
            </button>
        </div>
    )
}
