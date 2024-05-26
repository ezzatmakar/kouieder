import { useCurrency } from "@/CurrencyContext";
import React from "react";

interface FormatCurrencyProps {
  value: any;
  valueUAE?: any;
  style?: string;
  className?: string;
  lineThrough?: boolean;
  bigger?: boolean;
  bg?: boolean;
  smallFont?: boolean;
  mediumFont?: boolean; // Added prop
}

const FormatCurrency: React.FC<FormatCurrencyProps> = ({
  value,
  valueUAE = 0,
  lineThrough,
  smallFont,
  mediumFont, // Added prop
  bigger,
  style,
  className = "text-primary-400",
  bg = true,
}) => {
  const { currency } = useCurrency();
  const formatCurrency = (number: number, currency: string) => {
    const formatter = new Intl.NumberFormat(undefined, {
      currency,
      style: "currency",
    });
    return formatter.formatToParts(number);
  };

  const parts = formatCurrency(currency === "AED" ? valueUAE : value, currency);
  return (
    <span
      className={`currency  inline-flex ${className} ${
        lineThrough && !smallFont
          ? "line-through text-[.8em]"
          : "flex-row-reverse md:items-start items-end rounded px-1"
      } ${
        bigger && !lineThrough
          ? "h-auto md:h-[12px] pt-[2px]"
          : "h-auto flex-row-reverse "
      } ${bg && !lineThrough ? "bg-primary-910" : ""} ${
        lineThrough && smallFont ? "text-xs line-through" : ""
      } ${mediumFont ? "text-md" : ""}`} // Apply medium font size if mediumFont prop is true
    >
      {parts.map((part, index) => (
        <span
          key={index}
          className={`${
            part.type === "integer" && !lineThrough && bg && !smallFont && !mediumFont
              ? " font-bold rtl:-mr-0.5 md:-translate-y-2 px-[2px] md:text-[31px] md:px-1 text-xl"
              : ""
          }${part.type === "integer" && !lineThrough && bg && mediumFont
              ? " font-bold px-[2px] md:text-3xl md:px-1 text-xl"
              : ""
          }${
            (part.type === "literal" && !lineThrough && style !== "no-style") || (part.type === "decimal" && !lineThrough && bg && mediumFont)
              ? "hidden"
              : ""
          }${
            bigger && part.type === "integer" && !lineThrough
              ? ""
              : ""
          }${part.type === "integer" && smallFont && !lineThrough ? " text-xl" : ""}`}
        >
          {part.value}
        </span>
      ))}
    </span>
  );
};

export default FormatCurrency;
