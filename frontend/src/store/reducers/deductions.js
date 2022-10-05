import { Action } from "history";
import * as actionTypes from "../action-types";

let initialState = {
  showNewDeductionOverlay: false,
  isEdittingDeductionType: false,
  deductionTypeList: [],
  employeeDeductionList: [],
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_NEW_DEDUCTION_OVERLAY:
      return {
        ...state,
        showNewDeductionOverlay: action.payload.show,
        isEdittingDeductionType: action.payload.isEditting,
      };
    case actionTypes.SET_DEDUCTION_TYPE_LIST:
      return {
        ...state,
        deductionTypeList: action.payload,
      };
    case actionTypes.SET_EMPLOYEE_DEDUCTIONS_LIST:
      return {
        ...state,
        employeeDeductionList: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;

