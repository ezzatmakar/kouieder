"use client";
import { usePathname } from "next/navigation";
import CheckoutFooter from "./CheckoutFooter";
import TopFooter from "./TopFooter";
import MiddleFooter from "./MiddleFooter";
import BottomFooter from "./BottomFooter";
import CheckoutBottomFooter from "./CheckoutBottomFooter";

export default function Footer() {
  const pathname = usePathname();
  const isCheckoutPage = pathname.includes("/checkout");
  const isShopPage =
    pathname.includes("/category") ||
    pathname.includes("/offers") ||
    pathname.includes("/best-selling") ||
    pathname.includes("/products/");

  //     const [menuDetails, setMainMenu] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetchNav();
  //       if (response) {
  //         setMainMenu(response.footer_menu);
  //       } else {
  //         // Handle the case when fetching the cities fails
  //         // setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  return (
    <footer className="container mx-auto max-w-full">
      {isCheckoutPage ? (
        <>
          <CheckoutFooter />
          <CheckoutBottomFooter />
        </>
      ) : (
        <>
          {!isShopPage && <TopFooter />}
          <MiddleFooter />
          <BottomFooter />
        </>
      )}
    </footer>
  );
}
