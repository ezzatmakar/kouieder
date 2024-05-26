"use client";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import TiktokPixel from "tiktok-pixel";
import AddCart from "./icons/AddCart";
import { useLocale, useTranslations } from "next-intl";
import useShoppingCart, { CartItem } from "@/app/stores/useShoppingCart";
import { handleAddToCart } from "@/app/fb-pixel";
import { useUser } from "@/app/UserContext";
// import { handleAddToCart } from "@/app/fb-pixel";
// import { FacebookPixelEvents } from "@/app/FacebookPixelEvents";
// import { FacebookPixelEvents } from "@/app/FacebookPixelEvents";

// import { handleAddToCart } from "@/app/fb-pixel";

export default function AddToCartSimple({
  className,
  product,
  disabled,
  singleProductView,
  mayAlsoLike,
  mobileDialog,
  onClick,
}: {
  className?: string;
  product: any;
  disabled: boolean;
  singleProductView?: boolean;
  mayAlsoLike?: boolean;
  mobileDialog?: boolean;
  onClick?: () => void;
}) {
  const t = useTranslations("common");
  const locale = useLocale();
  const { userInfo, locationInfo } = useUser();
  const { getItemQuantity, addToCart, decreaseCartQuantity } =
    useShoppingCart();
  const quantity = getItemQuantity(product) ?? 0;
  //  quantity = getItemQuantity(product);
  const handleTracking = () => {
    // console.log("before handleTracking",product);
    if (typeof window !== "undefined") {
      TiktokPixel.track("AddToCart", {
        contents: [
          {
            content_id: product.id,
            content_name: product.name,
            quantity: 1,
            price: parseFloat(product.price),
          },
        ],
        content_type: "product",
        value: parseFloat(product.price),
        currency: "EGP",
      });
    }
    if (typeof window !== "undefined") {
      // console.log("before handleAddToCart");
      handleAddToCart(product, userInfo, locationInfo);
    }
  };
  return (
    <>
      <button
        disabled={disabled}
        data-testid="add_to_cart-button"
        onClick={() => {
          handleTracking();
          quantity === 0 && addToCart(product);
          onClick;
        }}
        className={`${disabled ? "cursor-not-allowed" : ""} ${
          className ?? ""
        } ${mobileDialog ? "" : ""}`}
      >
        {quantity === 0 ? (
          <div
            className={`relative w-full items-center font-medium text-white bg-primary-300 hover:bg-primary-400 text-center flex ${
              singleProductView
                ? "justify-center py-3 md:py-4 px-5 rounded-lg"
                : mobileDialog
                ? "justify-center py-3 md:py-4 px-5 rounded-lg text-sm"
                : mayAlsoLike
                ? disabled
                  ? "w-10 h-10 leading-[30px] md:h-auto md:w-auto px-5 rounded md:text-[15px] text-xs opacity-50"
                  : "w-10 h-10 leading-[30px] md:h-auto md:w-auto px-5 rounded md:text-[15px] text-xs"
                : "w-10 h-10 leading-[16px] md:h-auto md:w-full py-3 px-5 md:justify-between justify-center rounded-lg text-sm"
            }`}
          >
            {singleProductView ? (
              <p>{t("add_to_cart")}</p>
            ) : mobileDialog ? (
              <p>{t("add_to_cart")}</p>
            ) : (
              <>
                {!mayAlsoLike && (
                  <span className="block">
                    <PlusIcon
                      className="h-4 w-4 text-white md:h-6 md:w-6"
                      aria-hidden="true"
                    />
                  </span>
                )}
                <p className="m-auto">{t("add_to_cart")}</p>
              </>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center justify-between ${
              singleProductView ? "rtl:ml-auto ltr:mr-auto" : "w-full"
            } ${mayAlsoLike ? "" : "md:max-w-[180px] max-w-[120px] ml-auto"}`}
          >
            <span
              className={`flex items-center text-white justify-center bg-primary-300 hover:bg-primary-400  rounded-lg cursor-pointer ${
                quantity! > 9 ? "pointer-events-none" : ""
              } ${mayAlsoLike ? "w-6 h-6 md:w-[30px] md:h-[30px] p-1" : "w-8 h-8 md:w-12 md:h-12 p-3"}`}
              onClick={(e) => {
                handleTracking();
                addToCart(product);
                e.stopPropagation();
                onClick;
              }}
            >
              <PlusIcon
                className="h-full w-full text-white"
                aria-hidden="true"
              />
            </span>
            <input
              type="text"
              className="pointer-events-none mx-2 w-8 select-none border-none bg-transparent p-0 text-center text-xl font-semibold text-primary-200 focus:outline-none"
              value={quantity!}
              readOnly
            />
            <span
              // type="button"
              className={`border-gray-400 flex cursor-pointer items-center justify-center rounded-lg border-2 ${mayAlsoLike ? "w-6 h-6 md:w-[30px] md:h-[30px] p-1" : "w-8 h-8 md:w-12 md:h-12 p-2"}`}
              onClick={(e) => {
                decreaseCartQuantity(product);
                e.stopPropagation();
              }}
            >
              <MinusIcon
                className="h-full w-full text-primary-200"
                aria-hidden="true"
              />
            </span>
          </div>
        )}
      </button>
      {singleProductView && quantity === 0 ? (
        <button
          onClick={() => {
            addToCart(product);
            handleTracking();
            window.location.href = `${locale === "ar" ? "" : "/en"}/checkout`;
          }}
          data-testid="open_checkout-button"
          className="w-full cursor-pointer items-center justify-center rounded-lg border-2 border-solid border-gray-300 py-2 text-center text-base font-medium capitalize text-primary-300 transition-all hover:border-primary-300 hover:bg-primary-300 hover:text-white focus:outline-none md:py-3 md:text-xl"
        >
          {locale === "ar" ? " أشتري حالاً " : " Direct checkout "}
        </button>
      ) : (
        ""
      )}
    </>
  );
}
