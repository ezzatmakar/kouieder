"use client"
import { useTranslations } from 'next-intl';
import Breadcrumbs from '../Breadcrumbs';
import OpinionForm from './OpinionForm';

export default function OpinionSection() {
    const t = useTranslations('common');
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('opinion'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-12">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('opinion')}</h1>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="flex flex-col">
                    <div className='container px-4 mx-auto md:px-12'>
                        <div className="flex flex-col flex-wrap-reverse items-start gap-20 lg:gap-24 md:flex-nowrap md:flex-row">
                            <div className="inline-flex flex-col items-start justify-start max-w-lg mx-auto p-6 border border-gray-400 shadow grow shrink basis-0 md:p-9 rounded-3xl md:w-auto">
                                <OpinionForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
