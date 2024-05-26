"use client"
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import OrdersTableRow from "./OrdersTableRow";
import OrderRow from "./OrderRow";

export default function OrdersTable({ userOrders }: { userOrders: any[] }) {
    const t = useTranslations('account');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(userOrders.length){
            setIsLoading(false);
        }
      }, [userOrders]);
    

    return (
        <div className="w-full">
            {!isLoading && userOrders.length == 0 ?
                <div className="w-full text-center ">
                    <p className="py-4 mb-5 text-lg text-gray-500">{t('no_orders')}</p>
                    <a href="/" className="inline-flex justify-center px-10 py-2 mt-4 text-sm font-semibold text-white bg-primary-300 md:py-4 md:text-xl rounded-lg hover:bg-primary-400">{t("shop_now")}</a>
                </div>
                :
                <div className="hidden md:block w-full border border-gray-400 rounded-[32px] p-3">
                <table className="table-fixed w-full text-start">
                    <thead className="">
                        <tr>
                            <th className="border-b py-4 px-5">{t('order_number')}</th>
                            <th className="border-b py-4 px-5">{t('date')}</th>
                            <th className="border-b py-4 px-5">{t('status')}</th>
                            <th className="border-b py-4 px-5">{t('total')}</th>
                            <th className="border-b py-4 px-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <>
                                <tr>
                                    <td className="pr-2"><div className="w-20 h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-24 h-6 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-48 h-10 mt-2 bg-gray-200 rounded-lg"></div></td>
                                </tr>
                                <tr>
                                    <td className="pr-2"><div className="w-20 h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-24 h-6 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-auto h-2 mt-2 bg-gray-200 rounded-full"></div></td>
                                    <td className="pr-2"><div className="w-48 h-10 mt-2 bg-gray-200 rounded-lg"></div></td>
                                </tr>
                            </>
                            :
                            userOrders.map((order) => (
                                <OrdersTableRow key={order.order_id} order={order} />
                            ))

                        }
                    </tbody>
                </table>
                </div>
            }
            <div className="md:hidden block">
                <div>
                    {userOrders.map((order) => (
                        <OrderRow key={order.order_id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}
