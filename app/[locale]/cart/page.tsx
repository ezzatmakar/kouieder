export const runtime = 'edge';
import React from 'react'
import CartPage from '../components/cart/CartPage'
import ExtraProducts from '../components/ExtraProducts'
import { useLocale } from 'next-intl';
import { fetchCartPage } from '@/app/api/general';


export async function generateMetadata() {
  // const productSlug = query.productSlug;
  const locale = useLocale();
  const CarttData = await fetchCartPage();
  // Access the SEO information
  const seo = CarttData?.seo || {};

  // Determine the appropriate language
  const isArabic = locale === 'ar'; // Assuming 'ar' represents the Arabic locale, adjust as needed

  // Set the title and description based on the language
  const pageTitle = isArabic ? (seo.meta_title_ar || "موقع Abdel Rahim Koueider الرسمي") : (seo?.meta_title_en || "Shop Now from Abdel Rahim Koueider");
  const pageDescription = isArabic ? (seo.meta_desc_ar || "") : (seo?.meta_desc_en || "");
  const pageKeywords = isArabic ? (seo.focus_keywords_ar || '') : (seo.focus_keywords_en || '');


  // Return metadata with the product title
  return {
      title: `${pageTitle}`,
      description: `${pageDescription}`,
      keywords: pageKeywords,
  };
};
export default function page() {
  return (
    <div className="p-4 overflow-hidden bg-white">
      <div className="w-full mx-auto container max-w-screen-xl">
        <CartPage />
        <div className="relative mt-8">
          <ExtraProducts count={20} title="shop_more" slidesShow={4}/>
        </div>
      </div>
    </div >
  )
}
