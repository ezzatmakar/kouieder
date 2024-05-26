"use client";
import AccountNav from "../components/account/AccountNav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUserInfo } from "@/app/utils/account";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { UserProvider, useUser } from "@/app/UserContext";


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const navigate = useNavigate();

  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  // console.log('router',router)
  // console.log('pathname',pathname)

  const breadcrumbs = {
    pages: [
      { name: t("account.home"), href: "/" },
      { name: t("account.name"), href: "#" },
    ],
  };
  return (
    <div>
      <section className="md:py-10">
        <div className="container px-4 mx-auto hidden md:block">
          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-8" />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-start md:gap-10 md:flex-nowrap">
            <div className="flex flex-col w-full md:w-auto">
              <AccountNav />
              <div className="block md:hidden">
                <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="p-4" />
              </div>
            </div>
            <div className="w-full p-4">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
