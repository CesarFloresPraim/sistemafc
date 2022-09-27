import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowNewEmployeeOverlay } from "../../../../store/actionCreators/rh";

import AddEmployeeOverlay from "../AddEmployeeOverlay";

export default function EmployeeList() {
    const dispatch = useDispatch()
  const { showNewEmployeeOverlay } = useSelector((state) => state.rh);

  const handleSetShowOverlay = (value) => {
    dispatch(ShowNewEmployeeOverlay(value))
  };

  return (
    <>
      {showNewEmployeeOverlay && (
        <AddEmployeeOverlay
          showOverlay={handleSetShowOverlay}
        ></AddEmployeeOverlay>
      )}
    </>
  );
}
