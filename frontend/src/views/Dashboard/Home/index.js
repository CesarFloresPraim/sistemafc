import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import useComponentVisible from "../../../helpers/useComponentVisible";

import ProfileProgress from "../../../components/ProfileProgress";

import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";
import PlayIcon from "../../../assets/svg/icon_play.svg";

import {
  ShowMobileMenu,
  HideMobileMenu,
} from "../../../store/actionCreators/general";

export default function BrokerHome() {
  const dispatch = useDispatch();

  const { showMobileMenu } = useSelector((state) => state.general);

  const [progressRef, isProgressVisible, setIsProgressVisible] =
    useComponentVisible(false);

  const [lookingFor, setLookingFor] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [message, setMessage] = useState("");

  const onGetNewLeads = () => {};

  const onManageYourClients = () => {};

  const onWatchVideo = () => {};

  const buttonDisabled = () => {
    return lookingFor == "" || estimatedValue == "" || message == "";
  };

  useEffect(() => {
    dispatch(HideMobileMenu());
  }, []);

  return (
    <>
      <div className="flex flex-col max-h-[100vh] hide-scrollbar">
        <div className="w-full xl:flex p-10 xl:sticky xl:top-0 z-[100] hidden bg-white">
          <div className="ml-auto">
            <button>Hola</button>
          </div>
        </div>
        <div className="flex lg:flex-row mt-16 xl:mt-0">
          <div className="flex flex-col grow p-12 lg:w-[45%] ">
            <p className="text-2xl text-regentGray">Hola, Cesar</p>
            <h2 className=" text-5xl text-mineShaft font-semibold mt-3">
              Bienvenido a <span className="text-primary">FC Sistema</span>
            </h2>
            <p className="text-mineShaft text-xl font-semibold mt-6">
              Aqui podras realizar todos los registros relacionados a los
              empleados
            </p>

            <p className="text-regentGray text-lg mt-6">
              Cualquier pregunta o necesidad de integrar cualquier funcionalidad
              podras solicitarlo con los administradores
            </p>
          </div>
          <img
            className=""
            src={require("../../../assets/svg/illustration_home_wind_energy_customer.svg")}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
