import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeList,
  ShowNewEmployeeOverlay,
  CreateEmployee,
  FetchDepartmentList
} from "../../../../store/actionCreators/rh";

import AddEmployeeOverlay from "../AddEmployeeOverlay";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const { showNewEmployeeOverlay, search, employeeList, isEdittingEmployee, departments } = useSelector(
    (state) => state.rh
  );

  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewEmployeeOverlay(value, isEditting));
  };

  const handleSeeEmpoyee = (number) => {
    let employee = employeeList.find((item) => item.number == number);
    if (employee) {
      setSelectedEmployee(employee);
      handleSetShowOverlay(true, true);
    }
  };

  const handleEmployeeSave = (details) => {
    if (!isEdittingEmployee) {
      dispatch(CreateEmployee(details)).then(res=> {
        dispatch(FetchEmployeeList());
      }).catch(err=> {
        console.log(err);
      })
    }
  };

  useEffect(() => {
    if (search == "") {
      setFilteredEmployeesList([...employeeList]);
    } else {
      let filteredEmployees = employeeList.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setFilteredEmployeesList([...filteredEmployees]);
    }
  }, [search]);

  useEffect(() => {
    dispatch(FetchEmployeeList());
    dispatch(FetchDepartmentList());
  }, []);

  useEffect(() => {
    setFilteredEmployeesList([...employeeList]);
  }, [employeeList]);

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
                    <td class={`py-4 px-6`}>{item.department?.name}</td>
                    <td class={`py-4 px-6`}>{item.startDate}</td>
                    <td class={`py-4 px-6`}>
                      {item.isCurrent ? "Actual" : item.endDate}
                    </td>
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
          employee={isEdittingEmployee? selectedEmployee : null}
          isEditting={isEdittingEmployee}
          onSave={handleEmployeeSave}
          departments={departments}
        ></AddEmployeeOverlay>
      )}
    </>
  );
}
