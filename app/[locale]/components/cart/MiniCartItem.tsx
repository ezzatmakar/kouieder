"use client";
import { getProductBySlug } from "@/app/api/general";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import FormatCurrency from "../FormatCurrency";
import Img from "../icons/Img";
import Trash from "../icons/Trash";
import { usePathname } from "next/navigation";
import useShoppingCart from "@/app/stores/useShoppingCart";

interface Product {
  id: number;
  title: string;
  ar_title?: string;
  price: number;
  slug: string;
  thumbnail: string;
}

interface MiniCartItemProps {
  product?: Product;
  id: number;
  quantity: number;
  size?: string;
  slug: string;
  main_image?: string;
  price: number;
  thumbnail: string;
  name: string;
  ar_name: string;
  removeFromCart?: (productId: number) => void;
  decreaseCartQuantity: (productData: any) => void;
  addToCart: (productData: any) => void;
  thanks?: boolean;
  stockData?: any;
  checkout?: boolean;
}

const MiniCartItem = ({
  id,
  quantity,
  slug,
  thumbnail,
  removeFromCart = () => {},
  price,
  name,
  ar_name,
  decreaseCartQuantity,
  thanks,
  stockData,
  addToCart,
  checkout = false,
}: MiniCartItemProps) => {
  const locale = useLocale();
  const t = useTranslations("common");
  const { disableStock, enableStock } = useShoppingCart();
  const pathname = usePathname();
  const isCheckoutPage =
    pathname?.includes("/en/checkout") ||
    pathname?.includes("/thanks") ||
    pathname?.includes("/en/thanks") ||
    pathname?.includes("/checkout");
  const [loading, setLoading] = useState(false);
  const [stockBranch, setStockBranch] = useState(false);
  const [product, setProduct] = useState<any>({});

  const isOutOfStock = (itemName: string, id: number) => {
    let isItemOutOfStock = false; // Flag to track if any item is out of stock

    if (
      stockData &&
      stockData.out_of_stock_items &&
      stockData.out_of_stock_items.length > 0
    ) {
      // Iterate over the out_of_stock_items array
      for (const item of stockData.out_of_stock_items) {
        // Check if the item name matches
        if (item.slug === itemName) {
          isItemOutOfStock = true; // Set flag to true if item is out of stock
          break; // Exit the loop early since we found a match
        }
      }
    }

    // Set stockBranch based on whether any item is out of stock
    setStockBranch(isItemOutOfStock);

    // Enable or disable stock based on the final value of isItemOutOfStock
    if (isItemOutOfStock) {
      disableStock(id);
    } else {
      enableStock(id);
    }

    return isItemOutOfStock; // Return whether the item is out of stock
  };

  useEffect(() => {
    // setLoading(true);
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductBySlug(slug);
        setProduct(fetchedProduct);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchProduct();
    isOutOfStock(slug, id);
  }, [slug, stockData, id]);

  // console.log('productDataCheck',productDataCheck)
  // console.log('productDataproduct',product)
  const productTitle = product
    ? locale === "en"
      ? name || ""
      : ar_name || ""
    : "";

  const variationId = id;
  const variation = product?.variations?.find(
    (variation: any) => variation.id === variationId
  );

  let salePrice = null;
  let productPrice = price;
  // let size = null;
  if (variation) {
    productPrice = variation.price;
    salePrice = variation.sale_price;
    // size = variation.attributes?.attribute_pa_size;
  } else {
    productPrice = product?.price || 0;
    salePrice = product?.sale_price || 0;
  }

  const productData: Product = {
    id: id,
    thumbnail: product?.main_img ? product.main_img : product?.thumbnail,
    slug: product?.slug,
    price: salePrice || 0,
    title: productTitle,
  };

  const handleDecrease = () => {
    decreaseCartQuantity(productData);
  };

  const handleAddToCart = () => {
    addToCart(productData);
  };
  const handleRemoveFromCart = () => {
    if (productData && productData.id) {
      removeFromCart(productData.id);
    }
  };

  const productDataTitle = locale === "en" ? name || "" : ar_name || "";
  const size = variation?.attributes?.attribute_pa_size;
  const biscuit = variation?.attributes?.attribute_pa_biscuit;
  const cream = variation?.attributes?.attribute_pa_cream;
  const sizeAttribute = product?.attributes?.pa_size?.find(
    (attr: any) => attr.slug === size
  );
  const biscuitAttribute = product?.attributes?.pa_biscuit?.find(
    (attr: any) => attr.slug === biscuit
  );
  const creamAttribute = product?.attributes?.pa_cream?.find(
    (attr: any) => attr.slug === cream
  );

  // Get the Arabic and English names
  const sizeArabicName = sizeAttribute?.arabic_name || "";
  const sizeEnglishName = sizeAttribute?.english_name || "";
  const biscuitArabicName = biscuitAttribute?.arabic_name || "";
  const biscuitEnglishName = biscuitAttribute?.english_name || "";
  const creamArabicName = creamAttribute?.arabic_name || "";
  const creamEnglishName = creamAttribute?.english_name || "";
  let extraText = "";

  // Construct the text based on the existence of biscuit and cream names
  if (locale === "ar") {
    extraText = `${sizeArabicName}`;
    if (biscuitArabicName) extraText += ` - ${biscuitArabicName}`;
    if (creamArabicName) extraText += ` - ${creamArabicName}`;
  } else {
    extraText = `${sizeEnglishName}`;
    if (biscuitEnglishName) extraText += ` - ${biscuitEnglishName}`;
    if (creamEnglishName) extraText += ` - ${creamEnglishName}`;
  }
  // console.log('cart items',product)
  return (
    <div className={`flex gap-4 ${stockBranch ? "opacity-50" : ""}`}>
      {loading ? (
        <>
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 shadow">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={slug}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <span className="flex h-full items-center justify-center">
                <Img />
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <div>
              <div className="flex justify-between gap-4 text-sm font-medium text-gray-900 md:text-base">
                <div>
                  <h3>
                    <Link
                      prefetch={false}
                      className="text-sm font-semibold text-black md:text-base"
                      href={`/products/${slug}`}
                    >
                      {productTitle}
                    </Link>
                  </h3>

                  {extraText && (
                    <span className="block text-xs font-semibold text-gray-50 md:text-base">
                      {extraText}
                    </span>
                  )}
                </div>
                <div className="text-end text-sm text-black">
                  <div>
                    <FormatCurrency value={price * quantity} smallFont />
                  </div>
                  {/* <div className="mb-4 h-3 w-20 animate-pulse rounded-lg bg-gray-200" /> */}
                </div>
              </div>
            </div>
            {!isCheckoutPage && (
              <div className="text-gray-500 mt-4 flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center justify-start">
                  <button
                    className={`md:w-8 md:h-8 w-6 h-6 border-2 border-gray-300  rounded-lg cursor-pointer flex items-center justify-center ${
                      quantity! > 9 ? "pointer-events-none" : ""
                    }`}
                    type="button"
                    onClick={handleAddToCart}
                  >
                    <PlusIcon
                      className="h-6 w-6 text-gray-200"
                      aria-hidden="true"
                    />
                  </button>
                  <input
                    type="text"
                    className="w-10 select-none border-none p-0 text-center text-xl font-semibold text-gray-300 focus:outline-none"
                    value={quantity!}
                    readOnly
                  />
                  <button
                    onClick={handleDecrease}
                    type="button"
                    className="border-gray-400 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border-2 md:h-8 md:w-8"
                  >
                    <MinusIcon
                      className="h-6 w-6 text-primary-200"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div>
                  <button onClick={handleRemoveFromCart} className="w-3 md:w-5">
                    <Trash />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex-shrink-0 flex-grow overflow-hidden rounded-md bg-gray-200 shadow ${
              checkout ? "w-12 h-12" : "h-20 w-20"
            }`}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={slug}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <span className="flex h-full items-center justify-center">
                <Img />
              </span>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div>
              <div className={`flex justify-between gap-4`}>
                <div>
                  <h3>
                    <Link
                      prefetch={false}
                      className={`font-semibold text-black ${
                        checkout ? "md:text-sm text-xs" : "md:text-base text-sm"
                      }`}
                      href={`/products/${slug}`}
                    >
                      {thanks ? productDataTitle : productTitle}
                    </Link>
                  </h3>

                  {extraText && (
                    <span className={`block font-semibold text-gray-50 ${
                      checkout ? "md:text-xs text-[10px]" : "md:text-sm text-xs"
                    }`}>
                      {extraText}
                    </span>
                  )}
                  {thanks && (
                    <div className="pt-2 text-xs font-medium uppercase md:text-base">
                      <p className="text-black">
                        <FormatCurrency
                          value={price}
                          bg={false}
                          style="no-style"
                        />
                      </p>
                      <p className="mt-1 text-[#423C33]">
                        <span className="text-gray-50">{t("qty")}:</span>{" "}
                        {quantity}
                      </p>
                    </div>
                  )}
                  {stockBranch ? (
                    <span className="py-3 text-xs font-semibold text-primary-500 md:text-xs">
                      {t("not_in_branch")}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-end text-sm text-black">
                  {salePrice && salePrice !== productPrice ? (
                    <div className="flex flex-col-reverse items-end gap-y-2">
                      <FormatCurrency
                        lineThrough
                        value={(productPrice || price) * quantity}
                        smallFont
                        style="no-style"
                      />
                      <FormatCurrency value={salePrice * quantity} 
                        smallFont={checkout}
                        mediumFont={!checkout} />
                    </div>
                  ) : (
                    <div>
                      <FormatCurrency
                        value={(productPrice || price) * quantity}
                        smallFont={checkout}
                        mediumFont={!checkout}
                        // smallFont
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isCheckoutPage && (
              <div className="text-gray-500 mt-4 flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center justify-start">
                  <button
                    className={`md:w-8 md:h-8 w-6 h-6 border-2 border-primary-200 rounded-lg cursor-pointer flex items-center justify-center text-primary-200 transition-all md:hover:bg-primary-200 md:hover:text-white ${
                      quantity! > 9 ? "pointer-events-none" : ""
                    }`}
                    type="button"
                    onClick={handleAddToCart}
                  >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <input
                    type="text"
                    className="w-10 select-none border-none p-0 text-center text-xl font-semibold text-primary-300 focus:outline-none"
                    value={quantity!}
                    readOnly
                  />
                  <button
                    onClick={handleDecrease}
                    type="button"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border-2 border-primary-200 text-primary-200 transition-all md:h-8 md:w-8 md:hover:bg-primary-200 md:hover:text-white"
                  >
                    <MinusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <button onClick={handleRemoveFromCart} className="w-3 md:w-5">
                    <Trash />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCartItem;
