export const runtime = "edge";
import { fetchFilterProducts } from "@/app/api/general";
import React from "react";
import ProductList from "../components/ProductList";

export default async function Offer() {
  const filterData = {
    selectedCategories: "best-sellers",
    minPrice: 0,
    maxPrice: 100000000,
    pageNumber: 1,
    products_per_page: 20,
    criteria: "date",
    arrangement: "arrangement",
  };
  const productsFirst = await fetchFilterProducts(filterData);
  return (
    <div className="single-catgeory mt-2">
      <ProductList
        products={productsFirst}
        title={"offers_and_discounts"}
        categorySlug={"best-sellers"}
      />
    </div>
  );
}
