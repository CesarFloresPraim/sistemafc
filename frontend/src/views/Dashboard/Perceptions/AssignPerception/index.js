import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchEmployeePerceptionList,
  FetchPerceptionTypeList,
  CreatePerception,
  EditPerception,
} from "../../../../store/actionCreators/perceptions";

import { dateOptions } from "../../../../helpers/dateOptions";

import AddIcon from "../../../../assets/svg/icon_plus.svg";
import EditIcon from "../../../../assets/svg/icon_edit.svg";
import { useState } from "react";
import AssignPercetionOverlay from "../../Overlays/AssignPerceptionOverlay";

export default function AssignPerception() {
  const dispatch = useDispatch();
  const { employeePerceptionList, perceptionTypeList } = useSelector(
    (state) => state.perceptions
  );
  const { search } = useSelector((state) => state.rh);

  const [showPerceptionOverlay, setShowPerceptionOverlay] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const handleCreate = (perceptionDTO) => {
    dispatch(CreatePerception(perceptionDTO)).then((res) => {
      dispatch(FetchEmployeePerceptionList());
      setShowPerceptionOverlay(false)
    });
  };
  const handleEdit = (perceptionDTO) => {
    dispatch(EditPerception(perceptionDTO)).then((res) => {
      dispatch(FetchEmployeePerceptionList());
      setShowPerceptionOverlay(false)
    })
  };

  useEffect(() => {
    dispatch(FetchEmployeePerceptionList());
    dispatch(FetchPerceptionTypeList());
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 px-8">
        <div className="col-span-12 ">
          {employeePerceptionList.length > 0 && (
            <div>
              {employeePerceptionList
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
                                setShowPerceptionOverlay(true);
                              }}
                            >
                              {" "}
                              <AddIcon fill="#8595A3"></AddIcon>
                            </div>
                            <div
                              onClick={() => {
                                setSelectedEmployee(employeeItem);
                                setShowPerceptionOverlay(true);
                              }}
                            >
                              {" "}
                              <EditIcon fill="#8595A3"></EditIcon>
                            </div>
                          </div>
                        </div>
                        {employeeItem.perceptions.length > 0 && (
                          <div
                            className={`flex flex-col rounded-[12px] bg-whiteLilac mb-2 p-2 px-4`}
                          >
                            {employeeItem.perceptions.map((perceptionItem) => {
                              return (
                                <div
                                  key={perceptionItem.id}
                                  className="flex border-b border-b-porcelain p-1"
                                >
                                  <div className="text-mineShaft font-semibold">
                                    ${perceptionItem.amount}
                                  </div>
                                  <div className="px-1">
                                    ({perceptionItem.type.name})
                                  </div>
                                  <div className="text-regentGray ml-4">
                                    {perceptionItem.note}
                                  </div>
                                  <div className="ml-auto">
                                    {new Date(
                                      perceptionItem.creationDate
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
      {showPerceptionOverlay && (
        <AssignPercetionOverlay
          showOverlay={setShowPerceptionOverlay}
          employee={selectedEmployee}
          onCreate={handleCreate}
          onEdit={handleEdit}
          types={perceptionTypeList}
        ></AssignPercetionOverlay>
      )}
    </>
  );
}
