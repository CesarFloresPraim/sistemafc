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
  CreateEmployeeFull,
} from "../../../store/actionCreators/employees";

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";
import { moneyFormat } from "../../../helpers/moneyFormat";

import TopBar from "../../../components/TopBar";
import SwitchSelection from "../../../components/SwitchSelection";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import NewEmployeeFullOverlay from "../Overlays/NewEmployeeFullOverlay";
import {
  SetPayrollDetails,
  FetchPayrollDetails,
} from "../../../store/actionCreators/payroll";

export default function Payroll() {
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

  const { selectedPayrollId } = useSelector((state) => state.payroll);

  //Route handling
  const [activeRoute, setActiveRoute] = useState(
    location.pathname.replaceAll("/", "")
  );
  const [topbarTitle, setTopbarTitle] = useState(
    getTopbarTitle(location.pathname.replaceAll("/", ""))
  );
  const [topbarBreadcrums, setTopbarBreadcrums] = useState(
    getBreadcrumsArray(location.pathname.replaceAll("/", ""))
  );

  useEffect(() => {
    setActiveRoute(location.pathname.replaceAll("/", ""));
    setTopbarTitle(getTopbarTitle(location.pathname.replaceAll("/", "")));
    setTopbarBreadcrums(
      getBreadcrumsArray(location.pathname.replaceAll("/", ""))
    );
    //dispatch(SetSearchRegisterRH(""));
  }, [location]);

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
            {activeRoute == "detalles-nomina" && (
              <button
                onClick={() => {
                  dispatch(FetchPayrollDetails(selectedPayrollId)).then(
                    (res) => {
                      dispatch(SetPayrollDetails(res.data));
                      navigate({ pathname: "/resumen-nomina" });
                    }
                  );
                }}
                className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
              >
                <AddIcon fill="#FFF"></AddIcon>
                <div>Editar nomina</div>
              </button>
            )}
            {activeRoute == "nominas" && (
              <button
                onClick={() => navigate({ pathname: "/nueva-nomina" })}
                className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
              >
                <AddIcon fill="#FFF"></AddIcon>
                <div>Nomina</div>
              </button>
            )}
          </TopBar>
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          {activeRoute == "nueva-nomina" && (
            <ul className="flex items-center py-4">
              <li
                className={` ${
                  activeRoute === "nueva-nomina"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="nueva-nomina"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("nueva-nomina")}
                >
                  Resumen
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
