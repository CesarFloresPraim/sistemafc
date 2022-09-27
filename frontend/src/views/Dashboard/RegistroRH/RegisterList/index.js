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
import { SetSelectedRegisterRH } from "../../../../store/actionCreators/rh";

import DocumentIconBlue from "../../../../assets/svg/document/icon_document-blue-ribbon.svg";
import DocumentIconCoralRed from "../../../../assets/svg/document/icon_document_coral-red.svg";
import DocumentIconCaribbean from "../../../../assets/svg/document/icon_document_caribbean-green.svg";
import DocumentIconHollywood from "../../../../assets/svg/document/icon_document_hollywood-cerise.svg";
import DocumentIconLimeade from "../../../../assets/svg/document/icon_document_limeade.svg";
import DocumentIconOrangePeel from "../../../../assets/svg/document/icon_document_orange-peel.svg";
import DocumentIconOrange from "../../../../assets/svg/document/icon_document_orange.svg";
import EyeIcon from "../../../../assets/svg/icon_view.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";

export default function RegisterList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registers, setRegisters] = useState([
    {
      id: "0",
      icon: <DocumentIconBlue></DocumentIconBlue>,
      fromDate: "17 de agosto del 2022",
      toDate: "23 de agosto del 2022",
    },
    {
      id: "1",
      icon: <DocumentIconCoralRed></DocumentIconCoralRed>,
      fromDate: "17 de agosto del 2022",
      toDate: "23 de agosto del 2022",
    },
    {
      id: "2",
      icon: <DocumentIconCaribbean></DocumentIconCaribbean>,
      fromDate: "17 de agosto del 2022",
      toDate: "23 de agosto del 2022",
    },
    {
      id: "3",
      icon: <DocumentIconHollywood></DocumentIconHollywood>,
      fromDate: "17 de agosto del 2022",
      toDate: "23 de agosto del 2022",
    },
  ]);

  return (
    <div className="md:m-auto md:w-11/12 w-full flex flex-col grow h-full pt-16">
      <form className="flex flex-col w-full mx-auto">
        <div className="flex flex-col">
          {registers &&
            Object.keys(registers).length > 0 &&
            Object.keys(registers).map((itemKey) => {
              return (
                <>
                  {/** Desktop */}
                  <div className="flex border border-porcelain rounded-2xl p-4 mt-4">
                    <div className="flex gap-4 basis-full">
                      {registers[itemKey].icon}
                      <div className="flex flex-col ml-4 justify-center">
                        <div className="text-mineShaft text-base font-semibold">
                          {registers[itemKey].fromDate} -{" "}
                          {registers[itemKey].toDate}
                        </div>
                      </div>
                      <div className="flex items-center ml-auto">
                        <button
                          onClick={() => {
                            navigate({ pathname: "/detalles-registro-rh" });
                            dispatch(SetSelectedRegisterRH(registers[itemKey].id));
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
            onClick={() => {}}
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
