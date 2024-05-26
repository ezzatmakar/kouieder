"use client";
import { useTranslations } from "next-intl";
import { RiCheckLine } from "react-icons/ri";

interface StepProps {
  title: string;
  lineClass: string;
  check: boolean;
  currentStep: number;
  stepNumber: number;
}

function Step({ lineClass, check, currentStep, stepNumber }: StepProps) {
  const t = useTranslations("common");
  const title = t(`trackingSteps.step${stepNumber}`);
  const titleExtra = t(`trackingSteps.stepExtra${stepNumber}`);
  return (
    <div
      className={`relative flex w-full gap-4 items-center md:flex-col 
        ${
          stepNumber === 4
            ? ""
            : "after:content-[''] md:after:w-full after:w-[2px] after:h-full md:after:h-[2px] after:bg-[#EDEFEB] after:inline-block after:absolute rtl:md:after:right-1/2 ltr:md:after:left-1/2 md:after:top-4 after:top-full ltr:after:left-[17px] rtl:after:right-[17px] md:after:mt-0 after:-mt-1"
        }
`}
    >
      <div className="relative z-10 flex items-center justify-center">
        {check ? (
          <span className="flex h-9 w-9 items-center justify-center rounded bg-primary-300 pt-1 font-semibold text-white">
            <RiCheckLine />
          </span>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded bg-gray-200 text-black">
            {stepNumber}
          </span>
        )}
      </div>
      <div className="text-sm font-semibold">
        {title}
        <span className="block font-medium text-gray-50">{titleExtra}</span>
      </div>
    </div>
  );
}

export default function TrackingSteps({ step }: { step: number }) {
  const t = useTranslations("common");
  let errorMessage = "";
  switch (step) {
    case -1:
      errorMessage = t("status.cancelled");
      break;
    case 5:
      errorMessage = t("status.refunded");
      break;
    case 6:
      errorMessage = t("status.failed");
      break;
    default:
      errorMessage = "";
      break;
  }
  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-4 md:text-center">
      {errorMessage ? (
        <p className="m-auto text-red-400">{errorMessage}</p>
      ) : step === 7 ? (
        ""
      ) : (
        <>
          <Step
            title={t("trackingSteps.step1")}
            lineClass="end"
            check={step >= 1}
            currentStep={step}
            stepNumber={1}
          />
          <Step
            title={t("trackingSteps.step2")}
            lineClass="center"
            check={step >= 2}
            currentStep={step}
            stepNumber={2}
          />
          <Step
            title={t("trackingSteps.step3")}
            lineClass="center"
            check={step > 2}
            currentStep={step}
            stepNumber={3}
          />
          <Step
            title={t("trackingSteps.step4")}
            lineClass="start"
            check={step > 3}
            currentStep={step}
            stepNumber={4}
          />
        </>
      )}
    </div>
  );
}
