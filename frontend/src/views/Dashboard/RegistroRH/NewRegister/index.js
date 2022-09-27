import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowNewEmployeeOverlay } from "../../../../store/actionCreators/rh";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import AddEmployeeOverlay from "../AddEmployeeOverlay";

export default function NewRegister() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search } = useSelector((state) => state.rh);

  const [employeesList, setEmployeesList] = useState([
    {
      id: "0",
      name: "SONIA PALACIOS LOYA",
      food: "100.00",
      smallBox: "1000.00",
      overtimeMinutes: "240",
      puntuality: false,
      attendance: false,
      ju: "Doblada",
      vi: "Falta justificada",
      sa: "Asistencia",
      do: "Asistencia",
      lu: "Descanso",
      ma: "Falta injustificada",
      mi: "Asistencia",
      comments: [
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
      ],
      collapsed: true,
    },
    { id: 1, name: "CESAR EDUARDO FLORES PALACIOS" },
  ]);
  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSetShowOverlay = (value) => {
    dispatch(ShowNewEmployeeOverlay(value));
  };

  const handleRegisterChange = (e, id) => {
    let edittedList = employeesList.map((item) => {
      if (item.id == id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    console.log(edittedList);
    setEmployeesList(edittedList);
  };

  useEffect(() => {
    if (search == "") {
      setFilteredEmployeesList([...employeesList]);
    } else {
      let filteredEmployees = employeesList.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setFilteredEmployeesList([...filteredEmployees]);
    }
  }, [search, employeesList]);

  return (
    <>
      <div className="flex mx-6 mt-6">
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de inicio:</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="flex flex-col mx-6">
          <div className="mr-2">Fecha de termino:</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <div class="overflow-x-scroll rounded-3xl m-6 ">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="py-3 px-6">
                Nombre
              </th>
              <th scope="col" class="py-3 px-6">
                Comida
              </th>
              <th scope="col" class="py-3 px-6">
                Caja chica
              </th>
              <th scope="col" class="py-3 px-6">
                Horas extra (min)
              </th>
              <th scope="col" class="py-3 px-6">
                Puntualidad
              </th>
              <th scope="col" class="py-3 px-6">
                Asistencia
              </th>
              <th scope="col" class="py-3 px-6">
                Ju
              </th>
              <th scope="col" class="py-3 px-6">
                Vi
              </th>
              <th scope="col" class="py-3 px-6">
                Sa
              </th>
              <th scope="col" class="py-3 px-6">
                Do
              </th>
              <th scope="col" class="py-3 px-6">
                Lu
              </th>
              <th scope="col" class="py-3 px-6">
                Ma
              </th>
              <th scope="col" class="py-3 px-6">
                Mi
              </th>
              <th scope="col" class="py-3 px-6">
                Comentarios
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeesList.length > 0 &&
              filteredEmployeesList.map((item) => {
                return (
                  <tr class="bg-white font-semibold">
                    <td class={`py-1 px-6 whitespace-nowrap`}>{item.name}</td>
                    <td class={`py-1 px-6`}>
                      <input
                        type="number"
                        className="border border-porcelain w-[100px]"
                        name="food"
                        value={item.food}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      />{" "}
                    </td>
                    <td class={`py-1 px-6`}>
                      <input
                        type="number"
                        className="border border-porcelain  w-[100px]"
                        name="smallBox"
                        value={item.smallBox}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      />{" "}
                    </td>
                    <td class={`py-1 px-6`}>
                      <input
                        type="number"
                        className="border border-porcelain w-[100px]"
                        name="overtimeMinutes"
                        value={item.overtimeMinutes}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      />
                    </td>
                    <td class={`py-1 px-6`}>
                      <select
                        name="puntuality"
                        value={item.puntuality}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      <select
                        name="attendance"
                        value={item.attendance}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="ju"
                        value={item.ju}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="vi"
                        value={item.vi}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="sa"
                        value={item.sa}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="do"
                        value={item.do}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="lu"
                        value={item.lu}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="ma"
                        value={item.ma}
                        onChange={(e) => handleRegisterChange(e, item.id)}
                      >
                        <option value="Asistencia">A</option>
                        <option value="Doblada">D</option>
                        <option value="Falta justificada">FJ</option>
                        <option value="Falta injustificada">FI</option>
                        <option value="Descanso">De</option>
                      </select>
                    </td>
                    <td class={`py-1 px-6`}>
                      {" "}
                      <select
                        name="mi"
                        value={item.mi}
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
                      class={`py-1 px-6 text-primary font-semibold`}
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
    </>
  );
}
