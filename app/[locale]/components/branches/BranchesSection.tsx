import { useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";
import LocationTabs from "./filtersection";


export default function BranchesSection() {
    const t = useTranslations('common');
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('branches'), href: '#' },
        ]
    }
    return (

        <section className="w-full ">
            <div className="pt-4 pb-5">
                <div className="max-w-screen-2xl px-4 mx-auto details lg:px-24">
                    {/* <span className="hidden w-2/3 line-clamp-3 line-clamp-5"></span> */}
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black  md:text-4xl md:pt-7">{t('branches')}</h1>
                </div>
            </div>
           <LocationTabs />

        </section>
    )
}
