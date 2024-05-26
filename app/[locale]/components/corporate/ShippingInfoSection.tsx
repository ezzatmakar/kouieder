"use client"
import { useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";


export default function ShippingInfoSection() {
    const t = useTranslations();
    const breadcrumbs = {
        pages: [
            { name: t('common.home'), href: '/' },
            { name: t('corporate.shipping_info'), href: '#' },
        ],
    };
    return (
        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-24'>
                        <div className="inline-flex flex-col items-center justify-start gap-6 w-full">
                            <h1 className="self-stretch text-5xl font-bold leading-10 text-center text-black">
                                {t('corporate.shipping_info')}
                            </h1>
                            <p className="text-xl font-semibold leading-9 text-center text-gray-50">
                                {t('corporate.shipping_info_desc_1')}
                            </p>
                            <p className="text-xl font-semibold leading-9 text-center text-gray-50">
                                {t('corporate.shipping_info_desc_2')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
