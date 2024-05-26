"use client";
import { useUser } from "@/app/UserContext";
import { getProductBySlug } from "@/app/api/general";
import { handleViewContent } from "@/app/fb-pixel";
import { ProductData, Variation } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import TiktokPixel from "tiktok-pixel";
import AddToCartSimple from "../AddToCartSimple";
import FormatCurrency from "../FormatCurrency";
import Stars from "../Stars";
import Gallery from "./Gallery";
import QuickViewLoader from "./QuickViewLoader";
import SelectBiscuit from "./SelectBiscuit";
import SelectCream from "./SelectCream";
import SelectSize from "./SelectSize";

interface QuickViewProps {
  openQuick: any;
  openModal: any;
  product: any;
  // other props...
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function QuickView({
  openQuick,
  openModal,
  product,
}: QuickViewProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { userInfo, locationInfo } = useUser();
  const nearestNumberRating = 2;

  const imageSrc = product?.main_image
    ? product.main_image
    : product?.thumbnail;
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [variations, setVariation] = useState<Variation | undefined>(undefined);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  // const [itemID, setItemID] = useState<number | null | undefined>(undefined);
  const [itemID, setItemID] = useState<number | null>(null);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBiscuit, setSelectedBiscuit] = useState('');
  const initialCream = productData?.attributes?.pa_cream?.[0]?.slug;
  const [selectedCream, setSelectedCream] = useState<string | undefined>(
    initialCream || ""
  );
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductBySlug(product.slug);
      setProductData(productData);
    };
    fetchProduct();
  }, [product.slug]);
  // debugger
  // console.log('productData',productData)
  // console.log('here',productData?.attributes?.pa_size?.[0].slug)
  // console.log('selectedSize',selectedSize)
  // console.log('selectedBiscuit',selectedBiscuit)

  const [selectOption, setSelectOption] = useState<Variation | null>(
    productData?.variations?.find(
      (variation: any) =>
        variation.attributes?.attribute_pa_size === productData?.attributes?.pa_size?.[0] &&
        variation.attributes?.attribute_pa_biscuit === productData?.attributes?.pa_biscuit?.[0] &&
        variation.attributes?.attribute_pa_cream === productData?.attributes?.pa_cream?.[0]
    ) ?? null
  );
  useEffect(() => {
    if (
      productData &&
      productData.variations &&
      productData.variations.length > 0
    ) {
      const initialVariation = productData.variations.find(
        (variation: any) =>
          variation.attributes?.attribute_pa_size === selectedSize &&
          (!variation.attributes?.attribute_pa_biscuit ||
            variation.attributes?.attribute_pa_biscuit === selectedBiscuit) &&
          (!variation.attributes?.attribute_pa_cream ||
            variation.attributes?.attribute_pa_cream === selectedCream)
      );

      // Update the itemID state with the ID of the initial variation
      if (initialVariation) {
        setItemID(initialVariation.id);
      }
    }
  }, [productData, selectedSize, selectedBiscuit, selectedCream]);
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

  const productTitle = productData
    ? locale === "en"
      ? productData?.title || ""
      : productData?.ar_title || ""
    : "";

  // const productDescription = productData
  //   ? locale === "en"
  //     ? productData?.description || ""
  //     : productData?.ar_description || ""
  //   : "";
  const productCategory = productData
    ? locale === "en"
      ? productData?.category_name || ""
      : productData?.category_name_ar ||
      `MISSING AR  ${productData?.category_name}`
    : "";
  const productDescription = productData
    ? locale === "en"
      ? productData?.description || ""
      : productData?.ar_description || ""
    : "";
  const paragraphs = productDescription.split("\r\n\r\n");
  // let itemID: any;
  // let salePrice: null = null;
  // let productPrice = null;
  // let size = null;
  // let biscuit = null;
  // let cartPrice: number | null = null;

  // if (product?.type === "simple") {
  //   itemID = product.id;
  //   productPrice = product.price;
  //   salePrice = product.sale_price;
  // } else if (product?.type === "variable") {
  //   productPrice = variations?.price || 0;
  //   salePrice = variations?.sale_price;
  //   size = variations?.attributes?.attribute_pa_size;
  //   biscuit = variations?.attributes?.attribute_pa_biscuit;
  //   itemID = variations?.id;
  // }

  useEffect(() => {
    if (
      (selectedSize && (selectOption?.attributes?.attribute_pa_size !== selectedSize && selectedSize)) ||
      (selectedBiscuit && (!selectOption?.attributes?.attribute_pa_biscuit || selectOption?.attributes?.attribute_pa_biscuit !== selectedBiscuit)) ||
      (selectedCream && (!selectOption?.attributes?.attribute_pa_cream || selectOption?.attributes?.attribute_pa_cream !== selectedCream))
    ) {
      const newVariation = productData?.variations?.find(
        (variation: any) =>
          (!variation.attributes?.attribute_pa_size || variation.attributes?.attribute_pa_size === selectedSize) &&
          (!variation.attributes?.attribute_pa_biscuit || variation.attributes?.attribute_pa_biscuit === selectedBiscuit) &&
          (!variation.attributes?.attribute_pa_cream || variation.attributes?.attribute_pa_cream === selectedCream)
      );

      // Update state variables only if the new variation is found
      if (newVariation) {
        setVariation(newVariation);
        setSelectOption(newVariation);
        setProductPrice(newVariation.price ?? null);
        setSalePrice(newVariation.sale_price ?? null);
        setItemID(newVariation.id);
        console.log("here 1");
      } else {
        // If the variation is not found, reset the state variables
        setVariation(undefined);
        setSelectOption(null);
        setProductPrice(product.price);
        setSalePrice(product.sale_price);
        setItemID(null);
        console.log("here 2");

      }
    } else {
      if (selectOption != null) {
        setProductPrice(selectOption?.price ?? product.price);
        setSalePrice(selectOption?.sale_price ?? null);
        setItemID(selectOption?.id ?? null);
        console.log("selectOption", selectOption);

      } else {
        setProductPrice(product.price);
        setSalePrice(product?.sale_price);
        setItemID(product?.id);
        console.log("selectOption", selectOption);

      }

    }
  }, [
    selectedSize,
    selectedBiscuit,
    selectOption,
    productData,
    product.price,
    selectedCream,
  ]);

  useEffect(() => {
    // Call handleViewContent when the component mounts
    if (locationInfo && product) {
      handleViewContent(
        [product?.sku],
        product.title,
        product.category_name,
        salePrice ?? 0,
        userInfo,
        locationInfo
      );
    }
  }, [locationInfo, product]);

  const handleTracking = () => {
    if (typeof window !== "undefined") {
      TiktokPixel.track("AddToCart", {
        contents: [
          {
            content_id: product.id.toString(),
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
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.track("AddToCart", {
            content_ids: [product.id],
            content_type: "product",
            currency: "EGP",
            value: product.price,
          });
        });
    }
  };

  // if (!productData) {
  //   return null;
  // }
  console.log('sale price', salePrice)
  console.log('productData', productData)
  return (
    <div className="overview">
      <Transition show={openQuick} as={Fragment}>
        <Dialog as="div" className="relative z-[1001]" onClose={openModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-[1001] bg-black bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 z-[1001] overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-start text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-7xl">
                  <div className="relative flex w-full items-center overflow-hidden rounded-3xl bg-white px-4 pb-8 pt-24 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className={
                        "text-gray-400 hover:text-gray-500 absolute top-4 rounded-lg bg-[#EDEFEB] p-4 hover:bg-[#e0e1dd] hover:text-primary-300 ltr:right-4 rtl:left-4 sm:top-8 ltr:sm:right-6 rtl:sm:left-6 md:top-6 lg:top-8 ltr:lg:right-8 rtl:lg:left-8"
                      }
                      onClick={openModal}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="overflow-hidden sm:col-span-4 lg:col-span-5">
                        {/* <img src={product.main_image} alt={product.title} className="object-cover object-center" /> */}
                        <Gallery
                          galleryImages={productData?.images}
                          thumbView="normal"
                        />
                      </div>
                      <div className="h-full sm:col-span-8 lg:col-span-7">
                        {productData ? (
                          <>
                            <div className="flex h-full flex-col">
                              <h5 className="text-xl font-bold text-gray-50">
                                {productCategory}
                              </h5>
                              <h2 className="mb-2 text-4xl font-bold text-black md:mb-4 md:mt-2">
                                {productTitle}
                              </h2>
                              {/* <Stars
                                nearestNumberRating={nearestNumberRating}
                              /> */}
                              <div className="has-ul br-none mt-6">
                                {paragraphs.map((paragraph: any, index: any) => (
                                  <div
                                    key={index}
                                    className="text-sm text-[#333333] md:text-base md:leading-8"
                                    dangerouslySetInnerHTML={{
                                      __html: paragraph,
                                    }}
                                  />
                                ))}
                              </div>

                              <section
                                aria-labelledby="options-heading"
                                className="mt-auto pt-4"
                              >
                                {
                                  // @ts-ignore
                                  productData?.attributes?.pa_size ? (
                                    <SelectSize
                                      // @ts-ignore
                                      sizes={
                                        productData?.attributes?.pa_size || []
                                      }
                                      selectedSize={selectedSize}
                                      onSelectedSizeChange={setSelectedSize}
                                    />
                                  ) : (
                                    ""
                                  )
                                }

                                {/* Biscuit */}
                                {productData?.attributes?.pa_biscuit ? (
                                  <div className="mt-4">
                                    <SelectBiscuit
                                      biscuits={
                                        productData?.attributes?.pa_biscuit ||
                                        []
                                      }
                                      selectBiscuit={selectedBiscuit}
                                      onselectBiscuitChange={setSelectedBiscuit}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                {productData?.attributes?.pa_cream ? (
                                  <div className="mt-4">
                                    <SelectCream
                                      creams={
                                        productData?.attributes?.pa_cream ||
                                        []
                                      }
                                      selectCream={selectedCream}
                                      onselectCreamChange={setSelectedCream}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                {salePrice && salePrice !== productPrice ? (
                                  <div className="mt-5 flex items-end gap-x-3 text-xl">
                                    <FormatCurrency value={salePrice}  />
                                    <FormatCurrency
                                      value={productPrice}
                                      lineThrough
                                    />
                                  </div>
                                ) : (
                                  <div className="mt-5 text-xl">
                                    <FormatCurrency
                                      value={productPrice}
                                      bigger
                                    />
                                  </div>
                                )}
                                <div className=" mt-6">
                                  <div className="">
                                    <div>
                                      <AddToCartSimple
                                        className="inline-flex w-full justify-center py-3 text-center text-xl font-medium text-white"
                                        // @ts-ignore
                                        product={{
                                          id: itemID,
                                          thumbnail: product?.main_img,
                                          slug: product?.slug,
                                          price: salePrice
                                            ? salePrice
                                            : productPrice,
                                          quantity: 1,
                                          name: productData?.title,
                                          ar_name: productData?.ar_title,
                                        }}
                                        // disabled={!Boolean(selectedSize.inStock)}
                                        disabled={salePrice === null}
                                        singleProductView={true}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </>
                        ) : (
                          <QuickViewLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
