"use client";
import { getProductBySlug } from "@/app/api/general";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import FormatCurrency from "../FormatCurrency";

interface CartItemProps {
  id: number;
  quantity: number;
  slug: string;
  thumbnail: string;
  name: string;
  ar_name: string;
  price: number;
  firstOne: boolean;
  removeFromCart: (itemId: number) => void;
  decreaseCartQuantity: (productData: any) => void;
  addToCart: (productData: any) => void;
}

const CartItem = ({
  id,
  quantity,
  slug,
  thumbnail,
  removeFromCart,
  price,
  decreaseCartQuantity,
  addToCart,
  name,
  ar_name,
  firstOne,
}: CartItemProps) => {
  const locale = useLocale();
  const t = useTranslations('common');
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductBySlug(slug);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const variation = product?.variations?.find(
    (variation: any) => variation.id === id
  );

  const productPrice = variation ? variation.price : product?.price;
  const salePrice = variation ? variation.sale_price : product.sale_price;
  const size = variation?.attributes?.attribute_pa_size;
  const biscuit = variation?.attributes?.attribute_pa_biscuit;
  const cream = variation?.attributes?.attribute_pa_cream;

  // Find the corresponding attribute object in the attributes array
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

  // const extraText = variation ? slug.split("-")[1]?.trim() : "";

  const productTitle = product ? (locale === "en" ? name : ar_name) : "";

  const handleRemoveClick = () => {
    removeFromCart(id);
  };

  const handleDecrease = () => {
    decreaseCartQuantity({
      id,
      thumbnail: product.main_img,
      slug: product.slug,
      price: salePrice,
    });
  };
  const productData: any = {
    id: id,
    thumbnail: product?.main_img ? product.main_img : product?.thumbnail,
    slug: product?.slug,
    price: salePrice || 0,
    title: productTitle,
  };

  const handleAddToCart = () => {
    addToCart(productData);
  };

  return (
    <>
      {loading ? (
        // <CartItemLoader />

        <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 md:py-6">
          <div className="flex justify-between gap-4 text-base font-medium text-black">
            <div>
              <Link
                prefetch={false}
                href={`/products/${slug}`}
                className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl shadow md:h-[120px] md:w-[120px]"
              >
                <img
                  src={thumbnail}
                  alt={slug}
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4 h-3 max-w-full animate-pulse rounded-lg bg-gray-200 md:w-48" />
              </div>
              <div className="mt-4 flex items-center justify-start gap-x-2">
                <button
                  className={`w-10 h-10 border-2 border-gray-300  rounded-lg hover:bg-primary-300 hover:border-primary-300 cursor-pointer flex items-center justify-center ${
                    quantity > 9 ? "pointer-events-none" : ""
                  }`}
                  type="button"
                  onClick={handleAddToCart}
                >
                  <PlusIcon
                    className="h-6 w-6 text-primary-300"
                    aria-hidden="true"
                  />
                </button>
                <input
                  type="text"
                  className="w-10 select-none border-none p-0 text-center text-xl font-semibold text-primary-300 focus:outline-none"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={handleDecrease}
                  type="button"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 hover:border-primary-300 hover:bg-primary-300"
                >
                  <MinusIcon
                    className="h-6 w-6 text-primary-300"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center">
            <div className="text-end text-black">
              <div className="text-end ltr:pl-4 rtl:pr-4">
                <div className="mb-4 h-3 w-20 animate-pulse rounded-lg bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-4 border-b border-gray-100 py-4 md:py-6">
          <div className="flex w-1/2 justify-start gap-4 text-base font-medium text-black">
            <div>
              <Link
                prefetch={false}
                href={`/products/${slug}`}
                className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl shadow md:h-[120px] md:w-[120px]"
              >
                <img
                  src={thumbnail}
                  alt={slug}
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="md:text-md text-sm font-semibold leading-5 text-black md:text-xl">
                  {productTitle}
                </h4>
                {extraText && (
                  <span className="block text-xs font-semibold text-gray-50 md:text-base">
                    {extraText}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-start gap-x-2">
                <button
                  className={`group w-10 h-10 border-2 border-gray-300  rounded-lg hover:bg-primary-300 hover:border-primary-300 cursor-pointer flex items-center justify-center ${
                    quantity > 9 ? "pointer-events-none" : ""
                  }`}
                  type="button"
                  onClick={handleAddToCart}
                >
                  <PlusIcon
                    className="h-6 w-6 text-primary-300 group-hover:text-white"
                    aria-hidden="true"
                  />
                </button>
                <input
                  type="text"
                  className="w-10 select-none border-none p-0 text-center text-xl font-semibold text-primary-300 focus:outline-none"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={handleDecrease}
                  type="button"
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 hover:border-primary-300 hover:bg-primary-300"
                >
                  <MinusIcon
                    className="ttext-primary-300 h-6 w-6 group-hover:text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={` w-1/4 flex-col items-start md:flex hidden ${firstOne?"justify-between":"justify-around"}`}>
            {firstOne ? (
              <h3 className="mb-4 text-sm font-semibold text-gray-50 md:block hidden">
                {t('unit_price')}
              </h3>
            ) : (
              ""
            )}
            <div className={`text-end text-black ${firstOne?"mb-auto mt-auto":""}`}>
              <div className="py-4">
                {salePrice && salePrice !== productPrice ? (
                  <div className="flex flex-col-reverse items-start gap-y-2">
                    <FormatCurrency
                      value={productPrice || price}
                      lineThrough
                      smallFont
                      style="no-style"
                    />
                    <FormatCurrency
                      value={salePrice}
                      style="no-style"
                      smallFont
                    />
                  </div>
                ) : (
                  <div>
                    <FormatCurrency
                      value={productPrice || price}
                      style="no-style"
                      smallFont
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`flex flex-col items-start ${firstOne?"justify-between":"justify-around"}`}>
            {firstOne ? (
              <h3 className="mb-4 text-sm font-semibold text-gray-50 md:block hidden ">
                {t('subtotal')}
              </h3>
            ) : (
              ""
            )}
            <div className={`text-end text-black ${firstOne?"mb-auto mt-auto":""}`}>
              {/* <div>
                <FormatCurrency value={price * quantity} mediumFont />
              </div> */}
               {salePrice && salePrice !== productPrice ? (
                  <div className="flex flex-col-reverse items-start gap-y-2">
                    <FormatCurrency
                      value={productPrice * quantity}
                      lineThrough
                      smallFont
                      style="no-style"
                    />
                    <FormatCurrency
                      value={salePrice * quantity}
                      style="no-style"
                      smallFont
                    />
                  </div>
                ) : (
                  <div>
                    <FormatCurrency
                      value={price * quantity}
                      style="no-style"
                      smallFont
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
