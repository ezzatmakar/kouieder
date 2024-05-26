export const runtime = 'edge';
import { useTranslations } from "next-intl";
import Breadcrumbs from "../components/Breadcrumbs";
import RegisterForm from "../components/account/RegisterForm";
import SocialLogin from "../components/account/SocialLogin";

export default function signup() {
  const t = useTranslations("common");
  const breadcrumbs = {
    pages: [
      { name: t("home"), href: "/" },
      { name: t("sign_up"), href: "#" },
    ],
  };

  return (
    <div>
      <section>
        <div className="container mx-auto w-[700px] max-w-full">
          <div className="flex flex-wrap">
            <div className="mx-auto w-full max-w-max px-4 py-4 md:py-20">
              <div className="relative">
                <h1 className="mb-4 text-center text-2xl font-bold leading-none tracking-tight text-black md:mb-6 md:text-4xl">
                  {t("create_new_account")}
                </h1>
                <div className="shadow-custom-desktop mx-auto max-w-[700px] overflow-hidden rounded-lg bg-white py-4 sm:px-12 md:rounded-[32px] md:pb-16 md:pt-8">
                  <RegisterForm />
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    {/* <SocialLogin /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
