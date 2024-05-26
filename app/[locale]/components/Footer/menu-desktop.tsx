import { Link, usePathname } from "@/navigation";
import { useLocale } from "next-intl";

export default function MenuDesktop({ menuDetails }: any) {
  const locale = useLocale();
  const pathname = usePathname();
  // console.log('mine', menuDetails)
  return (
    <div className="hidden w-3/4 md:flex ltr:md:mr-24 rtl:md:ml-24">
      {/* {menuDetails.menu.map((menu: any, index: any) => (
        <div className="w-1/3" key={index}>
          <>
            <h4 className="mb-5 font-bold text-white md:text-base">
              {locale === "ar" ? menu.title : menu.title_en}
            </h4>
            <ul>
              {menu.pages.map((page: any, index: any) => (
                <li
                  className={`text-white md:text-base md:mb-2 hover:text-gray-100 ${page.url === pathname ? 'underline' : ''}`}
                  key={index}
                >
                  <Link prefetch={false} href={page.url} className="hover:underline">
                    {locale === "ar" ? page.name : page.name_en}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        </div>
      ))} */}

      {menuDetails?.footer_menu?.map((menu: any, index: any) => (
        <div className="w-1/3" key={index}>
          <>
            <h4 className="mb-5 font-bold text-white md:text-base">
              {locale === "ar" ? menu.title_col_ar : menu.title_col}
            </h4>
            <ul>
              {menu.list_menu?.map((smenu: any, index: any) => (
                <li
                  className={`text-white md:text-base md:mb-2 hover:text-gray-100 ${
                    smenu.url === pathname ? "underline" : ""
                  }`}
                  key={index}
                >
                  <Link prefetch={false}
                    href={
                      smenu.type === "page"
                        ? `/${smenu.page_link.post_name}`
                        : `/category/${smenu?.link?.slug}`
                    }
                    className={`block mt-4 lg:inline-block lg:mt-0 font-semibold ${
                      pathname === `/${smenu?.page_link}`
                        ? "underline"
                        : "hover:underline"
                    }`}
                  >
                    {smenu.type === "page"
                      ? `${
                          locale === "ar"
                            ? smenu.page_title_ar
                            : smenu.page_title
                        }`
                      : `${
                          locale === "ar"
                            ? smenu.ar_category_name
                            : smenu.link.name
                        }`}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        </div>
      ))}
    </div>
  );
}
