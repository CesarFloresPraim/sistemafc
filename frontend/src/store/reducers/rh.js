import * as actionTypes from "../action-types";

let initialState = {
  selectedRegister: "",
  search: "",
  showNewEmployeeOverlay: false
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
        showNewEmployeeOverlay: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
