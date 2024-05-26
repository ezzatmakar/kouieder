export const runtime = 'edge';

import { useLocale } from "next-intl";
import BranchesSection from "../components/branches/BranchesSection";
import { fetchBranchesData } from "@/app/api/general";

export async function generateMetadata() {
    // const productSlug = query.productSlug;
    const locale = useLocale();
    const BranchesData = await fetchBranchesData();
    // Access the SEO information
    const seo = BranchesData?.seo || {};

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
export default function Branches() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <BranchesSection />
        </div>
    );
}