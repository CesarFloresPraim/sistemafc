import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import SelectSearch from "react-select-search";
require("react-select-search/style.css");
registerLocale("es", es);

import CloseIcon from "../../../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../../../assets/svg/icon_edit.svg";
import TrashIcon from "../../../../../../assets/svg/icon_trash.svg";
import InputField from "../../../../../../components/InputField";
import { moneyFormat } from "../../../../../../helpers/moneyFormat";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function SmallBoxOverlay({
  showOverlay,
  onSave,
  onEdit,
  selectedSmallBoxRegister,
  selectedRegisterDetail,
  isEditting = false,
  disableCreate = false,
  selectedRegister,
}) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [split, setSplit] = useState([]);
  const [deletedSplitsIds, setDeletedSplitsIds] = useState([]);
  const [splitAmount, setSplitAmount] = useState("0");
  const [optionsRDIDandEmployeeName, setOptionsRDIDandEmployeeName] = useState(
    []
  );
  const [selectedRegisterDetailId, setSelectedRegisterDetailId] = useState(null)

  const handleSave = () => {
    let smallBoxDTO = {
      amount: amount,
      comment: comment,
      date: date,
      smallBoxSplit: split,
      deletedSplitsIds: deletedSplitsIds
    };
    if (isEditting && selectedSmallBoxRegister?.id) {
      smallBoxDTO["id"] = selectedSmallBoxRegister?.id;
      return onEdit(smallBoxDTO, selectedRegisterDetail.id);
    }
    smallBoxDTO["registerDetail"] = selectedRegisterDetailId
    return onSave(smallBoxDTO, selectedRegisterDetailId);
  };

  const handleSplit = () => {
    setSplit([
      ...split,
      {
        amount: parseFloat(splitAmount),
        isPayed: false,
        payedDate: "",
        smallBoxRegister: selectedSmallBoxRegister?.id || null //backend will add this if not sent
      },
    ]);
  };
  const handleEditSplit = (idx) => {
    if (split[idx].isPayed) {
      return Swal.fire({
        title: "Error",
        text: "Estas intentado actualizar un registro que ya a sido pagado",
        icon: "error",
        confirmButtonColor: "#0C3CFD",
      });
    }
    let splitCopy = [...split];
    splitCopy[idx] = { ...splitCopy[idx], amount: parseFloat(splitAmount) };
    //console.log({splitCopy});
    setSplit([...splitCopy]);
  };
  const handleRemoveSplit = (idx, spItem) => {
    if(spItem.id) {
      if(spItem.isPayed) {
        return Swal.fire({
          title: "Error",
          text: "No se puede eliminar un registro pagado!",
          icon: "error",
          confirmButtonColor: "#0C3CFD",
        }); 
      }
      let deletedSplitsCopy = [...deletedSplitsIds]
      deletedSplitsCopy.push(spItem.id)
      setDeletedSplitsIds(deletedSplitsCopy)
    }
    
    let splitCopy = [...split];
    splitCopy.splice(idx, 1);
    setSplit([...splitCopy]);

  };

  useEffect(()=>{
    console.log(deletedSplitsIds);
  }, [deletedSplitsIds])

  const calcRemainingSplit = () => {
    let sumOfCurrentSplit = split.reduce((total, splitItem) => {
      return parseFloat(total) + parseFloat(splitItem.amount);
    }, 0);
    return parseFloat(amount) - parseFloat(sumOfCurrentSplit);
  };

  useEffect(() => {
    if (selectedSmallBoxRegister && isEditting) {
      setAmount(selectedSmallBoxRegister.amount);
      setComment(selectedSmallBoxRegister.comment);
      setDate(new Date(selectedSmallBoxRegister.date));
      setSplit(selectedSmallBoxRegister.smallBoxSplit);
    }
  }, [selectedSmallBoxRegister]);

  useEffect(() => {
    if (selectedRegister && selectedRegister.registersDetails.length > 0) {
      const listOptionsRDIDandEmployeeName =
        selectedRegister.registersDetails.map((item) => {
          return { name: item.employee.name, value: item.id };
        });
      console.log({ listOptionsRDIDandEmployeeName });
      setOptionsRDIDandEmployeeName(listOptionsRDIDandEmployeeName);
    }
  }, [selectedRegister]);
  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <div className="flex flex-col">
              <h2 className=" text-4xl  font-semibold">REGISTRO CAJA CHICA</h2>
              {isEditting && (
                <h3 className=" text-xl text-regentGray  font-semibold">
                  {selectedRegisterDetail?.employee.name}
                </h3>
              )}
            </div>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <div className="px-8 mt-8 grid grid-cols-2 gap-4">
            {!isEditting && (
              <div className="col-span-2">
                <SelectSearch
                  search={true}
                  options={optionsRDIDandEmployeeName}
                  value={selectedRegisterDetailId}
                  onChange={(v)=>setSelectedRegisterDetailId(v)}
                  placeholder="Seleccionar empleado"
                />
              </div>
            )}
            <div className="col-span-1">
              <InputField
                label="Cantidad"
                defaultValue={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="border border-porcelain rounded-[32px]"
                placeholder="Cantidad a retirar"
              />
            </div>
            <div className="col-span-1">
              <div className="flex mt-4">
                <div className="flex flex-col mr-4">
                  <div className="mr-2">Fecha de prestamo:</div>
                  <DatePicker
                    locale="es"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="mt-4 flex flex-col">
                <label htmlFor="comment ">Comentarios:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  name="comment"
                  className="border border-porcelain rounded-[32px]"
                ></textarea>
              </div>
            </div>

            <button
              onClick={handleSplit}
              className="col-span-1 py-2 border border-porcelain rounded-[32px] w-full text-primary"
            >
              Agregar parcelado
            </button>
            <div className="col-span-1">
              <InputField
                label="Cantidad"
                defaultValue={splitAmount}
                onChange={(e) => setSplitAmount(e.target.value)}
                type="number"
                className="border border-porcelain rounded-[32px]"
                placeholder="Cantidad a de pago"
              />
            </div>
            {split.length > 0 && (
              <div className="col-span-2 mt-4">
                <div className="font-semibold">Parcelado</div>
                <div className="text-regentGray">
                  Por parcelar {moneyFormat(calcRemainingSplit())}
                </div>
                <div
                  className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4`}
                >
                  {split.map((splitItem, index) => {
                    return (
                      <div
                        key={splitItem.id}
                        className="flex items-center border-b border-b-porcelain p-1"
                      >
                        <div className="text-mineShaft font-semibold">
                          {moneyFormat(splitItem.amount)}
                        </div>
                        <div className="ml-auto">
                          {splitItem.isPayed
                            ? new Date(splitItem.payedDate).toLocaleDateString(
                                "es-ES",
                                dateOptions
                              )
                            : "No pagado."}
                        </div>
                        <EditIcon
                          onClick={() => handleEditSplit(index)}
                          fill="#8595A3"
                        ></EditIcon>
                        <TrashIcon
                          onClick={() => handleRemoveSplit(index, splitItem)}
                          fill="#FB3F3F"
                        ></TrashIcon>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex w-full mt-auto ${disableCreate ? "hidden" : ""}`}
          >
            <button
              onClick={handleSave}
              className=" ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white bg-primary"
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
