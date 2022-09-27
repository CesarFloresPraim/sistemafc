import React, { useState } from "react";

import PropertyIconBlue from "../../../../assets/svg/properties/icon_property-blue-ribbon.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";
import TrashIcon from "../../../../assets/svg/icon_trash.svg";
import ExpandIcon from "../../../../assets/svg/icon_expand.svg";
import ClockIcon from "../../../../assets/svg/icon_clock.svg";

export default function MyMortgages() {
  const [showMortgageOverlay, setShowMortgageOverlay] = useState(false);
  const [mortgages, setMortgages] = useState([
    {
      type: "House",
      address: "214 11 Ave SW, Calgary, AB T2R 0K1, Canadá",
      estimatedValue: "$ 500,000.00",
      currentMortgage: "$ 201,332.00",
      remainingAmortization: "26 years",
      remainingTerm: "12 months",
      nextPaymentDate: "September 1st, 2021",
      rateType: "Fixed rate",
      interestRate: "2.29%",
      from: "JANUARY, 2020",
      to: "PRESENT DATE",
    },
  ]);

  return (
    <div className="flex flex-col px-6 lg:px-12">
      {mortgages &&
        mortgages.length > 0 &&
        mortgages.map((item, idx) => {
          return (
            <>
              {/** Desktop */}
              <div className="hidden md:flex lg:flex xl:flex border border-porcelain rounded-2xl p-4 mt-4">
                <div className="flex flex-col flex-1 ml-4">
                  <div className="flex">
                    <PropertyIconBlue></PropertyIconBlue>
                    <div className="flex flex-col ml-4">
                      <div className="text-mineShaft text-base font-semibold">
                        {item.type}
                      </div>
                      <div className="text-regentGray text-[13px]">
                        {item.address}
                      </div>
                    </div>
                    <div className="flex ml-auto items-center">
                      {item?.estimatedValue && item?.estimatedValue != "" && (
                        <div className="flex flex-col mr-6">
                          <div className="text-regentGray text-[13px] text-right">
                            Estimated property value:
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.estimatedValue}
                          </div>
                        </div>
                      )}
                      {item?.currentMortgage && item?.currentMortgage != "" && (
                        <div className="flex flex-col mr-4">
                          <div className="text-regentGray text-[13px] text-right">
                            Your current mortgage
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.currentMortgage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col bg-whiteLilac rounded-xl w-full justify-center p-2 px-4 mt-4">
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">
                        Remaining amortization
                      </div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.remainingAmortization}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Remaining term</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.remainingTerm}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Next payment date</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.nextPaymentDate}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Rate type</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.rateType}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Interest rate</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.interestRate}
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-4 bg-whiteLilac rounded-xl items-center py-2 pl-3">
                    <div>
                      <ClockIcon></ClockIcon>{" "}
                    </div>
                    <div className="flex text-regentGray text-[13px] tracking-widest">
                      <span className="">FROM&nbsp;</span>
                      <span className="text-mineShaft  font-semibold">
                        {item.from.toLocaleUpperCase()}&nbsp;
                      </span>
                      <span className="">TO&nbsp;</span>
                      <span className="text-mineShaft font-semibold">
                        {item.to.toLocaleUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/** Mobile */}
              <div className="flex flex-col border md:hidden lg:hidden  border-porcelain rounded-2xl p-4 py-1 pb-4 m-4">
                <div className="flex flex-col flex-1 mt-4">
                  <div className="flex flex-col">
                    <PropertyIconBlue></PropertyIconBlue>
                    <div className="flex flex-col mt-4">
                      <div className="text-mineShaft text-base font-semibold">
                        {item.type}
                      </div>
                      <div className="text-regentGray text-[13px]">
                        {item.address}
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      {item?.estimatedValue && item?.estimatedValue != "" && (
                        <div className="flex flex-col mr-6">
                          <div className="text-regentGray text-[13px] text-left">
                            Estimated property value:
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-left">
                            {item.estimatedValue}
                          </div>
                        </div>
                      )}
                      {item?.currentMortgage && item?.currentMortgage != "" && (
                        <div className="flex flex-col mr-4">
                          <div className="text-regentGray text-[13px] text-left">
                            Your current mortgage
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-left">
                            {item.currentMortgage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col bg-whiteLilac rounded-xl w-full justify-center p-2 px-4 mt-4">
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">
                        Remaining amortization
                      </div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto text-right">
                        {item.remainingAmortization}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Remaining term</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto text-right">
                        {item.remainingTerm}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Next payment date</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto text-right">
                        {item.nextPaymentDate}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Rate type</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto text-right">
                        {item.rateType}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Interest rate</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto text-right">
                        {item.interestRate}
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-4 bg-whiteLilac rounded-xl items-center py-2 pl-3">
                    <div>
                      <ClockIcon></ClockIcon>{" "}
                    </div>
                    <div className="flex text-regentGray text-[13px] tracking-widest">
                      <span className="">FROM&nbsp;</span>
                      <span className="text-mineShaft  font-semibold">
                        {item.from.toLocaleUpperCase()}&nbsp;
                      </span>
                      <span className="">TO&nbsp;</span>
                      <span className="text-mineShaft font-semibold">
                        {item.to.toLocaleUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}
