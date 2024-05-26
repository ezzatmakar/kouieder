import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import BottomFooter from "./BottomFooter";

export default function CheckoutFooter() {
    const t = useTranslations('checkout');
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col gap-4 bg-primary-300 p-4 text-center">
            {/* <ul className="flex items-center justify-center gap-4 text-xs font-medium text-gray-50 md:text-base">
                <li><Link prefetch={false} href="/terms-conditions">{t('terms_conditions')}</Link></li>
                <li><Link prefetch={false} href="/privacy-policy">{t('privacy_policy')}</Link></li>
                <li><Link prefetch={false} href="/return-policy">{t('return_policy')}</Link></li>
            </ul> */}
            <div className="logo flex justify-center">
                <Link prefetch={false} href="/">
                    <img
                        className="m-auto w-28 md:m-0 md:w-[180px]"
                        src="/images/logo_footer.webp"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    )
}
