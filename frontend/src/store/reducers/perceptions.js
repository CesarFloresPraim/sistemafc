import { Action } from "history";
import * as actionTypes from "../action-types";

let initialState = {
  showNewPerceptionOverlay: false,
  isEdittingPerceptionType: false,
  perceptionTypeList: [],
  employeePerceptionList: [],
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_NEW_PERCEPTION_OVERLAY:
      return {
        ...state,
        showNewEmployeeOverlay: action.payload.show,
        isEdittingPerceptionType: action.payload.isEditting,
      };
    case actionTypes.SET_PERCEPTION_TYPE_LIST:
      return {
        ...state,
        perceptionTypeList: action.payload,
      };
    case actionTypes.SET_EMPLOYEE_PERCEPTIONS_LIST:
      return {
        ...state,
        employeePerceptionList: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;

