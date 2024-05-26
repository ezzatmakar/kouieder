export default function QuickViewLoader() {
    return (
        <div className="w-full animate-pulse h-full">
            <div className="flex flex-wrap h-full overflow-hidden rounded-xl">
                <div className="relative flex flex-col items-start w-full p-3 pb-4 md:py-6 md:px-6 gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-3/4 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mb-4"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="mt-auto pt-10 w-full flex flex-col gap-2">
                        <div className="w-32 h-8 mb-4 bg-gray-200 rounded-full"></div>
                        <div className="h-14 mt-auto bg-gray-200 rounded-full w-full"></div>
                        <div className="h-14 mt-auto bg-gray-200 rounded-full w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
