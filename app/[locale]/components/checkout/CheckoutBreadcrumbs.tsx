import useShoppingCart from "@/app/stores/useShoppingCart";
import { useTranslations } from "next-intl";
import Link from "next/link";
import BreadcrumbArrow from "../icons/BreadcrumbArrow";

interface BreadcrumbsProps {
  handleClick?: () => void;
  onUpdateStep?: (val: any) => void;
  stepOne?: boolean;
}

function CheckoutBreadcrumbs({
  handleClick,
  onUpdateStep,
  stepOne,
}: BreadcrumbsProps) {
  const { cartQuantity } = useShoppingCart();
  const t = useTranslations("checkout");

  return (
    <nav className="mb-4 hidden md:flex">
      <ol
        role="list"
        className="text-gray-400 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-y-0"
      >
        <li>
          <div className="-m-1 flex gap-1">
            <Link
              prefetch={false}
              href="/cart"
              className="flex items-center gap-1 p-1 leading-3 text-gray-50"
            >
              {t("cart")}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 pt-[1px] text-sm font-bold text-white">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <BreadcrumbArrow />

            <div className="-m-1">
              <span
                className={`p-1 cursor-pointer px-2 ${
                  stepOne ? "font-semibold text-primary-200" : ""
                }`}
                onClick={() => onUpdateStep?.(true)}
              >
                {" "}
                {t("shipping_information")}{" "}
              </span>
            </div>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <BreadcrumbArrow />

            <div className="-m-1">
              <span
                className={`p-1 cursor-pointer px-2 ${
                  !stepOne ? "font-semibold text-primary-200" : "text-gray-50"
                }`}
                onClick={handleClick}
              >
                {" "}
                {t("payment_method")}{" "}
              </span>
            </div>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <BreadcrumbArrow />

            <div className="-m-1">
              <span className="p-1 px-2 text-gray-50">
                {t("confirm_payment")}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default CheckoutBreadcrumbs;
