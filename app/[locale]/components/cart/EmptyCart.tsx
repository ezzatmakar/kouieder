import Link from "next/link";
import { useTranslations } from "next-intl";

const EmptyCart = () => {
  const t = useTranslations("checkout");

  return (
    <div
      className="min-h-[calc(100vh - 65px 140px)] mt-auto flex flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 65px - 140px)" }}
    >
      <p className="text-lg text-slate-500">{t("loading_checkout")}</p>
      <Link
        prefetch={false}
        href="/offers"
        className="mt-5 inline-flex justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold capitalize text-white hover:bg-slate-700"
      >
        {t("continue_shopping")}
      </Link>
    </div>
  );
};

export default EmptyCart;
