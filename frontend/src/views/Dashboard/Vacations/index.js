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
  ShowNewVacationOverlay,
  SetSearchEmployee,
  CreateVacation,
  EditVacation,
  FetchEmployeeVacationList,
} from "../../../store/actionCreators/vacations";

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";
import {
  getVacationsPerYears,
  getYearsOfWork,
} from "../../../helpers/vacations";
import TopBar from "../../../components/TopBar";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import AssignPercetionOverlay from "../Overlays/AssignPerceptionOverlay";
import AssignVacationOverlay from "../Overlays/AssignVacationOverlay";

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
  const { showNewVacationOverlay, search, employeeVacationList } = useSelector(
    (state) => state.vacations
  );

  //Route handling
  const [topbarTitle, setTopbarTitle] = useState(
    getTopbarTitle(location.pathname.replaceAll("/", ""))
  );
  const [topbarBreadcrums, setTopbarBreadcrums] = useState(
    getBreadcrumsArray(location.pathname.replaceAll("/", ""))
  );

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [showInactive, setShowInactive] = useState(false);

  const handleSetShowOverlay = (value) => {
    dispatch(ShowNewVacationOverlay(value));
  };

  const handleSeeEmpoyee = (item) => {
    console.log(item);
    setSelectedEmployee(item)
    handleSetShowOverlay(true);
  };
  const handleCreate = (vacationDTO) => {
    dispatch(CreateVacation(vacationDTO)).then(res=>{
        dispatch(FetchEmployeeVacationList())
        handleSetShowOverlay(false)
    })
  };
  const handleEdit = (vacationDTO) => {
    dispatch(EditVacation(vacationDTO)).then(res=>{
        dispatch(FetchEmployeeVacationList())
        handleSetShowOverlay(false)
    })
  };

  const sumVacationDaysTaken = (vacationsArray) => {
    let sum = 0;
    for (const vacationItem of vacationsArray) {
      sum += vacationItem.days;
    }
    return sum;
  };

  useEffect(() => {
    dispatch(FetchEmployeeVacationList());
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
              onClick={() => dispatch(ShowNewVacationOverlay(true, false))}
              className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Nueva vacacion </div>
            </button>
          </TopBar>
        </div>
        <>
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
                  <th scope="col" className="py-3 px-6">
                    Trabajo x sem
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Años de trabajo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Dias de vacaciones
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Dias tomados
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Fecha de inicio
                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeVacationList.length > 0 &&
                  employeeVacationList
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
                            {" "}
                            {getYearsOfWork(item.startDate)}
                          </td>
                          <td className={`py-4 px-6`}>
                            {getVacationsPerYears(
                              getYearsOfWork(item.startDate)
                            )}
                          </td>
                          <td className={`py-4 px-6`}>
                            {sumVacationDaysTaken(item.vacations)}
                          </td>

                          <td className={`py-4 px-6 whitespace-nowrap`}>
                            {new Date(item.startDate).toLocaleDateString(
                              "es-ES",
                              dateOptions
                            )}
                          </td>
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
          {showNewVacationOverlay && (
            <AssignVacationOverlay
              showOverlay={handleSetShowOverlay}
              employee={selectedEmployee}
              onCreate={handleCreate}
              onEdit={handleEdit}
            ></AssignVacationOverlay>
          )}
        </>
      </div>
    </>
  );
}
