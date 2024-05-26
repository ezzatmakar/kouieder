"use client";
import { useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";
import { Link } from "@/navigation";
import AccountNavView from "../account/AccountNavView";
import Image from "next/image";

export default function RewardsSection() {
  const t = useTranslations("common");

  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: t("reward"), href: "#" },
    ],
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="pt-4 pb-12 bg-primary-300 md:pb-16">
        <div className="container px-4 mx-auto details md:px-24">
          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 " />
        </div>
        <div className="flex flex-col mb-6 bg-primary-200 md:mb-16 md:flex-row">
          <div className="w-full md:px-0 p-4 md:py-16 md:w-1/2">
            <img
              src="/images/reward.webp"
              alt="image alt"
              className="object-cover m-auto rounded-3xl"
            />
          </div>
          <div className="flex flex-col justify-center w-full px-4 py-6 md:w-1/2 md:p-12">
            <div className="flex flex-col justify-center w-full">
              <span className="font-semibold text-gray-50 md:text-xl">
                {t("reward")}
              </span>
              <h1 className="py-3 text-white md:py-6 md:text-5xl">
                كل ما تشتري أكثر من أبوعوف هتكسب نقط و فلوس
              </h1>
              <p className=" text-[#3C926F] md:text-xl leading-relaxed mb-5">
                تأسست شركة woosonic في عام 2010 وأصبحت من أشهر الأسماء في الأسواق
                لتقديم منتجات القهوة الطبيعية عالية الجودة والمكسرات وزبد
                المكسرات والأطعمة الصحية والفاكهة المجففة.. وأكثر فلكل مُنتَج
                حكايته الخاصة؛ وبسبب اهتمامنا المستمر بالتفاصيل، فإن كل خطوة في
                عملية الإنتاج في woosonic تُدار بعناية لضمان إنتاج منتجات عالية
                الجودة يتم توصيلها بحب وملئها بالمكونات المغذية من الطبيعة الأم
                نعطي الأولوية لابتكار المنتجات ونأخذ في الاعتبار اتجاهات السوق
                ورغبات العملاء وتغيُّر الأذواق، كما نشجع دائمًا نمط الحياة
                الصحي؛ لأن هدفنا ليس فقط تغذية الجسم، بل تغذية العقل والروح
                أيضًا، وذلك من خلال مجموعة متنوعة من الأعشاب والمنتجات العضوية
                المختلفة. نأمل في حكي قصة التغيير الذي يمكنك إحداثه في العالم
                عندما تقوم بتغيير عادات الأكل الخاصة بك إلى عادات صحية وممتعة
                ولذيذة.
              </p>
              <Link prefetch={false}
                className="block px-10 md:py-4 py-2 text-base md:text-xl font-medium text-gray-200 bg-white cursor-pointer rounded-100 w-fit hover:text-primary-100 "
                href="/signup"
              >
                {t("create_account")}
              </Link>
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-wrap items-center gap-20 xl:flex-nowrap">
            <div className="flex md:hidden justify-center w-full">
              <Image
                alt="accountnav"
                src="/images/account_nav_mob.webp"
                width={375}
                height={268}
              />
            </div>
            <div className="inline-flex flex-col w-full gap-6 xl:w-1/2">
              <h2 className=" text-black md:text-5xl text-2xl font-bold md:leading-[4rem]">
                لوريم سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود{" "}
              </h2>
              <p className="text-base md:text-xl leading-relaxed text-gray-50">
                تأسست شركة woosonic في عام 2010 وأصبحت من أشهر الأسماء في الأسواق
                لتقديم منتجات القهوة الطبيعية عالية الجودة والمكسرات وزبد
                المكسرات والأطعمة الصحية والفاكهة المجففة.. وأكثر فلكل مُنتَج
                حكايته الخاصة؛ وبسبب اهتمامنا المستمر بالتفاصيل، فإن كل خطوة في
                عملية الإنتاج في woosonic تُدار بعناية لضمان إنتاج منتجات عالية
                الجودة يتم توصيلها بحب وملئها بالمكونات المغذية من الطبيعة الأم
                نعطي الأولوية لابتكار المنتجات ونأخذ في الاعتبار اتجاهات السوق
                ورغبات العملاء وتغيُّر الأذواق، كما نشجع دائمًا نمط الحياة
                الصحي؛ لأن هدفنا ليس فقط تغذية الجسم، بل تغذية العقل والروح
                أيضًا، وذلك من خلال مجموعة متنوعة من الأعشاب والمنتجات العضوية
                المختلفة. نأمل في حكي قصة التغيير الذي يمكنك إحداثه في العالم
                عندما تقوم بتغيير عادات الأكل الخاصة بك إلى عادات صحية وممتعة
                ولذيذة.
              </p>
              <Link prefetch={false}
                className="block px-10 md:py-4 py-2 text-base md:text-xl font-medium text-white bg-gray-200 cursor-pointer rounded-100 w-fit hover:bg-primary-100"
                href="/signup"
              >
                {t("create_account")}
              </Link>
            </div>
            <div className="hidden md:inline-flex w-full xl:w-1/2">
              {/* <div className="flex flex-row-reverse items-start justify-center w-full pointer-events-none custom-negative-margin h-[600px]">
                <div className="first md:ml-[50%] md:relative absolute">
                  <AccountNavView membershipClass="platinum" />
                </div>
                <div className="second">
                  <AccountNavView membershipClass="gold" />
                </div>
                <div className="third md:relative absolute">
                  <AccountNavView membershipClass="silver" />
                </div>
              </div> */}
              <Image
                alt="accountnav"
                src="/images/account_nav_desktop.webp"
                width={787}
                height={411}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
