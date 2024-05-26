
// import { Link } from "@/navigation";
import { Link } from "@/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Button({ name, style = "solid", onClick, width = "auto", href, extraclass, type = "button" ,disabled , testid}: any) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <>
            {href ?
                <Link prefetch={false}
                    href={href}
                    className={classNames(
                        style === 'border' ? 'text-gray-700 bg-white border border-gray-300 shadow-lg hover:bg-gray-50' : '',
                        style === 'solid' ? 'text-white border border-transparent bg-gray-200 hover:bg-primary-100' : '',
                        style === 'solid-red' ? 'text-white border border-transparent bg-red-600 hover:bg-red-800' : '',
                        width === 'auto' ? 'inline-flex ' : '',
                        width === 'full' ? 'flex w-full' : '',
                        'items-center justify-center md:px-10 md:py-5 py-2 px-5 font-semibold text-base md:text-xl rounded-100 shadow-sm  sm:flex-grow-0',
                        extraclass ? extraclass : '',
                    )}
                >
                    {name}
                </Link>
                :
                <button
                    className={classNames(
                        style === 'border' ? 'text-gray-700 bg-white border border-gray-300 shadow-lg hover:bg-gray-50' : '',
                        style === 'solid' ? 'text-white border border-transparent bg-primary-300 hover:bg-primary-400' : '',
                        style === 'solid-red' ? 'text-white border border-transparent bg-red-600 hover:bg-red-800' : '',
                        width === 'auto' ? 'inline-flex ' : '',
                        width === 'full' ? 'flex w-full' : '',
                        'items-center justify-center md:px-10 md:py-[16px] py-2 px-5 font-semibold text-base md:text-xl rounded-lg shadow-sm sm:flex-grow-0',
                        extraclass ? extraclass : '',
                    )}
                    type={type}
                    onClick={handleClick}
                    disabled={disabled}
                    data-testid={testid}
                >
                    {name}
                </button>
            }
        </>

    )
}
