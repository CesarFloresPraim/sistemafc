import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useLocation } from "react-router-dom";
import useComponentVisible from "../../../helpers/useComponentVisible";

import ProfileProgress from "../../../components/ProfileProgress";
import TopBar from "../../../components/TopBar";
import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import {
  HideMobileMenu,
  ShowMobileMenu,
} from "../../../store/actionCreators/general";

import InputField from "../../../components/InputField";
import SendIcon from "../../../assets/svg/icon_send.svg";
import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";

export default function ContactBreeze() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { showMobileMenu } = useSelector((state) => state.general);

  const [progressRef, isProgressVisible, setIsProgressVisible] =
    useComponentVisible(false);

  const [topbarTitle, setTopbarTitle] = useState(
    getTopbarTitle(location.pathname.replaceAll("/", ""))
  );
  const [topbarBreadcrums, setTopbarBreadcrums] = useState(
    getBreadcrumsArray(location.pathname.replaceAll("/", ""))
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const buttonDisabled = () => {
    return !subject || !message || subject == "" || message == "";
  };

  useEffect(() => {
    setTopbarTitle(getTopbarTitle(location.pathname.replaceAll("/", "")));
    setTopbarBreadcrums(
      getBreadcrumsArray(location.pathname.replaceAll("/", ""))
    );
    dispatch(HideMobileMenu());
  }, [location]);

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
        <IconChat className="ml-auto" fill="#0C3CFD"></IconChat>
      </div>
      <div className="flex flex-col">
        {/** TopBar for desktop */}
        <div className="w-full hidden xl:flex sticky top-0 bg-white px-12 py-6 z-50">
          <div className="grow">
            <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
              <div className="w-full xl:flex p-10 hidden">
                <div className="ml-auto">
                  <ProfileProgress
                    collapsed={isProgressVisible}
                    setCollapsed={setIsProgressVisible}
                  ></ProfileProgress>
                </div>
              </div>
            </TopBar>
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
        {/** TopBar for mobile */}
        <div className="w-full xl:hidden  bg-white px-12 py-6 z-50">
          <div className="grow">
            <div className="text-regentGray text-sm">Home Contact</div>
            <div className="text-mineShaft text-[28px] font-bold">Contact</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:pl-12 pr-0 py-6 gap-6 m-6">
          <div className="flex flex-col flex-1 ">
            <div className="w-full grow pt-0 pb-6">
              <h2 className=" text-sm md:text-2xl font-semibold text-mineShaft">
                Send us a message
              </h2>
              <div className="mt-8">
                <InputField
                  label="Subject"
                  name="subject"
                  type={"text"}
                  placeholder="Enter the subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                ></InputField>
                <div className="flex flex-col mt-8">
                  <label
                    htmlFor="message"
                    className="text-mineShaft text-[16px] font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message"
                    onChange={(e) => setMessage(e.target.value)}
                    className=" rounded-[32px] border-none bg-whiteLilac focus:ring-0  p-6 min-h-[300px] placeholder:text-regentGray"
                  ></textarea>
                </div>
                <div className="grow flex">
                  <button
                    disabled={buttonDisabled()}
                    className={`mt-4 primary md:mt-16 p-2 w-full justify-center h-16 text-center rounded-[32px] text-white ${
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
            </div>
          </div>
          <div className="border border-porcelain p-6 flex flex-col rounded-2xl mx-6 lg:mx-0">
            <h2 className=" text-sm md:text-2xl font-semibold text-mineShaft">
              Contact information
            </h2>
            <div className="bg-whiteLilac rounded-2xl flex flex-col p-6 pb-10 mt-6">
              <p className="text-[16px] font-semibold text-mineShaft mb-5">
                Breeze Mortgage address
              </p>
              <p className="text-regentGray text-base">
                214 11 Ave SW, Suite 900, <br /> Calgary, Alberta · T2R 0K1{" "}
              </p>
            </div>
            <div className="bg-whiteLilac rounded-2xl flex flex-col p-6 pb-10 mt-6">
              <p className="text-[16px] font-semibold text-mineShaft mb-5">
                Contact details
              </p>
              <p className="text-regentGray text-base">
                1-(844) YYC APPS <br /> 1-(844) 992 2777 <br />{" "}
                support@breezemortgage.com{" "}
              </p>
            </div>
            <div className="bg-whiteLilac rounded-2xl flex flex-col p-6 pb-10 mt-6">
              <p className="text-[16px] font-semibold text-mineShaft mb-5">
                Our work hours:
              </p>
              <p className="text-regentGray text-base">
                Monday – Friday <br /> 8am – 6pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
