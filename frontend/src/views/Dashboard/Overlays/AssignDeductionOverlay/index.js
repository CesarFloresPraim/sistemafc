import React, { useEffect, useState } from "react";

import InputField from "../../../../components/InputField";
import CheckboxField from "../../../../components/CheckboxField";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import { dateOptions } from "../../../../helpers/dateOptions";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";

export default function AssignDeductionOverlay({
  showOverlay,
  employee,
  onCreate,
  onEdit,
  types = [],
}) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const [toPayNow, setToPayNow] = useState(true);
  const [payed, setPayed] = useState(false);
  const [creationDate, setCreationDate] = useState(new Date());
  const [selectedDeductionId, setSelectedDeductionId] = useState();

  const handleCreate = () => {
    const deductionDTO = {
        employee: employee.id,
        type: type,
        amount: amount,
        note: note,
        creationDate: creationDate,
        toPayNow: toPayNow,
        payed: payed,
    }
    onCreate(deductionDTO)
  };

  const handleEdit= () => {
    if(!selectedDeductionId) {
        console.log("No selected to edit");
        return
    }
    const deductionDTO = {
        id: selectedDeductionId,
        employee: employee.id,
        type: type,
        amount: amount,
        note: note,
        creationDate: creationDate,
        toPayNow: toPayNow,
        payed: payed,
    }
    onEdit(deductionDTO)
  };


  const handleSelectedDeduction = (selectedItem) => {
    setSelectedDeductionId(selectedItem.id)
    setAmount(selectedItem.amount);
    setType(selectedItem.type.id);
    setNote(selectedItem.note);
    setToPayNow(selectedItem.toPayNow);
    setPayed(selectedItem.payed);
    setCreationDate(new Date(selectedItem.creationDate))
  };

  const buttonDisabled = () => {
    return (amount==""|| type=="" || note == "")
  }

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
                DEDUCCIONES
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
          {employee.deductions.length > 0 && (
            <div
              className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 mx-8 p-2`}
            >
              {employee.deductions.map((deductionItem) => {
                return (
                  <div
                    onClick={() => handleSelectedDeduction(deductionItem)}
                    key={deductionItem.id}
                    className="flex border-b border-b-porcelain p-1"
                  >
                    <div className="text-mineShaft font-semibold">
                      ${deductionItem.amount}
                    </div>
                    <div className="px-1">({deductionItem.type.name})</div>
                    <div className="text-regentGray ml-4">
                      {deductionItem.note}
                    </div>
                    <div className="ml-auto">
                      {new Date(deductionItem.creationDate).toLocaleDateString(
                        "es-ES",
                        dateOptions
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="px-8 mt-8 grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <InputField
                label="Importe"
                name="name"
                defaultValue={amount}
                type={"number"}
                placeholder="Escribir importe"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></InputField>
            </div>
            <div className="col-span-1 mt-4">
              <div className="">
                <label
                  htmlFor="type"
                  className={`block text-[16px] font-bold font-poppins text-mineShaft`}
                >
                  Tipo
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  name="type"
                  className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
                >
                    <option value="" disabled>Selecciona..</option>
                  {types.length > 0 &&
                    types.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                </select>
              </div>
            </div>
            <div className="col-span-1 mt-4">
                <label className="font-semibold">Fecha</label>
              <DatePicker
                locale="es"
                selected={creationDate}
                onChange={(date) => setCreationDate(date)}
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
          <div className="mt-4 mx-8 flex">
            <CheckboxField
              value={toPayNow}
              onChange={(e) => {
                setToPayNow(e.target.checked);
              }}
              label="Es pago completo"
              name="toPayNow"
            ></CheckboxField>
            <div className="ml-4">
              <CheckboxField
                value={payed}
                onChange={(e) => {
                  setPayed(e.target.checked);
                }}
                label="Esta pagado"
                name="payed"
              ></CheckboxField>
            </div>
          </div>
          <div className="flex w-full mt-auto">
          <button
            disabled={buttonDisabled()}
              onClick={handleEdit}
              className={`ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] border border-porcelain ${buttonDisabled()? 'bg-mischka text-white':'bg-white text-primary'}`}
            >
              <EditIcon fill={buttonDisabled()? "#fff": "#0C3CFD"}></EditIcon>
              <div>Editar </div>
            </button>
            <button
            disabled={buttonDisabled()}
              onClick={handleCreate}
              className={` ml-4 mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white ${buttonDisabled()? 'bg-mischka':'bg-primary'}`}
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
