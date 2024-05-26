
export default function ReviewWidget() {
    const nearestNumberRating = 4;
    return (
        <div className="inline-flex flex-col justify-start gap-4 grow shrink basis-0">
            <div className="inline-flex items-center self-stretch justify-start gap-6">
                <div className="flex items-center justify-center w-20 h-20 p-4 bg-white border rounded-lg border-zinc-300">
                    <img className="w-12 h-12" src="https://via.placeholder.com/49x49" />
                </div>
                <div className="inline-flex flex-col justify-start gap-3 grow shrink basis-0">
                    <div className="flex flex-col self-stretch justify-start h-6">
                        <h2 className="self-stretch text-base font-semibold leading-relaxed text-black">صحارة ديلايتس بالشوكلاتة</h2>
                    </div>
                </div>
            </div>
            <div className="justify-start items-center gap-1.5 inline-flex">
                <div className="inline-flex gap-2">
                    <div className="flex items-center">
                        {Array(5).fill(0).map((_, idx) => (
                            <svg key={idx} className={`h-5 w-5 flex-shrink-0 ${idx < nearestNumberRating ? "text-primary-910" : "text-gray-800"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-[#8C8985] text-base md:text-lg">{nearestNumberRating}</p>
                </div>
                <div className="flex justify-start">
                    <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                        <div className="relative flex flex-col justify-start w-5 h-5" />
                    </div>
                    <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                        <div className="relative flex flex-col justify-start w-5 h-5" />
                    </div>
                    <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                        <div className="relative flex flex-col justify-start w-5 h-5" />
                    </div>
                    <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                        <div className="relative flex flex-col justify-start w-5 h-5" />
                    </div>
                    <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                        <div className="relative flex flex-col justify-start w-5 h-5" />
                    </div>
                </div>
            </div>
            <p className="text-base md:text-xl font-medium leading-7 text-gray-900 uppercase">لوريم ايبسوم لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . </p>
            <div className="text-sm font-semibold leading-tight text-gray-50">John Doe - 12th January, 2024</div>
        </div>
    )
}
