import { useTranslations } from "next-intl";
import CampaignMonitorForm from "./companinMonitor";

export default function TopFooter() {
  const t = useTranslations("footer");
  return (
    <div className=" px-5 md:py-10 py-5">
      <div className="2xl:container m-auto flex flex-col-reverse justify-center px-5 py-9 md:flex-row bg-primary-103 md:py-16 rounded-[20px]">
        <div className="w-full md:text-center text-start md:w-3/5">
          <h4 className="text-xl font-bold text-primary-300 md:text-4xl">
            {t("subscription_title")}
          </h4>
          <p className="md:mb-8 mb-5 md:mt-4 mt-2 text-sm font-semibold text-primary-300 md:text-xl">
            {t("subscription_para")}
          </p>
          <CampaignMonitorForm />
        </div>
      </div>
    </div>
  );
}
