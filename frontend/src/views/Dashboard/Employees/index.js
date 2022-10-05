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

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import TopBar from "../../../components/TopBar";

import AddIcon from "../../../assets/svg/icon_plus.svg";


export default function Employees() {
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
                dispatch(SetSearchRegisterRH(e.target.value));
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
        
      </div>
    </>
  );
}
