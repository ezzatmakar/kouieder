"use client"

import { RiMenuFill, RiShoppingBagLine } from "react-icons/ri";
import { useTranslations } from "next-intl";

export default function AccountNavView({ membershipClass = "silver" }: any) {


    const t = useTranslations('account');

    let membershipClasses = 'bg-gradient-to-r from-gray-200 to-white';
    if (membershipClass === 'platinum') {
        membershipClasses = 'bg-gradient-to-r from-black to-[#414141]';
    }
    if (membershipClass === 'gold') {
        membershipClasses = 'bg-gradient-to-b from-primary-600 to-primary-600 text-white';
    }
    if (membershipClass === 'silver') {
        membershipClasses = 'bg-gradient-to-r from-gray-200 to-white';
    }

    return (
        <div className='w-full h-full py-5 space-y-2 text-gray-500 bg-white md:w-72 max-w-full lg:w-96 shadow-custom rounded-[32px]'>
            <div className='divide-y divide-gray-100'>
                {/* Info */}
                
                    <div className="px-8">
                        <div className={`px-3 py-0.5 rounded-lg justify-center items-center gap-2 inline-flex text-gray-50 shadow ${membershipClasses}`}>
                            <div className="flex items-center justify-center gap-1">
                                <div className="md:text-base text-xs whitespace-nowrap font-semibold leading-relaxed">{t(`${membershipClass}`)}</div>
                            </div>
                        </div>

                        <div className="md:py-2 md:mt-2">
                            <h2 className="text-base md:text-3xl font-semibold capitalize whitespace-nowrap">{'مرحبا محمد'}</h2>
                        </div>
                    </div>
                    
                        
                    <ul className="px-4 pt-2 pb-4 space-y-4 text-base">
                        <>
                            <li className="flex items-center p-2 space-x-2 font-semibold bg-primary-300 rounded-md ">
                                <span className="p-2">
                                    <RiMenuFill />
                                </span>
                                <span className="text-base">الرئيسية</span>
                            </li>
                            <li className="flex items-center p-2 space-x-2 font-semibold rounded-md">
                                <span className="p-2">
                                    <RiShoppingBagLine />
                                </span>
                                <span className="text-base">طلباتي</span>
                            </li>
                        </>
                    </ul>
            </div>
        </div >
    );
}
