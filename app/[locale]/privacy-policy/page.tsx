export const runtime = "edge";
import { Metadata } from "next";
import PrivacySection from "../components/corporate/PrivacySection";
import privacyData from "@/app/api/json-generated/privacy-policy.json";

export const metadata: Metadata = {
  title: privacyData.title,
  description: "page description",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <PrivacySection pageInfo={privacyData} />
    </div>
  );
}
