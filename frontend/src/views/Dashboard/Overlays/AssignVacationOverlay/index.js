import React, { useEffect, useState } from "react";

import InputField from "../../../../components/InputField";
import CheckboxField from "../../../../components/CheckboxField";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import { dateOptions } from "../../../../helpers/dateOptions";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";

export default function AssignVacationOverlay({
  showOverlay,
  employee,
  onCreate,
  onEdit,
}) {
  const [days, setDays] = useState("");
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedVacationId, setSelectedVacationId] = useState("");

  const handleCreate = () => {
    const vacationDTO = {
        employee: employee.id,
        days,
        fromDate: startDate,
        toDate: endDate,
        note
    }
    return onCreate(vacationDTO)
  };

  const handleEdit = () => {
    const vacationDTO = {
        id: selectedVacationId,
        employee: employee.id,
        days,
        fromDate: startDate,
        toDate: endDate,
        note
    }
    return onEdit(vacationDTO)
  };

  const handleSelectedVacation = (selectedItem) => {
    setSelectedVacationId(selectedItem.id)
    setDays(selectedItem.days)
    setNote(selectedItem.note)
    setStartDate(new Date(selectedItem.fromDate))
    setEndDate(new Date(selectedItem.toDate))
  };

  const buttonDisabled = () => {
    return days == "" || note=="";
  };


  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-5/12 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-7/12 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <div className="flex flex-col">
              <h2 className=" text-2xl md:text-[40px] font-semibold text-left">
                VACACIONES
              </h2>
              <h2 className=" mt-2 text-lg text-regentGray font-semibold text-left">
                {employee.name}
              </h2>
            </div>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          {employee.vacations.length > 0 && (
            <div
              className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 mx-8 p-2`}
            >
              {employee.vacations.map((vacationItem) => {
                return (
                  <div
                    onClick={() => handleSelectedVacation(vacationItem)}
                    key={vacationItem.id}
                    className="flex border-b border-b-porcelain p-1 items-center"
                  >
                    <div className="text-mineShaft font-semibold">
                      {vacationItem.days}
                    </div>
                    <div className="text-regentGray ml-4">
                      {vacationItem.note}
                    </div>
                    <div className="ml-auto flex flex-col">
                      <div>
                        {new Date(vacationItem.fromDate).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </div>
                      <div>
                        {new Date(vacationItem.toDate).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-4 mx-8 grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <InputField
                label="Dias"
                name="daysOfWork"
                defaultValue={days}
                type={"number"}
                placeholder="Dias de vacaciones"
                onChange={(e) => {
                  setDays(e.target.value);
                }}
              ></InputField>
            </div>
            <div className="col-span-1 mt-4">
              <label className="font-semibold">Fecha</label>
              <DatePicker
                locale="es"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-span-1 mt-4">
              <label className="font-semibold">Fecha</label>
              <DatePicker
                locale="es"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="mt-4 mx-8">
            <label htmlFor="note" className="font-semibold">
              Comentario
            </label>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              name="note"
              className="w-full border border-porcelain rounded-3xl"
            ></textarea>
          </div>

          <div className="flex w-full mt-auto">
            <button
              disabled={buttonDisabled()}
              onClick={handleEdit}
              className={`ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] border border-porcelain ${
                buttonDisabled()
                  ? "bg-mischka text-white"
                  : "bg-white text-primary"
              }`}
            >
              <EditIcon fill={buttonDisabled() ? "#fff" : "#0C3CFD"}></EditIcon>
              <div>Editar </div>
            </button>
            <button
              disabled={buttonDisabled()}
              onClick={handleCreate}
              className={` ml-4 mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white ${
                buttonDisabled() ? "bg-mischka" : "bg-primary"
              }`}
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Crear </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
