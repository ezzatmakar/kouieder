export default function AddToCartVariableLoader() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="flex animate-pulse gap-x-2">
        <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2.5 shadow-sm md:px-2.5">
          <span className="bg-gray-400 block h-4 w-8 rounded-sm" />
        </div>
        <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2.5 shadow-sm md:px-2.5">
          <span className="bg-gray-400 block h-4 w-8 rounded-sm" />
        </div>
      </div>

      <div className="hidden animate-pulse gap-x-2 md:flex">
        <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2.5 shadow-sm md:px-2.5">
          <span className="bg-gray-400 block h-4 w-8 rounded-sm" />
        </div>
        <div className="border-gray-400 relative flex items-center justify-center rounded-xl border-2 bg-white px-2 py-2.5 shadow-sm md:px-2.5">
          <span className="bg-gray-400 block h-4 w-8 rounded-sm" />
        </div>
      </div>
          <div className="relative flex h-10 w-full items-center justify-center rounded-lg bg-primary-300 px-5 py-3 text-center text-sm font-medium leading-[16px] text-white hover:bg-primary-400 md:h-12 md:w-full md:justify-between" />
    </div>
  );
}
