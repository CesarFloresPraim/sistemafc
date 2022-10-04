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
  SaveRegister,
  ClearNewRegister,
  SetSelectedRegisterId,
} from "../../../store/actionCreators/rh";
import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import TopBar from "../../../components/TopBar";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import UploadIcon from "../../../assets/svg/icon_browse_blue.svg";
import CheckIcon from "../../../assets/svg/icon_check_big.svg";
import EditIcon from "../../../assets/svg/icon_edit.svg";

export default function RegistroRH() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { search, register, selectedRegister } = useSelector((state) => state.rh);
  const [activeRoute, setActiveRoute] = useState(
    location.pathname.replaceAll("/", "")
  );
  const [topbarTitle, setTopbarTitle] = useState(
    getTopbarTitle(location.pathname.replaceAll("/", ""))
  );
  const [topbarBreadcrums, setTopbarBreadcrums] = useState(
    getBreadcrumsArray(location.pathname.replaceAll("/", ""))
  );

  const saveRegister = () => {
    dispatch(SaveRegister(register)).then((res) => {
      dispatch(ClearNewRegister());
      navigate({ pathname: "/editar-registro-rh" });
    });
  };

  const updateRegister = () => {
    dispatch(SaveRegister(selectedRegister)).then((res) => {
      //dispatch(ClearNewRegister());
      navigate({ pathname: "/detalles-registro-rh" });
    });
  };

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
            {activeRoute == "detalles-registro-rh" && (
              <>
                <button
                  onClick={() => {
                    navigate({ pathname: "/editar-registro-rh" });
                  }}
                  className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] border text-white bg-primary"
                >
                  <EditIcon fill="#FFF"></EditIcon>
                  <div>Editar registro </div>
                </button>
              </>
            )}
            {activeRoute == "nuevo-registro-rh" && (
              <>
                <button className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] border border-porcelain text-primary bg-white">
                  <UploadIcon fill="#0C3CFD"></UploadIcon>
                  <div>Cargar excel </div>
                </button>
                <button
                  disabled={!register.id}
                  onClick={saveRegister}
                  className={`flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white ${
                    !register.id ? "bg-mischka" : "bg-primary"
                  }`}
                >
                  <CheckIcon fill="#FFF"></CheckIcon>
                  <div>Gurdar registro </div>
                </button>
              </>
            )}
            {activeRoute == "editar-registro-rh" && (
              <>
                <button
                  onClick={updateRegister}
                  className={`flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary`}
                >
                  <CheckIcon fill="#FFF"></CheckIcon>
                  <div>Actualizar registro </div>
                </button>
              </>
            )}
          </TopBar>
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          {(activeRoute == "nuevo-registro-rh" ||
            activeRoute == "comida-registro-rh" ||
            activeRoute == "caja-chica-registro-rh" ||
            activeRoute == "horas-extra-registro-rh") && (
            <ul className="flex items-center py-4">
              <li
                className={` ${
                  activeRoute === "nuevo-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="nuevo-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("nuevo-registro-rh")}
                >
                  Resumen
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "comida-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="comida-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("comida-registro-rh")}
                >
                  Comida
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "caja-chica-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="caja-chica-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("caja-chica-registro-rh")}
                >
                  Caja chica
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "horas-extra-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="horas-extra-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("horas-extra-registro-rh")}
                >
                  Horas extra y faltas
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          {(activeRoute == "editar-registro-rh" ||
            activeRoute == "editar-comida-registro-rh" ||
            activeRoute == "editar-caja-chica-registro-rh" ||
            activeRoute == "editar-horas-extra-registro-rh") && (
            <ul className="flex items-center py-4">
              <li
                className={` ${
                  activeRoute === "editar-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="editar-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("editar-registro-rh")}
                >
                  Resumen
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "editar-comida-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="editar-comida-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("editar-comida-registro-rh")}
                >
                  Comida
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "editar-caja-chica-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="editar-caja-chica-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() =>
                    setActiveRoute("editar-caja-chica-registro-rh")
                  }
                >
                  Caja chica
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "editar-horas-extra-registro-rh"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="editar-horas-extra-registro-rh"
                  className={`flex items-center p-1`}
                  onClick={() =>
                    setActiveRoute("editar-horas-extra-registro-rh")
                  }
                >
                  Horas extra y faltas
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          {(activeRoute == "registros-rh" ||
            activeRoute == "lista-empleados-rh") && (
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
          )}
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
