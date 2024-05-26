// import ProductLoader from "~/components/product/ProductLoader";

import ProductLoader from "./product/ProductLoader";

export default function ListLoader() {
    return (
        <div>
            <div className="animate-pulse">
                <div className="flex justify-between pb-4 border-gray-200">
                    <div className="w-96 h-4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex flex-col flex-wrap md:items-baseline justify-between border-gray-200 md:flex-row gap-4 pb-4">
                    <div className="w-64 h-6 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-primary-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                            <div className="block w-32 px-2"><div className="h-4 bg-gray-200 rounded-md" /></div>
                        </div>
                        <div className="bg-primary-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                            <div className="block w-32 px-2"><div className="h-4 bg-gray-200 rounded-md" /></div>
                        </div>
                        <div className="bg-primary-300 px-4 py-2.5 rounded-100 flex-col justify-center items-center gap-2.5 inline-flex">
                            <div className="block w-32 px-2"><div className="h-4 bg-gray-200 rounded-md" /></div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap md:items-baseline justify-between pt-4 border-gray-200 md:flex-row gap-4">
                        <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
                <div className="pt-8 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10">
                        <div className="relative z-10 lg:col-span-3">
                            <div className="grid-cols-2 lg:grid-cols-4 grid gap-y-10 gap-x-6 xl:gap-x-8 relative">
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                                <div className="relative flex flex-col group">
                                    <ProductLoader />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
