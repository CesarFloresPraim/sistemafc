import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/InputField";
import SwitchSelection from "../../../../../components/SwitchSelection";

import CloseIcon from "../../../../../assets/svg/icon_close.svg";

export default function AddMortgageOverlay({ showOverlay }) {
  const [address, setAddress] = useState("");
  const [homeType, setHomeType] = useState("");
  const [ownOutright, setOwnOutright] = useState("");
  const [mortgageBalance, setMortgageBalance] = useState("");
  const [monthlyPayments, setMonthlyPayments] = useState("");
  const [frequency, setFrequency] = useState("");
  const [originalBalance, setOriginalBalance] = useState("");
  const [lender, setLender] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [termType, setTermType] = useState("");
  const [isAdditionalMortgage, setIsAdditionalMortgage] = useState(false);
  const [fromMonth, setFromMonth] = useState();
  const [fromYear, setFromYear] = useState();
  const [toMonth, setToMonth] = useState();
  const [toYear, setToYear] = useState();
  const [isCurrentAddress, setIsCurrentAddress] = useState(true);

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
    if (isCurrentAddress) {
      setToMonth("");
      setToYear("");
    }
  }, [isCurrentAddress]);

  return (
    <>
      <div className="hidden absolute top-0 left-0 h-screen w-screen xl:flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              MORTGAGE DETAILS
            </h2>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-16">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Address"
                  name="address"
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
                    htmlFor="homeType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Home type
                  </label>
                  <select
                    name="homeType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={homeType}
                    onChange={(e) => {
                      setHomeType(e.target.value);
                    }}
                  >
                    <option value="rent">Single Family Detached</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Do you own this home outright?
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={ownOutright}
                    onChange={(e) => {
                      setOwnOutright(e.target.value);
                    }}
                  >
                    <option value="rent">No</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="mortgageBalance"
                    className="text-mineShaft font-semibold"
                  >
                    Mortgage balance
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your mortgage balance"
                    name="mortgageBalance"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="monthlyPayments"
                    className="text-mineShaft font-semibold"
                  >
                    Monthly payments
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your monthly payments"
                    name="monthlyPayments"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Frequency of payments
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={frequency}
                    onChange={(e) => {
                      setFrequency(e.target.value);
                    }}
                  >
                    <option value="rent">Monthly</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="originalBalance"
                    className="text-mineShaft font-semibold"
                  >
                    Original balance
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your original balance"
                    name="originalBalance"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="lender"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Lender
                  </label>
                  <select
                    name="lender"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={lender}
                    onChange={(e) => {
                      setLender(e.target.value);
                    }}
                  >
                    <option value="rent">Scotiobank</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Maturirty date"
                  name="name"
                  type={"text"}
                  placeholder="Enter the maturity date"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="termType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Term type
                  </label>
                  <select
                    name="termType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={termType}
                    onChange={(e) => {
                      setTermType(e.target.value);
                    }}
                  >
                    <option value="rent">Fixed</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border border-porcelain rounded-2xl p-5 mx-16 items-center mt-4">
            <div className="text-mineShaft text-xl ">
              I have an{" "}
              <span className="font-semibold">additional mortgage</span> on this
              property
            </div>
            <div className="ml-auto">
              <SwitchSelection
                selected={isAdditionalMortgage}
                onChange={setIsAdditionalMortgage}
              ></SwitchSelection>
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
                    disabled={isCurrentAddress}
                  ></YearSelect>
                </div>
                <div className="grow">
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
          <div className="mt-8 ml-auto mb-16 mr-16 flex">
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
      {/** MOBILE */}
      <div className="flex fixed top-0 left-0 h-screen w-screen xl:hidden flex-col z-[100] bg-[#23232399]">
        <div className=" h-1/6 " onClick={() => showOverlay(false)}></div>
        <div className=" h-5/6 bg-white rounded-t-[32px] flex flex-col overflow-y-scroll hide-scrollbar">
          <div className="flex justify-center mt-8 items-center">
            <h2 className=" text-[13px] font-semibold text-center tracking-widest">
              MORTGAGE DETAILS
            </h2>
          </div>
          <div className="px-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Address"
                  name="address"
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
                    htmlFor="homeType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Home type
                  </label>
                  <select
                    name="homeType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={homeType}
                    onChange={(e) => {
                      setHomeType(e.target.value);
                    }}
                  >
                    <option value="rent">Single Family Detached</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Do you own this home outright?
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={ownOutright}
                    onChange={(e) => {
                      setOwnOutright(e.target.value);
                    }}
                  >
                    <option value="rent">No</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="mortgageBalance"
                    className="text-mineShaft font-semibold"
                  >
                    Mortgage balance
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your mortgage balance"
                    name="mortgageBalance"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="monthlyPayments"
                    className="text-mineShaft font-semibold"
                  >
                    Monthly payments
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your monthly payments"
                    name="monthlyPayments"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="employmentLocation"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Frequency of payments
                  </label>
                  <select
                    name="employmentLocation"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={frequency}
                    onChange={(e) => {
                      setFrequency(e.target.value);
                    }}
                  >
                    <option value="rent">Monthly</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="originalBalance"
                    className="text-mineShaft font-semibold"
                  >
                    Original balance
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your original balance"
                    name="originalBalance"
                    className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
                  />
                  <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                    C$
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="lender"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Lender
                  </label>
                  <select
                    name="lender"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={lender}
                    onChange={(e) => {
                      setLender(e.target.value);
                    }}
                  >
                    <option value="rent">Scotiobank</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2 lg:col-span-1">
                <InputField
                  label="Maturirty date"
                  name="name"
                  type={"text"}
                  placeholder="Enter the maturity date"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="mt-4">
                  <label
                    htmlFor="termType"
                    className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                  >
                    Term type
                  </label>
                  <select
                    name="termType"
                    className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                    value={termType}
                    onChange={(e) => {
                      setTermType(e.target.value);
                    }}
                  >
                    <option value="rent">Fixed</option>
                    <option value="own">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border border-porcelain rounded-2xl p-5 mx-4 items-center mt-4">
            <div className="text-mineShaft text-base ">
              I have an{" "}
              <span className="font-semibold">additional mortgage</span> on this
              property
            </div>
            <div className="ml-auto">
              <SwitchSelection
                selected={isAdditionalMortgage}
                onChange={setIsAdditionalMortgage}
              ></SwitchSelection>
            </div>
          </div>
          <div className="px-4 mt-8 mb-[100px] bg-whiteLilac rounded-xl flex flex-col mx-4">
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
                    disabled={isCurrentAddress}
                  ></YearSelect>
                </div>
                <div className="grow">
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
