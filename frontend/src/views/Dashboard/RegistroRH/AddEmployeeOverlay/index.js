import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";


import InputField from "../../../../components/InputField";
import SwitchSelection from "../../../../components/SwitchSelection";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";
import TrashIcon from "../../../../assets/svg/icon_trash.svg";

import { useSelector } from "react-redux";

export default function AddEmployeeOverlay({
  showOverlay,
  employee,
  isEditting = false,
  onSave,
  onDelete,
  departments = [],
}) {
  const [department, setDepartment] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCurrent, setIsCurrent] = useState(true);

  const handleSave = () => {
    let details = {
      department,
      name,
      phone,
      startDate,
      endDate,
      isCurrent,
    };
    return onSave(details);
  };



  useEffect(() => {
    if (employee && isEditting) {
      setDepartment(employee.department?.id || 0);
      setName(employee.name);
      setPhone(employee.phone);
      setStartDate(new Date(employee.startDate));
      setEndDate(new Date(employee.endDate));
      setIsCurrent(employee.isCurrent);
    }
  }, [employee]);

  useEffect(() => {
    if (departments.length > 0) {
      setDepartment(departments[0].id);
    }
  }, [departments]);

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
              {!isEditting? "NUEVO EMPLEADO":"EDITAR EMPLEADO"}
            </h2>
            <div
              onClick={() => showOverlay(false, false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-8">
            <div className="grid grid-cols-1 mt-4 gap-4">
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
                  {departments.length > 0 &&
                    departments.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                </select>
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
          </div>
          <div className="flex w-full mt-auto">
          <button
              onClick={onDelete}
              className=" ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] border border-coralRed text-coralRed bg-white"
            >
              <TrashIcon fill="#FB3F3F"></TrashIcon>
              <div>Desactivar </div>
            </button>
            <button
              onClick={handleSave}
              className=" mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white bg-primary"
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
