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
  SetSearchRegisterRH,
  ShowNewEmployeeOverlay,
} from "../../../store/actionCreators/rh";
import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import TopBar from "../../../components/TopBar";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import UploadIcon from "../../../assets/svg/icon_browse_blue.svg";
import CheckIcon from "../../../assets/svg/icon_check_big.svg";

export default function RegistroRH() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.rh);
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
    dispatch(SetSearchRegisterRH(""));
  }, [location]);

  return (
    <>
      <div className="flex flex-col flex-1 ">
        <div className="w-full flex flex-col sticky top-0 bg-white px-12 py-6 z-50">
          <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
            <input
              onChange={(e) => {
                dispatch(SetSearchRegisterRH(e.target.value));
              }}
              value={search}
              type="text"
              className="border border-porcelain rounded-[32px]"
              placeholder="Buscar"
            />
            {activeRoute == "registros-rh" && (
              <button
                onClick={() => navigate({ pathname: "/nuevo-registro-rh" })}
                className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
              >
                <AddIcon fill="#FFF"></AddIcon>
                <div>Nueva registro</div>
              </button>
            )}
            {activeRoute == "lista-empleados-rh" && (
              <button
                onClick={() => dispatch(ShowNewEmployeeOverlay(true, false))}
                className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
              >
                <AddIcon fill="#FFF"></AddIcon>
                <div>Nuevo empleado </div>
              </button>
            )}
            {activeRoute == "nuevo-registro-rh" && (
              <>
                <button className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] border border-porcelain text-primary bg-white">
                  <UploadIcon fill="#0C3CFD"></UploadIcon>
                  <div>Cargar excel </div>
                </button>
                <button className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary">
                  <CheckIcon fill="#FFF"></CheckIcon>
                  <div>Gurdar registro </div>
                </button>
              </>
            )}
          </TopBar>
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          <ul className="flex items-center py-4">
            <li
              className={` ${
                activeRoute === "registros-rh"
                  ? "text-primary border-b-2 border-b-primary font-semibold"
                  : "bg-transparent text-regentGray"
              } cursor-pointer mt-1 py-1 px-2 text-sm`}
            >
              <NavLink
                to="registros-rh"
                className={`flex items-center p-1`}
                onClick={() => setActiveRoute("registros-rh")}
              >
                Registros
              </NavLink>
            </li>
            <li
              className={` ${
                activeRoute === "lista-empleados-rh"
                  ? "text-primary border-b-2 border-b-primary font-semibold"
                  : "bg-transparent text-regentGray"
              } cursor-pointer mt-1 py-1 px-2 text-sm`}
            >
              <NavLink
                to="lista-empleados-rh"
                className={`flex items-center p-1`}
                onClick={() => setActiveRoute("lista-empleados-rh")}
              >
                Empleados
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
