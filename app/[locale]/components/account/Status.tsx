"use client"
import { useTranslations } from "next-intl";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Status({ name }: { name: string }) {
    const t = useTranslations('common');
    const translatedStatus = t(`status.${name}`);
    const getColorByStatus = (status: string) => {
        switch (status) {
            case "processing":
                return "bg-primary-910 text-[#0D1D00]";
            case "readyship":
            case "fulfilled":
                return "bg-blue-200 text-blue-900";
            case "delivered":
            case "completed":
                return "bg-gray-200 text-white";
            case "pending":
            case "on-hold":
                return "bg-blue-200 text-blue-900";
            case "cancelled":
            case "failed":
                return "bg-red-100 text-red-900";
            case "refunded":
            case "checkout-draft":
                return "bg-gray-200 text-gray-900";
            default:
                return "bg-gray-200 text-gray-900";
        }
    };

    const color = getColorByStatus(name);

    return (
        <span
            className={classNames(
                "relative inline-block md:px-3 px-2 font-semibold text-sm rounded capitalize leading-none",
                color
            )}
        >
            <span className="absolute inset-0 opacity-50"></span>
            <span className="relative">{translatedStatus}</span>
        </span>
    );
}
