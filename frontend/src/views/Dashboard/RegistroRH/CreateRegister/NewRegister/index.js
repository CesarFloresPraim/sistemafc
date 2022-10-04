import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeForResgisterList,
  ShowNewEmployeeOverlay,
  SetRegisters,
  InitializeRegister,
  FetchRegistersDetailsRH,
} from "../../../../../store/actionCreators/rh";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import CommentsOverlay from "../../CommentsOverlay";

import RefreshIcon from "../../../../../assets/svg/icon_refresh.svg";

export default function NewRegister() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search, register, employeesForRegister } =
    useSelector((state) => state.rh);
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);
  const [selectedRegistedDetail, setSelectedRegisterDetail] = useState();

  const handleInitializeRegister = () => {
    let dates = {
      fromDate: register.fromDate || new Date(),
      toDate: register.toDate || new Date(),
    };
    dispatch(InitializeRegister(dates)).then((res) => {
      if (res.status == 200 && res.data.id) {
        dispatch(FetchRegistersDetailsRH(res.data.id));
      }
      //dispatch(dispatch(SetRegisters(res.data)));
    });
  };

  const handleRegisterChange = (e, id) => {
    let edittedList = register.registersDetails.map((item) => {
      if (item.id == id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    dispatch(SetRegisters(edittedList));
  };

  const calcFoodValue = (item) => {
    let sum = 100;
    //! Verify when initialization of registers implemented
    for (const key in item.food) {
      if (item.food[key] == false) sum -= 20;
    }

    return sum;
  };

  const calSmallBoxValue = (item) => {
    let sum = 0;
    if (!item.smallBox) return 0;
    for (const sbr of item.smallBox) {
      sum += Number(sbr.amount);
    }
    return sum;
  };

  const getLetterColor = (value) => {
    if (value == "Asistencia" || !value) return "text-green-500";
    if (value == "Doblada") return "text-sky-500";
    if (value == "Falta justificada") return "text-yellow-500";
    if (value == "Falta injustificada") return "text-red-500";
    if (value == "Descanso") return "text-black";
  };

  const handleSeeComment = (registerDetail) => {
    setSelectedRegisterDetail(registerDetail);
    setShowCommentsOverlay(true);
  };

  const handleFromDateChange = (date) => {
    let localRegister = { ...register };
    localRegister.fromDate = date;
    dispatch(SetRegisters(localRegister));
  }

  const handleToDateChange = (date) => {
    let localRegister = { ...register };
    localRegister.toDate = date;
    dispatch(SetRegisters(localRegister));
  }

  return (
    <>
      <div className="flex mx-6 mt-6">
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de inicio:</div>
          <DatePicker
            popperClassName="z-[100]"
            locale="es"
            selected={new Date(register.fromDate || new Date()) }
            onChange={(date) => handleFromDateChange(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de termino:</div>
          <DatePicker
            popperClassName="z-[100]"
            locale="es"
            selected={new Date(register.toDate|| new Date())}
            onChange={(date) => handleToDateChange(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <button
          onClick={handleInitializeRegister}
          className="ml-auto flex items-center rounded-3xl h-12 pr-4 mx-4 text-[13px] border border-porcelain text-primary bg-white"
        >
          <RefreshIcon fill="#0C3CFD"></RefreshIcon>
          <div>Inicializar registros </div>
        </button>
      </div>

      <div className="overflow-x-scroll rounded-3xl m-6 ">
        <table className="relative w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="">
              <th scope="col" className="py-3 px-2 sticky left-0 bg-gray-50">
                Nombre
              </th>
              <th scope="col" className="py-3 px-2">
                Comida
              </th>
              <th scope="col" className="py-3 px-2">
                Caja chica
              </th>
              <th scope="col" className="py-3 px-2">
                Horas extra (min)
              </th>
              <th scope="col" className="py-3 px-2">
                Faltas
              </th>
              <th scope="col" className="py-3 px-2">
                Puntualidad
              </th>
              <th scope="col" className="py-3 px-2">
                Asistencia
              </th>
              <th scope="col" className="py-3 px-2">
                Ju
              </th>
              <th scope="col" className="py-3 px-2">
                Vi
              </th>
              <th scope="col" className="py-3 px-2">
                Sa
              </th>
              <th scope="col" className="py-3 px-2">
                Do
              </th>
              <th scope="col" className="py-3 px-2">
                Lu
              </th>
              <th scope="col" className="py-3 px-2">
                Ma
              </th>
              <th scope="col" className="py-3 px-2">
                Mi
              </th>
              <th scope="col" className="py-3 px-2">
                Comentarios
              </th>
            </tr>
          </thead>
          <tbody>
            {register.registersDetails &&
              register.registersDetails.length > 0 &&
              register.registersDetails
                .filter((item) => {
                  if (search == "") {
                    return true;
                  } else {
                    return item.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
                  }
                })
                .map((item) => {
                  return (
                    <tr key={item.id} className="bg-white font-semibold">
                      <td
                        className={`py-1 px-2 whitespace-nowrap sticky left-0 z-50 bg-white`}
                      >
                        {item.employee?.name}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain w-[100px] bg-whiteLilac"
                          name="food"
                          value={calcFoodValue(item) || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />{" "}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain  w-[100px] bg-whiteLilac"
                          name="smallBox"
                          value={calSmallBoxValue(item) || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />{" "}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain w-[100px] bg-whiteLilac"
                          name="overtimeMinutes"
                          value={item.overtimeMinutes || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain w-[100px] bg-whiteLilac"
                          name="abscense"
                          value={item.abscense || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />
                      </td>
                      <td className={`py-1 px-2`}>
                        <select
                          disabled
                          className="bg-whiteLilac"
                          name="puntuality"
                          value={item.puntuality || ""}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        <select
                          disabled
                          className="bg-whiteLilac"
                          name="attendance"
                          value={item.attendance || ""}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.ju
                          )}`}
                          name="ju"
                          value={item.ju || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.vi
                          )}`}
                          name="vi"
                          value={item.vi || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.sa
                          )}`}
                          name="sa"
                          value={item.sa || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.do
                          )}`}
                          name="do"
                          value={item.do || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.lu
                          )}`}
                          name="lu"
                          value={item.lu || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.ma
                          )}`}
                          name="ma"
                          value={item.ma || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          disabled
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.mi
                          )}`}
                          name="mi"
                          value={item.mi || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option value="Asistencia">A</option>
                          <option value="Doblada">D</option>
                          <option value="Falta justificada">FJ</option>
                          <option value="Falta injustificada">FI</option>
                          <option value="Descanso">De</option>
                        </select>
                      </td>

                      <td
                        className={`py-1 px-2 text-primary font-semibold cursor-pointer`}
                        onClick={() => {
                          handleSeeComment(item);
                        }}
                      >
                        Comentarios
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {showCommentsOverlay && (
        <CommentsOverlay
          showOverlay={setShowCommentsOverlay}
          selectedRegisterDetail={selectedRegistedDetail}
          disableCreate={true}
        ></CommentsOverlay>
      )}
    </>
  );
}
