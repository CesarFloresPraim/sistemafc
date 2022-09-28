import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeList,
  ShowNewEmployeeOverlay,
  CreateEmployee,
  FetchDepartmentList,
  EditEmployee,
  DeactivateEmployee,
} from "../../../../store/actionCreators/rh";

import AddEmployeeOverlay from "../AddEmployeeOverlay";
import SwitchSelection from "../../../../components/SwitchSelection";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function EmployeeList() {
  const dispatch = useDispatch();
  const {
    showNewEmployeeOverlay,
    search,
    employeeList,
    isEdittingEmployee,
    departments,
  } = useSelector((state) => state.rh);

  const [filteredEmployeesList, setFilteredEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showInactive, setShowInactive] = useState(false);
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
      return dispatch(CreateEmployee(details))
        .then((res) => {
          dispatch(FetchEmployeeList());
          handleSetShowOverlay(false, false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return dispatch(EditEmployee(details, selectedEmployee.id))
      .then((res) => {
        dispatch(FetchEmployeeList());
        handleSetShowOverlay(false, false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmployeeDeactivate = () => {
    return dispatch(DeactivateEmployee(selectedEmployee.id))
      .then((res) => {
        dispatch(FetchEmployeeList());
        handleSetShowOverlay(false, false);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="mx-8 flex mt-4 ">
        <div className="ml-auto">        <SwitchSelection
          selected={showInactive}
          onChange={setShowInactive}
        ></SwitchSelection></div>
        <div className={`ml-2 ${!showInactive? "text-regentGray": "text-primary"} font-semibold`}>Mostrar inactivos</div>
      </div>
      <div className="overflow-x-auto relative rounded-3xl m-6 ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Nombre
              </th>
              <th scope="col" className="py-3 px-6">
                Departamento
              </th>
              <th scope="col" className="py-3 px-6">
                Fecha de inicio
              </th>
              <th scope="col" className="py-3 px-6">
                Fecha de termino
              </th>
              <th scope="col" className="py-3 px-6">
                Telefono
              </th>
              <th scope="col" className="py-3 px-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployeesList.length > 0 &&
              filteredEmployeesList
                .filter((item) => {
                  if (showInactive) {
                    return true;
                  }
                  return item.isActive;
                })
                .map((item) => {
                  return (
                    <tr key={item.id} className="bg-white font-semibold hover:bg-gray-50 border-b border-porcelain">
                      <td className={`py-4 px-6`}>{item.number}</td>
                      <td className={`py-4 px-6 whitespace-nowrap`}>{item.name}</td>
                      <td className={`py-4 px-6`}>{item.department?.name}</td>
                      <td className={`py-4 px-6`}>
                        {new Date(item.startDate).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </td>
                      <td className={`py-4 px-6`}>
                        {item.isCurrent
                          ? "Actual"
                          : new Date(item.endDate).toLocaleDateString(
                              "es-ES",
                              dateOptions
                            )}
                      </td>
                      <td className={`py-4 px-6`}>{item.phone}</td>
                      <td
                        className={`py-4 px-6 text-primary font-semibold`}
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
          employee={isEdittingEmployee ? selectedEmployee : null}
          isEditting={isEdittingEmployee}
          onSave={handleEmployeeSave}
          onDelete={handleEmployeeDeactivate}
          departments={departments}
        ></AddEmployeeOverlay>
      )}
    </>
  );
}
