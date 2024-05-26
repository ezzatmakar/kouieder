import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function Timer({
  deadline,
  alt,
}: {
  deadline: string;
  alt?: boolean;
}) {
  if (!deadline) {
    return null;
  }
  const t = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //   const deadline = "2024-04-23T00:00:00Z"; // Use ISO 8601 format for dates

  const getTime = () => {
    const deadlineDate = new Date(
      parseInt(deadline.split("/")[2]), // Year
      parseInt(deadline.split("/")[1]) - 1, // Month (zero-based)
      parseInt(deadline.split("/")[0]) // Day
    );
    const time = deadlineDate.getTime() - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    setLoading(false);
  };
  useEffect(() => {
    const interval = setInterval(getTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to add leading zeros
  const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className={`timer flex gap-2.5 ${alt?"text-white":"text-black"}`}>
      {!loading && (
        <>
          <div className={`flex flex-col justify-center text-center`}>
            <span className="text-[11px] leading-5">
              {t("seconds")}
            </span>
            <span className={`inline-block w-12 rounded-[10px] text-center text-[26px] font-bold leading-[39px] ${alt?"bg-black bg-opacity-40 text-white":"bg-primary-11 bg-opacity-[14%] text-primary-500"}`}>
              {addLeadingZero(seconds)}
            </span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-[11px] leading-5">
              {t("minutes")}
            </span>
            <span className={`inline-block w-12 rounded-[10px] text-center text-[26px] font-bold leading-[39px] ${alt?"bg-black bg-opacity-40 text-white":"bg-primary-11 bg-opacity-[14%] text-primary-500"}`}>
              {addLeadingZero(minutes)}
            </span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-[11px] leading-5">
              {t("hours")}
            </span>
            <span className={`inline-block w-12 rounded-[10px] text-center text-[26px] font-bold leading-[39px] ${alt?"bg-black bg-opacity-40 text-white":"bg-primary-11 bg-opacity-[14%] text-primary-500"}`}>
              {addLeadingZero(hours)}
            </span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-[11px] leading-5">
              {t("days")}
            </span>
            <span className={`inline-block w-12 rounded-[10px] text-center text-[26px] font-bold leading-[39px] ${alt?"bg-black bg-opacity-40 text-white":"bg-primary-11 bg-opacity-[14%] text-primary-500"}`}>
              {addLeadingZero(days)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
