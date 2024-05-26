import { useTranslations } from "next-intl";
import Image from 'next/image'



export default function BottomFooter() {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();
    return (

        <div className="bg-black">
            <div className="container m-auto flex flex-wrap items-center justify-between px-4 py-6 md:flex-row md:py-4">
                <div className="images order-2 mb-4 flex w-full translate-x-24 items-center justify-center gap-x-2 md:mb-0 md:w-auto">
                    <Image src="/images/footer/COD.webp" alt="" className="h-4 w-auto md:h-6" width={61} height={24}/>
                    <Image src="/images/footer/visa.webp" alt="" className="h-4 w-auto md:h-6" width={35} height={24}/>
                    <Image src="/images/footer/master.webp" alt="" className="h-4 w-auto md:h-6" width={35} height={24}/>
                    <Image src="/images/footer/etisalat.webp" alt="" className="h-4 w-auto md:h-6" width={35} height={24}/>
                </div>
                <p className="sm:text-sx order-2 text-[11px] font-medium text-gray-50 md:order-1 md:text-base">{t('copy_right')}, <span>{currentYear}</span></p>
                <a href="https://www.mitchdesigns.com/" className="md:order-0 order-2 flex items-center gap-x-2 text-left opacity-40" target="_blank" title="Mitch Designs | Web Design - Development Company Egypt | Web Agency Cairo">
                    <div className="text">
                        <p className="text-[10px] font-normal text-gray-300">Web Design by</p>
                        <p className="text-sm font-medium text-gray-300">MITCH DESIGNS</p>
                    </div>
                    <Image src="/images/footer/Logomark.webp" alt="" className="h-7 w-7" width={28} height={28}/>
                </a>
            </div>
        </div>

    )
}
