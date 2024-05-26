"use client";
import { useLocale, useTranslations } from "next-intl";
// import { Link } from "@/navigation";
import { getAllReviews, getReviewOfProduct } from "@/app/api/general";
import Cookies from "js-cookie";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import ProductReview from "./icons/ProductReview";
import RoundedCheck from "./icons/RoundedCheck";
import ProductReviewForm from "./product/ProductReviewForm";

interface ReviewsProps {
  inHome?: boolean;
  productId?: number;
}

export default function Reviews({ inHome, productId }: ReviewsProps) {
  const locale = useLocale();
  const [showTargetSection, setShowTargetSection] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations();
  const user_id = Cookies.get("user_id");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Your logic to set showTargetSection here
    }
  }, []);

  const handleScroll = () => {
    setShowTargetSection(true);
    // e.preventDefault();
    // const href = e.currentTarget.href;
    // const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById("targetSection");
    if (elem) {
      const targetScrollPosition = elem.offsetTop - 30; // Subtract 30 pixels
      setTimeout(() => {
        elem?.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }, 500);
    }
  };

  const [reviewData, setReviewData] = useState<any>([]);
  useEffect(() => {
    if (inHome) {
      const fetchData = async () => {
        // @ts-ignore
        const result = await getAllReviews(4);
        setReviewData(result);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        // @ts-ignore
        const result = await getReviewOfProduct(productId);
        setReviewData(result);
      };
      fetchData();
    }
  }, [productId]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log('reviewData>>',reviewData)
  return (
    <>
      {isClient ? (
        <div className="mx-auto">
          {inHome ? (
            <div className="rounded-[32px] bg-primary-300 px-20 md:mx-[-65px] md:px-[65px]">
              <div className="flex flex-col items-center justify-between md:py-10">
                {inHome ? (
                  <>
                    <svg
                      className="mb-2"
                      width="36"
                      height="32"
                      viewBox="0 0 36 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.67 14.198V22.6733V25.3008H24.8515H6.32905V22.6733H24.8515V14.198H11.1912V17.3561H20.17V20.3763H11.1912H6.32905V17.3561V14.198V11.4886H11.1912H24.8515H29.67V14.198ZM6.32905 9.69015H11.2033V6.69271H6.32905V9.69015ZM12.1755 9.69015H17.0467V6.69271H12.1755V9.69015ZM0.298462 32H35.7015V0H0.298462V32Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                    </svg>

                    <h2 className="py-3 text-xl font-bold text-gray-200 sm:text-4xl md:py-0">
                      {t("common.customer_reviews")}
                    </h2>
                    <p className="text-base font-light text-gray-200">
                      {" "}
                      {t("common.customer_reviews_subtitle")}
                    </p>
                  </>
                ) : reviewData.length > 0 ? (
                  <>
                    <svg
                      className="mb-2"
                      width="36"
                      height="32"
                      viewBox="0 0 36 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.67 14.198V22.6733V25.3008H24.8515H6.32905V22.6733H24.8515V14.198H11.1912V17.3561H20.17V20.3763H11.1912H6.32905V17.3561V14.198V11.4886H11.1912H24.8515H29.67V14.198ZM6.32905 9.69015H11.2033V6.69271H6.32905V9.69015ZM12.1755 9.69015H17.0467V6.69271H12.1755V9.69015ZM0.298462 32H35.7015V0H0.298462V32Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-200 sm:text-2xl">
                      {t("common.customer_reviews")}
                    </h2>
                    <p className="text-base font-light text-gray-200">
                      {t("common.customer_reviews_subtitle")}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 p-4 text-center">
                    {t("common.no_reviews_yet")}
                  </p>
                )}
                {/* {user_id && (
                        <div className="hidden gap-4 md:flex">
                          {inHome ? (
                            <>
                              <Link prefetch={false}
                                href="/reviews"
                                className={`${BORDER_ClASSES} ${BORDER_BTN}`}
                              >
                                {t("common.load_more")}
                              </Link>
                            </>
                          ) : (
                            <button
                              onClick={handleScroll}
                              className={`${BORDER_ClASSES} ${BORDER_BTN}`}
                            >
                              {t("common.add_opinion")}{" "}
                              <PlusIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      )} */}
              </div>

              <div className="no-scrollbar flex items-start gap-x-3 overflow-y-scroll pb-8 md:pb-10">
                {/* {reviewData} */}
                {inHome
                  ? reviewData?.map((item: any, index: any) => (
                      <blockquote
                        key={index}
                        className="min-w-[350px] max-w-[350px] rounded-lg bg-white p-5"
                      >
                        {/* <div className="flex items-center gap-2">
                          <Stars nearestNumberRating={item.meta_value} />
                        </div> */}

                        <p className="no-scrollbar mt-2 h-[200px] overflow-y-scroll leading-7 text-gray-700">
                          {item.comment_content}
                        </p>

                        <footer className="mt-4">
                          <p className="text-xs">
                            {item.comment_author?item.comment_author+' - ':""}{item.comment_date}
                          </p>
                        </footer>
                      </blockquote>
                    ))
                  : reviewData?.map((item: any, index: any) => (
                      <blockquote
                        key={index}
                        className="min-w-[350px] max-w-[350px] rounded-lg bg-white p-5"
                      >
                        {/* <div className="flex items-center gap-2">
                          <Stars nearestNumberRating={item.rating} />
                        </div> */}

                        <p className="no-scrollbar mt-2 h-[200px] overflow-y-scroll leading-7 text-gray-700">
                          {item.content}
                        </p>

                        <footer className="mt-4">
                          <p className="text-xs">
                            {item.authour?item.authour+' - ':""}{item.date}
                          </p>
                        </footer>
                      </blockquote>
                    ))}
              </div>
            </div>
          ) : (
            // <div className="f"></div>
            <div>
              {reviewData.length > 0 ? (
                <div className="rounded-[32px] bg-primary-300 px-20">
                  <>
                    <div className="flex flex-col items-center justify-between md:py-10">
                      <svg
                        className="mb-2"
                        width="36"
                        height="32"
                        viewBox="0 0 36 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M29.67 14.198V22.6733V25.3008H24.8515H6.32905V22.6733H24.8515V14.198H11.1912V17.3561H20.17V20.3763H11.1912H6.32905V17.3561V14.198V11.4886H11.1912H24.8515H29.67V14.198ZM6.32905 9.69015H11.2033V6.69271H6.32905V9.69015ZM12.1755 9.69015H17.0467V6.69271H12.1755V9.69015ZM0.298462 32H35.7015V0H0.298462V32Z"
                          fill="white"
                          fillOpacity="0.8"
                        />
                      </svg>
                      <h2 className="text-xl font-bold text-gray-200 sm:text-2xl">
                        {t("common.customer_reviews")}
                      </h2>
                      <p className="text-base font-light text-gray-200">
                        {t("common.customer_reviews_subtitle")}
                      </p>
                    </div>

                    <div className="no-scrollbar flex items-start gap-x-3 overflow-y-scroll pb-8 md:pb-10">
                      {/* {reviewData} */}
                      {inHome
                        ? reviewData?.map((item: any, index: any) => (
                            <blockquote
                              key={index}
                              className="min-w-[350px] max-w-[350px] rounded-lg bg-white p-5"
                            >
                              {/* <div className="flex items-center gap-2">
                                <Stars nearestNumberRating={item.meta_value} />
                              </div> */}

                              <p className="no-scrollbar mt-2 h-[200px] overflow-y-scroll leading-7 text-gray-700">
                                {item.comment_content}
                              </p>

                              <footer className="mt-4">
                                <p className="text-xs">
                                {item.comment_author?item.comment_author+' - ':""}{item.comment_date}
                                </p>
                              </footer>
                            </blockquote>
                          ))
                        : reviewData?.map((item: any, index: any) => (
                            <blockquote
                              key={index}
                              className="min-w-[350px] max-w-[350px] rounded-lg bg-white p-5"
                            >
                              {/* <div className="flex items-center gap-2">
                                <Stars nearestNumberRating={item.rating} />
                              </div> */}

                              <p className="no-scrollbar mt-2 h-[200px] overflow-y-scroll leading-7 text-gray-700">
                                {item.content}
                              </p>

                              <footer className="mt-4">
                                <p className="text-xs">
                                {item.author?item.author+' - ':""}{item.date}
                                </p>
                              </footer>
                            </blockquote>
                          ))}
                    </div>
                  </>

                  {/* <p className="text-gray-500 p-4 text-center">
                          {t("common.no_reviews_yet")}
                        </p> */}
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {inHome ? (
            <div className="mt-4 flex w-full gap-4 md:hidden">
              <Link prefetch={false}
                href="/reviews"
                className="border-gray-400 flex w-1/2 cursor-pointer justify-center gap-6 rounded-100 border-2 bg-white px-5 pb-1 pt-1.5 text-sm text-gray-200 hover:border-gray-200 hover:bg-gray-200 hover:text-white md:text-xl"
              >
                {t("common.load_more")}
              </Link>
            </div>
          ) : (
            <div className="targetSection-parent">
              {isSuccess ? (
                <div className="mx-auto mt-24 flex max-w-[680px] items-center justify-center rounded-[32px] border border-green-400 bg-green-400 bg-opacity-[8%] px-5 py-9 text-center">
                  <div className="flex flex-col items-center justify-center gap-[26px]">
                    <RoundedCheck />
                    <p className="text-2xl font-bold text-green-500">{t("fields.reviewSuccessMessage")}</p>
                  </div>
                </div>
              ) : (
                <div id="targetSection" className={`block`}>
                  <div className="form m-auto rounded-[32px] bg-primary-102 p-4 md:mt-[100px] md:max-w-[680px] md:p-12">
                    <div className="m-auto w-fit text-center">
                      <ProductReview />
                    </div>
                    <h4 className="my-3 text-center text-2xl font-bold text-[#423C33]">
                      {t("common.product_review")}
                    </h4>
                    <p className="text-center text-base font-bold text-[#423C33]">
                      {t("common.product_review_qus")}
                    </p>
                    <ProductReviewForm productId={productId} setIsSuccess={setIsSuccess}/>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
