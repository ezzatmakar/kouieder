"use client";
import { useTranslations } from "next-intl";
import {
  CUSTOM_RADIO_CLASSES,
  INPUT_CLASSES,
  LABEL_CLASSES,
} from "@/app/commonUIClasses";
import RadioArrow from "../icons/RadioArrow";

export default function OrderType({ register, errors, setValue, watch }: any) {
  const t = useTranslations("fields");

  let order_type = "normal";
  order_type = watch("order_type");

  return (
    <div>
      <ul className="grid w-full grid-cols-2 gap-3 md:gap-6">
        <li>
          <input
            type="radio"
            id="type_normal"
            value="normal"
            className="peer hidden"
            defaultChecked
            {...register("order_type", {
              required: { value: true, message: t("order_type_required") },
            })}
            data-testid="radio-normal"
          />
          <label
            htmlFor="type_normal"
            className={`${CUSTOM_RADIO_CLASSES}`}
            data-testid="label-normal"
          >
            <div className="flex gap-1 md:gap-4">
              <div className="block">
                <div className="w-full text-sm font-semibold md:text-xl">
                  {t("normal_order")}
                </div>
              </div>
            </div>
            {/* <span className="hidden md:block">
              <RadioArrow />
            </span> */}
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="order_gift"
            value="gift"
            className="peer hidden"
            {...register("order_type", {
              required: { value: true, message: t("order_type_required") },
            })}
            data-testid="radio-gift"
          />
          <label
            htmlFor="order_gift"
            className={`${CUSTOM_RADIO_CLASSES}`}
            data-testid="label-gift"
          >
            <div className="flex gap-3 md:gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.417 7.7143H11.143V6.0003C11.143 5.66182 11.0428 5.33091 10.855 5.04931C10.6671 4.76771 10.4002 4.54803 10.0877 4.41795C9.77517 4.28788 9.43116 4.25324 9.099 4.31841C8.76685 4.38358 8.46143 4.54563 8.22125 4.78414C7.98108 5.02265 7.81689 5.32693 7.74941 5.65862C7.68193 5.99031 7.71416 6.33456 7.84205 6.64795C7.96994 6.96134 8.18776 7.22985 8.46804 7.41963C8.74833 7.6094 9.07852 7.71193 9.417 7.7143ZM12.857 7.7143V6.0003C12.857 5.66182 12.9572 5.33091 13.1451 5.04931C13.3329 4.76771 13.5998 4.54803 13.9123 4.41795C14.2248 4.28788 14.5688 4.25324 14.901 4.31841C15.2331 4.38358 15.5386 4.54563 15.7787 4.78414C16.0189 5.02265 16.1831 5.32693 16.2506 5.65862C16.3181 5.99031 16.2858 6.33456 16.1579 6.64795C16.0301 6.96134 15.8122 7.22985 15.532 7.41963C15.2517 7.6094 14.9215 7.71193 14.583 7.7143H12.857ZM17.541 7.7143C17.9653 6.97788 18.1009 6.11015 17.9217 5.27939C17.7424 4.44862 17.261 3.71403 16.5709 3.21805C15.8807 2.72208 15.031 2.50007 14.1864 2.59509C13.3419 2.69011 12.5627 3.09538 12 3.7323C11.4377 3.09413 10.6582 2.68775 9.813 2.59208C8.96781 2.49641 8.11724 2.71828 7.42647 3.21461C6.73571 3.71093 6.25406 4.44628 6.07509 5.27782C5.89612 6.10936 6.03259 6.97774 6.458 7.7143H3.861C3.74785 7.7143 3.63581 7.73661 3.53128 7.77994C3.42675 7.82327 3.33179 7.88678 3.25183 7.96684C3.17186 8.04689 3.10846 8.14193 3.06525 8.2465C3.02204 8.35108 2.99987 8.46315 3 8.5763V12.4243C3 12.9003 3.386 13.2863 3.861 13.2863H4.286V20.5673C4.286 21.0433 4.671 21.4293 5.147 21.4293H18.853C18.9662 21.4293 19.0782 21.407 19.1827 21.3637C19.2872 21.3203 19.3822 21.2568 19.4622 21.1768C19.5421 21.0967 19.6055 21.0017 19.6487 20.8971C19.692 20.7925 19.7141 20.6805 19.714 20.5673V13.2863H20.139C20.2522 13.2863 20.3642 13.264 20.4687 13.2207C20.5732 13.1773 20.6682 13.1138 20.7482 13.0338C20.8281 12.9537 20.8915 12.8587 20.9347 12.7541C20.978 12.6495 21.0001 12.5375 21 12.4243V8.5763C21.0001 8.46315 20.978 8.35108 20.9347 8.2465C20.8915 8.14193 20.8281 8.04689 20.7482 7.96684C20.6682 7.88678 20.5732 7.82327 20.4687 7.77994C20.3642 7.73661 20.2522 7.7143 20.139 7.7143H17.541ZM14.587 9.4303H19.286V11.5723H4.714V9.4303H14.587ZM6 13.2863H18V19.7143H12.857V13.2863H11.143V19.7143H6V13.2863Z"
                  fill="currentColor"
                />
              </svg>

              <div className="block">
                <div className="w-full text-sm font-semibold md:text-xl">
                  {t("gift")}
                </div>
                {errors.order_type && errors.order_type.type === "required" && (
                  <p className="checkout-error mt-1 text-xs text-red-500">
                    {errors.order_type.message}
                  </p>
                )}
              </div>
            </div>
            {/* <span className="hidden md:block">
              <RadioArrow />
            </span> */}
          </label>
        </li>
      </ul>
      {errors.order_type && errors.order_type.type === "required" && (
        <p className="checkout-error mt-1 text-xs text-red-500">
          {errors.order_type.message}
        </p>
      )}
      {order_type === "gift" && (
        <div className="py-4">
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="col-span-2">
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>
                  {t("recipient_name")}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className={`${INPUT_CLASSES} ${
                      errors.recipient_name
                        ? "border-red-500 checkout-error"
                        : ""
                    }`}
                    {...register("recipient_name", {
                      required: {
                        value: true,
                        message: t("recipient_name_required"),
                      },
                    })}
                    data-testid="input-recipient-name"
                  />
                  {errors.recipient_name &&
                    errors.recipient_name.type === "required" && (
                      <p className="checkout-error mt-1 text-xs text-red-500">
                        {errors.recipient_name.message}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>
                  {" "}
                  {t("phone_number")}{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder=""
                    className={`${INPUT_CLASSES} ${
                      errors.recipient_mobile && "border-red-500 checkout-error"
                    }`}
                    {...register("recipient_mobile", {
                      required: { value: true, message: t("phone_required") },
                    })}
                    data-testid="input-recipient-mobile"
                  />
                  {errors.recipient_mobile &&
                    errors.recipient_mobile.type === "required" && (
                      <p className="checkout-error mt-1 text-xs text-red-500">
                        {errors.recipient_mobile.message}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
