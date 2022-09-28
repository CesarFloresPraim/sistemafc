import React, { useState, useEffect } from "react";

export default function BrokerHome() {
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
