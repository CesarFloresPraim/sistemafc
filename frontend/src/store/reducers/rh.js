import * as actionTypes from "../action-types";

let initialState = {
  selectedRegisterId: localStorage.getItem("selectedRegisterId") || "",
  selectedRegister:
    JSON.parse(localStorage.getItem("selectedRegister") || "{}") || {},
  registerList: JSON.parse(localStorage.getItem("registerList") || "[]") || [],
  search: "",
  showNewEmployeeOverlay: false,
  isEdittingEmployee: false,
  employeeList: [],
  departments: [],
  register: JSON.parse(localStorage.getItem("register") || "{}") || {},
  employeesForRegister: [],
};

function reducer(state = initialState, action) {
  let localRegister = {};
  switch (action.type) {
    case actionTypes.SET_SELECTED_REGISTER_ID:
      localStorage.setItem(
        "selectedRegisterId",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        selectedRegisterId: action.payload,
      };
    case actionTypes.CLEAR_NEW_REGISTER:
      localStorage.setItem(
        "register",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        register: action.payload,
      };
    case actionTypes.SET_SELECTED_REGISTER:
      localStorage.setItem("selectedRegister", JSON.stringify(action.payload));
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
      localStorage.setItem("register", JSON.stringify(action.payload));
      return {
        ...state,
        register: action.payload,
      };
    case actionTypes.SET_REGISTERS_DETAILS:
      localRegister = {
        ...state.register,
        registersDetails: action.payload,
      };
      localStorage.setItem("register", JSON.stringify(localRegister));
      return {
        ...state,
        register: localRegister,
      };
      case actionTypes.SET_SELECTED_REGISTERS_DETAILS:
        localRegister = {
          ...state.selectedRegister,
          registersDetails: action.payload,
        };
        localStorage.setItem("selectedRegister", JSON.stringify(localRegister));
        return {
          ...state,
          selectedRegister: localRegister,
        };
    case actionTypes.FETCH_REGISTERS:
      localStorage.setItem("registerList", JSON.stringify(action.payload));
      return {
        ...state,
        registerList: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
