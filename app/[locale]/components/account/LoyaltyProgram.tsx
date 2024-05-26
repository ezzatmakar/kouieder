import { useTranslations } from "next-intl";
import AccountUser from "../icons/AccountUser";
import Birthday from "../icons/Birthday";
import Purchase from "../icons/Purchase";
import Refer from "../icons/Refer";
import ShareOn from "../icons/ShareOn";

const LoyaltyProgram = () => {
  const t = useTranslations("account");
  const items = [
    {
      icon: <Refer />,
      title: t("refer_friends"),
      points: `100 ${t("point")}`,
    },
    {
      icon: <Birthday />,
      title: t("birthday_bonus"),
      points: `250 ${t("point")}`,
    },
    {
      icon: <ShareOn />,
      title: t("share_on"),
      points: `10 ${t("point")}`,
    },
    {
      icon: <Purchase />,
      title: t("make_purchase"),
      points: `500 ${t("point")} / 1 EGP`,
    },
    {
      icon: <AccountUser />,
      title: t("create_account"),
      points: `500 ${t("point")}`,
    },
  
  
  

  ];

  return (
    <div className="py-8 border-b-2 border-gray-200 border-solid">
      <div className="flex md:justify-between justify-center md:gap-4 gap-2 overflow-scroll no-scrollbar md:flex-nowrap flex-wrap">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-[#EDEFEB] flex justify-center items-center px-2 flex-col rounded-2xl md:w-1/5 w-[48%] min-h-[150px] py-6 content-evenly text-center md:gap-4"
          >
            {item.icon}
            <div>
              <p className="text-base font-medium">{item.title}</p>
              <span className="text-sm text-gray-50">{item.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyProgram;
