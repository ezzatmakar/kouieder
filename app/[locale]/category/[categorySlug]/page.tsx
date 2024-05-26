export const runtime = "edge";
import { fetchFilterProducts, getCategoryInfo, getCategoryProducts } from "@/app/api/general";
import ProductList from "../../components/ProductList";
import { useLocale } from "next-intl";
// import React from "react";
// import { useSharedState } from "@/app/SharedStateContext";


// export const generateMetadata = async ({ query }) => {
export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}) {
  // const productSlug = query.productSlug;
  const locale = useLocale();
  const categorySlug = params.categorySlug;
  const categoryInfo = await getCategoryInfo(categorySlug);    // Access the SEO information
  const seo = categoryInfo?.seo || {};

  // Determine the appropriate language
  const isArabic = locale === 'ar'; // Assuming 'ar' represents the Arabic locale, adjust as needed

  // Set the title and description based on the language
  const pageTitle = isArabic ? (seo.arabic_title || "موقع Abdel Rahim Koueider الرسمي") : (seo?.english_title || "Shop Now from Abdel Rahim Koueider");
  const pageDescription = isArabic ? (seo.arabic_desc || "") : (seo?.english_desc || "");
  const pageKeywords = isArabic ? (seo.arabic_focus_keys || '') : (seo.english_focus_keys || '');


  // Return metadata with the product title
  return {
    title: `${pageTitle}`,
    description: `${pageDescription}`,
    keywords: pageKeywords,
  };
};

export default async function Category({
  params,
}: {
  params: { categorySlug: string };
}) {
  const categorySlug = params.categorySlug;
  const categoryInfo = await getCategoryInfo(categorySlug);
  // const productsFirst = await getCategoryProducts(categorySlug);
  const filterData = {
    selectedCategories: categorySlug,
    minPrice: 0,
    maxPrice: 100000000,
    pageNumber: 1,
    products_per_page: 20,
    criteria: "date",
    arrangement: "DESC",
  };
  const productsFirst = await fetchFilterProducts(filterData);

  return (
    <div className="single-catgeory mt-2">
      <ProductList
        products={productsFirst}
        categorySlug={categorySlug}
        categoryInfo={categoryInfo}
      />
    </div>
  );
}
