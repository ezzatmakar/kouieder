"use client"
export const runtime = 'edge';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from "@/navigation"
import React from 'react'

export default function page() {
    const locale = useLocale();
    const t = useTranslations('common');
    return (
        <div>


            <div className="bg-white">
                <div className="container py-6 mx-auto md:py-20">
                    <h2 className={`px-10 py-3 text-xl font-bold text-center md:text-4xl md:py-7 ${locale === 'ar' ? 'md:text-right' : 'md:text-left'}`}>{t('shop_our_products.title')}</h2>
                    <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
                        <Link prefetch={false} href={`/category/coffee`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_01.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.coffee')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                        <Link prefetch={false} href={`/category/nuts`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_02.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.nuts')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                        <Link prefetch={false} href={`/category/dates-and-dried-fruits`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_03.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.dates-and-dried-fruits')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                        <Link prefetch={false} href={`/category/healthy-food`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_04.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.healthy-food')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                        <Link prefetch={false} href={`/category/drinks`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_05.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.drinks')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                        <Link prefetch={false} href={`/category/oils`} className="flex flex-col items-center justify-center">
                            <img src="/images/cats/item_06.webp" alt="img alt" />
                            <h4 className="text-3xl font-bold -mt-9">{t('shop_our_products.oil')}</h4>
                            <p className="text-xl font-semibold">{t('shop_our_products.subtitle')}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
