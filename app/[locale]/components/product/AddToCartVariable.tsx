"use client";
import { getProductBySlug } from "@/app/api/general";
import { ProductData, Variation } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AddToCartSimple from "../AddToCartSimple";
import FormatCurrency from "../FormatCurrency";
import SelectBiscuit from "./SelectBiscuit";
import SelectSize from "./SelectSize";
import SelectCream from "./SelectCream";

interface AddToCartVariableProps {
  product: ProductData;
}

export default function AddToCartVariable({ product }: AddToCartVariableProps) {
  //   const [productData, setProductData] = useState(null);
  const [productData, setProductData] = useState<ProductData | any>(null);
  const t = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemID, setItemID] = useState<number | null | undefined>(undefined);
  const [variations, setVariation] = useState<Variation | undefined>(undefined);
  // let productPrice = null;
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const results = await getProductBySlug(product.slug);
      setProductData(results);
      setLoading(false);
    };

    // Fetch product only when it becomes visible
    if (inView) {
      fetchProduct();
    }
  }, [product.slug, inView]);

  const [selectedSize, setSelectedSize] = useState(
    productData?.attributes?.pa_size?.[0].slug
  );
  
  const initialBiscuit = productData?.attributes?.pa_biscuit?.[0]?.slug;
  const [selectedBiscuit, setSelectedBiscuit] = useState<string | undefined>(initialBiscuit || "");

  const initialCream = productData?.attributes?.pa_cream?.[0]?.slug;
  const [selectedCream, setSelectedCream] = useState<string | undefined>(initialCream || "");
  useEffect(() => {
    if (
      productData &&
      productData.variations &&
      productData.variations.length > 0
    ) {
      const initialVariation = productData.variations.find(
        (variation: any) =>
          variation.attributes?.attribute_pa_size === selectedSize &&
          (!variation.attributes?.attribute_pa_biscuit || variation.attributes?.attribute_pa_biscuit === selectedBiscuit) &&
          (!variation.attributes?.attribute_pa_cream || variation.attributes?.attribute_pa_cream === selectedCream)
      );

      // Update the itemID state with the ID of the initial variation
      if (initialVariation) {
        setItemID(initialVariation.id);
      }
    }
  }, [productData, selectedSize, selectedBiscuit]);
  useEffect(() => {
    if (
      productData &&
      productData.attributes &&
      productData.attributes.pa_size
    ) {
      // Set the initial selectedSize to the first size option if available
      const initialSize = productData.attributes.pa_size[0]?.slug;
      setSelectedSize(initialSize || "");
    }
  }, [productData]);

  useEffect(() => {
    const initialBiscuit = productData?.attributes?.pa_biscuit?.[0]?.slug;
    setSelectedBiscuit(initialBiscuit || "");
    const initialCream = productData?.attributes?.pa_cream?.[0]?.slug;
    setSelectedCream(initialCream || "");
  }, [productData]);

  const [selectOption, setSelectOption] = useState<Variation | null>(
    productData?.variations?.find(
      (variation: any) =>
        variation.attributes?.attribute_pa_size === productData?.attributes?.pa_size?.[0] &&
        variation.attributes?.attribute_pa_biscuit === productData?.attributes?.pa_biscuit?.[0] &&
        variation.attributes?.attribute_pa_cream === productData?.attributes?.pa_cream?.[0]
    ) ?? null
  );

  // const [selectOption, setSelectOption] = useState<Variation | null>(null);
  useEffect(() => {
    if (
      (selectOption?.attributes?.attribute_pa_size !== selectedSize &&
        selectedSize) ||
      (selectedBiscuit &&
        (!selectOption?.attributes?.attribute_pa_biscuit ||
          selectOption?.attributes?.attribute_pa_biscuit !== selectedBiscuit)) ||
      (selectedCream &&
        (!selectOption?.attributes?.attribute_pa_cream ||
          selectOption?.attributes?.attribute_pa_cream !== selectedCream))
    ) {
      // Find the variation based on selectedSize and selectedBiscuit
      const newVariation = productData?.variations?.find(
        (variation: any) =>
          variation.attributes?.attribute_pa_size === selectedSize &&
          (!variation.attributes?.attribute_pa_biscuit ||
            variation.attributes?.attribute_pa_biscuit === selectedBiscuit) &&
          (!variation.attributes?.attribute_pa_cream ||
            variation.attributes?.attribute_pa_cream === selectedCream)
      );

      // Update state variables only if the new variation is found
      if (newVariation) {
        setVariation(newVariation);
        setSelectOption(newVariation);
        setProductPrice(newVariation.price);
        setSalePrice(newVariation.sale_price ?? null);
        setItemID(newVariation.id);
      } else {
        // If the variation is not found, reset the state variables
        setVariation(undefined);
        setSelectOption(null);
        setProductPrice(product.price);
        setSalePrice(null);
        setItemID(null);
      }
    } else {
      // If selectedSize and selectedBiscuit are unchanged, update state variables based on selectOption
      setProductPrice(selectOption?.price ?? product.price);
      setSalePrice(selectOption?.sale_price ?? null);
      setItemID(selectOption?.id ?? null);
    }
  }, [selectedSize, selectedBiscuit, selectedCream, selectOption, productData, product.price]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  // if(!productData){
  //   return null;
  // }
  // console.log('productData',productData)
  return (
    <div className="flex h-full flex-col pt-[5px]" ref={ref}>
      {loading ? (
        <div className="flex animate-pulse gap-x-2">
          <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2 shadow-sm">
            <span className="bg-gray-400 block h-5 w-10 rounded-sm" />
          </div>
          <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2 shadow-sm">
            <span className="bg-gray-400 block h-5 w-10 rounded-sm" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-5">
          <SelectSize
            sizes={productData?.attributes?.pa_size || []}
            selectedSize={selectedSize}
            onSelectedSizeChange={setSelectedSize}
            small
          />
          {productData?.attributes?.pa_biscuit && (
            <SelectBiscuit
              biscuits={productData?.attributes?.pa_biscuit || []}
              selectBiscuit={selectedBiscuit}
              onselectBiscuitChange={setSelectedBiscuit}
              small
            />
          )}
          {productData?.attributes?.pa_cream && (
            <SelectCream
              creams={productData?.attributes?.pa_cream || []}
              selectCream={selectedCream}
              onselectCreamChange={setSelectedCream}
              small
            />
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-end gap-2 text-xs md:h-auto md:text-base mb-2.5 md:mb-0">
        {productPrice != null || productPrice !== 0 ? (
          salePrice && salePrice != productPrice ? (
            <>
              <FormatCurrency value={salePrice} />
              <FormatCurrency value={productPrice} lineThrough />
            </>
          ) : (
            <FormatCurrency value={productPrice} />
          )
        ) : (
          ""
        )}
      </div>
      {/* For Desktop */}
      <div className="block md:block">
        {product?.availability === "outofstock" ? (
                  <p className="EGP mt-auto rounded-lg bg-transparent py-3 text-xs font-semibold text-primary-500 md:text-base">
            {t("out_stock")}
          </p>
        ) : (
          <AddToCartSimple
            className="inline-flex w-full justify-center text-center text-xl font-medium text-white"
            product={{
              id: itemID,
              thumbnail: product?.main_image,
              slug: product?.slug,
              price: salePrice ? salePrice : productPrice,
              quantity: 1,
              name: productData?.title,
              ar_name: productData?.ar_title,
            }}
            disabled={product?.availability === "outofstock" || !itemID}
          />
        )}
      </div>
    </div>
  );
}
