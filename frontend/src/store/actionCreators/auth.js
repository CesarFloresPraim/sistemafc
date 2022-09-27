import * as actionTypes from "../action-types";
import Axios from "../../utils/request";
import { apiRoutes } from "../../types/api-routes";
import history from "../../history";

export const SignupCustomerDetails = (details) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNUP_CUSTOMER_DETAILS, payload: details });
};

export const ConfirmAccount = (account) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
      let res = await Axios.post(apiRoutes.CONFIRM_USER, account);
      dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: false });
      dispatch({
        type: actionTypes.CONFIRM_ACCOUNT,
        payload: res.responseData,
      });
      //history.replace("/address-history");
      resolve("You have successfully confirmed your email");
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: error.response.data?.message,
      });
      if (error.response.data?.message === "Invalid code") {
        reject({ code: "INVALID_CODE", message: "Invalid code" });
      }
      reject(error.response.data?.message);
    } finally {
      //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
    }
  });
};

export const SignUpNavigateBackState = (allow) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: allow });
};

export const SetAuthError = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.AUTH_ERROR,
    payload: error,
  });
};

export const ResetLoginStatus = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_STATUS,
    payload: "",
  });
};

export const SetAuthDetails = (auth) => (dispatch) => {
  dispatch({ type: actionTypes.LOGIN, payload: auth });
};

export const RegisterCustomer = (details) => {
  return (dispatch) =>
    new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
        let res = await Axios.post(apiRoutes.REGISTER_CUSTOMER, details);
        dispatch({
          type: actionTypes.LOGIN,
          payload: {
            userId: res.responseData.userId,
            email: res.responseData.email,
            tokens: res.responseData.tokens,
          },
        });
        dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: false });
        //history.replace("/email-confirm");
        resolve("You have successfully registered as a customer");
      } catch (error) {
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: error.response.data?.message,
        });
        if (error.response.data?.responseCode === "ALREADY_EXISTS") {
          reject({
            code: "ALREADY_EXISTS",
            message: "This email has been already taken.",
          });
        }
        reject(error.response.data?.message);
      } finally {
        dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
      }
    });
};

export const LoginStatus = (data) => {
  return (dispatch) =>
    new Promise(async (resolve, reject) => {
      try {
        //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });

        let res = await Axios.post(apiRoutes.LOGIN, {
          email: data.email,
          password: data.password,
        });

        dispatch({
          type: actionTypes.LOGIN,
          payload: {
            userId: res.responseData.userId,
            email: res.responseData.emailAddress,
            tokens: res.responseData.tokens,
          },
        });

        let statusRes = await Axios.get(
          `${apiRoutes.LOGIN_STATUS}/${data.email}`
        );
        dispatch({
          type: actionTypes.LOGIN_STATUS,
          payload: statusRes.responseData,
        });

        //store user data for 30 days
        if (data.keepLogged) {
          res.responseData.startDate = new Date();
          localStorage.setItem("user", JSON.stringify(res.responseData));
        }

        resolve("You have successfully logged as a customer");
      } catch (error) {
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: error.response.data?.message,
        });
        if (
          error.response.data?.message === "Incomplete profile information" ||
          error.response.data?.message === "User has not been confirmed"
        ) {
          let statusRes = await Axios.get(
            `${apiRoutes.LOGIN_STATUS}/${data.email}`
          );
          dispatch({
            type: actionTypes.LOGIN_STATUS,
            payload: statusRes.responseData,
          });
        }
      } finally {
        //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
      }
    });
};

export const GetLoginStatus = (data) => {
  return (dispatch) =>
    new Promise(async (resolve, reject) => {
      try {
        //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });

        let statusRes = await Axios.get(
          `${apiRoutes.LOGIN_STATUS}/${data.email}`
        );
        dispatch({
          type: actionTypes.LOGIN_STATUS,
          payload: statusRes.responseData,
        });

        resolve("Fetched user logged status");
      } catch (error) {
        reject("Could not get loggin status for this email");
      } finally {
        //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
      }
    });
};

export const ResetPassword = (details) => (dispatch) => {
  dispatch({ type: actionTypes.RESET_PASSWORD, payload: details });
};
