// import { Tab } from "@headlessui/react";
// import Reviews from "../Reviews";
// import RecipeWidget from "../corporate/RecipeWidget";
// import { useTranslations } from "next-intl";
// // import Reviews from "~/components/Reviews";
// // import RecipeWidget from "~/components/RecipeWidget";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { getReviewOfProduct } from "@/app/api/general";

// interface TabsProps {
//   recipes: any;
//   productId: number;
//   reviewsCount: number;
// }

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }
// export default function Tabs({ recipes, productId, reviewsCount }: TabsProps) {
//   // console.log('recipes',recipes)
//   const t = useTranslations("common");
//   const user_id = Cookies.get("user_id");
//   const defaultTabIndex = reviewsCount > 0 ? 0 : 1;

//   const [reviewData, setReviewData] = useState<any>([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       // @ts-ignore
//       const result = await getReviewOfProduct(productId);
//       setReviewData(result);
//     };
//     fetchData();
//   }, [productId]);
//   // console.log('reviewData TABS',reviewData)
//   return (
//     <div className="bg-white">
//       <div className="">
//         <Tab.Group
//           as="div"
//           className="flex flex-col"
//           defaultIndex={defaultTabIndex}
//         >
//           <Tab.List className="relative">
//             <div className="container mx-auto">
//               <div className="flex flex-wrap -mb-px space-x-1">
//                 <Tab
//                   className={({ selected }) =>
//                     classNames(
//                       "p-4 py-2.5 text-sm md:text-xl font-medium flex items-center gap-2 leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4 transition-colors duration-300",
//                       selected ? "border-[#DCC498]" : " border-transparent"
//                     )
//                   }
//                 >
//                   {t("opinions")}
//                   <span className="inline-flex items-center justify-center w-4 h-4 pt-1 text-xs text-black rounded-full bg-primary-910">
//                     {reviewData.length}
//                   </span>
//                 </Tab>
//                 <Tab
//                   className={({ selected }) =>
//                     classNames(
//                       "p-4 py-2.5 text-sm md:text-xl font-medium leading-5 text-black focus:outline-none bg-transparent border-b-2 md:border-b-4 transition-colors duration-300",
//                       selected ? "border-[#DCC498]" : " border-transparent"
//                     )
//                   }
//                 >
//                   {t("recipes")}
//                 </Tab>
//               </div>
//             </div>
//             <hr className="absolute left-0 right-0 text-gray-200" />
//           </Tab.List>
//           <Tab.Panels className="container mx-auto">
//             <Tab.Panel>
//               {reviewData.length > 0 ? (
//                 <Reviews productId={productId} />
//               ) : user_id ? (
//                 <Reviews productId={productId} />
//               ) : (
//                 <p className="text-center text-gray-500 p-4">
//                   {t("no_reviews_yet")}
//                 </p>
//               )}
//             </Tab.Panel>

//             <Tab.Panel>
//               <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16">
//                 <div className="relative flex overflow-y-scroll no-scrollbar gap-6 list md:-mx-3 -mx-4 px-4 md:px-0 pb-6 no-scrollbar">
//                   {recipes &&
//                     recipes.map((recipe: any, index: any) => (
//                       <RecipeWidget recipe={recipe} key={index} />
//                     ))}
//                 </div>
//               </div>
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </div>
//   );
// }
