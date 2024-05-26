"use client"
import { useTranslations } from "next-intl";
import Status from "./Status";
import FormatCurrency from "../FormatCurrency";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";

type OrderStatus =
    | "processing"
    | "fulfilled"
    | "delivered"
    | "pending"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed"
    | "checkout-draft";

interface Order {
    order_id: number;
    order_date: string;
    order_status: OrderStatus;
    order_total: number;
}

export default function OrdersTableRow({ order }: { order: Order }) {
    const t = useTranslations('common');
    const { order_id, order_date, order_status, order_total } = order;
    const translatedStatus = t(`status.${order_status}`);

    return (
        <tr>
            <td>
                <div className="py-6 px-4">#{order_id}</div>
            </td>
            <td>
                <div className="py-6 px-4">{order_date}</div>
            </td>
            <td>
                <div className="py-6 px-4">
                    <Status name={order_status} />
                </div>
            </td>
            <td>
                <div className="py-6 px-4"><FormatCurrency value={order_total}/></div>
            </td>
            <td>
                <div className="py-3 px-4 text-end">
                    <Link prefetch={false}
                        href={`/my-account/orders/${order_id}`}
                        className="inline-block px-4 py-2 text-sm font-semibold text-center text-primary-300 rounded-[8px] whitespace-nowrap bg-gray-100 hover:bg-gray-200 hover:text-primary-300 transition-all"
                    >
                        {t('view')}
                    </Link>
                </div>
            </td>
        </tr>

    )
}
