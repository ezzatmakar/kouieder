"use client";
import { ProductData } from "@/types";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProductWidget from "../product/ProductWidget";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";

export default function WishList() {
  const t = useTranslations("account");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductData[]>([]);
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("token");
//   if (typeof window !== "undefined") {
//     const localStorageWishlistItems = localStorage.getItem("wishlistItems");
//   }
  let localStorageWishlistItems;
  //   useEffect(() => {
  //     if (!user_id || !token) {
  //       return;
  //     }

  //     setIsLoading(true);
  //     const fetchData = async () => {
  //       try {
  //         const response = await getWishAPI();
  //         setIsLoading(false);
  //         if ((response as ErrorResponse).status === "error") {
  //           throw new Error((response as ErrorResponse).msg);
  //         }
  //         setData(response as ProductData[]);
  //         localStorage.setItem("wishlistItems", JSON.stringify(response));
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       setIsLoading(false);
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true);
      const localStorageWishlistItems = localStorage.getItem("wishlistItems");
      if (localStorageWishlistItems) {
        const wishlistItems = JSON.parse(localStorageWishlistItems);
        setData(wishlistItems);
      }
      setIsLoading(false);
    }
  }, [localStorageWishlistItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = () => {
        const localStorageWishlistItems = localStorage.getItem("wishlistItems");
        if (localStorageWishlistItems) {
          const wishlistItems = JSON.parse(localStorageWishlistItems);
          setData(wishlistItems);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="flex items-center justify-between pt-2 pb-5 border-b-2 border-gray-200 border-solid">
          <h1 className="text-3xl">{t("my_wishlist")}</h1>
        </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {isLoading ? (
              <p>Loading...</p>
            ) : data && data.length > 0 ? (
              data.map((productData, index) => (
                <div key={index} id={`wishlist-item-${productData.id}`}>
                  <ProductWidget product={productData} wishlist={true} />
                </div>
              ))
            ) : (
              <div className="w-full col-span-4 text-center">
                <p className="text-gray-400 mb-5 text-lg">{t("no_wishlist")}</p>
                <Link prefetch={false}
                  href="/offers"
                  className="inline-flex justify-center px-10 py-2 mt-4 text-sm font-semibold text-white bg-primary-300 md:py-4 md:text-xl rounded-lg hover:bg-primary-400"
                >
                  {t("shop_now")}
                </Link>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
