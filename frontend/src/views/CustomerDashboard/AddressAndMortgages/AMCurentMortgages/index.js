import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setMobileOverlayOpened } from "../../../../store/actionCreators/general";

import AddMortgageOverlay from "./AddMortgageOverlay";

import PropertyIconBlue from "../../../../assets/svg/properties/icon_property-blue-ribbon.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";
import TrashIcon from "../../../../assets/svg/icon_trash.svg";
import ExpandIcon from "../../../../assets/svg/icon_expand.svg";
import ClockIcon from "../../../../assets/svg/icon_clock.svg";
import PlusIcon from "../../../../assets/svg/icon_plus.svg";

export default function AMCurentMortgages() {
  const dispatch = useDispatch();

  const [showMortgageOverlay, setShowMortgageOverlay] = useState(false);
  const [mortgages, setMortgages] = useState([
    {
      type: "House",
      ownOutright: "No",
      address: "214 11 Ave SW, Calgary, AB T2R 0K1, Canadá",
      termType: "Fixed",
      isCurrent: true,
      mortgageBalance: "$200,000",
      monthlyPayments: "$800.00",
      originalBalance: "$300,000.00",
      lender: "Scotiabank",
      frequency: "Monthly",
      frequency2: "Monthly",
      from: "JANUARY, 2020",
      to: "PRESENT DATE",
    },
  ]);

  useEffect(() => {
    if (showMortgageOverlay) {
      dispatch(setMobileOverlayOpened(true));
    } else {
      dispatch(setMobileOverlayOpened(false));
    }
  }, [showMortgageOverlay]);

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
                      {item?.ownOutright && item?.ownOutright != "" && (
                        <div className="flex flex-col mr-6">
                          <div className="text-regentGray text-[13px] text-right">
                            Own outright
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.ownOutright}
                          </div>
                        </div>
                      )}
                      {item?.termType && item?.termType != "" && (
                        <div className="flex flex-col mr-4">
                          <div className="text-regentGray text-[13px] text-right">
                            Term type
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.termType}
                          </div>
                        </div>
                      )}
                      <div className="hover:bg-whiteLilac rounded-full">
                        {" "}
                        <EditIcon fill="#8595A3"></EditIcon>
                      </div>
                      <div className="hover:bg-whiteLilac rounded-full">
                        <TrashIcon fill="#FB3F3F"></TrashIcon>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-whiteLilac rounded-xl w-full justify-center p-2 px-4 mt-4">
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Mortgage balance</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.mortgageBalance}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Monthly payments</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.monthlyPayments}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Frequency of payments</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.frequency}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Original balance</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.originalBalance}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Lender</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.lender}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">Frequency of payments</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.frequency2}
                      </div>
                    </div>
                  </div>
                  <div className="flex border border-porcelain rounded-2xl pl-5 py-2 items-center mt-4">
                    <div className="text-mineShaft text-base font-semibold">
                      Additional mortgage
                    </div>
                    <div className="ml-auto">
                      <ExpandIcon fill="#8595A3"></ExpandIcon>{" "}
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
              <div className="flex flex-col border md:hidden lg:hidden  border-porcelain rounded-2xl p-4 py-4 mt-4">
                <PropertyIconBlue></PropertyIconBlue>
                <div className="flex flex-col mt-4">
                  <div className="text-mineShaft text-base font-semibold">
                    {item.type}
                  </div>
                  <div className="text-regentGray text-[13px]">
                    {item.address}
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  {item?.ownOutright && item?.ownOutright != "" && (
                    <div className="flex flex-col mr-6">
                      <div className="text-regentGray text-[13px] text-left">
                        Own outright
                      </div>
                      <div className="text-mineShaft font-semibold text-sm text-left">
                        {item.ownOutright}
                      </div>
                    </div>
                  )}
                  {item?.termType && item?.termType != "" && (
                    <div className="flex flex-col mr-4">
                      <div className="text-regentGray text-[13px] text-left">
                        Term type
                      </div>
                      <div className="text-mineShaft font-semibold text-sm text-left">
                        {item.termType}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col bg-whiteLilac rounded-xl w-full justify-center p-2 px-4 mt-4">
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Mortgage balance</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.mortgageBalance}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-porcelain"></div>
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Monthly payments</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.monthlyPayments}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-porcelain"></div>
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Frequency of payments</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.frequency}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-porcelain"></div>
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Original balance</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.originalBalance}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-porcelain"></div>
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Lender</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.lender}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-porcelain"></div>
                  <div className="text-regentGray text-[13px] flex p-2">
                    <div className="">Frequency of payments</div>
                    <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                      {item.frequency2}
                    </div>
                  </div>
                </div>
                <div className="flex border border-porcelain rounded-2xl pl-5 py-2 items-center mt-4">
                  <div className="text-mineShaft text-base font-semibold">
                    Additional mortgage
                  </div>
                  <div className="ml-auto">
                    <ExpandIcon fill="#8595A3"></ExpandIcon>{" "}
                  </div>
                </div>
                <div className="flex mt-4 bg-whiteLilac rounded-xl items-center py-2 pl-3">
                  <div>
                    <ClockIcon></ClockIcon>{" "}
                  </div>
                  <div className="flex flex-col text-regentGray text-[13px] tracking-widest">
                    <p className="flex ">
                      <span className="">FROM&nbsp;</span>
                      <span className="text-mineShaft  font-semibold whitespace-nowrap">
                        {item.from.toLocaleUpperCase()}&nbsp;
                      </span>
                      <span className="">TO&nbsp;</span>
                    </p>
                    <p className="text-mineShaft font-semibold whitespace-nowrap">
                      {item.to.toLocaleUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      <div className="mt-6">
        <div
          className={`w-full flex flex-col items-center justify-center px-6 py-16 mt-8 border-[3px] border-mischka bg-whiteLilac  border-dashed rounded-2xl`}
        >
          <button
            type="button"
            onClick={() => setShowMortgageOverlay(true)}
            className="flex pr-4 items-center bg-white border border-porcelain rounded-3xl"
          >
            <div>
              <PlusIcon fill="#0C3CFD"></PlusIcon>{" "}
            </div>
            <div className="text-primary font-semibold text-[13px]">
              Add mortgage details
            </div>
          </button>
        </div>
      </div>
      {showMortgageOverlay && (
        <AddMortgageOverlay
          showOverlay={setShowMortgageOverlay}
        ></AddMortgageOverlay>
      )}
    </div>
  );
}
