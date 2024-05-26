"use client";
import useShoppingCart from "@/app/stores/useShoppingCart";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import FormatCurrency from "../FormatCurrency";
import FrequentlyLoader from "./FrequentlyLoader";
import Img from "../icons/Img";

export default function Frequently({ upSellingProducts, currentProduct }: any) {
  const locale = useLocale();
  const t = useTranslations("common");
  const { addToCart } = useShoppingCart();

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
  const [selectedOriginalPrice, setSelectedOriginalPrice] = useState<number>(0);

  useEffect(() => {
    const initialSelected: any[] = [];
    let initialSelectedTotalPrice = 0;
    let initialSelectedOriginalPrice = 0;

    initialSelected.push({
      id: currentProduct.id,
      thumbnail: currentProduct.thumbnail,
      slug: currentProduct.slug,
      price: parseFloat(currentProduct.price),
      quantity: 1,
      name: currentProduct.title,
      ar_name: currentProduct.ar_title,
    });
    const currentProductPrice = parseFloat(currentProduct.price);
    const currentProductOriginalPrice = parseFloat(
      currentProduct.sale_price || currentProduct.price
    );
    initialSelectedTotalPrice += currentProductPrice;
    initialSelectedOriginalPrice += currentProductOriginalPrice;

    upSellingProducts.forEach((product: any) => {
      const productPrice = parseFloat(product.price);
      const productOriginalPrice = parseFloat(
        product.sale_price || product.price
      );
      initialSelected.push({
        id: product.id,
        thumbnail: product.thumbnail,
        slug: product.slug,
        price: productOriginalPrice,
        quantity: 1,
        name: product.name,
        ar_name: product.ar_name,
      });
      initialSelectedTotalPrice += productPrice;
      initialSelectedOriginalPrice += productOriginalPrice;
    });

    setSelectedProducts(initialSelected);
    setSelectedTotalPrice(initialSelectedTotalPrice);
    setSelectedOriginalPrice(initialSelectedOriginalPrice);
  }, [upSellingProducts, currentProduct]);

  const handleProductSelect = (product: any) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (
        prevSelectedProducts.some(
          (selectedProduct) => selectedProduct.slug === product.slug
        )
      ) {
        return prevSelectedProducts.filter(
          (selectedProduct) => selectedProduct.slug !== product.slug
        );
      } else {
        return [...prevSelectedProducts, product];
      }
    });

    const productPrice = parseFloat(product.price);
    const productOriginalPrice = parseFloat(
      product.sale_price || product.price
    );

    setSelectedTotalPrice((prevTotal) => {
      if (
        !selectedProducts.some(
          (selectedProduct) => selectedProduct.slug === product.slug
        )
      ) {
        return prevTotal + productPrice;
      } else {
        return prevTotal - productPrice;
      }
    });

    setSelectedOriginalPrice((prevTotal) => {
      if (
        !selectedProducts.some(
          (selectedProduct) => selectedProduct.slug === product.slug
        )
      ) {
        return prevTotal + productOriginalPrice;
      } else {
        return prevTotal - productOriginalPrice;
      }
    });
  };

  const addMultipleToCart = () => {
    addToCart(selectedProducts);
  };

  return (
    <>
      {upSellingProducts.length ? (
        <div className="w-full p-4 md:mt-6 md:border-t-2 md:p-0 md:pt-4">
          <div className="mt-6 border-gray-100 bg-primary-300 px-4 py-6 md:mt-3 md:rounded-xl md:border-0 md:bg-transparent md:pt-0">
            <h2 className="text-base font-bold text-black md:mb-2 md:text-xl">
              {t("bought_together_title")}
            </h2>
            <div className="flex flex-wrap gap-5 md:flex-nowrap">
              <div className="no-scrollbar flex items-start overflow-y-scroll px-3 py-3">

                    <div className="flex w-[125px] min-w-[140px] flex-wrap items-center">
                        <ProductItem
                          product={currentProduct}
                          selected={selectedProducts.some(
                            (selectedProduct) =>
                              selectedProduct.slug === currentProduct.slug
                          )}
                          handleProductSelect={handleProductSelect}
                        />
                        {<PlusIcon className="order-2 mx-3 h-7 w-7" />}
                    </div>
                    
                          {upSellingProducts.map((product: any, index: any) => (
                            <div className="flex w-[125px] min-w-[140px] flex-wrap items-center">
                                <React.Fragment key={index}>
                                  <ProductItem
                                    product={product}
                                    selected={selectedProducts.some(
                                      (selectedProduct) =>
                                        selectedProduct.slug === product.slug
                                    )}
                                    handleProductSelect={handleProductSelect}
                                  />
                                  {index !== upSellingProducts.length - 1 && (
                                    <PlusIcon className="order-2 mx-3 h-7 w-7" />
                                  )}
                                </React.Fragment>
                             </div>
                          ))}
                   
                
              </div>
              <div className="flex flex-col">
                <ProductSummary
                  selectedTotalPrice={selectedTotalPrice}
                  selectedOriginalPrice={selectedOriginalPrice}
                  selectedProducts={selectedProducts}
                  addMultipleToCart={addMultipleToCart}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FrequentlyLoader />
      )}
    </>
  );
}

const ProductItem = ({ product, selected, handleProductSelect, upSellingProducts }: any) => {
  const locale = useLocale();

  return (
    <>
      <div
        className={`w-20 h-20 p-1 border-2  rounded-[10px] cursor-pointer relative ${
          selected ? "border-primary-100" : "border-gray-300"
        }`}
        onClick={() => {
          handleProductSelect(product);
        }}
      >
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} />
        ) : (
          <span className="flex h-full items-center justify-center">
            <Img />
          </span>
        )}
        {selected && (
          <div className="pointer-events-none absolute right-[-7px] top-[-9px]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="28" rx="4" fill="#5167A2" />
              <path
                d="M20.7858 9.35596L11.9642 18.1418L7.5 13.6418L6.5 14.6418L11.4642 19.6418C11.5292 19.7088 11.6068 19.7623 11.6927 19.799C11.7785 19.8358 11.8708 19.8551 11.9642 19.856C12.0575 19.8551 12.1498 19.8358 12.2357 19.799C12.3215 19.7623 12.3992 19.7088 12.4642 19.6418L21.7858 10.356L20.7858 9.35596Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        )}
        
      </div>

      <div className="relative order-3 w-full pt-2">
            <h3 className="text-sm">{locale === "en" ? product.title || product.name : product.ar_title || product.ar_name}</h3>
            <p>
              {product.sale_price && product.sale_price !== product.price ? (
                <>
                  <FormatCurrency value={product.sale_price}  smallFont />
                  <FormatCurrency value={product.price} lineThrough  />
                </>
              ) : (
                <FormatCurrency value={product.price}  smallFont/>
              )}
            </p>
      </div>
    </>
  );
};

const ProductSummary = ({
  selectedTotalPrice,
  selectedOriginalPrice,
  selectedProducts,
  addMultipleToCart,
}: any) => {
  const t = useTranslations("common");

  return (
    <div className="hidden font-medium md:block">
      <p className="text-base font-semibold text-gray-50">{t("total")}: </p>
      <div className="my-4 flex items-center gap-x-2">
        <div className="text-xl font-bold text-black">
          <FormatCurrency value={selectedOriginalPrice} />
        </div>
        <del className="text-gray-400 text-sm">
          <FormatCurrency value={selectedTotalPrice} lineThrough />
        </del>
      </div>
      <button
        type="button"
        className={`items-center flex justify-between px-5 gap-x-2 py-2.5 text-sm font-semibold capitalize text-primary-300 border-2 border-solid rounded-lg  whitespace-nowrap border-gray-300 focus:outline-none transition-all hover:bg-primary-400 hover:text-white hover:border-primary-400 cursor-pointer ${
          selectedTotalPrice > 0 ? "" : "opacity-75 pointer-events-none"
        }`}
        onClick={() => {
          addMultipleToCart();
        }}
      >
        {t("add_all_to_cart")}
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

const ProductList = ({
  currentProduct,
  upSellingProducts,
  selectedProducts,
  handleProductSelect,
}: any) => {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
      <ul className="mt-4 flex md:mt-0">
        <li className="mb-4">
          <label
            htmlFor={`product-${currentProduct.slug}`}
            className="cursor-pointer"
          >
            <ProductCheckbox
              product={currentProduct}
              selected={selectedProducts.some(
                (selectedProduct: any) =>
                  selectedProduct.slug === currentProduct.slug
              )}
              handleProductSelect={handleProductSelect}
            />
          </label>
        </li>
        {upSellingProducts.map((product: any, index: any) => (
          <li key={index} className="mb-4">
            <label htmlFor={`product-${product.slug}`} className="">
              <ProductCheckbox
                product={product}
                selected={selectedProducts.some(
                  (selectedProduct: any) =>
                    selectedProduct.slug === product.slug
                )}
                handleProductSelect={handleProductSelect}
              />
            </label>
          </li>
        ))}
      </ul>
  );
};

const ProductCheckbox = ({ product, selected, handleProductSelect }: any) => {
  const locale = useLocale();

  return (
    <div className="relative flex items-center gap-4 py-1 ltr:pr-6 rtl:pl-6">
      {/* <input
        type="checkbox"
        name={`product-select`}
        className="peer hidden"
        id={`product-${product.slug}`}
        checked={selected || false}
        onChange={() => handleProductSelect(product)}
      /> */}
      {/* <div className="invisible absolute top-1 text-xl peer-checked:visible ltr:left-0 rtl:right-0">
        <RiCheckboxFill className="text-gray-200" />
      </div>
      <div className="visible absolute top-1 text-xl peer-checked:invisible ltr:left-0 rtl:right-0">
        <RiCheckboxBlankLine className="text-primary-300" />
      </div> */}
      <div className="flex flex-col items-start gap-3 text-sm font-semibold">
        {locale === "en"
          ? product.title || product.name
          : product.ar_title || product.ar_name}
        <div className="price flex flex-col gap-y-2 text-xs">
          {product.sale_price && product.sale_price !== product.price ? (
            <>
              <FormatCurrency value={product.sale_price} />
              <FormatCurrency value={product.price} lineThrough />
            </>
          ) : (
            <FormatCurrency value={product.price} />
          )}
        </div>
      </div>
    </div>
  );
};
