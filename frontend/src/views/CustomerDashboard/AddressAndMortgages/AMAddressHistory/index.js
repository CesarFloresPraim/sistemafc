import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setMobileOverlayOpened } from "../../../../store/actionCreators/general";

import InputField from "../../../../components/InputField";
import AddHistoryOverlay from "./AddHistoryOverlay";

import PlusIcon from "../../../../assets/svg/icon_plus.svg";
import RightArrowIcon from "../../../../assets/svg/icon_arrow_right.svg";
import ClockIcon from "../../../../assets/svg/icon_clock.svg";
import AddressHistoryIconBlue from "../../../../assets/svg/address_history/icon_address-history_blue-ribbon.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";
import TrashIcon from "../../../../assets/svg/icon_trash.svg";
import DisclaimerIcon from "../../../../assets/svg/icon_disclaimer_warning.svg";

export default function AMAddressHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [brokerageName, setBrokerageName] = useState("");
  const [brokerageLicense, setBrokerageLicense] = useState("");
  const [showAddressHistoryOverlay, setShowAddressHistoryOverlay] =
    useState(false);
  const [addressHistory, setAddressHistory] = useState([
    {
      propertyType: "House",
      position: "214 11 Ave SW, Calgary, AB T2R 0K1, Canadá",
      place: "Calgary, AB",
      from: "January, 2020",
      to: "present date",
      isCurrent: true,
      rentAmount: "$13,750",
      addressType: "Rent",
    },
    {
      propertyType: "Appartment",
      position: "214 11 Ave SW, Calgary, AB T2R 0K1, Canadá",
      place: "Montreal, QC",
      from: "January, 2020",
      to: "December, 2019",
      isCurrent: false,
      rentAmount: "$13,750",
      addressType: "Own",
    },
    {
      propertyType: "House",
      position: "214 11 Ave SW, Calgary, AB T2R 0K1, Canadá",
      place: "Calgary, AB",
      from: "January, 2020",
      to: "present date",
      isCurrent: false,
      rentAmount: "--",
      addressType: "Rent",
    },
  ]);

  const onAddressSubmit = () => {
    navigate({
      pathname: "/employment-history",
    });
  };

  const buttonDisabled = () => {
    return addressHistory.length < 1;
  };

  useEffect(() => {
    if (showAddressHistoryOverlay) {
      dispatch(setMobileOverlayOpened(true));
    } else {
      dispatch(setMobileOverlayOpened(false));
    }
  }, [showAddressHistoryOverlay]);

  return (
    <div className="md:m-auto px-6 md:w-11/12 w-full flex flex-col grow h-full pt-16">
      <form className="flex flex-col grow w-full mx-auto">
        <div className="flex flex-col">
          <div className="flex bg-seashellPeach rounded-[40px] p-4 px-4 items-center">
            <div>
              <DisclaimerIcon fill="#FF6414"></DisclaimerIcon>
            </div>
            <div className="text-[#FF6414] grow text-center text-[13px]">
              We require a 3 year history for this section to be 100% complete
            </div>
          </div>
          {addressHistory &&
            addressHistory.length > 0 &&
            addressHistory.map((item, idx) => {
              return (
                <>
                  <div className="hidden md:flex lg:flex xl:flex border border-porcelain rounded-2xl p-4 mt-4">
                    <div className="flex flex-col flex-1 ml-4">
                      <div className="flex">
                        <AddressHistoryIconBlue></AddressHistoryIconBlue>
                        <div className="flex flex-col ml-4">
                          <div className="text-mineShaft text-base font-semibold">
                            {item.propertyType}
                          </div>
                          <div className="text-regentGray text-[13px]">
                            {item.position} · {item.place}
                          </div>
                        </div>
                        <div className="flex ml-auto items-center">
                          {item?.addressType && item?.addressType != "" && (
                            <div className="flex flex-col mr-6">
                              <div className="text-regentGray text-[13px] text-right">
                                Address type
                              </div>
                              <div className="text-mineShaft font-semibold text-sm text-right">
                                {item.addressType}
                              </div>
                            </div>
                          )}
                          {item?.rentAmount && item?.rentAmount != "" && (
                            <div className="flex flex-col mr-4">
                              <div className="text-regentGray text-[13px] text-right">
                                Rent amount
                              </div>
                              <div className="text-mineShaft font-semibold text-sm text-right">
                                {item.rentAmount}
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
                      <div className="flex mt-4 bg-whiteLilac rounded-xl items-center py-1 px-5">
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
                        {item?.isCurrent && (
                          <div className="ml-auto  tracking-widest font-semibold text-[13px] text-primary rounded-[32px] bg-white py-1 px-6">
                            CURRENT ADDRESS
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/** Mobile */}
                  <div className="flex flex-col border md:hidden  border-porcelain rounded-2xl p-4 mt-4">
                    <AddressHistoryIconBlue></AddressHistoryIconBlue>
                    <div className="flex flex-col mt-4">
                      <div className="text-mineShaft text-base font-semibold">
                        {item.propertyType}
                      </div>
                      <div className="text-regentGray text-[13px]">
                        {item.position}
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      {item?.addressType && item?.addressType != "" && (
                        <div className="flex flex-col mr-6">
                          <div className="text-regentGray text-[13px] text-right">
                            Address type
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.addressType}
                          </div>
                        </div>
                      )}
                      {item?.rentAmount && item?.rentAmount != "" && (
                        <div className="flex flex-col mr-4">
                          <div className="text-regentGray text-[13px] text-right">
                            Rent amount
                          </div>
                          <div className="text-mineShaft font-semibold text-sm text-right">
                            {item.rentAmount}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mt-4 bg-whiteLilac rounded-xl items-center py-1 px-5">
                      <div className="flex">
                        <ClockIcon></ClockIcon>{" "}
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
                      {item?.isCurrent && (
                        <div className="tracking-widest font-semibold text-[13px] text-primary rounded-[32px] bg-white py-1 px-6">
                          CURRENT ADDRESS
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="mt-6">
          <div
            className={`w-full flex flex-col items-center justify-center px-6 py-16 mt-8 border-[3px] border-mischka bg-whiteLilac  border-dashed rounded-2xl`}
          >
            <button
              type="button"
              onClick={() => setShowAddressHistoryOverlay(true)}
              className="flex pr-4 items-center bg-white border border-porcelain rounded-3xl"
            >
              <div>
                <PlusIcon fill="#0C3CFD"></PlusIcon>{" "}
              </div>
              <div className="text-primary font-semibold text-[13px]">
                Add address details
              </div>
            </button>
          </div>
        </div>
      </form>
      {showAddressHistoryOverlay && (
        <AddHistoryOverlay
          showOverlay={setShowAddressHistoryOverlay}
        ></AddHistoryOverlay>
      )}
    </div>
  );
}
