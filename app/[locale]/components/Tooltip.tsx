"use client"
import { useLocale, useTranslations } from 'next-intl';

interface TooltipProps {
    message: any;
    children: any;
}

export default function Tooltip({ message, children }: TooltipProps) {
    const t = useTranslations('common');
    return (
        <div className="relative flex group">
            {children}
            <div className="absolute p-2 transition-all opacity-0 bg-gray-400 rounded top-full ltr:left-1/2 rtl:right-1/2 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 group-hover:opacity-100 pointer-events-none">
                <span className="p-2 text-xs text-white whitespace-nowrap capitalize">
                    {t(message)}
                </span>
            </div>
        </div>
    )
}