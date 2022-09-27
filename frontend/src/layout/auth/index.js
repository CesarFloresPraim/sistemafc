import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LoginIllustration from "../../assets/svg/signin_illustration.svg";
import IconLeft from "../../assets/svg/icon_left.svg";
import IconRight from "../../assets/svg/icon_right.svg";
import { useEffect } from "react";

function AuthLayout() {
  const fakeSlides = [
    {
      title: "Lleva tus registros",
      description:
        "Esta herramienta te permitira llevar registro de lo necesario sobre las personas en una organizacion",
    },
    {
      title: "Lleva tus registros",
      description:
      "Esta herramienta te permitira llevar registro de lo necesario sobre las personas en una organizacion",
    },
    {
      title: "Lleva tus registros",
      description:
      "Esta herramienta te permitira llevar registro de lo necesario sobre las personas en una organizacion",
    },
  ];
  const [slides, setSlides] = useState(fakeSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(false);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const changeIndex = (type) => {
    if (type === "next") {
      currentIndex == slides.length - 1
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + 1);
    } else if(type === "prev"){
      currentIndex == 0
        ? setCurrentIndex(slides.length - 1)
        : setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(type);
    }
  };
  const handleChange = (type) => {
    setAnimation(true) 
    delay(500).then(()=> {
      changeIndex(type)
    })
  }

  return (
    <div className="min-h-screen font-poppins flex flex-col md:flex-row">
      <div className=" flex h-screen flex-1">
        <Outlet />
      </div>
      <div className="  bg-primary md:flex mb-8 md:mb-0 md:w-[50%] py-6 flex-col justify-center hidden">
        <LoginIllustration className="mx-auto max-w-[80%] mb-24"></LoginIllustration>
        <div className="mx-auto max-w-[70%] flex relative items-center justify-center overflow-hidden">
          {slides[currentIndex] !== undefined ? (
            <div
              className={` ${
                animation? " scale-105 opacity-0":""
              } duration-500 w-full`}
              onTransitionEnd={() => {setAnimation(false)}}
            >
              <h3 className=" text-2xl text-white text-center mb-4 font-semibold tracking-tight">
                {slides[currentIndex].title}
              </h3>
              <p className="text-[15px] text-white text-center leading-7 font-extralight tracking-normal">
                {slides[currentIndex].description}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center mx-auto mt-6">
          <div
            className="rounded-full bg-white"
            onClick={() => {handleChange('prev')}}
          >
            <IconLeft fill="#0C3CFD" />
          </div>
          <ul className="flex px-8">
            {slides.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {handleChange(idx)}}
                  className={`h-2 w-2 rounded-full mx-1 bg-white ${
                    currentIndex == idx ? "opacity-100" : "opacity-30"
                  }`}
                ></li>
              );
            })}
          </ul>

          <div
            className="rounded-full bg-white"
            onClick={() => {handleChange('next')}}
          >
            <IconRight fill="#0C3CFD" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
