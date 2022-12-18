import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeForResgisterList,
  SetSelectedRegistersDetails,
} from "../../../../../store/actionCreators/rh";

import { dateOptions } from "../../../../../helpers/dateOptions";

import IllustrationPresentation from "../../../../../assets/svg/illustration_presentation.svg";
import AddIcon from "../../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../../assets/svg/icon_edit.svg";

import { useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { moneyFormat } from "../../../../../helpers/moneyFormat";
import SmallBoxOverlay from "./SmallBoxOverlay";
import Swal from "sweetalert2";

export default function EditSmallBoxRegister() {
  const dispatch = useDispatch();
  const { selectedRegister, smallBoxRegisters, search } = useSelector(
    (state) => state.rh
  );
  const [selectedRegisterDetail, setSelectedRegisterDetail] = useState();
  const [showSmallBoxOverlay, setShowSmallBoxOverlay] = useState(false);
  const [selectedSmallBoxRegister, setSelectedSmallBoxRegister] = useState();
  const [isEdittingSmallBoxRegister, setIsEdittingSmallBoxRegister] =
    useState(false);

  const handleSaveSmallBoxRegister = (smallBoxRegisterDTO, registerDetailId) => {
    if(!registerDetailId) {
      return Swal.fire({
        title: "Error",
        text: "Ocurrio un error: No se encontro registro de empleado",
        icon: "error",
        confirmButtonColor: "#0C3CFD",
      });
    }

    let edittedRegisterDetails = selectedRegister.registersDetails.map(
      (item) => {
        if (item.id == registerDetailId)
          return {...item, smallBox: [...item.smallBox,smallBoxRegisterDTO]};
        return item;
      }
    );
    dispatch(SetSelectedRegistersDetails(edittedRegisterDetails));
  };

  const handleEditSmallBoxRegister = (smallBoxRegisterDTO, registerDetailId) => {
    if(!selectedRegisterDetail) {
      return Swal.fire({
        title: "Error",
        text: "Ocurrio un error: No se encontro el detalle del registro",
        icon: "error",
        confirmButtonColor: "#0C3CFD",
      });
    }

    let edittedRegisterDetails = selectedRegister.registersDetails.map(
      (item) => {
        if (item.id == registerDetailId){
          //Found the register detail where this small box belongs
          let smallBoxCopy = [...item.smallBox]
          const edittedSmallBox = smallBoxCopy.map(smallBoxItem => {
            if(smallBoxItem.id == smallBoxRegisterDTO.id) {
              //Found the small box register
              return smallBoxRegisterDTO
            }
            return smallBoxItem
          })

          return {...item, smallBox: edittedSmallBox};
        }
        return item;
      }
    );
    dispatch(SetSelectedRegistersDetails(edittedRegisterDetails));
  };

  useEffect(() => {
    dispatch(FetchEmployeeForResgisterList());
  }, []);

  const renderSmallBoxRegisters = () => {
    if (
      selectedRegister.registersDetails &&
      selectedRegister.registersDetails?.length > 0
    ) {
      return selectedRegister.registersDetails
        .filter((item) => {
          if (search == "") return item;
          return item.employee.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        })
        .map((item) => {
          if (item.smallBox && item.smallBox?.length > 0) {
            return item.smallBox.map((smallBoxItem, idx) => {
              return (
                <div key={idx} className=" p-1 flex border-b border-porcelain">
                  <div className="flex flex-col">
                    <div className="text-paleSky font-semibold grow">
                      <span className="text-mineShaft">
                        ({moneyFormat(smallBoxItem.amount)}){" "}
                      </span>
                      {item.employee.name}
                    </div>
                    <div className="flex">
                      <div className="">
                        {new Date(smallBoxItem.date).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </div>
                    </div>
                    <div className="text-[13px]">{smallBoxItem.comment}</div>
                  </div>
                  <div
                    className="ml-auto flex items-center"
                    onClick={() => {
                      if(!smallBoxItem.id) {
                        return Swal.fire({
                          title: "Error",
                          text: "Esto registro no se puede editar porque es nuevo, guarde los registros para poder actualizar.",
                          icon: "warning",
                          confirmButtonColor: "#0C3CFD",
                        });
                      }
                      setIsEdittingSmallBoxRegister(true);
                      setSelectedRegisterDetail(item)
                      setSelectedSmallBoxRegister(smallBoxItem);
                      setShowSmallBoxOverlay(true);
                    }}
                  >
                    <EditIcon fill="#8595A3"></EditIcon>
                  </div>
                </div>
              );
            });
          }
        });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 mx-8">
        <div className="flex flex-col h-full w-full rounded-[32px] border border-porcelain p-6">
          <div className="flex w-full">
            <h2 className="text-2xl font-semibold">Lista</h2>
            <button
              onClick={() => {
                setIsEdittingSmallBoxRegister(false);
                setSelectedSmallBoxRegister();
                setShowSmallBoxOverlay(true);
              }}
              className={` flex items-center rounded-3xl h-12 pr-4 ml-auto text-[13px] text-white bg-primary`}
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Nuevo retiro </div>
            </button>
          </div>

          <div className="border border-porcelain p-2 px-4 rounded-[16px] mt-4">
            {renderSmallBoxRegisters()}
          </div>
        </div>

        <div>
          <IllustrationPresentation></IllustrationPresentation>
        </div>
      </div>
      {showSmallBoxOverlay && (
        <SmallBoxOverlay
          showOverlay={setShowSmallBoxOverlay}
          selectedSmallBoxRegister={selectedSmallBoxRegister}
          onSave={handleSaveSmallBoxRegister}
          onEdit={handleEditSmallBoxRegister}
          selectedRegisterDetail={selectedRegisterDetail}
          isEditting={isEdittingSmallBoxRegister}
          selectedRegister={selectedRegister}
        ></SmallBoxOverlay>
      )}
    </>
  );
}
