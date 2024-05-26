export const runtime = "edge";
import { useLocale } from "next-intl";
// import homeData from "@/app/api/json-generated/home.json";
import { fetchHomeData } from "../api/general";
import HomePage from "./components/MainLayout/HomePage";
// import { fetchHomeData } from "../api/general";

// export const generateMetadata = async ({ query }) => {
  export async function generateMetadata() {
    // const productSlug = query.productSlug;
    const locale = useLocale();
    const HomepageData = await fetchHomeData();
    // Access the SEO information
    const seo = HomepageData?.seo || {};

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
export default async function page() {
  const locale = useLocale();
  const data = await fetchHomeData();
  // console.log("data", data);

  return (
    <div className="overflow-hidden">
      <HomePage data={data} />
    </div>
  );
}
