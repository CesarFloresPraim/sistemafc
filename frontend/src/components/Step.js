import React, { useEffect } from "react";

export default function Step({ stepNumber, currentStep, status, title, Icon }) {


  return (
    <div className="rounded-[32px] bg-white flex px-3 items-center">
      <div
        className={`flex flex-col rounded-full ${
            stepNumber === currentStep
            ? "bg-primary text-white"
            : stepNumber < currentStep
            ? "bg-[#e5f9f3] text-caribbeanGreen"
            : " bg-transparent border-2 border-[#E3E6E9] text-[#E3E6E9]"
        } h-8 w-8 text-center justify-center`}
      >
        {stepNumber}
      </div>
      <div
        className={`${
            stepNumber === currentStep ? "text-primary" : stepNumber < currentStep? "text-caribbeanGreen": "text-[#E3E6E9]"
        } text-sm font-semibold ml-3 tracking-widest`}
      >
        {title}
      </div>
      <div className="ml-auto">
        <Icon fill={stepNumber === currentStep ? "#0C3CFD" : stepNumber < currentStep? "#00C48B" : "#A7B1BB"} />
      </div>
    </div>
  );
}
