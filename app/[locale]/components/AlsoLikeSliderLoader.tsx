"use client";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
export default function AlsoLikeSliderLoader() {
  return (
    <div className="relative">
      <div className="flex w-full animate-pulse items-start justify-between p-4">
        <div className="flex w-4/5 items-start">
          <div>
            <div className="mr-5 flex h-24 w-24 items-center justify-center rounded-md bg-gray-300">
              <span className="flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="mr-3 flex w-full flex-col">
            <div className="mb-4 h-3 w-full rounded-full bg-gray-200"></div>
            <span className="text-gray-400 my-1 flex text-xs font-light capitalize">
              <div className="mr-2 h-2 w-1/2 rounded-full bg-gray-200"></div>
              <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
            </span>
            <span className="text-gray-400 my-1 flex text-xs font-light capitalize">
              <div className="mr-2 h-2 w-1/2 rounded-full bg-gray-200"></div>
              <div className="h-2 w-1/2 rounded-full bg-gray-200"></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
