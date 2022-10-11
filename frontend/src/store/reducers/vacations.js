import { Action } from "history";
import * as actionTypes from "../action-types";

let initialState = {
  search: "",
  showNewVacationOverlay: false,
  employeeVacationList: [],
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SEARCH_EMPLOYEE_VACATION:
        return {
          ...state,
          search: action.payload,
        };
    case actionTypes.SHOW_NEW_VACATION_OVERLAY:
      return {
        ...state,
        showNewVacationOverlay: action.payload.show,
      };
    case actionTypes.SET_EMPLOYEE_VACATIONS_LIST:
      return {
        ...state,
        employeeVacationList: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
