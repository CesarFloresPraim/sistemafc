import React, { useEffect, useState } from "react";

import InputField from "../../../../components/InputField";
import SwitchSelection from "../../../../components/SwitchSelection";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import { useSelector } from "react-redux";

export default function AddEmployeeOverlay({ showOverlay }) {
  const [department, setDepartment] = useState("Menudeo");
  const [name, setName] = useState("");
  const [fromDay, setFromDay] = useState();
  const [fromMonth, setFromMonth] = useState();
  const [fromYear, setFromYear] = useState();
  const [toDay, setToDay] = useState();
  const [toMonth, setToMonth] = useState();
  const [toYear, setToYear] = useState();
  const [isCurrent, setIsCurrent] = useState(true);

  function DaySelect({ value, setValue, disabled }) {
    const numberOfDays = 31;
    let daysArray = [];
    for (let i = 1; i <= numberOfDays; i++) {
      daysArray.push(i);
    }
    return (
      <select
        name="days"
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
        {daysArray &&
          daysArray.length > 0 &&
          daysArray.map((day) => <option value={day}>{day}</option>)}
      </select>
    );
  }

  function MonthSelect({ value, setValue, disabled }) {
    const monthsArray = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septimebre",
      "Octubre",
      "Noviembre",
      "Diciembre",
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
    if (isCurrent) {
      setToDay("");
      setToMonth("");
      setToYear("");
    }
  }, [isCurrent]);

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              NUEVO EMPLEADO
            </h2>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-8">
            <InputField
              label="Nombre"
              name="name"
              type={"text"}
              placeholder="Enter address"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></InputField>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <InputField
                label="Numero"
                name="number"
                type={"text"}
                placeholder="Ingresar numero"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></InputField>
              <div className="mt-4">
                <label
                  htmlFor="homeType"
                  className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                >
                  Departamento
                </label>
                <select
                  name="department"
                  className={`flex flex-col w-full h-16 pt-5 mt-[1px] text-[15px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 focus:ring-0 border-none`}
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option value="Menudeo">Menudeo</option>
                  <option value="Operativo">Operativo</option>
                  <option value="Oficina">Oficina</option>
                </select>
              </div>
            </div>
            <div className="px-4 mt-8 bg-whiteLilac rounded-xl flex flex-col">
              <div className="grid grid-cols-2 gap-4 mt-4 ">
                <div className="flex col-span-2 lg:col-span-1 items-center">
                  <div className="text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                    DE:
                  </div>
                  <div className="shrink">
                    <DaySelect
                      value={fromDay}
                      setValue={setFromDay}
                    ></DaySelect>
                  </div>
                  <div className="grow">
                    {" "}
                    <MonthSelect
                      value={fromMonth}
                      setValue={setFromMonth}
                    ></MonthSelect>
                  </div>
                  <div className="shrink">
                    <YearSelect
                      value={fromYear}
                      setValue={setFromYear}
                    ></YearSelect>
                  </div>
                </div>
                <div className="flex col-span-1 items-center">
                  <div className="text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                    A:
                  </div>
                  <div className="shrink">
                    <DaySelect
                      value={toDay}
                      setValue={setToDay}
                      disabled={isCurrent}
                    ></DaySelect>
                  </div>

                  <div className="grow">
                    {" "}
                    <MonthSelect
                      value={toMonth}
                      setValue={setToMonth}
                      disabled={isCurrent}
                    ></MonthSelect>
                  </div>
                  <div className="shrink">
                    <YearSelect
                      value={toYear}
                      setValue={setToYear}
                      disabled={isCurrent}
                    ></YearSelect>
                  </div>
                </div>
              </div>
              <div className="flex bg-white rounded-xl m-4 p-4 items-center ">
                <SwitchSelection
                  selected={isCurrent}
                  onChange={setIsCurrent}
                ></SwitchSelection>
                <div
                  className={`tracking-widest ${
                    isCurrent ? "text-primary" : "text-regentGray"
                  } font-semibold text-sm ml-4`}
                >
                  ACTUAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
