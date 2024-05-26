"use client";
import { useEffect, useState } from "react";
import { ProductData } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import ProgressiveImage from "./ProgressiveImage";
// import { Link } from "@/navigation";
import { Link } from "@/navigation";
import FormatCurrency from "./FormatCurrency";
import WishlistBtn from "./WishlistBtn";
import Image from "next/image";

type HighlightedProductProps = {
  product: ProductData;
  key?: any;
  wishlist?: any;
  isItemInWishlist?: boolean;
};
const HighlightedProduct = ({ product, wishlist }: any) => {
  const locale = useLocale();
  const t = useTranslations("common");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [extraText, setExtraText] = useState("");
  const productTitle = product
    ? locale === "en"
      ? product?.name || ""
      : product?.name_ar || ""
    : "";
  useEffect(() => {
    const hyphenIndex = productTitle.indexOf("-");
    if (hyphenIndex !== -1) {
      const numberAfterHyphen = parseInt(productTitle.slice(hyphenIndex + 1));
      if (!isNaN(numberAfterHyphen)) {
        // Split the title at the hyphen
        const parts = productTitle.split("-");
        // Update the title and extra text
        setUpdatedTitle(parts[0].trim());
        setExtraText(parts[1].trim());
        return;
      }
    }
    setUpdatedTitle(productTitle);
    setExtraText("");
  }, [productTitle]);

  const imageSrc = product?.product_image;
  // @ts-ignore
  const imageSrcSmall = product?.product_image_sm;

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
    });
  };

  let itemID;
  let salePrice = null;
  let productPrice = null;
  let salePriceUAE = null;
  let productPriceUAE = null;
  if (product?.type === "simple") {
    itemID = product.id;
    productPrice = product.price;
    salePrice = product.sale_price;
  } else if (product?.type === "variable") {
    itemID = product.id;
    productPrice = product.price;
    salePrice = product.sale_price;
  }
  return (
    <>
      <div className="bg-primary-200 px-4 py-12">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="grid grid-cols-1 lg:col-span-4">
                {/* <ProgressiveImage
                  src="/images/image_bannner.webp"
                  placeholder="/images/image_bannner_sm.webp"
                  alt={"image_bannner"}
                  className="m-auto h-full w-full self-center object-cover object-center"
                /> */}
                <Image
                    src={product.featured_image}
                    alt={"image_bannner"}
                    className="m-auto h-full w-full self-center object-cover object-center"
                    width={512}
                    height={512}
                />
              </div>

              <div className="row-start-1 grid grid-cols-1 lg:col-span-8 lg:row-start-auto lg:grid-cols-12">
                <div className="col-span-5 grid">
                  <div className="flex items-center justify-center bg-primary-300 px-10 py-12">
                    <h3 className="px-12 text-center text-3xl font-semibold leading-relaxed text-purple-400 md:text-5xl">
                      <Link prefetch={false} href={`/products/${product?.slug}`}>
                        {updatedTitle}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 bg-purple-400 py-12 text-center">
                    <h5
                      className="text-base font-bold text-white"
                      dangerouslySetInnerHTML={{
                        __html:
                          locale === "ar"
                            ? product.featured_text_ar
                            : product.featured_text,
                      }}
                    />
                    <Link prefetch={false}
                      href={`/products/${product?.slug}`}
                      className="inline-flex justify-center rounded-100 bg-white px-5 py-3 text-sm font-semibold capitalize text-gray-200 transition-all hover:bg-[#3C926F] md:px-10 md:text-xl"
                    >
                      {t("discover")}
                    </Link>
                  </div>
                </div>
                <div className="col-span-7 row-start-1 flex h-full flex-col items-start justify-center lg:row-start-auto">
                  <div className="relative flex h-full w-full items-center justify-center bg-golden-400 p-16">
                    <div className="absolute top-4 ltr:left-4 rtl:right-4">
                      <WishlistBtn
                        product={product}
                        inWishlistPage={wishlist}
                      />
                    </div>
                    <Link prefetch={false}
                      href={`/products/${product?.slug}`}
                      onClick={handleLinkClick}
                      className={`flex relative ${
                        product?.slug ? product.slug : "pointer-events-none"
                      }`}
                    >
                      {imageSrc ? (
                        <div className="h-52 w-52">
                          {/* <ProgressiveImage src={imageSrc} placeholder={imageSrcSmall} alt={product?.name} className="m-auto h-full w-full self-center object-cover object-center mix-blend-multiply" /> */}
                          <Image
                            src={imageSrc}
                            width={300}
                            height={300}
                            placeholder="blur"
                            blurDataURL={imageSrcSmall}
                            alt={product?.name}
                            className="m-auto h-full w-full self-center object-cover object-center mix-blend-multiply"
                          />
                        </div>
                      ) : (
                        <span className="flex items-center justify-center">
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
                      <div className="absolute bottom-9 flex h-8 w-auto items-center rounded-100 bg-purple-400 px-3 py-1 font-semibold text-white ltr:right-2 rtl:-left-2">
                        <FormatCurrency
                          value={product?.price ? product.price : 0}
                          bg={false}
                          style="no-style"
                          valueUAE={productPriceUAE}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HighlightedProduct;
