import * as actionTypes from "../action-types";

let initialState = {
  search: "",
  showNewEmployeeFullOverlay: false,
  isEdittingEmployee: false,
  employeeList: [],
  departments: [],
};

function reducer(state = initialState, action) {
  let localRegister = {};
  switch (action.type) {
    case actionTypes.SET_SEARCH_EMPLOYEE_FULL:
      return {
        ...state,
        search: action.payload,
      };
    case actionTypes.SHOW_NEW_EMPLOYEE_FULL_OVERLAY:
      return {
        ...state,
        showNewEmployeeFullOverlay: action.payload.show,
        isEdittingEmployee: action.payload.isEditting,
      };
    case actionTypes.FETCH_EMPLOYEE_LIST:
      return {
        ...state,
        employeeList: action.payload,
      };
    case actionTypes.SET_DEPARTMENT_FULL_LIST:
      return {
        ...state,
        departments: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
