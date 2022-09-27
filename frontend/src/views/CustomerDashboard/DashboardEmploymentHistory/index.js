import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
  NavLink,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { setMobileOverlayOpened } from "../../../store/actionCreators/general";

import { getBreadcrumsArray, getTopbarTitle } from "../../../helpers/topbar";

import useComponentVisible from "../../../helpers/useComponentVisible";

import {
  ShowMobileMenu,
  HideMobileMenu,
} from "../../../store/actionCreators/general";

import AddEmploymentOverlay from "./AddEmploymentOverlay";
import TopBar from "../../../components/TopBar";
import ProfileProgress from "../../../components/ProfileProgress";

import PlusIcon from "../../../assets/svg/icon_plus.svg";
import ClockIcon from "../../../assets/svg/icon_clock.svg";
import EmploymentHistoryIconBlue from "../../../assets/svg/employment_history/icon_employment-history_blue-ribbon.svg";
import EditIcon from "../../../assets/svg/icon_edit.svg";
import TrashIcon from "../../../assets/svg/icon_trash.svg";
import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";
import AddIcon from "../../../assets/svg/icon_plus.svg";
import DisclaimerIcon from "../../../assets/svg/icon_disclaimer_warning.svg";

export default function DashboardEmploymentHistory() {
  const navigate = useNavigate();
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

  const [showEmploymentHistoryOverlay, setShowEmploymentHistoryOverlay] =
    useState(false);

  const [employmentHistory, setEmploymentHistory] = useState([
    {
      company: "Vog App Developers",
      address: "UX Designer · Calgary, AB",
      from: "January, 2020",
      to: "present date",
      isCurrent: true,
      annualIncome: "$13,750",
      incomeType: "Salary",
    },
    {
      company: "Vog App Developers",
      address: "UX Designer · Calgary, AB",
      from: "January, 2020",
      to: "present date",
      isCurrent: false,
      annualIncome: "$13,750",
      incomeType: "Salary",
      structure: "Corporation",
    },
    {
      company: "Vog App Developers",
      address: "UX Designer · Calgary, AB",
      from: "January, 2020",
      to: "present date",
      isCurrent: false,
      annualIncome: "--",
      incomeType: "Salary",
    },
  ]);

  const onEmploymentSubmit = () => {
    navigate({
      pathname: "/select-goal",
    });
  };

  const buttonDisabled = () => {
    return employmentHistory.length < 1;
  };

  useEffect(() => {
    setActiveRoute(location.pathname.replaceAll("/", ""));
    setTopbarTitle(getTopbarTitle(location.pathname.replaceAll("/", "")));
    setTopbarBreadcrums(
      getBreadcrumsArray(location.pathname.replaceAll("/", ""))
    );
    dispatch(HideMobileMenu());
  }, [location]);

  useEffect(() => {
    if (showEmploymentHistoryOverlay) {
      dispatch(setMobileOverlayOpened(true));
    } else {
      dispatch(setMobileOverlayOpened(false));
    }
  }, [showEmploymentHistoryOverlay]);

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
          <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
            <div className="hidden xl:flex">
              <ProfileProgress
                collapsed={isProgressVisible}
                setCollapsed={setIsProgressVisible}
              ></ProfileProgress>
              <button className=" flex items-center rounded-3xl h-12 pr-4 ml-4 text-[13px] text-white bg-primary">
                <AddIcon fill="#FFF"></AddIcon>
                <div>Add employment details</div>
              </button>
            </div>
          </TopBar>
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
        </div>

        <div className="md:m-auto md:w-11/12 w-full flex flex-col grow h-full pt-16 px-4 pb-4">
          <form className="flex flex-col grow w-full mx-auto">
            <div className="flex flex-col">
              <div className="flex bg-seashellPeach rounded-[40px] p-4 px-4 items-center">
                <div>
                  <DisclaimerIcon fill="#FF6414"></DisclaimerIcon>
                </div>
                <div className="text-[#FF6414] grow text-center text-[13px]">
                  We require a 3 year history for this section to be 100%
                  complete
                </div>
              </div>
              {employmentHistory &&
                employmentHistory.length > 0 &&
                employmentHistory.map((item, idx) => {
                  return (
                    <>
                      {/** Desktop */}
                      <div className="hidden md:flex lg:flex xl:flex border border-porcelain rounded-2xl p-4 mt-4">
                        <div className="flex flex-col flex-1 ml-4">
                          <div className="flex">
                            <EmploymentHistoryIconBlue></EmploymentHistoryIconBlue>
                            <div className="flex flex-col ml-4">
                              <div className="text-mineShaft text-base font-semibold">
                                {item.company}
                              </div>
                              <div className="text-regentGray text-[13px]">
                                {item.address}
                              </div>
                            </div>
                            <div className="flex ml-auto items-center">
                              {item?.annualIncome && item?.annualIncome != "" && (
                                <div className="flex flex-col mr-6">
                                  <div className="text-regentGray text-[13px] text-right">
                                    Annual Income
                                  </div>
                                  <div className="text-mineShaft font-semibold text-sm text-right">
                                    {item.annualIncome}
                                  </div>
                                </div>
                              )}
                              {item?.incomeType && item?.incomeType != "" && (
                                <div className="flex flex-col mr-4">
                                  <div className="text-regentGray text-[13px] text-right">
                                    Income type
                                  </div>
                                  <div className="text-mineShaft font-semibold text-sm text-right">
                                    {item.incomeType}
                                  </div>
                                </div>
                              )}
                              {item?.structure && item?.structure != "" && (
                                <div className="flex flex-col mr-4">
                                  <div className="text-regentGray text-[13px] text-right">
                                    Business structure
                                  </div>
                                  <div className="text-mineShaft font-semibold text-sm text-right">
                                    {item.structure}
                                  </div>
                                </div>
                              )}
                              <div className="hover:bg-whiteLilac rounded-full">
                                {" "}
                                <EditIcon fill="#8595A3"></EditIcon>
                              </div>
                              <div className="hover:bg-whiteLilac rounded-full">
                                <TrashIcon fill="#FB3F3F"></TrashIcon>
                              </div>
                            </div>
                          </div>
                          <div className="flex mt-4 bg-whiteLilac rounded-xl items-center py-1 px-5">
                            <div>
                              <ClockIcon></ClockIcon>{" "}
                            </div>
                            <div className="flex text-regentGray text-[13px] tracking-widest">
                              <span className="">FROM&nbsp;</span>
                              <span className="text-mineShaft  font-semibold">
                                {item.from.toLocaleUpperCase()}&nbsp;
                              </span>
                              <span className="">TO&nbsp;</span>
                              <span className="text-mineShaft font-semibold">
                                {item.to.toLocaleUpperCase()}
                              </span>
                            </div>
                            {item?.isCurrent && (
                              <div className="ml-auto  tracking-widest font-semibold text-[13px] text-primary rounded-[32px] bg-white py-1 px-6">
                                CURRENT WORK
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/** Mobile */}
                      <div className="flex flex-col border md:hidden lg:hidden  border-porcelain rounded-2xl p-4 mt-4">
                        <EmploymentHistoryIconBlue></EmploymentHistoryIconBlue>
                        <div className="flex flex-col mt-4">
                          <div className="text-mineShaft text-base font-semibold">
                            {item.company}
                          </div>
                          <div className="text-regentGray text-[13px]">
                            {item.address}
                          </div>
                        </div>
                        <div className="flex items-start mt-4">
                          {item?.annualIncome && item?.annualIncome != "" && (
                            <div className="flex flex-col mr-6">
                              <div className="text-regentGray text-[13px] text-right">
                                Annual Income
                              </div>
                              <div className="text-mineShaft font-semibold text-sm text-right">
                                {item.annualIncome}
                              </div>
                            </div>
                          )}
                          {item?.incomeType && item?.incomeType != "" && (
                            <div className="flex flex-col mr-4">
                              <div className="text-regentGray text-[13px] text-right">
                                Income type
                              </div>
                              <div className="text-mineShaft font-semibold text-sm text-right">
                                {item.incomeType}
                              </div>
                            </div>
                          )}
                          {item?.structure && item?.structure != "" && (
                            <div className="flex flex-col mr-4">
                              <div className="text-regentGray text-[13px] text-right">
                                Business structure
                              </div>
                              <div className="text-mineShaft font-semibold text-sm text-right">
                                {item.structure}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col mt-4 bg-whiteLilac rounded-xl items-center py-1 px-5">
                          <div className="flex">
                            <ClockIcon></ClockIcon>{" "}
                            <div className="flex text-regentGray text-[13px] tracking-widest">
                              <span className="">FROM&nbsp;</span>
                              <span className="text-mineShaft  font-semibold">
                                {item.from.toLocaleUpperCase()}&nbsp;
                              </span>
                              <span className="">TO&nbsp;</span>
                              <span className="text-mineShaft font-semibold">
                                {item.to.toLocaleUpperCase()}
                              </span>
                            </div>
                          </div>
                          {item?.isCurrent && (
                            <div className="tracking-widest font-semibold text-[13px] text-primary rounded-[32px] bg-white py-1 px-6">
                              CURRENT WORK
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="mt-6">
              <div
                className={`w-full flex flex-col items-center justify-center px-6 py-16 mt-8 border-[3px] border-mischka bg-whiteLilac  border-dashed rounded-2xl`}
              >
                <button
                  type="button"
                  onClick={() => setShowEmploymentHistoryOverlay(true)}
                  className="flex pr-4 items-center bg-white border border-porcelain rounded-3xl"
                >
                  <div>
                    <PlusIcon fill="#0C3CFD"></PlusIcon>{" "}
                  </div>
                  <div className="text-primary font-semibold text-[13px]">
                    Add employment details
                  </div>
                </button>
              </div>
            </div>
          </form>
          {showEmploymentHistoryOverlay && (
            <AddEmploymentOverlay
              showOverlay={setShowEmploymentHistoryOverlay}
            ></AddEmploymentOverlay>
          )}
        </div>
      </div>
    </>
  );
}
