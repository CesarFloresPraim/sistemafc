import React, { useState } from "react";
import CheckIcon from "../../../../assets/svg/icon_check_big.svg";

export default function AccountFocus() {
  const [goal, setSelectedGoal] = useState("purchase");

  return (
    <div className="flex flex-col w-[80%] md:w-1/2 mx-auto mb-[150px] mt-6">
      <h2 className=" text-xl md:text-2xl font-semibold text-mineShaft">
        What is your goal?
      </h2>
      <form className="flex flex-col w-full">
        <div
          onClick={() => setSelectedGoal("purchase")}
          className={`flex flex-col items-center border-[3px] py-10 mt-16 rounded-2xl ${
            goal == "purchase"
              ? "border-primary text-primary"
              : "border-none bg-whiteLilac text-regentGray"
          }`}
        >
          <div className="text-base">I want to</div>
          <div className="text-3xl font-semibold">Purchase</div>
        </div>
        <div
          onClick={() => setSelectedGoal("refinance")}
          className={`flex flex-col items-center border-[3px] py-10 mt-6 rounded-2xl ${
            goal == "refinance"
              ? "border-primary text-primary"
              : "border-none bg-whiteLilac text-regentGray"
          }`}
        >
          <div className="text-base">I want to</div>
          <div className="text-3xl font-semibold">Refinance</div>
        </div>
        <div
          onClick={() => setSelectedGoal("equity loan")}
          className={`flex flex-col items-center border-[3px] py-10 mt-6 rounded-2xl ${
            goal == "equity loan"
              ? "border-primary text-primary"
              : "border-none bg-whiteLilac text-regentGray"
          }`}
        >
          <div className="text-base">I want a</div>
          <div className="text-3xl font-semibold">Equity loan</div>
        </div>
      </form>
      <div className="w-full xl:hidden bg-white flex flex-col fixed left-4 bottom-0 py-4 ">
        <div
          onClick={() => showOverlay(false)}
          className="mr-8 py-4 flex justify-center items-center rounded-[32px] text-[13px] text-primary border border-porcelain"
        >
          Cancel
        </div>
        <div className="mr-8 py-1 mt-2 justify-center flex items-center rounded-[32px] text-[13px] text-white bg-primary">
          <CheckIcon fill="white"></CheckIcon>{" "}
          <div className="grow flex justify-center mr-4">Save changes</div>
        </div>
      </div>
    </div>
  );
}
