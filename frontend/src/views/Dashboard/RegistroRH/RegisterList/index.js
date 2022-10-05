import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
  NavLink,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  FetchRegisterList,
  SetSelectedRegisterId,
} from "../../../../store/actionCreators/rh";

import DocumentIconBlue from "../../../../assets/svg/document/icon_document-blue-ribbon.svg";
import DocumentIconCoralRed from "../../../../assets/svg/document/icon_document_coral-red.svg";
import DocumentIconCaribbean from "../../../../assets/svg/document/icon_document_caribbean-green.svg";
import DocumentIconHollywood from "../../../../assets/svg/document/icon_document_hollywood-cerise.svg";
import DocumentIconLimeade from "../../../../assets/svg/document/icon_document_limeade.svg";
import DocumentIconOrangePeel from "../../../../assets/svg/document/icon_document_orange-peel.svg";
import DocumentIconOrange from "../../../../assets/svg/document/icon_document_orange.svg";
import EyeIcon from "../../../../assets/svg/icon_view.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";

const icons = [
  <DocumentIconBlue />,
  <DocumentIconCoralRed />,
  <DocumentIconCaribbean />,
  <DocumentIconHollywood />,
];

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function RegisterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerList } = useSelector((state) => state.rh);

  const randomIconColor = () => {
    return icons[Math.floor(Math.random() * icons.length)];
  };

  useEffect(() => {
    dispatch(FetchRegisterList());
  }, []);

  return (
    <div className="md:m-auto md:w-11/12 w-full flex flex-col grow h-full pt-16">
      <form className="flex flex-col w-full mx-auto">
        <div className="flex flex-col">
          {registerList &&
            registerList.length > 0 &&
            registerList.map((item) => {
              return (
                <>
                  {/** Desktop */}
                  <div className="flex border border-porcelain rounded-2xl p-4 mt-4">
                    <div className="flex gap-4 basis-full">
                      {randomIconColor()}
                      <div className="flex flex-col ml-4 justify-center">
                        <div className="text-mineShaft text-base font-semibold">
                          {new Date(item.fromDate).toLocaleDateString(
                            "es-ES",
                            dateOptions
                          )}{" "}
                          -{" "}
                          {new Date(item.toDate).toLocaleDateString(
                            "es-ES",
                            dateOptions
                          )}
                        </div>
                      </div>
                      <div className="flex items-center ml-auto">
                        <button
                          onClick={() => {
                            dispatch(SetSelectedRegisterId(item.id));
                            navigate({ pathname: "/detalles-registro-rh" });
                          }}
                          type="button"
                          className="pr-4 flex items-center ml-auto rounded-[32px] border border-porcelain"
                        >
                          <EyeIcon fill="#0C3CFD"></EyeIcon>
                          <div className="text-primary text-[13px]">
                            Ver registro
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
      <div className="mt-6">
        <div
          className={`w-full flex flex-col items-center justify-center px-6 py-16 mt-8 border-[3px] border-mischka bg-whiteLilac  border-dashed rounded-2xl`}
        >
          <button
            type="button"
            onClick={() => {navigate({pathname: "/nuevo-registro-rh"})}}
            className="flex pr-4 items-center bg-white border border-porcelain rounded-3xl"
          >
            <div>
              <AddIcon fill="#0C3CFD"></AddIcon>{" "}
            </div>
            <div className="text-primary font-semibold text-[13px]">
              Nuevo registro
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
