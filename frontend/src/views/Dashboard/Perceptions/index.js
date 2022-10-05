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
import { ShowNewPerceptionOverlay } from "../../../store/actionCreators/perceptions";
import { SetSearchRegisterRH } from "../../../store/actionCreators/rh";

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import TopBar from "../../../components/TopBar";

import AddIcon from "../../../assets/svg/icon_plus.svg";
import UploadIcon from "../../../assets/svg/icon_browse_blue.svg";
import CheckIcon from "../../../assets/svg/icon_check_big.svg";
import EditIcon from "../../../assets/svg/icon_edit.svg";

export default function Perceptions() {
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
    SetSearchRegisterRH("");
  }, [location]);

  return (
    <>
      <div className="flex flex-col flex-1 ">
        <div className="w-full flex flex-col sticky top-0 bg-white px-12 py-6 z-50">
          <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
            {activeRoute == "tipo-percepcion" && (
              <input
                onChange={(e) => {
                  dispatch(SetSearchRegisterRH(e.target.value));
                }}
                value={search}
                type="text"
                className="border border-porcelain rounded-[32px]"
                placeholder="Buscar"
              />
            )}

            {activeRoute == "tipo-percepcion" && (
              <button
                onClick={() => dispatch(ShowNewPerceptionOverlay(true, false))}
                className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary"
              >
                <AddIcon fill="#FFF"></AddIcon>
                <div>Nuevo tipo de percepcion </div>
              </button>
            )}
          </TopBar>
        </div>
        <div className=" overflow-x-scroll hide-scrollbar px-8">
          {(activeRoute == "tipo-percepcion" ||
            activeRoute == "asignar-percepcion") && (
            <ul className="flex items-center py-4">
              <li
                className={` ${
                  activeRoute === "asignar-percepcion"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="asignar-percepcion"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("asignar-percepcion")}
                >
                  Asignar
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "tipo-percepcion"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="tipo-percepcion"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("tipo-percepcion")}
                >
                  Crear tipo
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
