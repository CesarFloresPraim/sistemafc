import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";

import MenuHomeActiveIcon from "../../../assets/svg/icon_menu_home_active.svg";
import MenuHomeIcon from "../../../assets/svg/icon_menu_home_hover.svg";
import MenuBriefcaseActiveIcon from "../../../assets/svg/icon_menu_briefcase_active.svg";
import MenuBriefcaseIcon from "../../../assets/svg/icon_menu_briefcase_hover.svg";
import MenuMarkerActiveIcon from "../../../assets/svg/icon_menu_marker_active.svg";
import MenuMarkerIcon from "../../../assets/svg/icon_menu_marker_hover.svg";
import MenuDocumentActiveIcon from "../../../assets/svg/icon_menu_document_active.svg";
import MenuDocumentIcon from "../../../assets/svg/icon_menu_document_hover.svg";
import MenuContactActiveIcon from "../../../assets/svg/icon_menu_contact_active.svg";
import MenuContactIcon from "../../../assets/svg/icon_menu_contact_hover.svg";
import PortraitActiveIcon from "../../../assets/svg/icon_menu_portrait_hover.svg";
import PortraitIcon from "../../../assets/svg/icon_menu_portrait_active.svg";
import DuplicateIcon from "../../../assets/svg/icon_duplicate.svg";
import WheelActiveIcon from "../../../assets/svg/icon_menu_wheel_active.svg";
import WheelIcon from "../../../assets/svg/icon_menu_wheel_hover.svg";
import LogoutIcon from "../../../assets/svg/icon_menu_logout_hover.svg";
import UpArrowIcon from "../../../assets/svg/icon_arrow_up.svg";
import DownArrowIcon from "../../../assets/svg/icon_arrow_down.svg";
import CalendarIcon from "../../../assets/svg/icon_calendar.svg";

export default function LeftNavbar({ handleLogout }) {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(
    location.pathname.replaceAll("/", "")
  );

  return (
    <div className="fixed w-[300px] bg-catalinaBlue h-screen max-h-screen flex mb-8 md:mb-0 flex-col">
      <div className=" bg-catalinaBlue mt-16 text-white text-center text-4xl">
        FC SISTEMA
      </div>
      <ul className="flex flex-col mt-12 px-6">
        <li
          className={`rounded-[32px] ${
            activeRoute === "home" ? "bg-primary" : "bg-transparent"
          } hover:bg-[#133B8D] mt-1`}
        >
          <NavLink
            to="home"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("home")}
          >
            <div>
              {activeRoute === "home" ? (
                <MenuHomeActiveIcon fill="#FFFFFF" />
              ) : (
                <MenuHomeIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Inicio</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "nominas" ? "bg-primary" : "bg-transparent"
          } hover:bg-[#133B8D] mt-1`}
        >
          <NavLink
            to="nominas"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("nominas")}
          >
            <div>
              {activeRoute === "nominas" ? (
                <MenuDocumentActiveIcon fill="#FFFFFF" />
              ) : (
                <MenuDocumentIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Nomina</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "empleados" ? "bg-primary" : "bg-transparent"
          } hover:bg-[#133B8D] mt-2`}
        >
          <NavLink
            to="empleados"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("empleados")}
          >
            <div>
              {activeRoute === "empleados" ? (
                <PortraitActiveIcon fill="#FFFFFF" />
              ) : (
                <PortraitIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Empleados</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "vacaciones" ? "bg-primary" : "bg-transparent"
          } hover:bg-[#133B8D] mt-2`}
        >
          <NavLink
            to="vacaciones"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("vacaciones")}
          >
            <div>
              {activeRoute === "vacaciones" ? (
                <MenuMarkerActiveIcon fill="#FFFFFF" />
              ) : (
                <MenuMarkerIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Vacaciones</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "asignar-percepcion"
              ? "bg-primary"
              : "bg-transparent"
          } hover:bg-[#133B8D] mt-2`}
        >
          <NavLink
            to="asignar-percepcion"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("asignar-percepcion")}
          >
            <div>
              {activeRoute === "asignar-percepcion" ? (
                <UpArrowIcon fill="#FFFFFF" />
              ) : (
                <UpArrowIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Percepciones</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "asignar-deduccion"
              ? "bg-primary"
              : "bg-transparent"
          } hover:bg-[#133B8D] mt-2`}
        >
          <NavLink
            to="asignar-deduccion"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("asignar-deduccion")}
          >
            <div>
              {activeRoute === "asignar-deduccion" ? (
                <DownArrowIcon fill="#FFFFFF" />
              ) : (
                <DownArrowIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Deducciones</div>
          </NavLink>
        </li>
        <li
          className={`rounded-[32px] ${
            activeRoute === "registros-rh" ? "bg-primary" : "bg-transparent"
          } hover:bg-[#133B8D] mt-2`}
        >
          <NavLink
            to="registros-rh"
            className={`flex items-center p-1`}
            onClick={() => setActiveRoute("registros-rh")}
          >
            <div>
              {activeRoute === "registros-rh" ? (
                <CalendarIcon fill="#FFFFFF" />
              ) : (
                <CalendarIcon fill="#FFFFFF" />
              )}
            </div>
            <div className="grow text-white ml-2 text-sm">Registro RH</div>
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto px-6 mb-6">
        <div className="bg-[#133B8D] rounded-lg flex items-center p-4">
          <img
            className="h-10 w-10 object-contain rounded-full mr-3"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
          />
          <div className="flex flex-col text-white">
            <div className=" text-sm font-semibold">Cesar Flores</div>
            <div className="text-[13px] text-white">RH</div>
          </div>
        </div>
        <ul className="flex flex-col mt-5">
          <li
            className={`rounded-[32px] ${
              activeRoute === "settings-personal-information"
                ? "bg-primary"
                : "bg-transparent"
            } hover:bg-[#133B8D] mt-1`}
          >
            <NavLink
              to="settings-personal-information"
              className={`flex items-center p-1`}
              onClick={() => setActiveRoute("settings-personal-information")}
            >
              <div>
                {activeRoute === "settings-personal-information" ? (
                  <WheelActiveIcon fill="#FFFFFF" />
                ) : (
                  <WheelIcon fill="#FFFFFF" />
                )}
              </div>
              <div className="grow text-white ml-2 text-sm">Configuracion</div>
            </NavLink>
          </li>
          <li
            className={`rounded-[32px] ${
              activeRoute === "logout" ? "bg-primary" : "bg-transparent"
            } hover:bg-[#133B8D] mt-2`}
            onClick={() => handleLogout()}
          >
            <div className={`flex items-center p-1`}>
              <LogoutIcon fill="#FFFFFF" />
              <div className="grow text-white ml-2 text-sm">Cerrar sesión</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
