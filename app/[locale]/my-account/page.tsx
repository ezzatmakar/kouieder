"use client"
export const runtime = 'edge';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserOrders } from "@/app/utils/account";
import DashBoard from "../components/account/DashBoard";
import { useLocale } from "next-intl";

export default function index() {
  const [userOrders, setUserOrders] = useState([]);
  const locale = useLocale();
  // const navigate = useNavigate();

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (!user_id) {
      // navigate('/login');
      window.location.href = `${locale==='ar'?'':'/en'}/login`;
      return;
    }
    const getUserOrders = async () => {
      const userOrders = await fetchUserOrders();
      if (userOrders) {
        // @ts-ignore
        setUserOrders(userOrders);
      } else {
      }
    };

    getUserOrders();
  }, []);
  return (
    <div>
      <DashBoard userOrders={userOrders}/>
    </div>
  )
}
