"use client";
import { API_ENDPOINT, FRONTEND_ENDPOINT } from "@/app/config";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import BlogWidgetLoader from "./corporate/BlogWidgetLoader";
import BlogWidget from "./corporate/BlogWidget";
import Loader from "./Loader";
import Breadcrumbs from "./Breadcrumbs";
import { fetchBlogs } from "@/app/api/general";

export default function BlogList({ inHome = false, asSimilar = false }: any) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPage(true);
      try {
        const postsPerPage = inHome ? 3 : 8;
        const initialData = await fetchBlogs(postsPerPage, 1);
        console.log('posts: ', initialData);
        setBlogPosts(initialData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoadingPage(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const newData = await fetchBlogs(8, pageNumber + 1);
      // @ts-ignore
      setBlogPosts((prevPosts) => [...prevPosts, ...newData]);
      if (newData.length < 8) {
        setIsLoadMoreEnabled(false);
      }
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading more blog posts:", error);
    }
  };

  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: t("blog"), href: "#" },
    ],
  };

  return (
    <section className="w-full pb-12 md:pb-24">
      <div className="pb-5 pt-4">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex w-full items-center justify-between px-3">
            {inHome || asSimilar ? (
              <div className="flex w-full items-center justify-between">
                <h2 className="text-primary-950 text-xl font-bold sm:text-3xl">
                  {t("similar_blog")}
                </h2>
                <div className="hidden md:flex">
                  <Link prefetch={false}
                    href={`/blog`}
                    className="cursor-pointer gap-6 rounded-100 border-2 border-primary-300 bg-white px-5 py-1 text-primary-300 hover:bg-primary-300 hover:text-white"
                  >
                    <span className="whitespace-nowrap text-base font-medium">
                      {t("view_all")}
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col items-start justify-between">
                <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-5" />
                <h1 className="text-2xl font-bold text-black sm:text-4xl">
                  {t("blog")}{" "}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="flex flex-col">
          <div className="container mx-auto px-4 md:px-0">
            {isLoadingPage ? (
              <div className="list flex flex-wrap gap-y-6 md:-mx-3">
                {inHome ? (
                  <>
                    <BlogWidgetLoader />
                    <BlogWidgetLoader />
                    <BlogWidgetLoader />
                  </>
                ) : (
                  <>
                    <BlogWidgetLoader />
                    <BlogWidgetLoader />
                    <BlogWidgetLoader />
                    <BlogWidgetLoader />
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="-mx-2 flex flex-wrap gap-y-6">
                  {blogPosts.map((post, index) => (
                    <div key={index} className="w-full px-3 sm:w-1/2 md:w-1/3 md:px-6">
                      <BlogWidget post={post} />
                    </div>
                  ))}
                </div>
                {inHome && (
                  <div className="mt-10 flex w-full items-center justify-center text-center md:hidden md:w-auto">
                    <Link prefetch={false}
                      href={`/blog`}
                      className="inline-block w-full cursor-pointer gap-6 rounded-100 border-2 border-gray-300 bg-white px-5 pb-1.5 pt-1.5 text-xl text-primary-300 hover:border-gray-200 hover:bg-gray-200 hover:text-white"
                    >
                      <span className="whitespace-nowrap text-sm font-semibold md:text-xl">
                        {t("view_all")}
                      </span>
                    </Link>
                  </div>
                )}
                {blogPosts.length > 7 && isLoadMoreEnabled && !inHome && (
                  <div className="loadmore mt-10 flex items-center justify-center">
                    <button
                      onClick={handleLoadMore}
                      type="button"
                      className="mr-2 inline-flex w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-100 bg-gray-200 px-10 py-4 text-center text-sm font-medium text-white hover:bg-primary-100 md:w-auto"
                    >
                      {!isLoading ? (
                        t("load_more")
                      ) : (
                        <>
                          <Loader extraclass={"mr-2 h-4 w-4"} />
                          {t("loading")}...
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
