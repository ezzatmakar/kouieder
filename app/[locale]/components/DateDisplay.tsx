import React from 'react';

function formatDate(dateString: any) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();

    const ordinalIndicator = getOrdinalIndicator(day);

    return (
        <span className="flex rtl:justify-end direction-ltr"> {day} {ordinalIndicator} {month}, {year}</span>
    );
}

function getOrdinalIndicator(day: any) {
    if (day === 11 || day === 12 || day === 13) {
        return <span className="text-xs align-super"> th</span>;
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return <span className="text-xs align-super"> st</span>;
        case 2:
            return <span className="text-xs align-super"> nd</span>;
        case 3:
            return <span className="text-xs align-super"> rd</span>;
        default:
            return <span className="text-xs align-super"> th</span>;
    }
}

export default function DateDisplay({ created_time }: any) {
    const formattedDate = formatDate(created_time);

    return (
        <div>
            {formattedDate}
        </div>
    );
}
