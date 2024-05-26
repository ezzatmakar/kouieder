"use client";
import { useLocale } from "next-intl";
import AboutHeroIcon from "../icons/AboutHeroIcon";
import AboutHeroIconBottom from "../icons/AboutHeroIconBottom";
import Image from "next/image";
const About = ({ data }: any) => {
  const locale = useLocale();

  return (
    <>
      <div className="2xl:container mx-auto px-5 py-6  md:py-8">
        <div className="relative rounded-3xl bg-primary-300">
          <div className="flex flex-col items-center gap-y-6 md:flex-row  justify-between">
            <div className="flex w-full items-center justify-between xl:w-[calc(100%-47%-65px)] md:w-[calc(100%-47%-25px)]">
              <div className="hidden lg:block">
                <span className="block h-[150px] w-[100px]">
                  <AboutHeroIcon />
                </span>
              </div>
              <div className="p-7 text-center lg:p-0 md:p-5 md:text-justify xl:w-[calc(100%-100px-43px)] lg:w-[calc(100%-100px-20px)] w-full ">
                <span className="rounded-lg bg-white md:text-xl text-[10px] md:px-[35px] px-5 pt-[1px] pb-1 font-bold text-primary-300 ">
                  {locale === "ar" ? data.tagline_ar_hero : data.tagline_hero}
                </span>
                <h2 className="md:py-6 py-3 text-[32px] font-bold text-[#EF9E52] 2xl:text-7xl xl:text-6xl lg:text-4xl md:leading-[70px]">
                  {locale === "ar" ? data.title_ar_hero : data.title_hero}
                </h2>
                <div
                  className="text-sm font-normal leading-5 text-primary-102 md:max-w-[500px] xl:text-xl md:text-base md:leading-9"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === "ar"
                        ? data.description_ar_hero
                        : data.description_hero,
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-[47%] relative aspect-[980/822]">
              <Image
                className="rounded-b-3xl md:rounded-3xl"
                src={data.image_hero}
                alt=""
                fill
              />
            </div>
          </div>
          <div className="absolute bottom-[-150px] left-[-50px] z-[-1] hidden md:block">
            <AboutHeroIconBottom />
          </div>
        </div>
        <div className="pt-10 md:pt-32">
          <h2
            className={`${locale === "ar" ? "md:max-w-[500px]" : "md:max-w-[600px]"
              } balance md:text-6xl text-[42px] max-w-[230px] font-bold md:leading-[90px] leading-[72px] text-primary-300 text-center m-auto has-span`}

            dangerouslySetInnerHTML={{
              __html:
                locale === "ar"
                  ? data.titla_ar_gallary
                  : data.title_gallary,
            }}
          />
          {data.images_gallary?.length && (
            <>
              <div className=" items-center gap-x-2 py-6 md:gap-x-5 md:py-12 md:flex hidden">
                {/* 1 */}
                <div>
                  <img src={data.images_gallary[0]?.image} alt="" />
                </div>

                {/* 2 */}
                <div className="flex flex-col gap-y-2 md:gap-y-5">
                  <img src={data.images_gallary[1].image} alt="" />
                  <img src={data.images_gallary[2].image} alt="" />
                </div>

                {/* 3 */}
                <div>
                  <img src={data.images_gallary[3].image} alt="" />
                </div>

                {/* 4 */}
                <div className="flex flex-col gap-y-2 md:gap-y-5">
                  <img src={data.images_gallary[4].image} alt="" />
                  <img src={data.images_gallary[5].image} alt="" />
                </div>

                {/* 5 */}
                <div>
                  <img src={data.images_gallary[6].image} alt="" />
                </div>
              </div>
              <div className=" md:hidden flex flex-wrap gap-5 justify-between">
                <div className=" w-full rounded-[14px] overflow-hidden ">
                  <img src={data.images_gallary[3].image} alt="" className="aspect-[696/276] object-cover w-full" />
                </div>
                <div className=" w-[calc(50%-10px)] flex flex-col gap-5">
                  <div>
                    <img src={data.images_gallary[6].image} alt="" />
                  </div>
                  <div>
                    <img src={data.images_gallary[0].image} alt="" />
                  </div>
                  <div>
                    <img src={data.images_gallary[2].image} alt="" />
                  </div>
                </div>
                <div className=" w-[calc(50%-10px)] flex flex-col gap-5">
                  <div>
                    <img src={data.images_gallary[1].image} alt="" />
                  </div>
                  <div>
                    <img src={data.images_gallary[4].image} alt="" />
                  </div>
                  <div>
                    <img src={data.images_gallary[5].image} alt="" />
                  </div>
                </div>

              </div>
            </>

          )}

        </div>
      </div>
      <div className="relative bg-[#faf6f0] p-5 md:py-10">
        <div className="2xl:container  mx-auto">
          <div className="flex flex-col items-center gap-x-12 md:flex-row">
            <div className="w-full md:w-1/2">
              <img className="rounded-3xl" src={data.image_info} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <div className="max-w-[600px]">
                <h2 className="py-4 text-xl font-bold text-[#425486] lg:w-[472px] w-full md:py-8 md:text-5xl md:leading-[70px]">
                  {locale === "ar" ? data.title_ar_info : data.title_info}
                </h2>
                <p
                  className="text-base-50 text-sm font-light leading-9 md:text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === "ar"
                        ? data.description_ar_info
                        : data.description_info,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
