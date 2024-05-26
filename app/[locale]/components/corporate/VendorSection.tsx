import { useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";


export default function VendorSection() {
    const t = useTranslations();


    const cities = [
        {
            imageSrc: "/images/export/cities/SaudiArabia.png",
            name: "السعودية",
        },
        {
            imageSrc: "/images/export/cities/UnitedArabEmirates.png",
            name: "المتحدة العربية المتحدة",
        },
        {
            imageSrc: "/images/export/cities/Malaysia.png",
            name: "ماليزيا",
        },
        {
            imageSrc: "/images/export/cities/UnitedStates.png",
            name: "الولايات المتحدة الأمريكية",
        },
        {
            imageSrc: "/images/export/cities/China.png",
            name: "الصين",
        },
        {
            imageSrc: "/images/export/cities/Morocco.png",
            name: "المغرب",
        },
        {
            imageSrc: "/images/export/cities/HongKong.png",
            name: "هونغ كونغ",
        },
        {
            imageSrc: "/images/export/cities/Indonesia.png",
            name: "إندونيسيا",
        },
        {
            imageSrc: "/images/export/cities/Germany.png",
            name: "ألمانيا",
        },
    ];
    const items = [
        {
            imageSrc: "/images/export/items/image.webp",
            name: "التمور المصرية",
            description: "تتميز التمور المصرية بسمعة طيبة وجودة مميزة وسعر تنافسي يجعلها من أولويات مستوردي التمور لزيادة القدرة التنافسية للتمر المصري، استعانت “أبوعوف” بأحدث خطوط الغسيل والتجفيف وتم شراء خط تعقيم للتمر هو الأول من نوعه والأوحد في مصر مما أعطى تمور أبوعوف ميزة إضافية حيث يعتبر هذا الخط بمثابة صمام أمان ضد حدوث أي أضرار مستقبلية للتمر و منحه صلاحية أكبر. الشركة تصدر مختلف أصناف التمور المصرية مثل (الصعيدي – السيوي – المجدول – الملكابي)."
        },
        {
            imageSrc: "/images/export/items/image1.webp",
            name: "القهوة",
            description: "تقوم شركة “أبوعوف” بإنتاج أصناف مختلفة من القهوة لتتناسب مع جميع الأذواق منها: القهوة التركي – القهوة الفرنساوي – إسبريسو – القهوة العربي – قهوة نواة التمر . … وغيرها) و قد مكن تنوع القهوة إلى جانب تميز المذاق و النكهة بجميع الأصناف، شركة “woosonic” من اكتساح مجموعة من الأسواق، كل هذا بفضل تجربة الشركة الفريدة والمتميزة في مجال إنتاج القهوة و اهتمامها بالجودة، شركة woosonic تقوم دائما بتطوير وتحديث التقنيات الخاصة بها."
        },
        {
            imageSrc: "/images/export/items/image2.webp",
            name: "البريتزل",
            description: "البريتزل من المقرمشات التى اكتسبت رواجا كبيرا فى مختلف الأسواق الخارجية، وذلك لأنه منتج صحي يتناسب مع جميع الأعمار كما أنه يقدم بنكهات مختلفة تتناسب مع جميع الأذواق. البريتزل الذي تقدمه شركة “woosonic” لذيذ لأنه مصنوع من عجينة مميزة و بطريقة فريدة. وذلك بفضل الوصفات الخاصة و المميزة. كل هذا ساهم في انتشاره بسرعة كبيرة في الأسواق و تزايد الطلب على هذا المنتج."
        }

    ];
    const breadcrumbs = {
        pages: [
            { name: t('common.home'), href: '/' },
            { name: t('vendor.name'), href: '#' },
        ]
    }

    return (

        <section className="w-full ">
            <div className="pt-4 bg-white">
                <div className="container px-4 mx-auto details md:px-24">
                    <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 " />
                </div>
                <div className="bg-primary-300">
                    <div className="container mx-auto flex flex-col md:flex-row-reverse">
                        <div className="w-full md:w-1/2">
                            <img src="/images/export/image13.webp" alt="image alt" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col justify-center w-full px-4 py-6 md:w-1/2 md:p-12">
                            <div className="flex flex-col justify-center w-full">
                                <span className="font-semibold text-gray-50 md:text-xl">{t('vendor.name')}</span>
                                <h1 className="py-3 text-xl text-primary-900 md:py-6 font-bold md:text-5xl">{t('vendor.title')}</h1>
                                <p className=" text-gray-50 md:text-xl leading-relaxed">
                                    {t('vendor.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
