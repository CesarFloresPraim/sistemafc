import React, { useEffect, useState } from "react";

import InputField from "../../../../components/InputField";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";

export default function NewDeductionOverlay({
  showOverlay,
  deductionType,
  isEditting = false,
  onSave,
}) {
  const [name, setName] = useState("");

  const handleSave = () => {
    let newDeductionType = {
        name: name
    }
    if(isEditting && deductionType.id) {
        newDeductionType['id'] = deductionType.id
    }

    onSave(newDeductionType, isEditting)
  };

  useEffect(()=> {
    if(isEditting && deductionType) {
        setName(deductionType.name)
    }
  }, [deductionType])
  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false, false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-left">
              {!isEditting
                ? "NUEVO TIPO DE DEDUCCION"
                : "EDITAR TIPO DE DEDUCCION"}
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
          </div>
          <div className="flex w-full mt-auto">
            <button
              onClick={handleSave}
              className="ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white bg-primary"
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
