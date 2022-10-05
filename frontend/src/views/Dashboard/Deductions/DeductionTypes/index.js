import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "../../../../assets/svg/icon_edit.svg";
import { ShowNewDeductionOverlay, FetchDeductionTypeList, CreateDeductionType, EditDeductionType } from "../../../../store/actionCreators/deductions";
import NewDeductionOverlay from "../../Overlays/NewDeductionOverlay";

export default function DeductionTypes() {
  const dispatch = useDispatch();
  const { showNewDeductionOverlay, deductionTypeList, isEdittingDeductionType } = useSelector((state) => state.deductions);
    const [selectedDeductionType, setSelectedDeductionType] = useState()

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewDeductionOverlay(value, isEditting));
  };

  const handleSave = (newDeductionType, isEditting) => {
    if(isEditting) {
        return dispatch(EditDeductionType(newDeductionType)).then(res=> {
            dispatch(FetchDeductionTypeList())
            dispatch(ShowNewDeductionOverlay(false, false));
        })
    }
    return dispatch(CreateDeductionType(newDeductionType)).then(res=> {
        dispatch(FetchDeductionTypeList())
        dispatch(ShowNewDeductionOverlay(false, false));
    })
  };



  useEffect(()=> {
    dispatch(FetchDeductionTypeList())
  }, [])
  return (
    <>
      <div className="overflow-x-auto relative rounded-3xl m-6 ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nombre
              </th>
              <th scope="col" className="py-3 px-6 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {deductionTypeList.length > 0 &&
              deductionTypeList.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white font-semibold hover:bg-gray-50 border-b border-porcelain"
                  >
                    <td className={`px-6 whitespace-nowrap`}>{item.name}</td>
                    <td className={` px-6 flex justify-end`}>
                      <div onClick={()=>{
                        dispatch(ShowNewDeductionOverlay(true, true))
                        setSelectedDeductionType(item)
                      }}>
                        <EditIcon fill="#8595A3"></EditIcon>{" "}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showNewDeductionOverlay && (
        <NewDeductionOverlay
          showOverlay={handleSetShowOverlay}
          deductionType={selectedDeductionType}
          onSave={handleSave}
          isEditting={isEdittingDeductionType}
        ></NewDeductionOverlay>
      )}
    </>
  );
}
