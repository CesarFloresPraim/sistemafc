import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeForResgisterList,
  ShowNewEmployeeOverlay,
  SetRegisters,
} from "../../../../store/actionCreators/rh";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import AddEmployeeOverlay from "../AddEmployeeOverlay";
import CommentsOverlay from "../CommentsOverlay";

import RefreshIcon from "../../../../assets/svg/icon_refresh.svg";

export default function NewRegister() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search, registers, employeesForRegister } =
    useSelector((state) => state.rh);
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewEmployeeOverlay(value, isEditting));
  };

  const fetchEmployeesForRegister = () => {
    dispatch(FetchEmployeeForResgisterList());
  };

  const handleRegisterChange = (e, id) => {
    let edittedList = registers.map((item) => {
      if (item.id == id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    dispatch(SetRegisters(edittedList));
  };

  // const handleAddComment = (id) => {
  //   let selectedEmp = employeesList.find((item) => item.id == id);
  //   if (selectedEmp) {
  //     setSelectedEmployee(selectedEmp);
  //     setShowCommentsOverlay(true);
  //   }
  // };

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
        <button
          onClick={fetchEmployeesForRegister}
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
            {registers.length > 0 &&
              registers
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
                        className={`py-1 px-2 whitespace-nowrap sticky left-0 bg-white`}
                      >
                        {item.name}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain w-[100px] bg-whiteLilac"
                          name="food"
                          value={item.food || ""}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />{" "}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain  w-[100px] bg-whiteLilac"
                          name="smallBox"
                          value={item.smallBox || ""}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />{" "}
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          disabled
                          type="number"
                          className="border border-porcelain w-[100px] bg-whiteLilac"
                          name="overtimeMinutes"
                          value={item.overtimeMinutes || ""}
                          onChange={(e) => handleRegisterChange(e, item.id)}
                        />
                      </td>
                      <td className={`py-1 px-2`}>
                        <input
                          type="number"
                          className="border border-porcelain w-[100px]"
                          name="abscense"
                          value={item.abscense || ""}
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
                          name="ju"
                          value={item.ju || ""}
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
                          name="vi"
                          value={item.vi || ""}
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
                          name="sa"
                          value={item.sa || ""}
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
                          name="do"
                          value={item.do || ""}
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
                          name="lu"
                          value={item.lu || ""}
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
                          name="ma"
                          value={item.ma || ""}
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
                          name="mi"
                          value={item.mi || ""}
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
                          handleAddComment(item.id);
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
      {showNewEmployeeOverlay && (
        <AddEmployeeOverlay
          showOverlay={handleSetShowOverlay}
          employee={selectedEmployee}
        ></AddEmployeeOverlay>
      )}
      {showCommentsOverlay && (
        <CommentsOverlay
          showOverlay={setShowCommentsOverlay}
          employee={selectedEmployee}
        ></CommentsOverlay>
      )}
    </>
  );
}
