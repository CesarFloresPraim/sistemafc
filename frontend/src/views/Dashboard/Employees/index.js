import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
  NavLink,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

import {
  FetchEmployeeList,
  ShowNewEmployeeOverlay,
  FetchDepartmentList,
  SetSearchEmployee,
  EditEmployeeFull,
  CreateEmployeeFull
} from "../../../store/actionCreators/employees";

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";
import { moneyFormat } from "../../../helpers/moneyFormat";

import TopBar from "../../../components/TopBar";
import SwitchSelection from "../../../components/SwitchSelection";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import NewEmployeeFullOverlay from "../Overlays/NewEmployeeFullOverlay";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Employees() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    showNewEmployeeFullOverlay,
    search,
    employeeList,
    isEdittingEmployee,
    departments,
  } = useSelector((state) => state.employees);

  //Route handling
  const [topbarTitle, setTopbarTitle] = useState(
    getTopbarTitle(location.pathname.replaceAll("/", ""))
  );
  const [topbarBreadcrums, setTopbarBreadcrums] = useState(
    getBreadcrumsArray(location.pathname.replaceAll("/", ""))
  );

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showInactive, setShowInactive] = useState(false);

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewEmployeeOverlay(value, isEditting));
  };

  const handleSeeEmpoyee = (item) => {
    setSelectedEmployee(item);
    handleSetShowOverlay(true, true);
  };

  const handleOnSave = (employeeDTO, isEditting) => {
    if (isEditting && employeeDTO.id) {
      return dispatch(EditEmployeeFull(employeeDTO)).then(res=>{
        dispatch(FetchEmployeeList())
        handleSetShowOverlay(false, false)
      })
    }
    return dispatch(CreateEmployeeFull(employeeDTO)).then(res=>{
        dispatch(FetchEmployeeList())
        handleSetShowOverlay(false, false)
      })
  };

  useEffect(() => {
    dispatch(FetchEmployeeList());
    dispatch(FetchDepartmentList());
    dispatch(SetSearchEmployee(""));
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1 ">
        <div className="w-full flex flex-col sticky top-0 bg-white px-12 py-6 z-50">
          <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
            <input
              onChange={(e) => {
                dispatch(SetSearchEmployee(e.target.value));
              }}
              value={search}
              type="text"
              className="border border-porcelain rounded-[32px]"
              placeholder="Buscar"
            />
            <button
              onClick={() => dispatch(ShowNewEmployeeOverlay(true, false))}
              className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Nuevo empleado </div>
            </button>
          </TopBar>
        </div>
        <>
          <div className="mx-8 flex mt-4 ">
            <div className="ml-auto">
              {" "}
              <SwitchSelection
                selected={showInactive}
                onChange={setShowInactive}
              ></SwitchSelection>
            </div>
            <div
              className={`ml-2 ${
                !showInactive ? "text-regentGray" : "text-primary"
              } font-semibold`}
            >
              Mostrar inactivos
            </div>
          </div>
          <div className="overflow-x-auto relative rounded-3xl m-6 ">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    No
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Departamento
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 sticky left-0 bg-gray-50"
                  >
                    Nombre
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Dias T
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Salario
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    B. Inf
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Ahorro x S
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Ahorro
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Ret x S
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Deuda
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Tiene infonavit
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Ret x Infon
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Infonavit
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Hora Ex. Fija
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Fecha de inicio
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Fecha de termino
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Telefono
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeList.length > 0 &&
                  employeeList
                    .filter((item) => {
                      if (showInactive) {
                        return true;
                      }
                      return item.isActive;
                    })
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
                        <tr
                          key={item.id}
                          className="py-4 px-6 hover:bg-gray-50"
                        >
                          <td className={`py-4 px-6`}>{item.number}</td>
                          <td className={`py-4 px-6`}>
                            {item.department?.name}
                          </td>
                          <td
                            className={`py-4 px-6 whitespace-nowrap sticky left-0 z-50 bg-gray-50`}
                          >
                            {item.name}
                          </td>
                          <td className={`py-4 px-6`}>{item.daysOfWork}</td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.salary)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {item.hasInflationBonus ? "Si" : "No"}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.savingsPerWeek)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.savingsAmount)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.retentionPerWeek)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.debtAmount)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {item.hasInfonavit ? "Si" : "No"}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.retentionInfonavit)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {moneyFormat(item.infonavitAmount)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {item.hasExtraHourFixed ? "Si" : "No"}
                          </td>
                          <td className={`py-4 px-6 whitespace-nowrap`}>
                            {new Date(item.startDate).toLocaleDateString(
                              "es-ES",
                              dateOptions
                            )}
                          </td>
                          <td className={`py-4 px-6 whitespace-nowrap`}>
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
                              handleSeeEmpoyee(item);
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
          {showNewEmployeeFullOverlay && (
            <NewEmployeeFullOverlay
              showOverlay={handleSetShowOverlay}
              departments={departments}
              employee={selectedEmployee}
              isEditting={isEdittingEmployee}
              onSave={handleOnSave}
            ></NewEmployeeFullOverlay>
          )}
        </>
      </div>
    </>
  );
}
