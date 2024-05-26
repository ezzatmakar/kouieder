"use client"
import { RiAddCircleFill } from "react-icons/ri"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Msg({ message, color }: any) {
    return (
        <div
            className={classNames(
                color === 'yellow' ? 'text-primary-800 bg-gray-100' : '',
                color === 'green' ? 'text-gray-200 bg-primary-300' : '',
                color === 'gray' ? 'text-gray-800 bg-gray-100' : '',
                color === 'red' ? 'text-red-800 bg-red-100' : '',
                'flex py-6 px-6 text-base mt-4 rounded-lg gap-3 items-center'
            )}
            role="alert">
            <RiAddCircleFill />
            <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    )
}
