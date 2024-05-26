import { useState, useEffect } from "react";
import HeartActive from "./icons/HeartActive";
import { ProductData } from "@/types";
import useIfLoggedIn from "@/app/utils/useIfLoggedIn";
import { addWishAPI, removeWishAPI } from "@/app/utils/account";
import Heart from "./icons/Heart";

export default function WishlistBtn({
  product,
  inWishlistPage,
}: {
  product: ProductData;
  inWishlistPage?: Boolean;
}) {
  const [isWishlist, setIsWishlist] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageWishlistItems = localStorage.getItem("wishlistItems");
      const wishlistItems = localStorageWishlistItems
        ? JSON.parse(localStorageWishlistItems)
        : [];
      const isProductInLocalStorageWishlist = wishlistItems.some(
        (item: ProductData) => String(item.id) === String(product?.id)
      );
      
      setIsWishlist(inWishlistPage || isProductInLocalStorageWishlist);
    }
  }, [product?.id, inWishlistPage]);
  const handleAddingWishlist = async (data: ProductData) => {
    const { id } = data;

    if (useIfLoggedIn()) {
      try {
        if (isWishlist) {
          const response = await removeWishAPI(id) as any;
          
          if (response.status === "success") {
          }
        } else {
          const response = await addWishAPI(id) as any;
          
          if (
            response.status === "success" &&
            response.msg_code === "wishlist_add_success"
          ) {
            // console.log("addWishAPI>success");
            
          } else if (
            response.status === "error" &&
            response.msg_code === "wishlist_add_error" &&
            response.msg === "Product Already Exist in Wishlist"
          ) {
            // console.log("addWishAPI>error");
          }
        }
      } catch (error) {
        // console.log("Failed to add/remove wishlist:", error);
      }
      const localStorageWishlistItems = localStorage.getItem("wishlistItems");
      let updatedWishlistItems: ProductData[] = [];
      if (localStorageWishlistItems) {
        updatedWishlistItems = JSON.parse(
          localStorageWishlistItems
        ) as ProductData[];
      }

      if (isWishlist) {
        updatedWishlistItems = updatedWishlistItems.filter(
          (item: ProductData) => item.id !== id
        );
      } else {
        updatedWishlistItems.push({ ...data });
      }

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(updatedWishlistItems)
      );
    } else {
      let updatedWishlistItems: ProductData[];
      if (isWishlist) {
        const localStorageWishlistItems = localStorage.getItem("wishlistItems");
        if (localStorageWishlistItems) {
          const wishlistItems = JSON.parse(
            localStorageWishlistItems
          ) as ProductData[];
          updatedWishlistItems = wishlistItems.filter(
            (item: ProductData) => item.id !== id
          );
          localStorage.setItem(
            "wishlistItems",
            JSON.stringify(updatedWishlistItems)
          );
        }
      } else {
        const localStorageWishlistItems = localStorage.getItem("wishlistItems");
        if (localStorageWishlistItems) {
          const wishlistItems = JSON.parse(
            localStorageWishlistItems
          ) as ProductData[];
          updatedWishlistItems = [...wishlistItems, { ...data }];
        } else {
          updatedWishlistItems = [{ ...data }];
        }
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(updatedWishlistItems)
        );
      }
    }
  };
  const handleWishlistClick = () => {
    handleAddingWishlist(product);
    setIsWishlist(!isWishlist);
    const parentDiv = document.getElementById(`wishlist-item-${product.id}`);
    if (parentDiv) {
      parentDiv.remove();
    }
  };
  return (
    <button
      className={`flex items-center justify-center transition-all rounded-full shadow md:w-12 md:h-12 w-9 h-9 ${
        isWishlist
          ? "bg-red-400 hover:black hover:text-white text-bg-red-400"
          : "bg-primary-100 hover:bg-red-400  hover:text-white text-black"
      }`}
      onClick={handleWishlistClick}
      aria-label="wishlist"
    >
      {isWishlist ? <HeartActive /> : <Heart />}
    </button>
  );
}
