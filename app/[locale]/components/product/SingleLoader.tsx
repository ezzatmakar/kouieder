import { PlusIcon } from "@heroicons/react/24/outline";

export default function SingleLoader() {
    return (
        <div>
            <div className="animate-pulse pt-12">
                <div className="container px-4 mx-auto">
                    <div className="flex justify-between pb-4 border-b border-gray-200 mb-2">
                        <div className="w-96 h-4 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 lg:w-1/2">
                            <div className="bg-gray-300 rounded aspect-w-4 aspect-h-3 lg:h-80">
                                <span className="flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                </span>
                            </div>
                        </div>
                        <div className="w-full px-4 py-4 lg:w-1/2">
                            <div className="flex flex-col h-full">
                                <div className="w-72 h-8 bg-gray-200 rounded-md"></div>
                                <div className="w-64 h-8 mt-4 bg-gray-200 rounded-md"></div>
                                <div className="w-32 h-4 mt-6 bg-gray-200 rounded-md"></div>
                                <div className="mt-10">
                                    <div className="w-full h-2 mt-2 bg-gray-200 rounded-md"></div>
                                    <div className="w-full h-2 mt-2 bg-gray-200 rounded-md"></div>
                                    <div className="w-full h-2 mt-2 bg-gray-200 rounded-md"></div>
                                    <div className="w-full h-2 mt-2 bg-gray-200 rounded-md"></div>
                                </div>
                                <div className="flex mt-auto space-x-4">
                                    <div className="inline-flex justify-center w-full px-8 py-6 text-base font-medium text-white border-2 border-solid rounded-lg bg-slate-900 border-slate-900 hover:bg-slate-700 hover:border-slate-700"></div>
                                    <div className="items-center justify-center w-1/2 px-8 py-6 text-base font-medium capitalize border-2 border-solid rounded-md border-slate-600 text-slate hover:bg-slate-600 hover:text-white focus:outline-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-20">
                        <div className="flex justify-between pb-4 border-b border-gray-200 mb-2 flex-col">
                            <div className="w-96 h-4 mb-5 bg-gray-300 rounded-md"></div>
                            <div className="flex">
                                <div className="flex items-center justify-center mb-4 mr-5">
                                    <div className="w-20 h-6 bg-gray-300 rounded aspect-w-6 aspect-h-2">
                                        <span className="flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                        </span>
                                    </div>
                                    <PlusIcon className="w-6 h-6" />
                                    <div className="w-20 h-6 bg-gray-300 rounded aspect-w-6 aspect-h-2">
                                        <span className="flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                        </span>
                                    </div>
                                    <PlusIcon className="w-6 h-6" />
                                    <div className="w-20 h-6 bg-gray-300 rounded aspect-w-6 aspect-h-2">
                                        <span className="flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="w-56 h-4 mb-4 bg-gray-300 rounded-md"></div>
                                    <span className="w-64 items-center justify-center px-8 py-6 border-2 border-solid rounded-md bg-slate-600"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
