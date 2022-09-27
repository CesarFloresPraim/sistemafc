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

import AddNewDocOverlay from "./AddNewDocOverlay";
import TopBar from "../../../components/TopBar";
import ProfileProgress from "../../../components/ProfileProgress";

import DocumentIconBlue from "../../../assets/svg/document/icon_document-blue-ribbon.svg";
import DocumentIconCoralRed from "../../../assets/svg/document/icon_document_coral-red.svg";
import DocumentIconCaribbean from "../../../assets/svg/document/icon_document_caribbean-green.svg";
import DocumentIconHollywood from "../../../assets/svg/document/icon_document_hollywood-cerise.svg";
import DocumentIconLimeade from "../../../assets/svg/document/icon_document_limeade.svg";
import DocumentIconOrangePeel from "../../../assets/svg/document/icon_document_orange-peel.svg";
import DocumentIconOrange from "../../../assets/svg/document/icon_document_orange.svg";

import CollapseIcon from "../../../assets/svg/icon_collapse.svg";
import ExpandIcon from "../../../assets/svg/icon_expand.svg";
import IconMenu from "../../../assets/svg/icon_menu.svg";
import CloseMenu from "../../../assets/svg/icon_close.svg";
import IconChat from "../../../assets/svg/icon_chat.svg";
import AddIcon from "../../../assets/svg/icon_plus.svg";
import DisclaimerIcon from "../../../assets/svg/icon_disclaimer_warning.svg";
import BrowseIcon from "../../../assets/svg/icon_browse_blue.svg";
import RightArrowIcon from "../../../assets/svg/icon_arrow_right.svg";

export default function DocumentsAndFiles() {
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

  const [showAddDocOverlay, setShowAddDocOverlay] = useState(false);

  const [documents, setDocuments] = useState({
    1: {
      documentName: "T4: Statement of Remuneration Paid",
      description:
        "This document shows the income you earned in a given year for a specific employer as well as any ...",
      icon: <DocumentIconBlue></DocumentIconBlue>,
      extra: () => {
        return (
          <div className="flex flex-col mt-4">
            <div className="text-[13px] text-regentGray">For hourly:</div>
            <div className="text-[13px] text-mineShaft font-semibold">
              Last 2 years of T4s: Statement of Remuneration Paid
            </div>
          </div>
        );
      },
      collapsed: true,
    },
    2: {
      documentName: "Pay Stub",
      description:
        "A Pay Stub is what you are given upon receipt of your paycheque. It outlines your Gross & Net pay ...",
      icon: <DocumentIconCaribbean></DocumentIconCaribbean>,
      collapsed: true,
    },
    3: {
      documentName: "Letter of Employment",
      description:
        "A letter of employment outlines your rate of pay/salary, your minimum hours if you work hourly, your position & start date with the company. It should be typed, dated within 30 days and be hand-signed on company letterhead. If you have an HR Department, you can request this from them. If you have any difficulty, your mortgage professional will assist you with this item.",
      icon: <DocumentIconHollywood></DocumentIconHollywood>,
      collapsed: true,
    },
    4: {
      documentName: "Government ID",
      description:
        "This should be the front and back of a non - expired government issued photo ID, such as a driver's ...",
      icon: <DocumentIconLimeade></DocumentIconLimeade>,
      collapsed: true,
    },
    5: {
      documentName: "Mortgage Statement",
      description:
        "A mortgage statement details your current mortgage balance, interest rate, payment, frequency ...",
      extra: () => {
        return (
          <div className="flex flex-col mt-4">
            <div className="text-[13px] text-regentGray">
              If you currently have any mortgages:
            </div>
            <div className="text-[13px] text-mineShaft font-semibold">
              Upload your corresponding mortgage statement(s) for each one.
            </div>
          </div>
        );
      },
      icon: <DocumentIconOrangePeel></DocumentIconOrangePeel>,
      collapsed: true,
    },
    6: {
      documentName: "Miscellaneous",
      description:
        "There could be other items involved in your mortgage transaction. A commonly needed item is a ...",
      icon: <DocumentIconOrange></DocumentIconOrange>,
      collapsed: true,
    },
  });

  const onCollapseExpand = (itemKey) => {
    let docs = { ...documents };
    let item = { ...docs[itemKey] };
    item.collapsed = !documents[itemKey].collapsed;
    docs[itemKey] = item;

    setDocuments(docs);
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
    if (showAddDocOverlay) {
      dispatch(setMobileOverlayOpened(true));
    } else {
      dispatch(setMobileOverlayOpened(false));
    }
  }, [showAddDocOverlay]);

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
          <div className="hidden lg:block">
            <TopBar title={topbarTitle} breadcrums={topbarBreadcrums}>
              <ProfileProgress
                collapsed={isProgressVisible}
                setCollapsed={setIsProgressVisible}
              ></ProfileProgress>
            </TopBar>
          </div>
          {/** Mobile */}
          <div className="lg:hidden">
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
        </div>

        <div className="md:m-auto md:w-11/12 w-full flex flex-col grow h-full pt-16">
          <form className="flex flex-col grow w-full mx-auto">
            <div className="flex flex-col">
              <div className="flex bg-seashellPeach rounded-[40px] p-4 px-4 items-center">
                <div>
                  <DisclaimerIcon fill="#FF6414"></DisclaimerIcon>
                </div>
                <div className="text-[#FF6414] grow text-center px-12 text-[13px]">
                  Because you stated you are paid hourly, the following items
                  will be required for your mortgage transaction. Please review
                  our reference guide if you want for more information
                </div>
                <div className="rounded-full border border- bg-white">
                  <RightArrowIcon fill="#0C3CFD"></RightArrowIcon>{" "}
                </div>
              </div>
              {documents &&
                Object.keys(documents).length > 0 &&
                Object.keys(documents).map((itemKey) => {
                  return (
                    <>
                      {/** Desktop */}
                      <div className="hidden lg:flex border border-porcelain rounded-2xl p-4 mt-4">
                        <div className="grid grid-cols-12 gap-4 basis-full">
                          <div className="col-span-1">
                            {" "}
                            {documents[itemKey].icon}
                          </div>
                          <div className="col-span-8">
                            <div className="flex flex-col ml-4 ">
                              <div className="text-mineShaft text-base font-semibold">
                                {documents[itemKey].documentName}
                              </div>
                              <div
                                className={`text-regentGray text-[13px] mt-2  ${
                                  documents[itemKey].collapsed == true &&
                                  "text-ellipsis overflow-hidden whitespace-nowrap"
                                }`}
                              >
                                {documents[itemKey].description}
                              </div>
                              {documents[itemKey].extra != undefined &&
                                documents[itemKey].collapsed == false &&
                                documents[itemKey].extra()}
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div className="flex items-center">
                              <button
                                onClick={() => setShowAddDocOverlay(true)}
                                type="button"
                                className="pr-4 flex items-center ml-auto rounded-[32px] border border-porcelain"
                              >
                                <BrowseIcon fill="#0C3CFD"></BrowseIcon>
                                <div className="text-primary text-[13px]">
                                  Browse files
                                </div>
                              </button>
                              <div
                                className="hover:bg-whiteLilac rounded-full"
                                onClick={() => onCollapseExpand(itemKey)}
                              >
                                {documents[itemKey].collapsed == true ? (
                                  <ExpandIcon fill="#8595A3"></ExpandIcon>
                                ) : (
                                  <CollapseIcon fill="#8595A3"></CollapseIcon>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/** Mobile */}
                      <div className="flex lg:hidden border border-porcelain rounded-2xl p-4 mt-4 mx-6">
                        <div className="flex basis-full flex-col ml-4">
                          <div className="flex items-center">
                            {documents[itemKey].icon}
                            <div
                              className="ml-auto hover:bg-whiteLilac rounded-full"
                              onClick={() => onCollapseExpand(itemKey)}
                            >
                              <div className="">
                                {" "}
                                {documents[itemKey].collapsed == true ? (
                                  <ExpandIcon fill="#8595A3"></ExpandIcon>
                                ) : (
                                  <CollapseIcon fill="#8595A3"></CollapseIcon>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-12 basis-full">
                            {" "}
                            <div className="col-span-11 flex flex-col">
                              <div className="text-mineShaft text-base font-semibold mt-2">
                                {documents[itemKey].documentName}
                              </div>
                              <div
                                className={`text-regentGray text-[13px] mt-2  ${
                                  documents[itemKey].collapsed == true &&
                                  "text-ellipsis overflow-hidden whitespace-nowrap"
                                }`}
                              >
                                {documents[itemKey].description}
                              </div>
                              {documents[itemKey].extra != undefined &&
                                documents[itemKey].collapsed == false &&
                                documents[itemKey].extra()}
                            </div>
                          </div>

                          <div className="flex sm:ml-auto items-center mt-4">
                            <button
                              onClick={() => setShowAddDocOverlay(true)}
                              type="button"
                              className="pr-4 basis-full sm:basis-0 flex items-center rounded-[32px] border border-porcelain"
                            >
                              <BrowseIcon fill="#0C3CFD"></BrowseIcon>
                              <div className="text-primary text-[13px]">
                                Browse files
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </form>
          {showAddDocOverlay && (
            <AddNewDocOverlay
              showOverlay={setShowAddDocOverlay}
              type={"Pay stub"}
            ></AddNewDocOverlay>
          )}
        </div>
      </div>
    </>
  );
}
