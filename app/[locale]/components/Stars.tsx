import React from 'react'

export default function Stars({ nearestNumberRating }: any) {
    const rating = typeof nearestNumberRating === 'number' ? nearestNumberRating.toFixed(1) : nearestNumberRating;
    return (
        <div className="">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                    {Array(5).fill(0).map((_, idx) => (
                        <svg key={idx} className={`md:h-5 md:w-5 w-4 h-4 flex-shrink-0 ${idx < nearestNumberRating ? "text-primary-201" : "text-gray-800"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                    ))}
                </div>
                <p className="-mb-1 text-sm text-[#8C8985] md:text-lg">{rating}</p>
            </div>
        </div>
    )

}
