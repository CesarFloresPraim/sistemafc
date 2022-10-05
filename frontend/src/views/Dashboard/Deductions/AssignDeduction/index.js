import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeeDeductionList,
  FetchDeductionTypeList,
  CreateDeduction,
  EditDeduction,
} from "../../../../store/actionCreators/deductions";

import { dateOptions } from "../../../../helpers/dateOptions";

import AddIcon from "../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";
import { useState } from "react";
import AssignDeductionOverlay from "../../Overlays/AssignDeductionOverlay";

export default function AssignDeduction() {
  const dispatch = useDispatch();
  const { employeeDeductionList, deductionTypeList } = useSelector(
    (state) => state.deductions
  );
  const { search } = useSelector((state) => state.rh);

  const [showDeductionOverlay, setShowDeductionOverlay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const handleCreate = (deductionDTO) => {
    dispatch(CreateDeduction(deductionDTO)).then((res) => {
      dispatch(FetchEmployeeDeductionList());
      setShowDeductionOverlay(false)
    });
  };
  const handleEdit = (deductionDTO) => {
    dispatch(EditDeduction(deductionDTO)).then((res) => {
      dispatch(FetchEmployeeDeductionList());
      setShowDeductionOverlay(false)
    })
  };

  useEffect(() => {
    dispatch(FetchEmployeeDeductionList());
    dispatch(FetchDeductionTypeList());
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 px-8">
        <div className="col-span-12 ">
          {employeeDeductionList.length > 0 && (
            <div>
              {employeeDeductionList
                .filter((item) => {
                  if (search == "") {
                    return true;
                  } else {
                    return item.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
                  }
                })
                .map((employeeItem) => {
                  return (
                    <div
                      key={employeeItem.id}
                      className="mb-2 flex border border-porcelain rounded-3xl p-2"
                    >
                      <div className="flex-col basis-full">
                        <div className="px-2 flex">
                          <div className="flex items-center">
                            {employeeItem.name}
                          </div>
                          <div className="ml-auto flex">
                            <div
                              onClick={() => {
                                setSelectedEmployee(employeeItem);
                                setShowDeductionOverlay(true);
                              }}
                            >
                              {" "}
                              <AddIcon fill="#8595A3"></AddIcon>
                            </div>
                            <div
                              onClick={() => {
                                setSelectedEmployee(employeeItem);
                                setShowDeductionOverlay(true);
                              }}
                            >
                              {" "}
                              <EditIcon fill="#8595A3"></EditIcon>
                            </div>
                          </div>
                        </div>
                        {employeeItem.deductions.length > 0 && (
                          <div
                            className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4`}
                          >
                            {employeeItem.deductions.map((deductionItem) => {
                              return (
                                <div
                                  key={deductionItem.id}
                                  className="flex border-b border-b-porcelain p-1"
                                >
                                  <div className="text-mineShaft font-semibold">
                                    ${deductionItem.amount}
                                  </div>
                                  <div className="px-1">
                                    ({deductionItem.type.name})
                                  </div>
                                  <div className="text-regentGray ml-4">
                                    {deductionItem.note}
                                  </div>
                                  <div className="ml-auto">
                                    {new Date(
                                      deductionItem.creationDate
                                    ).toLocaleDateString("es-ES", dateOptions)}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {showDeductionOverlay && (
        <AssignDeductionOverlay
          showOverlay={setShowDeductionOverlay}
          employee={selectedEmployee}
          onCreate={handleCreate}
          onEdit={handleEdit}
          types={deductionTypeList}
        ></AssignDeductionOverlay>
      )}
    </>
  );
}
