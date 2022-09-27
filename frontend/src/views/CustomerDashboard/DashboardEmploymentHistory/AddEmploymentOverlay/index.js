import React, { useEffect, useState } from "react";
import InputField from "../../../../components/InputField";
import SwitchSelection from "../../../../components/SwitchSelection";

import CloseIcon from "../../../../assets/svg/icon_close.svg";

export default function AddEmploymentOverlay({ showOverlay }) {
  const [companyName, setCompanyName] = useState("");
  const [employmentOccupation, setEmploymentOccupation] = useState("");
  const [employmentLocation, setEmploymentLocation] = useState("");
  const [employmentIncomeType, setEmploymentIncomeType] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [isCurrentWork, setIsCurrentWork] = useState(true);
  const [fromMonth, setFromMonth] = useState();
  const [fromYear, setFromYear] = useState();
  const [toMonth, setToMonth] = useState();
  const [toYear, setToYear] = useState();
  function MonthSelect({ value, setValue, disabled }) {
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
        className={` ${
          disabled ? "text-mischka" : "text-mineShaft"
        } flex items-center text-[13px] flex-col w-full h-12 pt-3 pb-3 pr-12 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-white border border-porcelain rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0`}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="">--</option>

        {monthsArray &&
          monthsArray.length > 0 &&
          monthsArray.map((month) => <option value={month}>{month}</option>)}
      </select>
    );
  }

  function YearSelect({ value, setValue, disabled }) {
    const numberOfYears = 45;
    let yearsArray = [];
    for (let i = 0; i < numberOfYears; i++) {
      let date = new Date();
      yearsArray.push(date.getFullYear() - i);
    }
    return (
      <select
        name="province"
        className={` ${
          disabled ? "text-mischka" : "text-mineShaft"
        } flex items-center text-[13px] flex-col w-full h-12 pt-3 pb-3 pr-12 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-white border border-porcelain rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0`}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="">--</option>
        {yearsArray &&
          yearsArray.length > 0 &&
          yearsArray.map((year) => <option value={year}>{year}</option>)}
      </select>
    );
  }

  useEffect(() => {
    if (isCurrentWork) {
      setToMonth("");
      setToYear("");
    }
  }, [isCurrentWork]);

  return (
    <>
      <div className="hidden absolute top-0 left-0 h-screen w-screen xl:flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              Employment details
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
                  label="Company name"
                  name="name"
                  type={"text"}
                  placeholder="Enter the company name"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Occupation"
                  name="occupation"
                  type={"text"}
                  placeholder="Enter your occupation"
                  onChange={(e) => {
                    setEmploymentOccupation(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
          </div>
          <div className="px-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Location
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={employmentLocation}
                    onChange={(e) => {
                      setEmploymentLocation(e.target.value);
                    }}
                  >
                    <option value="rent">Calgary, Alberta</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="incomeType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Income type
                  </label>
                  <select
                    name="incomeType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={employmentIncomeType}
                    onChange={(e) => {
                      setEmploymentIncomeType(e.target.value);
                    }}
                  >
                    <option value="rent">Salary</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="px-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="annualIncome"
                    className="text-mineShaft font-semibold"
                  >
                    Annual Income
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your annual income"
                    name="annualIncome"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
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
                  <YearSelect
                    value={toYear}
                    setValue={setToYear}
                    disabled={isCurrentWork}
                  ></YearSelect>
                </div>
                <div className="grow">
                  {" "}
                  <MonthSelect
                    value={toMonth}
                    setValue={setToMonth}
                    disabled={isCurrentWork}
                  ></MonthSelect>
                </div>
              </div>
            </div>
            <div className="flex bg-white rounded-xl m-4 p-4 items-center ">
              <SwitchSelection
                selected={isCurrentWork}
                onChange={setIsCurrentWork}
              ></SwitchSelection>
              <div className="tracking-widest text-primary font-semibold text-sm ml-4">
                CURRENT WORK
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
              Add employment details
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
              EMPLOYMENT DETAILS
            </h2>
          </div>
          <div className="mt-4 px-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Company name"
                  name="name"
                  type={"text"}
                  placeholder="Enter the company name"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Occupation"
                  name="occupation"
                  type={"text"}
                  placeholder="Enter your occupation"
                  onChange={(e) => {
                    setEmploymentOccupation(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Location
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={employmentLocation}
                    onChange={(e) => {
                      setEmploymentLocation(e.target.value);
                    }}
                  >
                    <option value="rent">Calgary, Alberta</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="incomeType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Income type
                  </label>
                  <select
                    name="incomeType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={employmentIncomeType}
                    onChange={(e) => {
                      setEmploymentIncomeType(e.target.value);
                    }}
                  >
                    <option value="rent">Salary</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="annualIncome"
                    className="text-mineShaft font-semibold"
                  >
                    Annual Income
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your annual income"
                    name="annualIncome"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 mt-8 mb-[100px] bg-whiteLilac rounded-xl flex flex-col mx-4">
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
                    disabled={isCurrentWork}
                  ></YearSelect>
                </div>
                <div className="shrink">
                  {" "}
                  <MonthSelect
                    value={toMonth}
                    setValue={setToMonth}
                    disabled={isCurrentWork}
                  ></MonthSelect>
                </div>
              </div>
            </div>
            <div className="flex bg-white rounded-xl m-4 p-4 items-center ">
              <SwitchSelection
                selected={isCurrentWork}
                onChange={setIsCurrentWork}
              ></SwitchSelection>
              <div
                className={`tracking-widest ${
                  isCurrentWork ? "text-primary" : "text-regentGray"
                } font-semibold text-sm ml-4`}
              >
                CURRENT WORK
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
              Add employment details
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
