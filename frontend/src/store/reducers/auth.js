import * as actionTypes from "../action-types";

let initialState = {
  auth: {
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
  },
  errorMessage: "",

};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGNIN:
      localStorage.setItem("access_token", action.payload.access)
      localStorage.setItem("refresh_token", action.payload.refresh)
      return {
        ...state,
        auth: {...state.auth, accessToken: action.payload.access, refreshToken: action.payload.refresh},
      };
    default:
      return state;
  }
}
export default reducer;
