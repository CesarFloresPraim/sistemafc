import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FetchRegisterDetails,
  SetSelectedRegisterRH,
} from "../../../../store/actionCreators/rh";

import CheckIcon from "../../../../assets/svg/small/icon_check.svg";
import CrossIcon from "../../../../assets/svg/small/icon_close.svg";
import CollapseIcon from "../../../../assets/svg/icon_collapse.svg";

import { dateOptions } from "../../../../helpers/dateOptions";

export default function RegisterDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search, selectedRegisterId, selectedRegister } = useSelector(
    (state) => state.rh
  );

  const registerToLetter = (text) => {
    if (text == "Doblada") return "D";
    if (text == "Falta justificada") return "FJ";
    if (text == "Asistencia") return "A";
    if (text == "Descanso") return "De";
    if (text == "Falta injustificada") return "FI";
  };

  const getTextColor = (text) => {
    if (text == "Doblada") return "text-sky-500";
    if (text == "Falta justificada") return "text-yellow-500";
    if (text == "Asistencia") return "text-green-500";
    if (text == "Descanso") return "text-black";
    if (text == "Falta injustificada") return "text-red-500";
  };

  const calcFoodValue = (item) => {
    let sum = 100;
    //! Verify when initialization of registers implemented
    for (const key in item.food) {
      if (item.food[key] == false) sum -= 20;
    }

    return sum;
  };

  const calSmallBoxValue = (item) => {
    let sum = 0;
    if (!item.smallBox) return 0;
    for (const sbr of item.smallBox) {
      sum += Number(sbr.amount);
    }
    return sum;
  };

  useEffect(() => {
    if (!selectedRegisterId) {
      return navigate({ pathname: "/registros-rh" });
    }
    dispatch(FetchRegisterDetails(selectedRegisterId));
  }, [selectedRegisterId]);

  return (
    <div className="flex flex-col p-12 text-sm">
      <div className="text-2xl font-semibold text-mineShaft mb-4">
        {new Date(selectedRegister.fromDate).toLocaleDateString(
          "es-ES",
          dateOptions
        )}{" "}
        -{" "}
        {new Date(selectedRegister.toDate).toLocaleDateString(
          "es-ES",
          dateOptions
        )}
      </div>
      <div className="flex mb-4">
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-green-500 border-2 border-porcelain mx-2"></div>
          <div>Asistencia</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-sky-500 border-2 border-porcelain mx-2"></div>
          <div>Doblada</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-yellow-500 border-2 border-porcelain mx-2"></div>
          <div>Falta justificada</div>
        </div>
        <div className="flex items-center mx-2">
          <div className="h-5 w-5 bg-red-500 border-2 border-porcelain mx-2"></div>
          <div>Falta injustificada</div>
        </div>
      </div>
      {selectedRegister.registersDetails &&
        selectedRegister.registersDetails.length > 0 &&
        selectedRegister.registersDetails
          .filter((item) => {
            if (search == "") {
              return true;
            } else {
              return item.employee.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
            }
          })
          .map((item, idx) => {
            return (
              <div className="flex flex-col border border-porcelain rounded-[32px] p-4 pb-0 mb-4">
                <div className="flex ">
                  <div className="flex flex-col">
                    <div className="text-base font-semibold p-2">
                      {item.employee.name}
                    </div>
                    <div className="flex">
                      <div className="flex flex-col items-center p-2">
                        <div className="font-semibold">Comida</div>
                        <div>${calcFoodValue(item)}</div>
                      </div>
                      <div className="flex flex-col items-center p-2">
                        <div className="font-semibold">Caja chica</div>
                        <div>${calSmallBoxValue(item)}</div>
                      </div>
                      <div className="flex flex-col items-center p-2">
                        <div className="font-semibold">Horas extra (min)</div>
                        <div>{item.overtimeMinutes} min</div>
                      </div>
                      <div className="flex flex-col items-center p-2">
                        <div className="font-semibold">Puntualidad</div>
                        <div>
                          {item.puntuality ? (
                            <CheckIcon fill="#00C48B"></CheckIcon>
                          ) : (
                            <CrossIcon fill="#FB3F3F"></CrossIcon>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-2">
                        <div className="font-semibold">Asistencia</div>
                        <div>
                          {item.attendance ? (
                            <CheckIcon fill="#00C48B"></CheckIcon>
                          ) : (
                            <CrossIcon fill="#FB3F3F"></CrossIcon>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex ml-auto">
                    <div class="overflow-x-auto relative rounded-3xl">
                      <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Ju
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Vi
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Sa
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Do
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Lu
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Ma
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Mi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white font-semibold">
                            <td class={`py-4 px-6 ${getTextColor(item.ju)}`}>
                              {registerToLetter(item.ju)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.vi)}`}>
                              {registerToLetter(item.vi)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.sa)}`}>
                              {" "}
                              {registerToLetter(item.sa)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.do)}`}>
                              {" "}
                              {registerToLetter(item.do)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.lu)}`}>
                              {" "}
                              {registerToLetter(item.lu)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.ma)}`}>
                              {" "}
                              {registerToLetter(item.ma)}
                            </td>
                            <td class={`py-4 px-6 ${getTextColor(item.mi)}`}>
                              {" "}
                              {registerToLetter(item.mi)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {item.comments.length > 0 && (
                  <div
                    className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4`}
                  >
                    <p>Comentarios generales</p>
                    {item.comments.map((comment) => {
                      return (
                        <div className="flex border-b border-b-porcelain p-1">
                          <div className="text-regentGray">
                            {comment.description}
                          </div>
                          <div className="text-regentGray ml-auto">
                            {new Date(comment.date).toLocaleDateString(
                              "es-ES",
                              dateOptions
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {item.smallBox.length > 0 && (
                  <div
                    className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4`}
                  >
                    <p>Caja chica</p>
                    {item.smallBox.map((smallBoxItem) => {
                      return (
                        <div className="flex border-b border-b-porcelain p-1">
                          <div className="text-mineShaft font-semibold">
                            ${smallBoxItem.amount}
                          </div>
                          <div className="text-regentGray ml-4">
                            {smallBoxItem.comment}
                          </div>
                          <div className="text-regentGray ml-auto">
                            {new Date(smallBoxItem.date).toLocaleDateString(
                              "es-ES",
                              dateOptions
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
    </div>
  );
}
