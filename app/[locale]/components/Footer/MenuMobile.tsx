"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export default function MenuMobile({ menuDetails }: any) {
  const locale = useLocale();
  // console.log("menuDetails MOB", menuDetails);
  return (
    <div className="mb-5 block w-full md:hidden">
      <dl className="divide-primary-700 space-y-6 divide-y md:mt-6">
        {menuDetails?.footer_menu?.map((menu: any, index: any) => (
          <Disclosure as="div" className="pt-6" key={index}>
            {({ open }) => (
              <>
                <dt className="text-lg">
                  <Disclosure.Button className="text-gray-400 flex w-full items-start justify-between text-left">
                    <span className="text-base font-bold text-white">
                      {locale === "ar" ? menu.title_col_ar : menu.title_col}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "-rotate-180 text-white" : "rotate-0",
                          "h-6 w-6 transform text-white"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 rtl:pr-3 md:rtl:pr-12">
                  <ul className="space-y-3">
                    {menu.list_menu.map((smenu: any, index: any) => (
                      <li
                        className="text-white hover:text-gray-100 md:mb-2 md:text-xl"
                        key={index}
                      >
                        <Link prefetch={false}
                          className=""
                          href={
                            smenu.type === "page"
                              ? `/${smenu.page_link.post_name}`
                              : `/category/${smenu?.link?.slug}`
                          }
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
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
