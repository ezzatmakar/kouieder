export const runtime = "edge";
import { Metadata } from "next";
import TermsSection from "../components/corporate/TermsSection";
import termstData from "@/app/api/json-generated/terms.json";

export const metadata: Metadata = {
  title: termstData.title,
  description: "page description",
};

export default function TermsConditions() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <TermsSection pageInfo={termstData} />
    </div>
  );
}
