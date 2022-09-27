import * as actionTypes from "../action-types";

let initialState = {
  addresses: [],
  employments: [],
  goal: {},
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADDRESS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case actionTypes.EMPLOYMENT_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case actionTypes.CUSTOMER_GOAL:
      return {
        ...state,
        goal: {...state.goal, ...action.payload},
      };
    case actionTypes.CUSTOMER_GOAL_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
