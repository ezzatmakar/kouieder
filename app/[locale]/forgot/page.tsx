export const runtime = 'edge';
// import { useTranslation } from "react-i18next";
// import ForgotForm from "~/components/account/ForgotForm";

import { useTranslations } from "next-intl";
import ForgotForm from "../components/account/ForgotForm";

export default function Forgot() {
    const t = useTranslations('common');
    return (
        <div>
            <section className="py-10 md:py-20">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <div
                                className="relative mx-auto w-[525px] max-w-full overflow-hidden md:px-[60px] bg-white py-12 px-10 md:rounded-[32px] md:shadow-2xl"
                            >
                                <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-center text-black md:text-4xl md:mb-14">{t('forgot_password')}</h1>
                                <ForgotForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
