import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import useShoppingCart from "@/app/stores/useShoppingCart";
import StickyDiv from "../StickyDiv";
import ShoppingCart from "../ShoppingCart";

export default function CartNav({ isSticky }: any) {
  const pathname = usePathname();
  const isCheckoutPage =
    pathname === "/en/checkout" || pathname === "/checkout";
  let { cartQuantityTotal } = useShoppingCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartQty, setCartQty] = useState(cartQuantityTotal);
  useEffect(() => {
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 820);

    return () => {
      clearTimeout(animationTimeout);
    };
    setCartQty(cartQuantityTotal);
  }, [cartQuantityTotal]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     setIsSticky(scrollPosition >= 225);
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const openCart = () => {
    setIsOpen(true);
    setIsModalOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
    setIsModalOpen(false);
  };
  // console.log("isOpen",isOpen);
  return (
    <div>
      {isCheckoutPage ? (
        <div className="h-9 w-9 md:w-12">
          <Link prefetch={false}
            href={`/cart`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary-300 p-2 md:h-12 md:w-12"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.5928 17.6491V11.3158C25.5928 7.81795 22.7572 4.98242 19.2594 4.98242C15.7616 4.98242 12.9261 7.81795 12.9261 11.3158V17.6491M8.17611 14.4824H30.3428L31.9261 33.4824H6.59277L8.17611 14.4824Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span
              suppressHydrationWarning
              className="absolute -bottom-1 h-5 w-5 rounded-lg bg-[#D22760] text-center text-sm font-medium text-white shadow group-hover:text-gray-800 ltr:-left-2 rtl:-right-2"
              // style={{ paddingTop: `1px` }}
            >
              {cartQuantityTotal}
            </span>
          </Link>
        </div>
      ) : (
        <div className="hasSticky h-9 w-9 md:w-12">
          <StickyDiv isSticky={isSticky}>
            <button
              className={`flex items-center justify-center rounded-lg relative md:w-12 md:h-12 w-9 h-9 p-1 shadow-xl transition-all sricy-cart-btn ${
                isAnimating ? " shake-animation" : ""
              } bg-primary-300 hover:bg-primary-400 text-white
              `}
              data-testid="open_cart-button"
              onClick={openCart}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.5928 17.6491V11.3158C25.5928 7.81795 22.7572 4.98242 19.2594 4.98242C15.7616 4.98242 12.9261 7.81795 12.9261 11.3158V17.6491M8.17611 14.4824H30.3428L31.9261 33.4824H6.59277L8.17611 14.4824Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                suppressHydrationWarning
                className="absolute -bottom-1 h-5 w-5 rounded-lg bg-[#D22760] text-center text-sm font-medium text-white shadow group-hover:text-gray-800 ltr:-left-2 rtl:-right-2"
                // style={{ paddingTop: `1px` }}
              >
                {cartQuantityTotal}
              </span>
            </button>
          </StickyDiv>
          {isOpen && <ShoppingCart isOpen={isModalOpen} close={closeCart} />}
        </div>
      )}
    </div>
  );
}
