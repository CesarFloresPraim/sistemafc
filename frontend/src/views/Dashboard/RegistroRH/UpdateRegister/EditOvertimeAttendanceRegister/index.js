import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowNewEmployeeOverlay,
  SetSelectedRegistersDetails,
} from "../../../../../store/actionCreators/rh";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import CommentsOverlay from "../../CommentsOverlay";


export default function EditOvertimeAttendanceRegister() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search, selectedRegister, employeesForRegister } =
    useSelector((state) => state.rh);
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedRegisterDetail, setSelectedRegisterDetail] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewEmployeeOverlay(value, isEditting));
  };

  const handleRegisterChange = (e, id) => {
    let localRegisters = selectedRegister.registersDetails.map((item) => {
      if (item.id == id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    dispatch(SetSelectedRegistersDetails(localRegisters));
  };

  const getLetterColor = (value) => {
    if (value == "Asistencia" || !value) return "text-green-500";
    if (value == "Doblada") return "text-sky-500";
    if (value == "Falta justificada") return "text-yellow-500";
    if (value == "Falta injustificada") return "text-red-500";
    if (value == "Descanso") return "text-black";
  };

  const handleAddComment = (registerDetail) => {
    setSelectedRegisterDetail(registerDetail);
    setShowCommentsOverlay(true);
  };

  const onSaveComment = (comment) => {
    const localRegister = selectedRegister.registersDetails.map((item) => {
      if (item.id == selectedRegisterDetail.id) {
        item.comments.push(comment)
      }
      return item;
    });
    dispatch(SetSelectedRegistersDetails(localRegister))
  };

  return (
    <>
      <div className="flex mx-6 mt-6">
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de inicio:</div>
          <DatePicker
            locale="es"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de termino:</div>
          <DatePicker
            locale="es"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="overflow-x-scroll rounded-3xl m-6 ">
        <table className="relative w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="">
              <th scope="col" className="py-3 px-2 sticky left-0 bg-gray-50">
                Nombre
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
            {selectedRegister.registersDetails && selectedRegister.registersDetails.length > 0 &&
              selectedRegister.registersDetails
                .filter((item) => {
                  if (search == "") {
                    return true;
                  } else {
                    return item.employee.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
                  }
                })
                .map((item) => {
                  return (
                    <tr key={item.id} className="bg-white font-semibold">
                      <td
                        className={`py-1 px-2 whitespace-nowrap sticky left-0 bg-white`}
                      >
                        {item.employee.name}
                      </td>

                      <td className={`py-1 px-2`}>
                        <input
                          type="number"
                          className="border border-porcelain w-[100px]"
                          name="overtimeMinutes"
                          value={item.overtimeMinutes || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          type="number"
                          className="border border-porcelain w-[100px]"
                          name="abscense"
                          value={item.abscense || "0"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />
                      </td>
                      <td className={`py-1 px-2`}>
                        <select
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
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.ju
                          )}`}
                          name="ju"
                          value={item.ju || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.vi
                          )}`}
                          name="vi"
                          value={item.vi || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.sa
                          )}`}
                          name="sa"
                          value={item.sa || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.do
                          )}`}
                          name="do"
                          value={item.do || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.lu
                          )}`}
                          name="lu"
                          value={item.lu || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.ma
                          )}`}
                          name="ma"
                          value={item.ma || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          className={`font-semibold bg-whiteLilac ${getLetterColor(
                            item.mi
                          )}`}
                          name="mi"
                          value={item.mi || "Asistencia"}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        >
                          <option className="text-mineShaft" value="Asistencia">
                            A
                          </option>
                          <option className="text-mineShaft" value="Doblada">
                            D
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta justificada"
                          >
                            FJ
                          </option>
                          <option
                            className="text-mineShaft"
                            value="Falta injustificada"
                          >
                            FI
                          </option>
                          <option className="text-mineShaft" value="Descanso">
                            De
                          </option>
                        </select>
                      </td>

                      <td
                        className={`py-1 px-2 text-primary font-semibold cursor-pointer`}
                        onClick={() => {
                          handleAddComment(item);
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
          onSave={onSaveComment}
          selectedRegisterDetail={selectedRegisterDetail}
        ></CommentsOverlay>
      )}
    </>
  );
}
