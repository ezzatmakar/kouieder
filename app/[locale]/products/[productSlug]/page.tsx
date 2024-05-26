export const runtime = 'edge';
import { getProductBySlug } from '@/app/api/general';
import React, { ReactNode } from 'react'
// import Single from '../../components/product/Single';
import { Metadata } from 'next';
import dynamic from "next/dynamic";
import { useLocale } from 'next-intl';
import SingleLoader from '../../components/product/SingleLoader';


const Single = dynamic(() => import("../../components/product/Single"), {
    ssr: false,
    loading: () => <SingleLoader />,
});
type Props = {
    params: { productSlug: string };
};

// export const generateMetadata = async ({ query }) => {
export async function generateMetadata({ params: { productSlug } }: Props) {
    // const productSlug = query.productSlug;
    const locale = useLocale();
    const product = await getProductBySlug(productSlug);
    // Access the SEO information
    const seo = product?.seo || {};

    // Determine the appropriate language
    const isArabic = locale === 'ar'; // Assuming 'ar' represents the Arabic locale, adjust as needed

    // Set the title and description based on the language
    const pageTitle = isArabic ? (seo.meta_title_ar || product?.title) : (seo?.meta_title_en || product?.title);
    const pageDescription = isArabic ? (seo.meta_desc_ar || product?.description) : (seo?.meta_desc_en || product?.description);
    const pageKeywords = isArabic ? (seo.focus_keywords_ar || '') : (seo.focus_keywords_en || '');


    // Return metadata with the product title
    return {
        title: `${pageTitle}`,
        description: `${pageDescription}`,
        keywords: pageKeywords,
    };
};

export default async function Product({
    params,
}: {
    params: { productSlug: string; };
}) {
    const productSlug = params.productSlug
    const product = await getProductBySlug(productSlug);

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const formattedDate = `${oneYearFromNow.getFullYear()}-${(oneYearFromNow.getMonth() + 1).toString().padStart(2, '0')}-${oneYearFromNow.getDate().toString().padStart(2, '0')}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product?.title,
        image: product?.main_img,
        description: product?.description,
        sku: product?.sku,
        mpn: product?.sku + product?.id,
        review: {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": 4.5,
                "bestRating": 5
            }
        },
        brand: {
            '@type': 'Brand',
            name: product?.category_name,
        },
        offers: {
            "@type": "Offer",
            "url": '',
            "priceCurrency": "EGP",
            "price": product?.price,
            priceValidUntil: formattedDate,
            "availability": "http://schema.org/InStock",
            "itemCondition": "NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "woosonicpwa"
            }
        }

    }
    // Check if window is defined (only in the browser)
    if (typeof window !== 'undefined') {
        jsonLd.offers.url = window.location.href;
    }

    return (
        <div className="single-product">
            {/* Add the JSON-LD script tag with the structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Single productData={product} slug={params.productSlug} />
        </div>
    )
}
