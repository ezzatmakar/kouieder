"use client";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import ProgressiveImage from "../ProgressiveImage";
import FormatCurrency from "../FormatCurrency";
import AddToCartSimpleMini from "../AddToCartSimpleMini";
import { ProductData } from "@/types";
import Image from "next/image";

type ProductWidgetBestSellingProps = {
  product: ProductData;
};
const ProductWidgetBestSelling = ({
  product,
}: ProductWidgetBestSellingProps) => {
  const t = useTranslations("common");
  const locale = useLocale();
  let productTitle =
  locale === "en"
    ? product.name
    : product.ar_name
    ? product.ar_name
    : "missing in API";

let name =
  productTitle && productTitle.length > 45
    ? productTitle.slice(0, 45).concat("...")
    : productTitle;


  const imageSrc = product?.main_image
    ? product.main_image
    : product?.thumbnail;

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
  // console.log('product', product)
  return (
    <>
      <div className="shadow-custom flex h-full items-center rounded-3xl bg-white">
        <Link prefetch={false}
          href={`/products/${product?.slug}`}
          className="min-w-24 h-18 flex w-24 items-center justify-center border-r border-gray-100"
          onClick={handleLinkClick}
        >
          {imageSrc ? (
            // <ProgressiveImage src={imageSrc} placeholder={imageSrc} alt={productTitle} className="m-auto max-w-[90%] self-center object-cover object-center" />
            <Image
              src={imageSrc}
              alt={productTitle ?? ""}
              className="m-auto max-w-[90%] object-cover object-center"
            />
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
        </Link>
        <div className="flex flex-1 items-center justify-between">
          <div className="pl-4">
            <h4 className="text-sm text-black md:text-base">
              <Link prefetch={false} href={`/products/${product?.slug}`}>{name}</Link>
            </h4>
            <div className="mt-2">
              <FormatCurrency
                value={product?.price ? product.price : 0}
                valueUAE={productPriceUAE}
              />
            </div>
          </div>
          <div className="px-4">
            <AddToCartSimpleMini
              className="h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-white hover:bg-primary-100"
              // @ts-ignore
              product={{
                // @ts-ignore
                id: itemID,
                // @ts-ignore
                thumbnail: imageSrc,
                slug: product.slug,
                // @ts-ignore
                price: salePrice,
              }}
              disabled={salePrice === null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWidgetBestSelling;
