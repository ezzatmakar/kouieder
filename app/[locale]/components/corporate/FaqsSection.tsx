"use client"
import { Tab } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";

interface TabsProps {
    product: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const first = [
    {
        title: "هل woosonic متاح على الإنترنت فقط؟",
        description: "لا ، يمكنك التعرف على جميع فروعنا في مختلف المحافظات من خلال صفحة الفروع.",
    },
    {
        title: "متى ستصل منتجات woosonic عند الطلب؟",
        description: "عند طلب منتجات woosonic في القاهرة والجيزة يمكنك استلامها في نفس اليوم أو في اليوم التالي بينما تختلف مدة الشحن بالنسبة للمحافظات الأخرى ، لكننا نضمن أسرع شحن ممكن لجميع العملاء.",
    },
    {
        title: "هل الدفع ببطاقة الائتمان آمن؟",
        description: "يتم تأمين الدفع من خلال Visa و MasterCard في woosonic وفقًا لأعلى معايير الحماية المتاحة لضمان تشفير بياناتك وتأمينها بأفضل طريقة ممكنة.",
    },
    {
        title: "كيف يمكنني دفع ثمن منتجات woosonic؟",
        description: "يدعم موقع woosonic مدفوعات بطاقات الائتمان فيزا وماستركارد من البنوك المختلفة.",
    }
];
const second = [
    {
        title: "هل يمكنني الشراء بالرغم من عدم وجود فرع في محافظتي؟",
        description: "يمكنك الطلب من موقع woosonic على الإنترنت من أي محافظة في مصر والدفع ببطاقة الائتمان أو نقدًا عند الاستلام.",
    },
    {
        title: "هل يوجد woosonic في محافظتي أو منطقتي؟",
        description: "يمكنك التعرف على جميع فروع woosonic بالمحافظات المختلفة من خلال صفحة الفروع.",
    },
    {
        title: "ما هو خط woosonic الساخن؟",
        description: 'اتصل بنا على 00000 او 000000000000 او ارسل لنا رسالة عن طريق صفحة "اتصل بنا"',
    },
];
const third = [
    {
        title: "هل تحتوي منتجات woosonic على إضافات ضارة؟",
        description: "لا نستخدم مواد ضارة في تصنيع منتجاتنا لأننا نهتم بصحتك ، ولكن بعض منتجاتنا قد تحتوي على مواد حافظة أو منكهات مصرح باستخدامها.",
    },
    {
        title: "ما الذي يميز منتجات woosonic؟",
        description: "في woosonic ، نضمن أن منتجاتنا هي الأفضل والأعلى جودة.",
    }
];
export default function FaqsSection() {
    const t = useTranslations();
    const locale = useLocale();
    const breadcrumbs = {
        pages: [
            { name: t('common.home'), href: '/' },
            { name: t('faq.faqs_name'), href: '#' },
        ]
    }

    return (

        <section className="w-full pb-24 ">
            <div className="pt-4 pb-5 md:pb-16">
                <div className="container px-4 mx-auto details md:px-24">
                    {/* <span className="hidden w-2/3 line-clamp-3 line-clamp-5"></span> */}
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4" />
                    <h1 className="pt-2 text-2xl font-bold text-black md:text-4xl md:pt-7">{t('faq.faqs_name')}</h1>
                </div>
            </div>
            <div className="w-full bg-white ">
                <div className="">
                    <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
                        <Tab.List className="flex flex-wrap mb-12 space-x-1 border-b border-gray-200">
                            <div className="container px-4 mx-auto md:px-24">
                                <div className="flex gap-x-5 pb-2">
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'md:py-1 md:px-2 py-2.5 md:text-base text-sm font-medium leading-5  focus:outline-none  rounded-md transition-colors duration-300',
                                                selected
                                                    ? 'bg-primary-201 text-black'
                                                    : 'bg-gray-100 text-[#C6C6C6]'
                                            )
                                        }
                                    >
                                        {locale === "ar" ?
                                            ' الشراء عبر الانترنت  ' : '  Benefits '
                                        }
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                            'md:py-1 md:px-2 py-2.5 md:text-base text-sm font-medium leading-5  focus:outline-none  rounded-md transition-colors duration-300',
                                                selected
                                                ? 'bg-primary-201 text-black'
                                                : 'bg-gray-100 text-[#C6C6C6]'
                                            )
                                        }
                                    >
                                        {locale === "ar" ?
                                            '  الفروع والاتصال  ' : ' Preservation Method '
                                        }
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                            'md:py-1 md:px-2 py-2.5 md:text-base text-sm font-medium leading-5  focus:outline-none  rounded-md transition-colors duration-300',
                                                selected
                                                ? 'bg-primary-201 text-black'
                                                : 'bg-gray-100 text-[#C6C6C6]'
                                            )
                                        }
                                    >
                                        {locale === "ar" ?
                                            '   المنتجات والجودة  ' : ' Preservation Method '
                                        }
                                    </Tab>
                                </div>
                            </div>

                        </Tab.List>
                        <div className="container px-4 mx-auto md:px-24">
                            <Tab.Panels>
                                <Tab.Panel>
                                    <ul>
                                        {first.map((item, index) => (
                                            <li className="mb-10" key={index} >
                                                <h4 className="font-bold md:text-2xl md:pb-6">{item.title} </h4>
                                                <p className="text-sm font-semibold text-gray-50 md:text-xl">{item.description}</p>
                                            </li>
                                        ))}


                                    </ul>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <ul>
                                        {second.map((item, index) => (
                                            <li className="mb-10" key={index} >
                                                <h4 className="font-bold md:text-2xl md:pb-6">{item.title} </h4>
                                                <p className="text-sm font-semibold text-gray-50 md:text-xl">{item.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <ul>
                                        {third.map((item, index) => (
                                            <li className="mb-10 " key={index}>
                                                <h4 className="pb-2 text-base font-bold md:text-2xl md:pb-6">{item.title} </h4>
                                                <p className="text-sm font-semibold text-gray-50 md:text-xl">{item.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </Tab.Panel>
                            </Tab.Panels>
                        </div>

                    </Tab.Group>
                </div>
            </div>
        </section>
    )
}
