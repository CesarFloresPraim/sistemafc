import * as actionTypes from "../action-types";

let initialState = {
  selectedRegister: "",
  search: "",
  showNewEmployeeOverlay: false,
  isEdittingEmployee: false,
  employeeList: [],
  departments: [],
  registers: JSON.parse(localStorage.getItem("registers") || "[]") || [],
  employeesForRegister: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_REGISTER_RH:
      return {
        ...state,
        selectedRegister: action.payload,
      };
    case actionTypes.SET_SEARCH_REGISTER_RH:
      return {
        ...state,
        search: action.payload,
      };
    case actionTypes.SHOW_NEW_EMPLOYEE_OVERLAY:
      return {
        ...state,
        showNewEmployeeOverlay: action.payload.show,
        isEdittingEmployee: action.payload.isEditting,
      };
    case actionTypes.FETCH_EMPLOYEE_LIST:
      return {
        ...state,
        employeeList: action.payload,
      };
    case actionTypes.FETCH_DEPARTMENT_LIST:
      return {
        ...state,
        departments: action.payload,
      };
    case actionTypes.FETCH_EMPLOYEE_FOR_REGISTER_LIST:
      return {
        ...state,
        employeesForRegister: action.payload,
      };
    case actionTypes.SET_REGISTERS:
      localStorage.setItem("registers", JSON.stringify(action.payload));
      return {
        ...state,
        registers: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
