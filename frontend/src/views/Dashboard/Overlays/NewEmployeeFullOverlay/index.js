import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import InputField from "../../../../components/InputField";
import SwitchSelection from "../../../../components/SwitchSelection";
import CheckboxField from "../../../../components/CheckboxField";
import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";
import TrashIcon from "../../../../assets/svg/icon_trash.svg";

export default function NewEmployeeFullOverlay({
  showOverlay,
  employee,
  isEditting = false,
  onSave,
  onDelete,
  departments = [],
}) {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [daysOfWork, setDaysOfWork] = useState("");
  const [phone, setPhone] = useState("");
  const [savingsPerWeek, setSavingsPerWeek] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [retentionPerWeek, setRetentionPerWeek] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [retentionInfonavit, setRetentionInfonavit] = useState("");
  const [infonavitAmount, setInfonavitAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCurrent, setIsCurrent] = useState(true);
  const [hasInfonavit, setHasInfonavit] = useState(false);
  const [hasExtraHourFixed, setHasExtraHourFixed] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [hasInflationBonus, setHasInflationBonus] = useState(true);

  const handleSave = () => {
    let employeeDTO = {
      department,
      name,
      phone,
      salary,
      daysOfWork,
      savingsPerWeek,
      savingsAmount,
      retentionPerWeek,
      debtAmount,
      retentionInfonavit,
      infonavitAmount,
      hasInfonavit,
      hasExtraHourFixed,
      hasInflationBonus,
      startDate,
      endDate,
      isActive,
      isCurrent,
    };
    if (isEditting && employee.id) {
      employeeDTO["id"] = employee.id;
    }
    return onSave(employeeDTO, isEditting);
  };

  const buttonDisabled = () => {
    return name == "" || department == "";
  };

  useEffect(() => {
    if (employee && isEditting) {
      setDepartment(employee.department?.id || "");
      setName(employee.name);
      setPhone(employee.phone);
      setSalary(employee.salary);
      setDaysOfWork(employee.daysOfWork);
      setSavingsPerWeek(employee.savingsPerWeek);
      setSavingsAmount(employee.savingsAmount);
      setRetentionPerWeek(employee.retentionPerWeek);
      setDebtAmount(employee.debtAmount);
      setRetentionInfonavit(employee.retentionInfonavit);
      setInfonavitAmount(employee.infonavitAmount);
      setHasInfonavit(employee.hasInfonavit);
      setHasExtraHourFixed(employee.hasExtraHourFixed);
      setIsActive(employee.isActive);
      setStartDate(new Date(employee.startDate));
      setEndDate(new Date(employee.endDate));
      setIsCurrent(employee.isCurrent);
      setHasInflationBonus(employee.hasInflationBonus);
    }
  }, [employee]);

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false, false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              {!isEditting ? "NUEVO EMPLEADO" : "EDITAR EMPLEADO"}
            </h2>
            <div
              onClick={() => showOverlay(false, false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-8">
            <div className="grid grid-cols-12 mt-4 gap-4">
              <div className="col-span-5">
                <InputField
                  label="Nombre"
                  name="name"
                  defaultValue={name}
                  type={"text"}
                  placeholder="Escribir nombre"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-4">
                <InputField
                  label="Salario"
                  name="salary"
                  defaultValue={salary}
                  type={"number"}
                  placeholder="Escribir salario"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-3">
                <InputField
                  label="Dias de T"
                  name="salary"
                  defaultValue={daysOfWork}
                  type={"number"}
                  placeholder="Dias de trabajo"
                  onChange={(e) => {
                    setDaysOfWork(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <InputField
                label="Numero telefonico"
                name="number"
                type={"text"}
                defaultValue={phone}
                placeholder="Ingresar numero de telefono"
                onChange={(e) => {
                  setPhone(e.target.value);
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
                  <option value="" disabled>
                    Seleccionar..
                  </option>
                  {departments.length > 0 &&
                    departments.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <div className="col-span-1">
                <InputField
                  label="Ahorro por semana"
                  name="number"
                  type={"number"}
                  defaultValue={savingsPerWeek}
                  placeholder="Ingresar ahorro por semana"
                  onChange={(e) => {
                    setSavingsPerWeek(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-1">
                <InputField
                  label="Ahorro"
                  name="number"
                  type={"number"}
                  defaultValue={savingsAmount}
                  placeholder="Ahorro acumulado"
                  onChange={(e) => {
                    setSavingsAmount(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <div className="col-span-1">
                <InputField
                  label="Retencion por semana"
                  name="number"
                  type={"number"}
                  defaultValue={retentionPerWeek}
                  placeholder="Ingresar retencion por semana"
                  onChange={(e) => {
                    setRetentionPerWeek(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-1">
                <InputField
                  label="Deuda"
                  name="debt"
                  type={"number"}
                  defaultValue={debtAmount}
                  placeholder="Deuda acumulada"
                  onChange={(e) => {
                    setDebtAmount(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-4">
              <div className="col-span-1">
                <InputField
                  label="Retencion infonavit"
                  name="number"
                  type={"number"}
                  defaultValue={retentionInfonavit}
                  placeholder="Ingresar retencion de infonavit"
                  onChange={(e) => {
                    setRetentionInfonavit(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="col-span-1">
                <InputField
                  label="Infonavit"
                  name="number"
                  type={"number"}
                  defaultValue={infonavitAmount}
                  placeholder="Monto infonavit"
                  onChange={(e) => {
                    setInfonavitAmount(e.target.value);
                  }}
                ></InputField>
              </div>
            </div>
            <div className="px-4 mt-8 bg-whiteLilac rounded-xl flex flex-col">
              <div className="grid grid-cols-2 gap-4 mt-4 ">
                <div className="flex col-span-1 items-center">
                  <div className=" text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                    DE:
                  </div>
                  <div className="shrink">
                    <DatePicker
                      locale={es}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className="flex col-span-1 items-center">
                  <div className=" text-regentGray text-[13px] mr-2 font-semibold tracking-wider">
                    A:
                  </div>
                  {isCurrent ? (
                    <div className="font-semibold">ACTUAL</div>
                  ) : (
                    <DatePicker
                      locale={es}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      disabled={isCurrent}
                    />
                  )}
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
            <div className="mt-4 mx-8 flex">
              <CheckboxField
                onChange={(e) => {
                  setHasInfonavit(e.target.checked);
                }}
                value={hasInfonavit}
                label="Tiene infonavit"
                name="hasInfonavit"
              ></CheckboxField>
              <div className="ml-4">
                <CheckboxField
                  onChange={(e) => {
                    setHasExtraHourFixed(e.target.checked);
                  }}
                  value={hasExtraHourFixed}
                  label="Hora extra fija"
                  name="hasExtraHourFixed"
                ></CheckboxField>
              </div>
              <div className="ml-4">
                <CheckboxField
                  onChange={(e) => {
                    setHasInflationBonus(e.target.checked);
                  }}
                  value={hasInflationBonus}
                  label="Bono inflacion"
                  name="hasInflationBonus"
                ></CheckboxField>
              </div>
              <div className="ml-auto">
                <CheckboxField
                  onChange={(e) => {
                    setIsActive(e.target.checked);
                  }}
                  value={isActive}
                  label="Esta activo"
                  name="isActive"
                ></CheckboxField>
              </div>
            </div>
          </div>
          <div className="flex w-full mt-auto">
            <button
              disabled={buttonDisabled()}
              onClick={handleSave}
              className={` ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white ${
                buttonDisabled() ? "bg-mischka" : "bg-primary"
              }`}
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Guardar </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
