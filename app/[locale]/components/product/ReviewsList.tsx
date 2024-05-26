import { Tab } from "@headlessui/react";
import Reviews from "../Reviews";
import { useTranslations } from "next-intl";
// import Reviews from "~/components/Reviews";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getReviewOfProduct } from "@/app/api/general";

interface TabsProps {
  productId: number;
  reviewsCount: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function ReviewsList({productId, reviewsCount }: TabsProps) {
  const t = useTranslations("common");
  const user_id = Cookies.get("user_id");
  const defaultTabIndex = reviewsCount > 0 ? 0 : 1;

  const [reviewData, setReviewData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      const result = await getReviewOfProduct(productId);
      setReviewData(result);
    };
    fetchData();
  }, [productId]);
  // console.log('reviewData TABS',reviewData)
  return (
          <div className="container mx-auto">
             {reviewData.length > 0 ? (
                <Reviews productId={productId} />
              ) : user_id ? (
                <Reviews productId={productId} />
              ) : (
                // <p className="text-center text-gray-500 p-4">
                //   {t("no_reviews_yet")}
                // </p>
                <Reviews productId={productId} />
              )}
          </div>
  );
}
