import React from "react";
import CheckIcon from "../../assets/svg/icon_check.svg";

const completedColor = "#00C48B";
const currentColor = "#0C3CFD";
const inactiveColor = "#A7B1BB";

export default function ClientSteps({ steps }) {
  return (
    <div className="flex w-full bg-whiteLilac rounded-xl py-4 px-2 items-center justify-center">
      {steps &&
        steps.length > 0 &&
        steps.map((item, idx, arr) => {
          if (arr.length - 1 != idx) {
            return (
              <div key={idx} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`rounded-full h-6 w-6 flex items-center justify-center ${
                      item?.status == "completed"
                        ? "bg-white"
                        : item?.status == "current"
                        ? "bg-primary"
                        : "bg-white"
                    }`}
                  >
                    {item?.status == "completed" ? (
                      <CheckIcon height="22" width="22" fill={completedColor}></CheckIcon>
                    ) : item?.status == "current" ? (
                      <div className="text-white text-[13px]">{item?.number}</div>
                    ) : (
                      <div className="text-regentGray text-[13px]">{item?.number}</div>
                    )}
                  </div>
                  <div
                    className={`hidden md:block  text-[13px] tracking-wider ml-1 font-semibold ${
                      item?.status == "completed"
                        ? "text-caribbeanGreen"
                        : item?.status == "current"
                        ? "text-primary"
                        : "text-regentGray"
                    }`}
                  >
                    {item?.name.toUpperCase()}
                  </div>
                </div>
                <div className="flex 2xl:mx-4 mx-1">
                  <div className={`hidden 2xl:block rounded-full h-1 w-1 bg-mischka mr-[2px]`}></div>
                  <div className={`hidden 2xl:block rounded-full h-1 w-1 bg-mischka mr-[2px]`}></div>
                  <div className={`hidden 2xl:block rounded-full h-1 w-1 bg-mischka mr-[2px]`}></div>
                  <div className={`hidden 2xl:block rounded-full h-1 w-1 bg-mischka mr-[2px]`}></div>
                  <div className={`rounded-full h-1 w-1 bg-mischka mr-[2px]`}></div>
                </div>
              </div>
            );
          }
          return (
            <div className="flex items-center" key={idx}>
              <div
                className={`rounded-full h-6 w-6 flex items-center justify-center ${
                  item?.status == "completed"
                    ? "bg-white"
                    : item?.status == "current"
                    ? "bg-primary"
                    : "bg-white"
                }`}
              >
                {item?.status == "completed" ? (
                  <CheckIcon fill={completedColor}></CheckIcon>
                ) : item?.status == "current" ? (
                  <div className="text-white text-[13px]">{item?.number}</div>
                ) : (
                  <div className="text-regentGray text-[13px]">{item?.number}</div>
                )}
              </div>
              <div
                className={`hidden md:block text-[13px] tracking-wider ml-3 font-semibold ${
                  item?.status == "completed"
                    ? "text-caribbeanGreen"
                    : item?.status == "current"
                    ? "text-primary"
                    : "text-regentGray"
                }`}
              >
                {item?.name.toUpperCase()}
              </div>
            </div>
          );
        })}
    </div>
  );
}
