import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchUnusedRegisterList, InitializePayroll } from "../../../../store/actionCreators/payroll";

import { dateOptions } from "../../../../helpers/dateOptions";

import AddIcon from "../../../../assets/svg/icon_plus.svg"
import { useNavigate } from "react-router-dom";

export default function NewPayroll() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [rhRegisters, setRhRegisters] = useState([]);
  const [selectedRegisterId, setSelectedRegisterId] = useState();

  const handleCreatePayroll = () => {
    const payrollDTO = {
      registerRH: selectedRegisterId,
    }

    dispatch(InitializePayroll(payrollDTO)).then(res=>{
      navigate({pathname: "/nominas"})
    }).catch(err=>console.log(err))
  };

  useEffect(() => {
    dispatch(FetchUnusedRegisterList())
      .then((res) => {
        setRhRegisters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-[50] flex items-center justify-center bg-[#23232399]">
      <div className="w-1/2 h-1/2 bg-white rounded-[32px] p-6 flex flex-col">
        <div className="mt-4">
          <label
            htmlFor="select"
            className={`block text-[16px] font-bold font-poppins text-mineShaft`}
          >
            Selecciona el registro de recursos humanos para general la nomina
          </label>
          <select
            name="select"
            className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
            onChange={(e) => {setSelectedRegisterId(e.target.value)}}
          >
            <option value="">Selecciona..</option>
            {rhRegisters.length > 0 &&
              rhRegisters.map((item) => {
                return (
                  <option value={item.id}>
                    {new Date(item.fromDate).toLocaleDateString(
                      "es-ES",
                      dateOptions
                    )}{" "}
                    -{" "}
                    {new Date(item.toDate).toLocaleDateString(
                      "es-ES",
                      dateOptions
                    )}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mt-auto ml-auto">
          <button
          disabled={!selectedRegisterId}
            onClick={handleCreatePayroll}
            className={` ml-4 mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white ${!selectedRegisterId? "bg-mischka": "bg-primary"}`}
          >
            <AddIcon fill="#FFF"></AddIcon>
            <div>Crear </div>
          </button>
        </div>
      </div>
    </div>
  );
}
