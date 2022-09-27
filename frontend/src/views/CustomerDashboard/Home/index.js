import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import useComponentVisible from "../../../helpers/useComponentVisible";

import ProfileProgress from "../../../components/ProfileProgress";

import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";
import SendIcon from "../../../assets/svg/icon_send.svg";

import {
  ShowMobileMenu,
  HideMobileMenu,
} from "../../../store/actionCreators/general";
import { TurnedInOutlined } from "@mui/icons-material";

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
      {/**Menu for mobile */}
      <div className="xl:hidden z-[101] sticky top-0 bg-white flex h-20 p-4 items-center border-b border-porcelain">
        {!showMobileMenu && (
          <IconMenu
            fill="#0263FF"
            onClick={() => {
              dispatch(ShowMobileMenu());
            }}
          ></IconMenu>
        )}
        {showMobileMenu && (
          <CloseMenu
            fill="#0263FF"
            onClick={() => {
              dispatch(HideMobileMenu());
            }}
          ></CloseMenu>
        )}

        <img
          className="h-[70%] w-auto max-w-[40%]"
          src={require("../../../assets/svg/logo_on_light.svg")}
          alt=""
        />
        <div className="ml-auto flex items-center">
          <ProfileProgress
            collapsed={isProgressVisible}
            setCollapsed={setIsProgressVisible}
            isMobile={true}
          ></ProfileProgress>
          <IconChat className="ml-auto" fill="#0C3CFD"></IconChat>
        </div>
      </div>
      <div className="flex flex-col max-h-[100vh] hide-scrollbar">
        <div className="w-full xl:flex p-10 xl:sticky xl:top-0 z-[100] hidden bg-white">
          <div className="ml-auto">
            <ProfileProgress
              collapsed={isProgressVisible}
              setCollapsed={setIsProgressVisible}
            ></ProfileProgress>
          </div>
        </div>

        {isProgressVisible && (
          <div
            ref={progressRef}
            className="sticky top-[110px] z-[100] w-full flex justify-end pr-[5%]"
          >
            <div className="absolute w-[370px] flex flex-col bg-white -top-[20px] rounded-2xl border border-porcelain p-6">
              <div className="bg-whiteLilac p-6 rounded-2xl">
                <p className="text-mineShafy text-xl font-semibold">
                  You can also complete your profile for a more seamless
                  experience for all involved.
                </p>
              </div>
              <p className="text-regentGray text-lg mt-4 px-2">
                Use the{" "}
                <span className="text-paleSky font-bold">tabs on the left</span>{" "}
                to navigate the site, and the{" "}
                <span className="text-paleSky font-bold">
                  profile completion bar
                </span>{" "}
                up top to monitor your progress.
              </p>
              <p className="text-regentGray text-lg mt-8 px-2">
                If you have any trouble, your representative will assist you.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row mt-16 xl:mt-0">
          <div className="flex flex-col grow p-12 lg:w-[45%] ">
            <p className="text-2xl text-regentGray">Hello, Hannah</p>
            <h2 className=" text-5xl text-mineShaft font-semibold mt-3">
              Welcome to <span className="text-primary">Breeze Mortgage</span>
            </h2>
            <p className="text-mineShaft text-xl font-semibold mt-6">
              A licensed mortgage professional will reach out soon.
            </p>

            <p className="text-regentGray text-lg mt-6">
              While you wait, leave a few notes for your agent so we can help
              connect you with the best person.
            </p>
          </div>
          <div className="relative z-50 bg-white border lg:w-[65%] border-porcelain lg:rounded-2xl mx-0 lg:mr-8 flex flex-col grow  p-8 ">
            <h2 className=" text-2xl text-mineShaft font-semibold mt-3">
              Leave a note
            </h2>
            <div className="mt-6">
              <label
                htmlFor="lookingFor"
                className={`block text-[16px] font-bold font-poppins text-mineShaft`}
              >
                I am looking for a:
              </label>
              <select
                onChange={(e) => setLookingFor(e.target.value)}
                name="lookingFor"
                className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
              >
                <option value="variable">Variable rate</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-6">
              <label
                htmlFor="annualIncome"
                className="text-mineShaft font-semibold"
              >
                My estimated home value is:
              </label>
              <input
                onChange={(e) => setEstimatedValue(e.target.value)}
                type="text"
                placeholder="Enter your annual income"
                name="homeValue"
                className="block h-16 w-full px-6 pl-12 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
              />
              <div className="text-regentGray text-[15px] relative -top-[43.5px] left-4 inline-block">
                C$
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <label
                htmlFor="message"
                className="text-mineShaft text-[16px] font-semibold"
              >
                Why do you want to refinance?
              </label>
              <textarea
                name="message"
                placeholder="Write your message"
                onChange={(e) => setMessage(e.target.value)}
                className=" resize-none rounded-[32px] border-none bg-whiteLilac focus:ring-0  p-6 min-h-[300px] placeholder:text-regentGray"
              ></textarea>
            </div>
            <button
              disabled={buttonDisabled()}
              className={`primary mt-4 lg:mt-16 p-2 w-full justify-center h-16 text-center rounded-[32px] text-white ${
                !buttonDisabled() ? "bg-primary" : "bg-mischka"
              } `}
            >
              <div className="flex px-4">
                <div className=" grow flex justify-center items-center">
                  Submit message
                </div>
                <div>
                  {" "}
                  <SendIcon fill="white" />
                </div>
              </div>
            </button>
          </div>
        </div>
        <img
          className="hidden lg:block h-full w-[50%] relative -top-[300px]"
          src={require("../../../assets/svg/illustration_home_wind_energy_customer.svg")}
          alt=""
        />
      </div>
    </>
  );
}
