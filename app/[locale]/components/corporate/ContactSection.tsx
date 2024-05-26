"use client"
import { useTranslations } from 'next-intl';
import contactData from "@/app/api/json-generated/contact-us.json";
import { useLocale } from "next-intl";
import Breadcrumbs from '../Breadcrumbs';
import ContactForm from './ContactForm';
import AboutHeroIcon from '../icons/AboutHeroIcon';
import AboutHeroIconBottom from '../icons/AboutHeroIconBottom';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ContactSection() {
    const t = useTranslations('common');
    const locale = useLocale();
    const breadcrumbs = {
        pages: [
            { name: t('home'), href: '/' },
            { name: t('contact'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-10 md:pb-40">
            <div className="py-4 md:py-16">
                <div className="details container mx-auto px-4 md:px-12">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="text-2xl font-bold text-primary-300 md:text-4xl">{t('contact')}</h1>
                </div>
            </div>
            <div className="w-full bg-white">
                <div className="flex flex-col">
                    <div className='container mx-auto md:px-12'>
                        <div className="relative flex flex-col-reverse flex-wrap-reverse items-center bg-primary-300 px-8 pt-12 md:flex-row md:flex-nowrap md:gap-20 md:rounded-3xl md:pt-0 lg:gap-24">
                            <div className={`absolute  top-4 ${locale === "ar" ? "right-0" : "left-0"}`}>
                                <span className='block h-[140px] w-[80px]'><AboutHeroIcon /></span>
                            </div>
                            <div className="inline-flex w-full shrink grow basis-0 flex-col items-center justify-start rounded-3xl bg-primary-300 md:w-auto">
                                <div className="inline-flex items-center gap-5 self-stretch rounded p-9">
                                    <div className="flex items-center justify-center gap-2.5 rounded-full bg-white p-3">
                                        <div className="flex h-7 w-7 items-center justify-center p-0.5">
                                            <div className="relative flex h-6 w-6 flex-col items-start justify-start">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                     <path fillRule="evenodd" clipRule="evenodd" d="M19.9995 0.000579727V6.00014H24.0006V24H0V6.00072H3.9999V0H19.9995V0.000579727ZM21.9998 8.30028L19.9995 10.1402L17.9999 11.9812L13.6294 16.0002L11.9997 17.5014L10.37 16.0002L6.00072 11.9812L3.9999 10.1402L1.99966 8.30028V22.0009H21.9998V8.30086V8.30028ZM17.9993 2.0014H6.0013V9.26016L11.9997 14.7815L17.9999 9.26016V2.00198L17.9993 2.0014ZM16.0002 8.00039V10.0006H8.00038V8.00039H16.0002ZM16.0002 4.00048V6.00072H8.00038V4.00048H16.0002Z" fill="#5066A2"/>
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex shrink grow basis-0 flex-col justify-start gap-5">
                                        <div className="flex flex-col justify-start gap-1.5 self-stretch">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-white">{locale === "ar" ? "البريد الاكتروني" : "E-Mail"}</h4>
                                            <div className="self-stretch text-base text-white underline">{contactData.email}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[1px] self-stretch bg-[#5167a2]" />
                                <div className="inline-flex items-center gap-5 self-stretch rounded p-9">
                                    <div className="flex items-center justify-center gap-2.5 rounded-full bg-white p-3">
                                        <div className="flex h-7 w-7 items-center justify-center p-0.5">
                                            <div className="relative flex h-6 w-6 flex-col items-start justify-start">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.56967 3.50499C2.48719 16.4444 12.2908 21.6868 20.5041 22.4112C21.6044 22.5082 22.5 21.6046 22.5 20.5V17.8943C22.5 16.9166 21.7932 16.0822 20.8288 15.9215L17.5432 15.3739C16.7327 15.2388 15.9326 15.6221 15.4316 16.2733C14.9654 16.8791 14.4096 17.4741 13.9261 17.6899C13.7062 17.7881 13.4586 17.7333 13.2363 17.6406C9.55782 16.1062 7.0384 12.6083 6.39 10.7063C6.21884 10.2042 6.43571 9.68929 6.81079 9.31421L8.10902 8.01598C8.57308 7.55191 8.77994 6.8897 8.66254 6.244L8.09859 3.14223C7.92568 2.19125 7.09742 1.5 6.13085 1.5H3.5C2.39543 1.5 1.49155 2.40319 1.56967 3.50499Z" fill="#5066A2"/>
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex shrink grow basis-0 flex-col justify-start gap-5">
                                        <div className="flex flex-col justify-start gap-1.5 self-stretch">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-white">{locale === "ar" ? "رقم التليفون" : "Mobile"}</h4>
                                            <div className="self-stretch text-base text-white underline">{contactData.phone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[1px] self-stretch bg-[#5167a2]" />
                                <div className="inline-flex items-center gap-5 self-stretch rounded p-9">
                                    <div className="flex items-center justify-center gap-2.5 rounded-full bg-white p-3">
                                        <div className="flex h-7 w-7 items-center justify-center p-0.5">
                                            <div className="relative flex h-6 w-6 flex-col items-start justify-start">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2236_35814)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.0003 23.6654C12.0003 23.6654 21.3337 16.267 21.3337 9.43772C21.3337 3.74667 17.155 0.332031 12.0003 0.332031C6.84567 0.332031 2.66699 3.74667 2.66699 9.43772C2.66699 16.267 12.0003 23.6654 12.0003 23.6654ZM12.0005 12.8527C13.9335 12.8527 15.5005 11.3239 15.5005 9.43807C15.5005 7.55222 13.9335 6.02344 12.0005 6.02344C10.0675 6.02344 8.50049 7.55222 8.50049 9.43807C8.50049 11.3239 10.0675 12.8527 12.0005 12.8527Z" fill="#5066A2"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_2236_35814">
                                                <rect width="23.3333" height="23.3333" fill="white" transform="translate(0.333496 0.332031)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex shrink grow basis-0 flex-col justify-start gap-5">
                                        <div className="flex flex-col justify-start gap-1.5 self-stretch">
                                            <h4 className="self-stretch text-base font-semibold leading-relaxed text-white"> {locale === "ar" ? "العنوان الرئيسي" : "Address"} </h4>
                                            <div className="self-stretch text-base text-white">{locale === "ar" ? contactData.address_ar : contactData.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative inline-flex shrink grow basis-0 flex-col items-start justify-start">
                                <div className={`absolute  bottom-4 ${locale === "ar" ? "right-[-50px]" : "left-[-50px]"}`}>
                                    <span className='block h-[160px] w-[150px]'><AboutHeroIconBottom /></span>
                                </div>
                                <div className='border-gray-400 relative w-full rounded-3xl border bg-white p-6 shadow md:mb-[-50px] md:mt-[50px] md:p-9'>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
