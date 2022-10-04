import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeForResgisterList,
  SetRegisters,
  SetSearchRegisterRH,
  AddSmallBoxRegister,
  SetRegistersDetails,
} from "../../../../../store/actionCreators/rh";

import { dateOptions } from "../../../../../helpers/dateOptions";
import IllustrationPresentation from "../../../../../assets/svg/illustration_presentation.svg";
import AddIcon from "../../../../../assets/svg/icon_plus.svg";
import { useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";



export default function SmallBoxRegister() {
  const dispatch = useDispatch();
  const { register, smallBoxRegisters, search } = useSelector((state) => state.rh);
  const [selectedRegisterDetail, setSelectedRegisterDetail] = useState();
  const [searchEmployee, setSearchEmployee] = useState("");
  const [amount, setAmount] = useState("0");
  const [comment, setComment] = useState("");
  const [dateComment, setDateComment] = useState(new Date());

  const handleSelectRegisterDetail = (item) => {
    setSelectedRegisterDetail(item);
    setSearchEmployee("");
  };

  const handleSaveSmallBoxRegister = () => {
    const smallBoxRegister = {
      registerDetail: selectedRegisterDetail.id,
      amount: amount,
      comment: comment,
      date: dateComment,
    };

    let localRegisters = register.registersDetails.map((item) => {
      if (item.id == selectedRegisterDetail.id) {
        item.smallBox.push(smallBoxRegister)
      }
      return item;
    });

    dispatch(SetRegistersDetails(localRegisters));
  };

  const newRegisterDisabled = () => {
    return (
      !selectedRegisterDetail?.employee.id || amount == "" || amount == "0" || !dateComment
    );
  };

  useEffect(() => {
    dispatch(FetchEmployeeForResgisterList());
  }, []);

  const renderSmallBoxRegisters = () => {
    if (register.registersDetails && register.registersDetails?.length > 0) {
      return register.registersDetails
        .filter((item) => {
          if (search == "") return item;
          return item.employee.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        })
        .map((item) => {
          if (item.smallBox && item.smallBox?.length > 0) {
            return item.smallBox.map((smallBoxItem, idx) => {
              return (
                <div
                  key={idx}
                  className=" p-1 flex flex-col border-b border-regentGray"
                >
                  <div className="text-paleSky font-semibold grow">
                    {item.employee.name}
                  </div>
                  <div className="flex">
                    <div className="">
                      {new Date(smallBoxItem.date).toLocaleDateString(
                        "es-ES",
                        dateOptions
                      )}
                    </div>
                    <div className=" ml-auto px-2 font-semibold">
                      ${smallBoxItem.amount}
                    </div>
                  </div>
                  <div className="text-[13px]">{smallBoxItem.comment}</div>
                </div>
              );
            });
          }
        });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 mx-8">
        <div className="flex flex-col h-full w-full rounded-[32px] border border-porcelain p-6">
          <div className="flex w-full">
            <h2 className="text-2xl font-semibold">Lista</h2>
            <button
              disabled={newRegisterDisabled()}
              onClick={() => handleSaveSmallBoxRegister()}
              className={`${
                newRegisterDisabled() ? "bg-mischka" : "bg-primary"
              } flex items-center rounded-3xl h-12 pr-4 ml-auto text-[13px] text-white`}
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Guardar retiro </div>
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="searchEmp">Buscar</label>
            <input
              name="searchEmp"
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
              type="text"
              className="border border-porcelain rounded-[32px]"
            />
            {searchEmployee != "" && (
              <div className="max-h-[600px] overflow-y-scroll bg-white border border-porcelain  p-2 w-full">
                {register.registersDetails && register.registersDetails?.length > 0 &&
                  register.registersDetails
                    .filter((item) => {
                      return item.employee.name
                        .toLocaleLowerCase()
                        .includes(searchEmployee.toLocaleLowerCase());
                    })
                    .map((item) => {
                      return (
                        <div
                          onClick={() => handleSelectRegisterDetail(item)}
                          className="flex border-b border-porcelain px-2 py-1"
                        >
                          {item.employee.name}
                        </div>
                      );
                    })}
              </div>
            )}
            {selectedRegisterDetail && (
              <div className="flex flex-col mt-4">
                <div className="font-semibold">{selectedRegisterDetail.employee.name}</div>
                <div className="flex mt-4">
                  <div className="flex flex-col mr-4">
                    <div className="mr-2">Fecha de inicio:</div>
                    <DatePicker
                      locale="es"
                      selected={dateComment}
                      onChange={(date) => setDateComment(date)}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="flex flex-col mr-4">
                    <div className="mr-2">Cantidad a retirar:</div>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      className="border border-porcelain rounded-[32px]"
                      placeholder="Cantidad a retirar"
                    />
                  </div>
                </div>
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
            )}
          </div>
          <div className="border border-porcelain p-2 px-4 rounded-[16px] bg-porcelain mt-4">
            {renderSmallBoxRegisters()}
          </div>
        </div>

        <div>
          <IllustrationPresentation></IllustrationPresentation>
        </div>
      </div>
    </>
  );
}
