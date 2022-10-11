import { Action } from "history";
import * as actionTypes from "../action-types";

let initialState = {
  selectedPayrollId: localStorage.getItem("selectedPayrollId") || "",
  selectedPayrollDetails: JSON.parse(localStorage.getItem("selectedPayrollDetails") || "{}") || {} ,
  payrollList: [],
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PAYROLL_LIST:
      return {
        ...state,
        payrollList: action.payload,
      };
    case actionTypes.SET_SELECTED_PAYROLL:
        localStorage.setItem("selectedPayrollId", action.payload)
      return {
        ...state,
        selectedPayrollId: action.payload,
      };
    case actionTypes.SET_PAYROLL_DETAILS:
        localStorage.setItem("selectedPayrollDetails", JSON.stringify(action.payload))
      return {
        ...state,
        selectedPayrollDetails: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
