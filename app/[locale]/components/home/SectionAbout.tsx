import { useLocale } from "next-intl";
import { Link } from "@/navigation";

const SectionAbout = ({ aboutdata }: any) => {
  // const t = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="px-3 py-8 md:px-0 md:py-8">
      <div className="rounded-3xl bg-primary-201 p-4 md:p-10 md:px-[65px]">
        <div className="flex flex-col justify-between gap-y-8 md:flex-row md:gap-x-10">
          <div className="py-5 max-[770px]:max-w-[300px]">
            <h3 className="whitespace-nowrap pb-3 text-xl font-semibold text-white md:text-4xl">
              {locale === "ar"
                ? aboutdata.title_ar_image_about
                : aboutdata.title_image_about}
            </h3>
            <img className="" src={aboutdata.image_about} alt="" />
            <h3 className="whitespace-nowrap pt-3 text-left text-xl font-semibold text-white md:text-4xl">
              {locale === "ar"
                ? aboutdata.sub_title_ar_image_about
                : aboutdata.sub_title_image_about}
            </h3>
          </div>
          <div className="flex max-w-[600px] flex-col justify-center rounded-2xl bg-white p-5">
            <h2 className="text-2xl font-bold">
              {locale === "ar"
                ? aboutdata.title_ar_about
                : aboutdata.title_about}
            </h2>
            <p className="py-5 text-base leading-7">
              {locale === "ar"
                ? aboutdata.description_ar_about
                : aboutdata.description_about}
            </p>
            <Link prefetch={false}
              className="max-w-[100px] rounded-xl bg-primary-300 py-3 text-center text-sm text-white transition-all hover:bg-primary-400"
              href={
                locale === "ar"
                  ? aboutdata.link_ar_about.url
                  : aboutdata.link_about.url
              }
            >
              {locale === "ar"
                ? aboutdata.link_ar_about.title
                : aboutdata.link_about.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAbout;
