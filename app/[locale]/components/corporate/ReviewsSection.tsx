"use client"
import { useLocale, useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";
import ReviewWidget from "./ReviewWidget";


const data = {
    description_ar: "لوريم ايبسوم لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .",
    description: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
}
export default function ReviewsSection() {
    const t = useTranslations();
    const locale = useLocale();
    const breadcrumbs = {
        pages: [
            { name: t('common.home'), href: '/' },
            { name: t('corporate.reviews'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('corporate.reviews')}</h1>
                    <p className="max-w-2xl mt-4 text-sm font-semibold text-gray-50 md:text-base">{locale === "ar" ? (data.description_ar || data.description) : data.description}</p>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="container px-4 mx-auto details md:px-24">
                    <div className="flex flex-col">
                        <div className="grid md:grid-cols-2 md:gap-24 gap-6">
                            <ReviewWidget />
                            <ReviewWidget />
                            <ReviewWidget />
                            <ReviewWidget />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
