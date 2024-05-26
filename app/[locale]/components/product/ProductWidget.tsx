"use client";
import { useEffect, useState } from "react";
import ProgressiveImage from "../ProgressiveImage";
import WishlistBtn from "../WishlistBtn";
// import { ProductData } from "types";
import AddCart from "../icons/AddCart";
import { ProductData } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import FormatCurrency from "../FormatCurrency";
// import AddToCartSimple from "../AddToCartSimple";
import dynamic from "next/dynamic";
import { useCurrency } from "@/CurrencyContext";
import Zoom from "../icons/Zoom";
import Image from "next/image";
import QuickView from "./Quickview";
import AddToCartVariableLoader from "./AddToCartVariableLoader";
// const QuickView = dynamic(() => import("./Quickview"), {
//   ssr: false,
//   // loading: () => <QuickViewLoader />,
// });
// import AddToCartVariable from "./AddToCartVariable";

const AddToCartSimple = dynamic(() => import("../AddToCartSimple"), {
  ssr: false,
});
const AddToCartVariable = dynamic(() => import("./AddToCartVariable"), {
  ssr: false,
  loading: () => <AddToCartVariableLoader />,
});
type ProductWidgetProps = {
  product: ProductData;
  key?: any;
  wishlist?: any;
  isItemInWishlist?: boolean;
};
const ProductWidget = ({ product, wishlist }: ProductWidgetProps) => {
  const locale = useLocale();
  const t = useTranslations("common");

  const [openQuick, setOpenQuick] = useState(false);
  function openModal() {
    setOpenQuick(!openQuick);
  }
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [extraText, setExtraText] = useState("");
  const [itemID, setItemID] = useState<number | null | undefined>(undefined);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const productTitle = product
    ? locale === "en"
      ? product?.name || ""
      : product?.ar_name || ""
    : "";
  // useEffect(() => {
  //   const hyphenIndex = productTitle.indexOf("-");
  //   if (hyphenIndex !== -1) {
  //     const numberAfterHyphen = parseInt(productTitle.slice(hyphenIndex + 1));
  //     if (!isNaN(numberAfterHyphen)) {
  //       const parts = productTitle.split("-");
  //       setUpdatedTitle(parts[0].trim());
  //       setExtraText(parts[1].trim());
  //       return;
  //     }
  //   }
  //   setUpdatedTitle(productTitle);
  //   setExtraText("");
  // }, [updatedTitle, product]);

  // const imageSrc = product?.main_image ? product.main_image.replace('/uploads/', '/uploads-webpc/uploads/').concat('.webp') : product?.thumbnail;
  const imageSrc = product?.main_image
    ? product.main_image
    : product?.thumbnail;
  // const imageSrcSmall = product?.main_image_small ? product.main_image_small.replace('/uploads/', '/uploads-webpc/uploads/').concat('.webp') : product?.thumbnail;
  // const imageSrcSmall = imageSrc;
  const imageSrcSmall = imageSrc
    ? `${imageSrc.replace(".webp", "-150x150.webp")}`
    : null;
  // console.log('imageSrc',imageSrc)
  // console.log('imageSrcSmall',imageSrcSmall)
  const handleLinkClick = () => {
    // window.scrollTo({
    //   top: 0,
    //   // behavior: "smooth",
    // });
  };
  const handleQuickviewToggle = () => {
    setOpenQuick(!openQuick);
  };

  const { currency } = useCurrency();

  useEffect(() => {
    if (product?.type === "simple" || product?.type === "variable") {
      setItemID(product.id);
      setProductPrice(product.price);
      setSalePrice(product.sale_price ?? null);
    }
  }, [product]);

  // let itemID;
  // // let salePrice = null;
  // let productPrice = null;
  // let salePriceUAE = null;
  // let productPriceUAE = null;
  // let cartPrice = null;
  // if (product?.type === "simple") {
  //   itemID = product.id;
  //   productPrice = product.price;
  //   // salePrice = product.sale_price;
  //   setSalePrice(product.sale_price ?? null);
  // } else if (product?.type === "variable") {
  //   itemID = product.id;
  //   productPrice = product.price;
  //   setSalePrice(product.sale_price ?? null);
  // }
  // if (salePrice) {
  //   cartPrice = currency === "AED" ? salePriceUAE : salePrice;
  // } else {
  //   cartPrice = currency === "AED" ? productPriceUAE : productPrice;
  // }

  useEffect(() => {
    const hyphenIndex = productTitle.indexOf("-");
    let updatedTitleValue = productTitle;
    let extraTextValue = "";

    if (hyphenIndex !== -1) {
      const numberAfterHyphen = parseInt(productTitle.slice(hyphenIndex + 1));
      if (!isNaN(numberAfterHyphen)) {
        const parts = productTitle.split("-");
        updatedTitleValue = parts[0].trim();
        extraTextValue = parts[1].trim();
      }
    }

    setUpdatedTitle(updatedTitleValue);
    setExtraText(extraTextValue);
  }, [productTitle]);

  return (
    <>
      <div
        className={`product-widget group relative flex h-full flex-col overflow-hidden transition-all`}
      >
        <div className="relative flex h-fit w-full flex-none items-center overflow-hidden">
          <Link
            prefetch={false}
            href={`/products/${product?.slug}`}
            onClick={handleLinkClick}
            data-testid="open_product-link"
            className={`block aspect-w-1 aspect-h-1 m-auto w-full ${
              product?.slug ? product.slug : "pointer-events-none"
            }`}
          >
            {imageSrc ? (
              // <ProgressiveImage
              //   src={imageSrc}
              //   placeholder={imageSrcSmall}
              //   alt={product?.name}
              //   className="m-auto h-full max-h-75 w-full max-w-75 self-center object-cover object-center"
              // />
              <Image
                src={imageSrc}
                alt={product?.name || ""}
                className="m-auto h-full w-full self-center rounded-2xl object-cover object-center transition-all group-hover:scale-[1.02] group-hover:rounded-[27px]"
                width={370}
                height={370}
              />
            ) : (
              <span className="flex items-center justify-center rounded-2xl">
                <svg
                  className="text-gray-500 h-12 w-12"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </span>
            )}
          </Link>
        </div>

        <div
          className="get-height-widget flex h-full flex-col justify-between gap-[5px] pt-3"
          // style={{ minHeight: `${tallestHeight}px` }}
        >
          <div className="px-3 md:px-0">
            <div className="relative">
              <h3 className="text-sm font-semibold text-black md:w-10/12 md:text-xl">
                <Link
                  prefetch={false}
                  href={`/products/${product?.slug}`}
                  data-testid="open_product-link"
                >
                  {updatedTitle}
                </Link>
                {extraText && (
                  <span className="block text-xs font-medium uppercase text-gray-50 md:text-base">
                    {extraText}
                  </span>
                )}
              </h3>
              <button
                onClick={openModal}
                className={`absolute justify-center hidden top-0 text-sm font-semibold z-10 cursor-pointer transition-all md:inline-flex ${
                  locale === "ar" ? "left-0" : "right-0"
                }`}
              >
                <Zoom />
              </button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-x-3">
            <div className="flex h-full flex-col">
              <div className="z-1 relative flex h-full w-full flex-col gap-2.5">
                {product?.availability === "outofstock" ||
                product?.price == 0 ? (
                  <p className="EGP mt-auto rounded-lg bg-transparent py-3 text-xs font-semibold text-primary-500 md:text-base">
                    {t("out_stock")}
                  </p>
                ) : product?.type !== "variable" ? (
                  <>
                    <div className="mt-auto flex flex-wrap md:items-center items-end gap-2 text-xs md:text-base">
                      {salePrice && salePrice !== productPrice ? (
                        <>
                          <FormatCurrency
                            value={product?.sale_price ? product.sale_price : 0}
                          />
                          <FormatCurrency
                            value={product?.price ? product.price : 0}
                            lineThrough
                          />
                        </>
                      ) : (
                        <FormatCurrency
                          value={product?.price ? product.price : 0}
                        />
                      )}
                    </div>
                    <AddToCartSimple
                      className="inline-flex w-full md:justify-center"
                      product={{
                        id: itemID,
                        thumbnail: imageSrc ?? "",
                        slug: product.slug,
                        name: product.name,
                        ar_name: product.ar_name,
                        category: product.category_name,
                        price: salePrice ? salePrice : productPrice,
                      }}
                      disabled={salePrice === null}
                    />
                  </>
                ) : (
                  <>
                    <AddToCartVariable product={product} />
                  </>
                )}
              </div>
            </div>
            <div className="absolute left-2 top-2 z-10">
              <WishlistBtn product={product} inWishlistPage={wishlist} />
            </div>
            {openQuick ? (
              <QuickView
                openQuick={openQuick}
                openModal={handleQuickviewToggle}
                product={product}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWidget;
