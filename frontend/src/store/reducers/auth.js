import * as actionTypes from "../action-types";

let initialState = {
  auth: {
    userId: localStorage.getItem("userId") || null,
    email: localStorage.getItem("email") || null,
    tokens: {
      accessToken: localStorage.getItem("access_token") || null,
      refreshToken: localStorage.getItem("refresh_token") || null,
    },
  },
  signupDetails: JSON.parse(localStorage.getItem("signupDetails")) || {},
  loginStatus: "",
  errorMessage: "",
  signUpNavigateBackState:
    JSON.parse(localStorage.getItem("signUpNavigateBackState")) || false,
  resetPassword: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_CUSTOMER_DETAILS:
      localStorage.setItem("signupDetails", JSON.stringify(action.payload));
      return {
        ...state,
        signupDetails: action.payload,
      };
    case actionTypes.CONFIRM_ACCOUNT:
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload.userId,
          email: action.payload.email,
        },
      };
    case actionTypes.LOGIN:
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("access_token", action.payload.tokens.accessToken);
      localStorage.setItem("refresh_token", action.payload.tokens.refreshToken);
      return {
        ...state,
        auth: {
          ...state.auth,
          email: action.payload.email,
          userId: action.payload.userId,
          tokens: {
            ...state.auth.tokens,
            accessToken: action.payload.tokens.accessToken,
            refreshToken: action.payload.tokens.refreshToken,
          },
        },
      };
    case actionTypes.LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload,
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case actionTypes.SIGNUP_NAVIGATE_BACK:
      localStorage.setItem(
        "signUpNavigateBackState",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        signUpNavigateBackState: action.payload,
      };
    case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
