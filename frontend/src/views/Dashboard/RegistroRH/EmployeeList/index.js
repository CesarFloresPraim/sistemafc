import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowNewEmployeeOverlay } from "../../../../store/actionCreators/rh";

import AddEmployeeOverlay from "../AddEmployeeOverlay";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search } = useSelector((state) => state.rh);

  const [employeesList, setEmployeesList] = useState([
    {
      number: 654,
      name: "CESAR EDUARDO FLORES PALACIOS",
      department: "Operativo",
      fromDay: "14",
      fromMonth: "Agosto",
      fromYear: "2010",
      toDay: "14",
      toMonth: "Febrero",
      toYear: "2022",
      phone: "74783994",
      isCurrent: false
    },
    {
      number: 123,
      name: "SONIA PALACIOS LOYA",
      department: "Oficina",
      fromDay: "14",
      fromMonth: "Agosto",
      fromYear: "2010",
      toDay: "",
      toMonth: "",
      toYear: "",
      phone: "74783994",
      isCurrent: true
    },
    {
      number: 485,
      name: "LLUVIA JAQ CSATILLO VARELA",
      department: "Menudeo",
      fromDay: "14",
      fromMonth: "Agosto",
      fromYear: "2010",
      toDay: "14",
      toMonth: "Febrero",
      toYear: "2022",
      phone: "74783994",
      isCurrent: false
    },
  ]);
  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const handleSetShowOverlay = (value) => {
    dispatch(ShowNewEmployeeOverlay(value));
  };

  const handleSeeEmpoyee = (number) => {
    let employee = employeesList.find((item) => item.number == number);
    if(employee) {
      setSelectedEmployee(employee)
      handleSetShowOverlay(true)
    }
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
  }, [search]);

  
  return (
    <>
      <div class="overflow-x-auto relative rounded-3xl m-6 ">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="py-3 px-6">
                No
              </th>
              <th scope="col" class="py-3 px-6">
                Nombre
              </th>
              <th scope="col" class="py-3 px-6">
                Departamento
              </th>
              <th scope="col" class="py-3 px-6">
                Fecha de inicio
              </th>
              <th scope="col" class="py-3 px-6">
                Fecha de termino
              </th>
              <th scope="col" class="py-3 px-6">
                Telefono
              </th>
              <th scope="col" class="py-3 px-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeesList.length > 0 &&
              filteredEmployeesList.map((item) => {
                return (
                  <tr class="bg-white font-semibold hover:bg-gray-50">
                    <td class={`py-4 px-6`}>{item.number}</td>
                    <td class={`py-4 px-6`}>{item.name}</td>
                    <td class={`py-4 px-6`}>{item.department}</td>
                    <td class={`py-4 px-6`}>{item.fromDay}/{item.fromMonth}/{item.fromYear}</td>
                    <td class={`py-4 px-6`}>{item.isCurrent? "Actual": `${item.toDay}/${item.toMonth}/${item.toYear}`}</td>
                    <td class={`py-4 px-6`}>{item.phone}</td>
                    <td
                      class={`py-4 px-6 text-primary font-semibold`}
                      onClick={() => {
                        handleSeeEmpoyee(item.number);
                      }}
                    >
                      Editar
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
