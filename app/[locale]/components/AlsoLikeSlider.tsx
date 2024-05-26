"use client";
import { fetchCartExtraProducts } from "@/app/api/general";
import { useEffect, useState, useRef } from "react";
// @ts-ignore
import Flickity from "react-flickity-component";
import SmallWidget from "./product/SmallWidget";
import AlsoLikeSliderLoader from "./AlsoLikeSliderLoader";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function AlsoLikeSlider() {
  const flickityOptions = {
    initialIndex: 0,
    wrapAround: true,
    draggable: false,
    autoPlay: 4000,
    pauseAutoPlayOnHover: true,
    arrowShape:
      "M 45.711 76.99 L 20.486 51.758 C 20.249 51.532 20.059 51.257 19.928 50.953 C 19.797 50.649 19.73 50.324 19.73 49.993 C 19.73 49.664 19.797 49.335 19.928 49.032 C 20.059 48.732 20.249 48.456 20.486 48.227 L 45.711 23.009 L 49.242 26.54 L 28.305 47.475 L 80.27 47.475 L 80.27 52.521 L 28.308 52.521 L 49.246 73.459 L 45.711 76.99 Z",
  };
  const [extraProducts, setExtraProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  const filterData = {
    branch_id: "",
    count: 10,
  };

  useEffect(() => {
    if (isFetched.current) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await fetchCartExtraProducts(filterData);
        setExtraProducts(products);
      } catch (error) {
        console.error("Error fetching extra products:", error);
      } finally {
        setLoading(false);
        isFetched.current = true;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <AlsoLikeSliderLoader />
      ) : (
        <Flickity options={flickityOptions} className={""}>
          {extraProducts.map((product, index) => (
            <div key={index} className="w-full">
              <SmallWidget product={product} />
            </div>
          ))}
        </Flickity>
      )}
    </div>
  );
}
