import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import MenuDesktop from "./menu-desktop";
import MenuMobile from "./MenuMobile";
import Image from "next/image";
import footerData from "@/app/api/json-generated/nav.json";
import Tiktok from "../icons/Tiktok";

export default function MiddleFooter() {
  const t = useTranslations("footer");

  // const menuDetails = {
  //   menu: [
  //     {
  //       title: "أقسام المنتجات",
  //       title_en: "Categories",
  //       pages: [
  //         {
  //           name: "العروض و الخصومات",
  //           name_en: "Sales",
  //           url: "/offers",
  //         },
  //         // {
  //         //   name: "المكسرات",
  //         //   name_en: "Nuts",
  //         //   url: "/category/nuts",
  //         // },
  //         // {
  //         //   name: " الوجبات صحية",
  //         //   name_en: "Healthy Meals",
  //         //   url: "/category/healthy-food",
  //         // },
  //         // {
  //         //   name: " التمور والفواكه المجففة",
  //         //   name_en: "Dates and dried fruits",
  //         //   url: "/category/dates-and-dried-fruits",
  //         // },
  //         // {
  //         //   name: " المشروبات",
  //         //   name_en: "Drinks",
  //         //   url: "/category/drinks",
  //         // },
  //         // {
  //         //   name: " البهارات والزيوت",
  //         //   name_en: "Spices and oils",
  //         //   url: "/category/spices-and-oils",
  //         // },
  //       ],
  //     },
  //     {
  //       title: "عن الشركة ",
  //       title_en: "About Company",
  //       pages: [
  //         {
  //           name: " قصتنا",
  //           name_en: "our Story",
  //           url: "/about",
  //         },
  //         {
  //           name: "فروعنا",
  //           name_en: "Our Brnaches",
  //           url: "/branches",
  //         },
  //         // {
  //         //   name: " وصفاتنا",
  //         //   name_en: "Our Recipes",
  //         //   url: "/recipes",
  //         // },
  //         // {
  //         //   name: "الاكثر مبيعا",
  //         //   name_en: "Best Selling",
  //         //   url: "/best-selling",
  //         // },
  //         // {
  //         //   name: "التصدير ",
  //         //   name_en: "Exporting",
  //         //   url: "/export",
  //         // },
  //         // {
  //         //   name: "الموزعين في مصر ",
  //         //   name_en: "Vendors in Egypt",
  //         //   url: "/vendors",
  //         // },
  //         // {
  //         //   name: " المكافآت",
  //         //   name_en: "Rewards",
  //         //   url: "/rewards",
  //         // },
  //         // {
  //         //   name: " شركاء النجاح ",
  //         //   name_en: "Partners",
  //         //   url: "/partners",
  //         // },
  //         // {
  //         //   name: "  فرص وظائف ",
  //         //   name_en: "Jobs",
  //         //   url: "/careers",
  //         // },
  //         // {
  //         //   name: " إبداء الرأي ",
  //         //   name_en: "Feedback",
  //         //   url: "/give-your-opinion",
  //         // },
  //       ],
  //     },
  //     {
  //       title: " المساعدة",
  //       title_en: "Help",
  //       pages: [
  //         {
  //           name: "الاسئلة الشائعة ",
  //           name_en: "Faqs",
  //           url: "/faqs",
  //         },
  //         {
  //           name: "تواصل معنا",
  //           name_en: "Contact Us",
  //           url: "/contact-us",
  //         },
  //         // {
  //         //   name: " تعليقات العملاء",
  //         //   name_en: "Reviews",
  //         //   url: "/reviews",
  //         // },
  //         // {
  //         //   name: " التوصيل أو الاستلام ",
  //         //   name_en: "Delivery or pick up",
  //         //   url: "/shipping-info",
  //         // },
  //         // {
  //         //   name: "تطبيق الجوال",
  //         //   name_en: "Mobile App",
  //         //   url: "/our-app",
  //         // },
  //         {
  //           name: "الشروط والاحكام",
  //           name_en: "Terms and Conditions",
  //           url: "/terms-conditions",
  //         },
  //         {
  //           name: "سياسة الخصوصية",
  //           name_en: "Privacy policy",
  //           url: "/privacy-policy",
  //         },
  //         {
  //           name: "سياسة الاسترجاع",
  //           name_en: "Return policy",
  //           url: "/return-policy",
  //         },
  //       ],
  //     },
  //   ],
  // };
  return (
    <div className="bg-primary-300">
      <div className="container m-auto flex flex-col-reverse justify-between px-5 py-6 md:flex-row md:pb-14 md:pt-12">
        <div className="first w-full text-center md:w-1/4 md:text-start md:ltr:pr-20 md:rtl:pl-20 flex flex-col">
          <div className="logo">
            <Link prefetch={false} href="/">
              <Image
                className="m-auto w-28 md:m-0 md:w-[180px]"
                src="/images/logo_footer.webp"
                alt=""
                width={180}
                height={60}
              />
            </Link>
          </div>
          <div className="social-media mt-2 md:mt-auto flex flex-col gap-2.5">
            <a
              href="tel:01206665599"
              className="inline-block text-2xl font-bold text-white md:text-4xl"
            >
              01206665599
            </a>
            {/* <p className="px-6 py-3 text-sm font-semibold text-white md:px-0 md:text-base">
              {" "}
              {t("address")}
            </p> */}
            <div className="socialmedia-icons flex items-center justify-center gap-x-6 md:mt-0 md:justify-start">
              <Link prefetch={false}
                href="https://www.youtube.com/@abdel.rahim.koueider"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.792 5.41483C20.6521 5.64589 21.3325 6.32626 21.5635 7.18633C21.9872 8.75244 22 12.0002 22 12.0002C22 12.0002 22 15.2608 21.5764 16.8141C21.3453 17.6741 20.665 18.3545 19.8049 18.5856C18.2516 19.0092 12 19.0092 12 19.0092C12 19.0092 5.74839 19.0092 4.19512 18.5856C3.33504 18.3545 2.65469 17.6741 2.42362 16.8141C2 15.248 2 12.0002 2 12.0002C2 12.0002 2 8.75244 2.41078 7.19917C2.64185 6.33909 3.32221 5.65873 4.18228 5.42767C5.73556 5.00404 11.9872 4.99121 11.9872 4.99121C11.9872 4.99121 18.2388 4.99121 19.792 5.41483ZM15.1836 12.0002L9.99743 15.004V8.99635L15.1836 12.0002Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <Link prefetch={false}
                href="https://www.tiktok.com/@abdel.rahim.koueider?_t=8kkTbopmTI5&_r=1"
                className="cursor-pointer text-white inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block w-[22px] h-[22px]">
                  <Tiktok />
                </span>
              </Link>
              <Link prefetch={false}
                href="https://www.instagram.com/abdel.rahim.koueider/"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3C9.5556 3 9.2496 3.0102 8.2896 3.054C7.3314 3.0978 6.6768 3.2502 6.1044 3.4728C5.5044 3.6984 4.9602 4.0524 4.5102 4.5108C4.05253 4.96028 3.69831 5.5041 3.4722 6.1044C3.2508 6.6768 3.0978 7.332 3.054 8.2902C3.0108 9.2496 3 9.555 3 12C3 14.445 3.0102 14.7504 3.054 15.7104C3.0978 16.6686 3.2502 17.3232 3.4728 17.8956C3.6984 18.4956 4.0524 19.0398 4.5108 19.4898C4.96029 19.9475 5.50411 20.3017 6.1044 20.5278C6.6768 20.7498 7.3314 20.9022 8.2896 20.946C9.2496 20.9898 9.5556 21 12 21C14.4444 21 14.7504 20.9898 15.7104 20.946C16.6686 20.9022 17.3232 20.7498 17.8956 20.5272C18.4956 20.3016 19.0398 19.9476 19.4898 19.4892C19.9475 19.0397 20.3017 18.4959 20.5278 17.8956C20.7498 17.3232 20.9022 16.6686 20.946 15.7104C20.9898 14.7504 21 14.4444 21 12C21 9.5556 20.9898 9.2496 20.946 8.2896C20.9022 7.3314 20.7498 6.6768 20.5272 6.1044C20.3012 5.50384 19.947 4.95979 19.4892 4.5102C19.0397 4.05253 18.4959 3.69831 17.8956 3.4722C17.3232 3.2508 16.668 3.0978 15.7098 3.054C14.7504 3.0108 14.445 3 12 3ZM12 4.6218C14.403 4.6218 14.688 4.6308 15.6372 4.674C16.5144 4.7142 16.9908 4.86 17.3082 4.9842C17.7282 5.1468 18.0282 5.3424 18.3432 5.6568C18.6582 5.9718 18.8532 6.2718 19.0158 6.6918C19.1394 7.0092 19.2858 7.4856 19.326 8.3628C19.3692 9.312 19.3782 9.597 19.3782 12C19.3782 14.403 19.3692 14.688 19.326 15.6372C19.2858 16.5144 19.14 16.9908 19.0158 17.3082C18.8718 17.6991 18.6419 18.0528 18.3432 18.3432C18.0528 18.642 17.6992 18.8718 17.3082 19.0158C16.9908 19.1394 16.5144 19.2858 15.6372 19.326C14.688 19.3692 14.4036 19.3782 12 19.3782C9.5964 19.3782 9.312 19.3692 8.3628 19.326C7.4856 19.2858 7.0092 19.14 6.6918 19.0158C6.30087 18.8718 5.9472 18.6419 5.6568 18.3432C5.35811 18.0528 5.12828 17.6991 4.9842 17.3082C4.8606 16.9908 4.7142 16.5144 4.674 15.6372C4.6308 14.688 4.6218 14.403 4.6218 12C4.6218 9.597 4.6308 9.312 4.674 8.3628C4.7142 7.4856 4.86 7.0092 4.9842 6.6918C5.1468 6.2718 5.3424 5.9718 5.6568 5.6568C5.94716 5.35803 6.30085 5.12819 6.6918 4.9842C7.0092 4.8606 7.4856 4.7142 8.3628 4.674C9.312 4.6308 9.597 4.6218 12 4.6218Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 15.0028C11.6057 15.0028 11.2152 14.9251 10.8508 14.7742C10.4865 14.6233 10.1554 14.4021 9.87658 14.1232C9.59773 13.8444 9.37653 13.5133 9.22561 13.149C9.0747 12.7846 8.99702 12.3941 8.99702 11.9998C8.99702 11.6054 9.0747 11.2149 9.22561 10.8506C9.37653 10.4862 9.59773 10.1552 9.87658 9.87635C10.1554 9.59749 10.4865 9.37629 10.8508 9.22538C11.2152 9.07446 11.6057 8.99679 12 8.99679C12.7965 8.99679 13.5603 9.31318 14.1235 9.87635C14.6866 10.4395 15.003 11.2033 15.003 11.9998C15.003 12.7962 14.6866 13.5601 14.1235 14.1232C13.5603 14.6864 12.7965 15.0028 12 15.0028ZM12 7.37379C10.7731 7.37379 9.59649 7.86117 8.72895 8.72871C7.8614 9.59626 7.37402 10.7729 7.37402 11.9998C7.37402 13.2267 7.8614 14.4033 8.72895 15.2709C9.59649 16.1384 10.7731 16.6258 12 16.6258C13.2269 16.6258 14.4036 16.1384 15.2711 15.2709C16.1386 14.4033 16.626 13.2267 16.626 11.9998C16.626 10.7729 16.1386 9.59626 15.2711 8.72871C14.4036 7.86117 13.2269 7.37379 12 7.37379ZM17.9718 7.28979C17.9718 7.5798 17.8566 7.85794 17.6515 8.06301C17.4465 8.26808 17.1683 8.38329 16.8783 8.38329C16.5883 8.38329 16.3102 8.26808 16.1051 8.06301C15.9 7.85794 15.7848 7.5798 15.7848 7.28979C15.7848 6.99977 15.9 6.72164 16.1051 6.51657C16.3102 6.3115 16.5883 6.19629 16.8783 6.19629C17.1683 6.19629 17.4465 6.3115 17.6515 6.51657C17.8566 6.72164 17.9718 6.99977 17.9718 7.28979Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <Link prefetch={false}
                href="https://www.facebook.com/ARKOUEIDER"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12.0607C22 6.504 17.5233 2 12 2C6.47667 2 2 6.504 2 12.0607C2 17.0833 5.656 21.2453 10.4373 22V14.9693H7.89867V12.06H10.4373V9.844C10.4373 7.32267 11.93 5.92933 14.2147 5.92933C15.308 5.92933 16.4533 6.126 16.4533 6.126V8.602H15.1913C13.9493 8.602 13.5627 9.378 13.5627 10.174V12.0607H16.336L15.8927 14.9687H13.5627V22C18.344 21.2453 22 17.0833 22 12.0607Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <MenuDesktop menuDetails={footerData} />
        <MenuMobile menuDetails={footerData} />
      </div>
    </div>
  );
}
