import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "../../../../assets/svg/icon_edit.svg";
import { ShowNewPerceptionOverlay, FetchPerceptionTypeList, CreatePerceptionType, EditPerceptionType } from "../../../../store/actionCreators/perceptions";
import NewPerceptionOverlay from "../../Overlays/NewPerceptionOverlay";

export default function PerceptionTypes() {
  const dispatch = useDispatch();
  const { showNewPerceptionOverlay, perceptionTypeList, isEdittingPerceptionType } = useSelector((state) => state.perceptions);
    const [selectedPerceptionType, setSelectedPerceptionType] = useState()

  const handleSetShowOverlay = (value, isEditting) => {
    dispatch(ShowNewPerceptionOverlay(value, isEditting));
  };

  const handleSave = (newPerceptionType, isEditting) => {
    if(isEditting) {
        return dispatch(EditPerceptionType(newPerceptionType)).then(res=> {
            dispatch(FetchPerceptionTypeList())
            dispatch(ShowNewPerceptionOverlay(false, false));
        })
    }
    return dispatch(CreatePerceptionType(newPerceptionType)).then(res=> {
        dispatch(FetchPerceptionTypeList())
        dispatch(ShowNewPerceptionOverlay(false, false));
    })
  };



  useEffect(()=> {
    dispatch(FetchPerceptionTypeList())
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
            {perceptionTypeList.length > 0 &&
              perceptionTypeList.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white font-semibold hover:bg-gray-50 border-b border-porcelain"
                  >
                    <td className={`px-6 whitespace-nowrap`}>{item.name}</td>
                    <td className={` px-6 flex justify-end`}>
                      <div onClick={()=>{
                        dispatch(ShowNewPerceptionOverlay(true, true))
                        setSelectedPerceptionType(item)
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
      {showNewPerceptionOverlay && (
        <NewPerceptionOverlay
          showOverlay={handleSetShowOverlay}
          perceptionType={selectedPerceptionType}
          onSave={handleSave}
          isEditting={isEdittingPerceptionType}
        ></NewPerceptionOverlay>
      )}
    </>
  );
}
