import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CheckIcon from "../../../../assets/svg/small/icon_check.svg";
import CrossIcon from "../../../../assets/svg/small/icon_close.svg";
import CollapseIcon from "../../../../assets/svg/icon_collapse.svg";

export default function RegisterDetails() {
  const [employeeRegisters, setEmployeeRegisters] = useState([
    {
      name: "CESAR EDUARDO FLORES PALACIOS",
      food: "100.00",
      smallBox: "1000.00",
      overtimeMinutes: "240",
      puntuality: true,
      attendance: false,
      register: {
        ju: "Doblada",
        vi: "Falta justificada",
        sa: "Asistencia",
        do: "Asistencia",
        lu: "Descanso",
        ma: "Falta injustificada",
        mi: "Asistencia",
      },
      comments: [
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
      ],
      collapsed: true,
    },
    {
      name: "SONIA PALACIOS LOYA",
      food: "100.00",
      smallBox: "1000.00",
      overtimeMinutes: "240",
      puntuality: false,
      attendance: false,
      register: {
        ju: "Doblada",
        vi: "Falta justificada",
        sa: "Asistencia",
        do: "Asistencia",
        lu: "Descanso",
        ma: "Falta injustificada",
        mi: "Asistencia",
      },
      comments: [
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
      ],
      collapsed: true,
    },
    {
      name: "LLUVIA JAQUELINEE CASTILLO VARELA",
      food: "100.00",
      smallBox: "1000.00",
      overtimeMinutes: "240",
      puntuality: false,
      attendance: true,
      register: {
        ju: "Doblada",
        vi: "Falta justificada",
        sa: "Asistencia",
        do: "Asistencia",
        lu: "Descanso",
        ma: "Falta injustificada",
        mi: "Asistencia",
      },
      comments: [
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
        {
          date: "24 de agosto del 2022",
          text: "6 HE se quedo a autorizar papeleria, Doblada lun x vacante cuadrilla 1, Doblada martes falta Rogelio Palacios",
        },
      ],
      collapsed: true,
    },
  ]);
  const [filteredEmployeeRegisters, setFilteredEmployeeRegisters] = useState(
    []
  );
  const { search } = useSelector((state) => state.rh);

  const registerToLetter = (text) => {
    if (text == "Doblada") return "D";
    if (text == "Falta justificada") return "FJ";
    if (text == "Asistencia") return "A";
    if (text == "Descanso") return "De";
    if (text == "Falta injustificada") return "FI";
  };

  const getTextColor = (text) => {
    if (text == "Doblada") return "text-sky-500";
    if (text == "Falta justificada") return "text-yellow-500";
    if (text == "Asistencia") return "text-green-500";
    if (text == "Descanso") return "text-black";
    if (text == "Falta injustificada") return "text-red-500";
  };

  const collapseRegister = (idx) => {
    let changedCollapsed = filteredEmployeeRegisters.map((item, i) => {
      console.log(i, idx);
      if (i == idx) {
        item.collapsed = !item.collapsed;
        return item;
      }
      return item;
    });
    setFilteredEmployeeRegisters(changedCollapsed);
  };

  useEffect(() => {
    if (search == "") {
      setFilteredEmployeeRegisters([...employeeRegisters]);
    } else {
      let filteredEmployees = employeeRegisters.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setFilteredEmployeeRegisters([...filteredEmployees]);
    }
  }, [search]);

  useEffect(() => {
    setFilteredEmployeeRegisters([...employeeRegisters]);
  }, []);

  return (
    <div className="flex flex-col p-12 text-sm">
      <div className="text-2xl font-semibold text-mineShaft mb-4">Semana 17 de agosto al 22 de agosto del 2022</div>
      <div className="flex mb-4">
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-green-500 border-2 border-porcelain mx-2"></div>
          <div>Asistencia</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-sky-500 border-2 border-porcelain mx-2"></div>
          <div>Doblada</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-yellow-500 border-2 border-porcelain mx-2"></div>
          <div>Falta justificada</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-red-500 border-2 border-porcelain mx-2"></div>
          <div>Falta injustificada</div>
        </div>
      </div>
      {filteredEmployeeRegisters.length > 0 &&
        filteredEmployeeRegisters.map((item, idx) => {
          return (
            <div
              onClick={() => collapseRegister(idx)}
              className="flex flex-col border border-porcelain rounded-[32px] p-4 pb-0 mb-4"
            >
              <div className="flex ">
                <div className="flex flex-col">
                  <div className="text-base font-semibold p-2">{item.name}</div>
                  <div className="flex">
                    <div className="flex flex-col items-center p-2">
                      <div className="font-semibold">Comida</div>
                      <div>${item.food}</div>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="font-semibold">Caja chica</div>
                      <div>${item.smallBox}</div>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="font-semibold">Horas extra (min)</div>
                      <div>{item.overtimeMinutes} min</div>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="font-semibold">Puntualidad</div>
                      <div>
                        {item.puntuality ? (
                          <CheckIcon fill="#00C48B"></CheckIcon>
                        ) : (
                          <CrossIcon fill="#FB3F3F"></CrossIcon>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2">
                      <div className="font-semibold">Asistencia</div>
                      <div>
                        {item.attendance ? (
                          <CheckIcon fill="#00C48B"></CheckIcon>
                        ) : (
                          <CrossIcon fill="#FB3F3F"></CrossIcon>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex ml-auto">
                  <div class="overflow-x-auto relative rounded-3xl">
                    <table class="w-full text-sm text-left text-gray-500">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white font-semibold">
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.ju
                            )}`}
                          >
                            {registerToLetter(item.register.ju)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.vi
                            )}`}
                          >
                            {registerToLetter(item.register.vi)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.sa
                            )}`}
                          >
                            {" "}
                            {registerToLetter(item.register.sa)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.do
                            )}`}
                          >
                            {" "}
                            {registerToLetter(item.register.do)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.lu
                            )}`}
                          >
                            {" "}
                            {registerToLetter(item.register.lu)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.ma
                            )}`}
                          >
                            {" "}
                            {registerToLetter(item.register.ma)}
                          </td>
                          <td
                            class={`py-4 px-6 ${getTextColor(
                              item.register.mi
                            )}`}
                          >
                            {" "}
                            {registerToLetter(item.register.mi)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4 ${
                  item.collapsed && "hidden"
                }`}
              >
                {item.comments.length > 0 &&
                  item.comments.map((comment) => {
                    return (
                      <div className="flex border-b border-b-porcelain p-1">
                        <div className="text-regentGray">{comment.text}</div>
                        <div className="text-regentGray ml-auto">
                          {comment.date}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
