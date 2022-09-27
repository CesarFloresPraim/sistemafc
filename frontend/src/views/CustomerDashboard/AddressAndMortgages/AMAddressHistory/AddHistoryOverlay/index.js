import React, { useState } from "react";
import InputField from "../../../../../components/InputField";
import SwitchSelection from "../../../../../components/SwitchSelection";

import CloseIcon from "../../../../../assets/svg/icon_close.svg";

export default function AddHistoryOverlay({ showOverlay }) {
  const [address, setAddress] = useState("rent");
  const [addressType, setAddressType] = useState("rent");
  const [isCurrentAddress, setIsCurrentAddress] = useState(true);
  const [fromMonth, setFromMonth] = useState();
  const [fromYear, setFromYear] = useState();
  const [toMonth, setToMonth] = useState();
  const [toYear, setToYear] = useState();
  function MonthSelect({ value, setValue }) {
    const monthsArray = [
      "Januray",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <select
        name="province"
        className={`flex items-center text-[13px] flex-col w-full h-12 pt-3 pb-3 pr-12 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-white border border-porcelain rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {monthsArray &&
          monthsArray.length > 0 &&
          monthsArray.map((month) => <option value={month}>{month}</option>)}
      </select>
    );
  }

  function YearSelect({ value, setValue }) {
    const numberOfYears = 45;
    let yearsArray = [];
    for (let i = 0; i < numberOfYears; i++) {
      let date = new Date();
      yearsArray.push(date.getFullYear() - i);
    }
    return (
      <select
        name="province"
        className={`flex items-center text-[13px] flex-col w-full h-12 pt-3 pb-3 pr-12 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-white border border-porcelain rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {yearsArray &&
          yearsArray.length > 0 &&
          yearsArray.map((year) => <option value={year}>{year}</option>)}
      </select>
    );
  }

  return (
    <>
      {/** Desktop */}
      <div className="hidden absolute top-0 left-0 h-screen w-screen xl:flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              Address details
            </h2>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Address"
                  name="name"
                  type={"text"}
                  placeholder="Enter address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
              <div className="mt-4">
                  <label
                    htmlFor="province"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Rent or own?
                  </label>
                  <select
                    name="province"
                    className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
                    value={addressType}
                    onChange={(e) => {
                      setAddressType(e.target.value);
                    }}
                  >
                    <option value="rent">Rent</option>
                    <option value="own">Own</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-8 bg-whiteLilac rounded-xl flex flex-col mx-16">
            <div className="grid grid-cols-2 gap-4 mt-4 ">
              <div className="flex col-span-2 lg:col-span-1 items-center">
                <div className="text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                  FROM:
                </div>
                <div className="shrink">
                  <YearSelect
                    value={fromYear}
                    setValue={setFromYear}
                  ></YearSelect>
                </div>
                <div className="grow">
                  {" "}
                  <MonthSelect
                    value={fromMonth}
                    setValue={setFromMonth}
                  ></MonthSelect>
                </div>
              </div>
              <div className="flex col-span-2 lg:col-span-1 items-center">
                <div className="text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                  TO:
                </div>
                <div className="shrink">
                  <YearSelect value={toYear} setValue={setToYear}></YearSelect>
                </div>
                <div className="grow">
                  {" "}
                  <MonthSelect
                    value={toMonth}
                    setValue={setToMonth}
                  ></MonthSelect>
                </div>
              </div>
            </div>
            <div className="flex bg-white rounded-xl m-4 p-4 items-center ">
              <SwitchSelection
                selected={isCurrentAddress}
                onChange={setIsCurrentAddress}
              ></SwitchSelection>
              <div className="tracking-widest text-primary font-semibold text-sm ml-4">
                CURRENT ADDRESS
              </div>
            </div>
          </div>
          <div className="mt-auto ml-auto mb-16 mr-16 flex">
            <div
              onClick={() => showOverlay(false)}
              className=" flex items-center rounded-[32px] py-5 px-8 text-[13px] text-primary border border-porcelain"
            >
              Cancel
            </div>
            <div className=" flex items-center rounded-[32px] py-5 px-8 ml-4 text-[13px] text-white bg-primary">
              Add address details
            </div>
          </div>
        </div>
      </div>
      {/** Mobile */}
      <div className="flex fixed top-0 left-0 h-screen w-screen xl:hidden flex-col z-[100] bg-[#23232399]">
        <div className=" h-1/6 " onClick={() => showOverlay(false)}></div>
        <div className=" h-5/6 bg-white rounded-t-[32px] flex flex-col overflow-y-scroll hide-scrollbar">
          <div className="flex justify-center mt-8 items-center">
            <h2 className=" text-[13px] font-semibold text-center tracking-widest">
              ADDRESS DETAILS
            </h2>
          </div>
          <div className="px-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Address"
                  name="name"
                  type={"text"}
                  placeholder="Enter address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
              <div className="mt-4">
                  <label
                    htmlFor="province"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Rent or own?
                  </label>
                  <select
                    name="province"
                    className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
                    value={addressType}
                    onChange={(e) => {
                      setAddressType(e.target.value);
                    }}
                  >
                    <option value="rent">Rent</option>
                    <option value="own">Own</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-8 mb-[100px] bg-whiteLilac rounded-xl flex flex-col mx-4">
            <div className="grid grid-cols-2 gap-4 mt-4 ">
              <div className="flex col-span-2 lg:col-span-1 items-center">
                <div className="text-regentGray  grow text-[13px] mr-2 font-semibold tracking-wider">
                  FROM:
                </div>
                <div className="skrink">
                  <YearSelect
                    value={fromYear}
                    setValue={setFromYear}
                  ></YearSelect>
                </div>
                <div className="skrink">
                  {" "}
                  <MonthSelect
                    value={fromMonth}
                    setValue={setFromMonth}
                  ></MonthSelect>
                </div>
              </div>
              <div className="flex col-span-2 lg:col-span-1 items-center">
                <div className="text-regentGray grow text-[13px] mr-2 font-semibold tracking-wider">
                  TO:
                </div>
                <div className="shrink">
                  <YearSelect
                    value={toYear}
                    setValue={setToYear}
                    disabled={isCurrentAddress}
                  ></YearSelect>
                </div>
                <div className="shrink">
                  {" "}
                  <MonthSelect
                    value={toMonth}
                    setValue={setToMonth}
                    disabled={isCurrentAddress}
                  ></MonthSelect>
                </div>
              </div>
            </div>
            <div className="flex bg-white rounded-xl m-4 p-4 items-center ">
              <SwitchSelection
                selected={isCurrentAddress}
                onChange={setIsCurrentAddress}
              ></SwitchSelection>
              <div
                className={`tracking-widest ${
                  isCurrentAddress ? "text-primary" : "text-regentGray"
                } font-semibold text-sm ml-4`}
              >
                CURRENT ADDRESS
              </div>
            </div>
          </div>
          <div className="w-full bg-white flex fixed bottom-0 py-4 items-center justify-center">
            <div
              onClick={() => showOverlay(false)}
              className="ml-auto flex items-center rounded-[32px] py-5 px-8 text-[13px] text-primary border border-porcelain"
            >
              Cancel
            </div>
            <div className="mr-4 flex items-center rounded-[32px] py-5 px-8 ml-4 text-[13px] text-white bg-primary">
              Add address details
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
