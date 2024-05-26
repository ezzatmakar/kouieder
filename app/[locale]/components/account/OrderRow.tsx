"use client";
import { useTranslations } from "next-intl";
import Status from "./Status";
import FormatCurrency from "../FormatCurrency";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import { RiArrowLeftLine } from "react-icons/ri";

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

export default function OrderRow({ order }: { order: Order }) {
  const t = useTranslations("common");
  const { order_id, order_date, order_status, order_total } = order;
  const translatedStatus = t(`status.${order_status}`);

  return (
    <div className="py-4 flex justify-between items-center">
      <div className="flex justify-between items-center gap-2">
        <div>
          <span className="text-primary-900 text-base font-semibold p-4">
            #{order_id}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Status name={order_status} />
          <span className="text-gray-50 text-sm font-semibold">
            {order_date}
          </span>
          <div className="text-sm">
            <FormatCurrency value={order_total} style="no-style" />
          </div>
        </div>
      </div>
      <div>
        <Link prefetch={false}
          href={`/my-account/orders/${order_id}`}
          className="inline-block px-4 py-2 font-semibold text-center text-black transition-all"
        >
          <RiArrowLeftLine className="ltr:rotate-180 text-3xl"/>
        </Link>
      </div>
    </div>
  );
}
