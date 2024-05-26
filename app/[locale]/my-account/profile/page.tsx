"use client"
export const runtime = 'edge';
import { useTranslations } from "next-intl";
import ProfileForm from "../../components/account/ProfileForm";

export default function profile() {
  const t = useTranslations('account');
  return (
    <div>
      <div className="flex items-center justify-between pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl font-bold">{t('account_info')}</h1>
      </div>
      <ProfileForm />
    </div>
  )
}
