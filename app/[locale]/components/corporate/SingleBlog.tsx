import { DateTimeFormatOptions, useLocale, useTranslations } from "next-intl";
import Breadcrumbs from "../Breadcrumbs";
import { RiArrowRightUpLine, RiTimeLine } from "react-icons/ri";
import ProgressiveImage from "../ProgressiveImage";
import BlogList from "../BlogList";
import ShareButtons from "../ShareButtons";

interface BlogPost {
  title: string;
  content: string;
}

export default function SingleBlog({ blogData }: any) {
  const t = useTranslations("common");
  const locale = useLocale();

  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: t("blog"), href: "/blog" },
    ],
  };
  let created_time = blogData.created_time;
  const inputDate = new Date(created_time);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = inputDate.toLocaleDateString(locale, options);

  const content =
    locale === "ar"
      ? blogData?.extra_data?.desc_ar?.["0"] || "missing"
      : blogData?.content;
  const wordCount = content?.split(" ").length || 0;
  const averageReadingSpeed = 50;
  const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeed);
  // console.log("content>>", blogData);
  const paragraphs = content.split("\r\n\r\n"); // Split the content into paragraphs

  return (
    <div>
      <section className="w-full pb-24 single-post">
        <div className="container px-4 pt-4 pb-5 mx-auto md:pb-16">
          <div className="max-w-[960px] details md:px-0">
            <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-5" />
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-2xl font-bold md:text-4xl">
                {locale === "ar"
                  ? blogData.extra_data.title_ar || blogData.title
                  : blogData.title}
              </h1>
              <div
                className="text-base text-gray-50"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === "ar"
                      ? blogData?.extra_data?.short_desc_ar?.["0"] || "MISSING"
                      : blogData?.content,
                }}
              />
              <div className="flex gap-4 mb-4 text-base text-gray-50">
                <span className="inline-flex items-center gap-2">
                  <RiTimeLine /> {readingTimeMinutes} {t("min")} {t("for_read")}
                </span>
                <span>|</span>
                <span className="inline-flex items-center gap-2">
                  {formattedDate}
                </span>
              </div>
              <ShareButtons text={t("share_blog")} />
              {/* <ProgressiveImage
                src={blogData.image}
                placeholder={blogData.image}
                alt={blogData.title}
                className="w-full"
              /> */}

              {/* <div
                className="mb-4 text-base leading-normal text-gray-50"
                dangerouslySetInnerHTML={{
                  __html: blogData?.extra_data?.desc_ar?.["0"],
                }}
              /> */}
              {/* <div className="mb-4 text-base leading-normal text-gray-50">
                {blogData?.extra_data?.desc_ar?.["0"]}
              </div> */}
              <div className="wysiwyg">
                {paragraphs.map((paragraph: any, index: any) => (
                  <div
                    key={index}
                    className="mb-4 text-base leading-normal text-gray-50"
                    dangerouslySetInnerHTML={{
                      __html: paragraph,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <BlogList asSimilar />
          </div>
        </div>
      </section>
    </div>
  );
}
