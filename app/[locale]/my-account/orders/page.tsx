"use client";
export const runtime = "edge";
import { fetchUserOrders } from "@/app/utils/account";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import OrdersTableLoader from "../../components/account/OrderTableLoader";
import OrdersTable from "../../components/account/OrdersTable";
import { Link } from "@/navigation";

export default function Orders() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [userOrders, setUserOrders] = useState([]);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(false);
    const user_id = Cookies.get("user_id");
    if (!user_id) {
      // navigate('/login');
      window.location.href = `${locale==='ar'?'':'/en'}/login`;
      return;
    }
    const getUserOrders = async () => {
      setIsLoading(true);
      const response = await fetchUserOrders();
      // @ts-ignore
      if (response && response.status === "error") {
        // @ts-ignore
        setErrorMessage(response.msg);
      } else if (response) {
        // @ts-ignore
        setUserOrders(response);
      } else {
        setErrorMessage("An error occurred while fetching user orders.");
      }
      setIsLoading(false);
    };

    getUserOrders();
  }, []);
  // console.log('userOrders', userOrders)
  return (
    <div>
      <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">{t("mine_orders")}</h1>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="relative pt-10 min-h-[300px]">
        {/* {isLoading && <OrdersTableLoader />} */}
        <div className="w-full overflow-scroll no-scrollbar">
          {isLoading && <OrdersTableLoader />}
        </div>

        {!isLoading && userOrders.length === 0 && !errorMessage && (
          <>
            <p className="text-gray-500">{t("no_orders")}</p>
            <Link prefetch={false}
              href="/"
              className="inline-flex justify-center px-10 py-2 mt-4 text-sm font-semibold text-white bg-primary-300 md:py-4 md:text-xl rounded-lg hover:bg-primary-400"
            >
              {t("start_shopping")}
            </Link>
          </>
        )}

        {!isLoading && userOrders.length > 0 && !errorMessage && (
          <OrdersTable userOrders={userOrders} />
        )}
      </div>
    </div>
  );
}
