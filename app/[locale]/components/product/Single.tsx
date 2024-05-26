"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
// import Gallery from "./Gallery";
// import Frequently from "./Frequently";
import { getProductBySlugStock, getUpSellingProducts } from "@/app/api/general";
import { useProductStore } from "@/app/stores/product";
import { useInView } from "react-intersection-observer";
import FormatCurrency from "../FormatCurrency";
import Stars from "../Stars";
import SelectBiscuit from "./SelectBiscuit";
import SelectSize from "./SelectSize";
// import Tabs from "./Tabs";
import useShoppingCart from "@/app/stores/useShoppingCart";
import ExtraProducts from "../ExtraProducts";
import SelectDelivery from "../SelectDelivery";
import UpSellingProducts from "../UpSellingProducts";
// import { handleAddToCart } from '@/app/fb-pixel';
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';
import { useCurrency } from "@/CurrencyContext";
import { useUser } from "@/app/UserContext";
import { handleViewContent } from "@/app/fb-pixel";
import { Variation } from "@/types";
import dynamic from "next/dynamic";
import TiktokPixel from "tiktok-pixel";
import WishlistBtn from "../WishlistBtn";
import FrequentlyLoader from "./FrequentlyLoader";
import GalleryLoader from "./GalleryLoader";
import SelectCream from "./SelectCream";
import ReviewsList from "./ReviewsList";
import { useSharedState } from "@/app/SharedStateContext";
import Timer from "../Timer";

const AddToCartSimple = dynamic(() => import("../AddToCartSimple"), {
  ssr: false,
});
const Frequently = dynamic(() => import("./Frequently"), {
  ssr: false,
  loading: () => <FrequentlyLoader />,
});
const Gallery = dynamic(() => import("./Gallery"), {
  ssr: false,
  loading: () => <GalleryLoader />,
});

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Single({ productData, slug }: any) {
  const product = productData;
  const locale = useLocale();
  const t = useTranslations("common");
  const { selectedBranchIdPROV } = useSharedState();

  const [itemID, setItemID] = useState<number | null | undefined>(undefined);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [variations, setVariation] = useState<Variation | undefined>(undefined);
  const initialBiscuit = productData?.attributes?.pa_biscuit?.[0]?.slug;
  const [selectedBiscuit, setSelectedBiscuit] = useState<string | undefined>(
    initialBiscuit || ""
  );
  const initialCream = productData?.attributes?.pa_cream?.[0]?.slug;
  const [selectedCream, setSelectedCream] = useState<string | undefined>(
    initialCream || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    productData?.attributes?.pa_size?.[0].slug
  );

  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [inStock, setInStock] = useState(true);
  const nearestNumberRating = 4;
  const [open, setOpen] = useState(false);

  const [upSellingProductsData, setUpSellingProducts] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // console.log("selectedBranchIdPROV", selectedBranchIdPROV);
  useEffect(() => {
    const checkBranchStock = async () => {
      setLoading(true);
      try {
        const productStock = await getProductBySlugStock(
          slug,
          selectedBranchIdPROV
        );
        // console.log('productStock',productStock)
        setInStock(productStock.availability !== "outofstock");
      } catch (error) {
        console.error("Error fetching extra products:", error);
      } finally {
        setLoading(false);
      }
    };

    checkBranchStock();
  }, [selectedBranchIdPROV]);
  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth < 768);
    }

    // Initial check
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { userInfo, locationInfo } = useUser();
  const { addToCart } = useShoppingCart();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await getUpSellingProducts(product.id);
        // console.log('here', products)
        if (Array.isArray(products)) {
          // @ts-ignore
          setUpSellingProducts(products);
        }
      } catch (error) {
        console.error("Error fetching extra products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [product?.id]);

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
        // console.log("log");
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

  // Update the state of selectedBiscuit when productData changes
  useEffect(() => {
    const initialBiscuit = productData?.attributes?.pa_biscuit?.[0]?.slug;
    setSelectedBiscuit(initialBiscuit || "");
    const initialCream = productData?.attributes?.pa_cream?.[0]?.slug;
    setSelectedCream(initialCream || "");
  }, [productData]);

  const [selectOption, setSelectOption] = useState<Variation | null>(
    productData?.variations?.find(
      (variation: any) =>
        variation.attributes?.attribute_pa_size ===
          productData?.attributes?.pa_size?.[0] &&
        variation.attributes?.attribute_pa_biscuit ===
          productData?.attributes?.pa_biscuit?.[0] &&
        variation.attributes?.attribute_pa_cream ===
          productData?.attributes?.pa_cream?.[0]
    ) ?? null
  );

  // const [selectOption, setSelectOption] = useState<Variation | null>(null);
  useEffect(() => {
    // console.log("heer");
    // console.log("heer", selectOption);
    if (
      (selectOption?.attributes?.attribute_pa_size !== selectedSize &&
        selectedSize) ||
      (selectedBiscuit &&
        (!selectOption?.attributes?.attribute_pa_biscuit ||
          selectOption?.attributes?.attribute_pa_biscuit !==
            selectedBiscuit)) ||
      (selectedCream &&
        (!selectOption?.attributes?.attribute_pa_cream ||
          selectOption?.attributes?.attribute_pa_cream !== selectedCream))
    ) {
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
    } else if (productData.type === "simple") {
      // console.log("simple", productData);
      setProductPrice(productData?.price ?? product.price);
      setSalePrice(productData?.sale_price ?? null);
      setItemID(productData?.id ?? null);
    } else {
      setProductPrice(selectOption?.price ?? product.price);
      setSalePrice(selectOption?.sale_price ?? null);
      setItemID(selectOption?.id ?? null);
    }
  }, [
    selectedSize,
    selectedBiscuit,
    selectOption,
    productData,
    product.price,
    selectedCream,
  ]);
  const router = useRouter();

  const { addToRecent, addToWishlist, wishlistItems } = useProductStore();
  const isWishlist = wishlistItems?.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    addToWishlist(product);
  };

  const productTitle = product
    ? locale === "en"
      ? product?.title || ""
      : product?.ar_title || ""
    : "";

  const productDescription = product
    ? locale === "en"
      ? product?.description || ""
      : product?.ar_description || ""
    : "";
  const paragraphs = productDescription.split("\r\n\r\n");
  const productShortDescription = product
    ? locale === "en"
      ? product?.short_desc || ""
      : product?.short_desc_ar || ""
    : "";
  const productCategory = product
    ? locale === "en"
      ? product?.category_name || ""
      : product?.category_name_ar || `MISSING AR  ${product?.category_name}`
    : "";
  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: productCategory, href: `/category/${product?.category_slug}` },
      { name: productTitle, href: `#` },
    ],
  };

  const { currency } = useCurrency();
  // let itemID: any;
  // let salePrice: null = null;
  // let productPrice = null;
  let size = null;
  let biscuit = null;
  let cartPrice: number | null = null;

  // if (salePrice) {
  //   cartPrice = currency === "AED" ? salePriceUAE : salePrice;
  // }
  // console.log("product>>", product);
  // console.log('selectedSize',selectedSize)

  useEffect(() => {
    // Call handleViewContent when the component mounts
    if (locationInfo && product) {
      handleViewContent(
        [product?.sku],
        product.title,
        product.category_name,
        cartPrice ?? 0,
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

  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log("DATA", productData);
  // console.log("variations", variations);
  // console.log("inStock", inStock);
  return (
    <div className="overflow-hidden bg-white">
      {/* Product Intro */}
      <div className="pb-10 md:pt-14">
        <div className="mx-auto px-4 xl:container">
          <div className="block w-full md:-mx-3 md:mb-2 md:hidden">
            <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="p-4" />
          </div>
          <div className="-xl:mx-4 flex flex-wrap items-start justify-center">
            <div className="w-full md:mb-16 lg:mb-0 lg:w-7/12 lg:max-w-[755px]">
              {isClient ? (
                <Gallery galleryImages={product?.images} thumbView="vertical" />
              ) : (
                ""
              )}
              {/* <Gallery2 galleryImages={product?.images} /> */}

              {!isMobileView && upSellingProductsData.length > 0 && (
                <div ref={ref} className="">
                  <Frequently
                    upSellingProducts={upSellingProductsData}
                    currentProduct={{
                      title: productTitle,
                      ar_title: productTitle,
                      id: product?.id,
                      slug: product?.slug,
                      thumbnail: product?.main_img,
                      price: productPrice,
                      sale_price: salePrice,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="w-full rounded-3xl bg-white px-4 md:px-9 lg:w-5/12">
              <div className="hidden w-full md:-mx-3 md:mb-2 md:block">
                <Breadcrumbs
                  breadcrumbs={breadcrumbs.pages}
                  className="p-4 shadow md:shadow-none"
                />
              </div>
              <div className="relative mb-6">
                {/* <button
                  className={`z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary-300 text-2xl md:h-16 md:w-16`}
                  onClick={handleWishlistClick}
                >
                  <span className="inline-block h-6 w-6">{isWishlist ? <FavoriteHeart /> : <Heart />}</span>
                </button> */}
                <div className="absolute top-9 ltr:right-0 rtl:left-0">
                  <WishlistBtn product={product} />
                </div>
                <span
                  className="text-xs font-semibold text-gray-50 md:text-xl"
                  id={`cat_slug_${product?.category_slug}`}
                >
                  {productCategory}
                </span>

                <h1 className="font-heading max-w-[calc(100%-46px)] text-2xl font-bold capitalize md:mb-4 md:mt-2 md:text-4xl md:font-bold">
                  {productTitle}
                </h1>

                {/* Reviews */}
                {/* <Stars nearestNumberRating={nearestNumberRating} /> */}
                {isClient ? (
                  <div className="has-ul mt-6">
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
                ) : (
                  ""
                )}

                {/* Sizes */}
                {product?.attributes?.pa_size ? (
                  <div className="mt-4">
                    <SelectSize
                      sizes={product?.attributes?.pa_size || []}
                      selectedSize={selectedSize}
                      onSelectedSizeChange={setSelectedSize}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/* Biscuit */}
                {product?.attributes?.pa_biscuit ? (
                  <div className="mt-4">
                    <SelectBiscuit
                      biscuits={product?.attributes?.pa_biscuit || []}
                      selectBiscuit={selectedBiscuit}
                      onselectBiscuitChange={setSelectedBiscuit}
                    />
                  </div>
                ) : (
                  ""
                )}
                {product?.attributes?.pa_cream ? (
                  <div className="mt-4">
                    <SelectCream
                      creams={product?.attributes?.pa_cream || []}
                      selectCream={selectedCream}
                      onselectCreamChange={setSelectedCream}
                    />
                  </div>
                ) : (
                  ""
                )}
                {salePrice && salePrice !== productPrice ? (
                  <div className="flex items-end gap-x-3 pt-2 text-sm md:h-[60px] md:text-xl">
                    <FormatCurrency
                      bigger
                      value={salePrice}
                      className="text-primary-500"
                      // valueUAE={salePriceUAE}
                    />
                    <FormatCurrency
                      value={productPrice}
                      lineThrough
                      className="text-gray-300"
                    />
                  </div>
                ) : (
                  <div className="flex items-end pt-2 text-sm md:h-[60px] md:text-xl">
                    <FormatCurrency
                      value={productPrice}
                      bigger
                      className="text-primary-400"
                      // valueUAE={productPriceUAE}
                    />
                  </div>
                )}
                {productData.discount_end_date && (
                  <div className="flex flex-wrap items-center gap-6 pt-5 lg:flex-nowrap">
                    <span className="max-w-[155px] text-[18px] font-bold text-primary-500">
                      {t("flash_sale_ends")}
                    </span>
                    <Timer deadline={productData.discount_end_date} />
                  </div>
                )}
              </div>

              <div className="">
                <div className="flex gap-x-3">
                  {!inStock ? (
                    <p className="EGP mt-auto rounded-lg bg-transparent py-3 text-xs font-semibold text-primary-500 md:text-base">
                      {t("out_stock")}
                    </p>
                  ) : (
                    <AddToCartSimple
                      className="inline-flex w-full justify-center text-center text-xl font-medium text-white"
                      // @ts-ignore
                      product={{
                        id: itemID ?? product?.id,
                        thumbnail: product?.main_img,
                        slug: product?.slug,
                        price: salePrice ? salePrice : productPrice,
                        quantity: 1,
                        name: product?.title,
                        ar_name: product?.ar_title,
                      }}
                      // disabled={!Boolean(selectedSize.inStock)}
                      disabled={product.availability === "outofstock"}
                      singleProductView={true}
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="w-full">
                  <SelectDelivery singleProduct />
                  {/* <TabsNew product={{ description: productDescription }} /> */}
                </div>
                {/* <div className="w-full">
                  <button
                    className="border-gray-400 ease hover:bg-gray-400 rounded-100 border-2 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:text-white md:mb-9 md:text-xl"
                    onClick={() => setOpen(true)}
                  >
                    {t("nutritional_values")}
                  </button>
                  <>
                    <div
                      className={classNames(
                        open
                          ? "translate-x-0"
                          : // : '-translate-x-full',
                            `${
                              locale === "en"
                                ? "translate-x-full"
                                : "-translate-x-full"
                            } invisible`,
                        "fixed md:w-[600px] w-full bg-primary-300 top-0 ltr:right-0 ltr:left-auto rtl:left-0 rtl:right-auto transform transition ease-in-out duration-500 pt-5 pb-32 h-full z-40"
                      )}
                      style={{ boxShadow: " 0px 20px 66px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div className="flex items-center justify-between border-b border-[#C6C6C6] px-5 pb-5">
                        <button
                          className="border-gray-400 rounded-full border-2 p-3"
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3575 4.92969L15.3575 3.92969L10.1433 9.14385L4.92834 3.92969L3.92834 4.92969L9.14334 10.1439L3.92834 15.358L4.92834 16.358L10.1433 11.1439L15.3575 16.358L16.3575 15.358L11.1425 10.1439L16.3575 4.92969Z"
                              fill="#163300"
                            />
                          </svg>
                        </button>
                        <h4 className="text-[32px] font-semibold">
                          {t("nutritional_values")}
                        </h4>
                      </div>
                      <div className="pt-5">
                        <img src="/images/list.png" alt="" className="m-auto" />
                      </div>
                    </div>
                    <div
                      onClick={() => setOpen(false)}
                      className={classNames(
                        open
                          ? "pointer-events-auto visible opacity-100"
                          : // : '-translate-x-full',
                            "pointer-events-none invisible opacity-0",
                        "fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 transition-all duration-300 ease-linear z-30"
                      )}
                    ></div>
                  </>
                </div> */}
              </div>
            </div>

            {isMobileView && upSellingProductsData.length > 0 && (
              <div ref={ref} className="w-full">
                <Frequently
                  upSellingProducts={upSellingProductsData}
                  currentProduct={{
                    title: productTitle,
                    ar_title: productTitle,
                    id: product?.id,
                    slug: product?.slug,
                    thumbnail: product?.main_img,
                    price: productPrice,
                    sale_price: salePrice,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-10">
        <ReviewsList
          productId={product?.id}
          reviewsCount={product?.aggregateRating?.reviewCount}
        />
      </div>

      <div className="container mx-auto">
        <ExtraProducts
          categorySlug={product?.category_slug}
          count={20}
          title={"similar_products"}
        />
      </div>
      <div className="container mx-auto">
        <UpSellingProducts
          productID={product?.id}
          title={"shop_more"}
          isEmpty={false}
          categorySlug={product?.category_slug}
        />
      </div>
      {/* <RecentlyViewedProducts /> */}

      {/* <ProductSpecifications
    // @ts-ignore
    features={features}
/> */}
    </div>
  );
}
