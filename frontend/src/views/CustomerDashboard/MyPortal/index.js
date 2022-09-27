import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  ShowMobileMenu,
  HideMobileMenu,
} from "../../../store/actionCreators/general";
import useComponentVisible from "../../../helpers/useComponentVisible";

import TopBar from "../../../components/TopBar";
import ProfileProgress from "../../../components/ProfileProgress";

import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";
import AddIcon from "../../../assets/svg/icon_plus.svg";

export default function MyPortal() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { showMobileMenu } = useSelector((state) => state.general);

  const [progressRef, isProgressVisible, setIsProgressVisible] =
    useComponentVisible(false);

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
    let pathname = location.pathname.replaceAll("/", "");
    setActiveRoute(pathname);
    setTopbarTitle(getTopbarTitle(pathname));
    setTopbarBreadcrums(getBreadcrumsArray(pathname));
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
        <div className="ml-auto flex items-center">
          <ProfileProgress
            collapsed={isProgressVisible}
            setCollapsed={setIsProgressVisible}
            isMobile={true}
          ></ProfileProgress>
          <IconChat className="ml-auto" fill="#0C3CFD"></IconChat>
        </div>
      </div>
      <div className="flex flex-col flex-1 ">
        <div className="w-full flex flex-col xl:sticky xl:top-0 bg-white lg:px-6 px-12 2xl:px-12 py-6 z-50">
          <div className="hidden md:block">
            <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
              <ProfileProgress
                collapsed={isProgressVisible}
                setCollapsed={setIsProgressVisible}
              ></ProfileProgress>
            </TopBar>
          </div>
          <div className="md:hidden">
            <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}></TopBar>
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
                  <span className="text-paleSky font-bold">
                    tabs on the left
                  </span>{" "}
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
          <div className="mt-6 overflow-x-scroll hide-scrollbar">
            <ul className="flex items-center">
              <li
                className={` ${
                  activeRoute === "customer-my-mortgages"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="customer-my-mortgages"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("customer-my-mortgages")}
                >
                  My mortgages
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "customer-my-approvals-contracts"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="customer-my-approvals-contracts"
                  className={`flex items-center p-1`}
                  onClick={() =>
                    setActiveRoute("customer-my-approvals-contracts")
                  }
                >
                  My approvals & contracts
                </NavLink>
              </li>
              <li
                className={` ${
                  activeRoute === "customer-my-broker"
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "bg-transparent text-regentGray"
                } cursor-pointer mt-1 py-1 px-2 text-sm`}
              >
                <NavLink
                  to="customer-my-broker"
                  className={`flex items-center p-1`}
                  onClick={() => setActiveRoute("customer-my-broker")}
                >
                  My broker
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
