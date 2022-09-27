import * as actionTypes from "../action-types";
import Axios from "../../utils/request";
import { apiRoutes } from "../../types/api-routes";
import history from "../../history";

export const AddCustomerAddresses = (addresses) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
      let res = await Axios.post(apiRoutes.CUSTOMER_ADDRESS, addresses);
      dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: true });
      //history.replace("/employment-history");
      resolve("You have successfully registered all your addresses");
    } catch (error) {
      dispatch({
        type: actionTypes.ADDRESS_ERROR,
        payload: error.response.data?.message,
      });
    } finally {
      //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
    }
  });
};

export const AddCustomerEmployments = (employments) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
      let res = await Axios.post(apiRoutes.CUSTOMER_EMPLOYMENT, employments);
      dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: true });
      //history.replace("/select-goal");
      resolve("You have successfully registered all your addresses");
    } catch (error) {
      dispatch({
        type: actionTypes.EMPLOYMENT_ERROR,
        payload: error.response.data?.message,
      });
    } finally {
      //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
    }
  });
};

export const AddCustomerGoal = (goal) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      //dispatch({ type: actionTypes.SHOW_LOADING, payload: true });
      let res = await Axios.post(apiRoutes.CUSTOMER_GOAL, goal);
      dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: false });
      //history.replace("/select-goal");
      resolve("You have succesfully set your goal");
    } catch (error) {
      dispatch({
        type: actionTypes.CUSTOMER_GOAL_ERROR,
        payload: error.response.data?.message,
      });
      reject("Something went wrong");
    } finally {
      //dispatch({ type: actionTypes.HIDE_LOADING, payload: false });
    }
  });
};

export const CustomerGoalDetails = (goal) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNUP_NAVIGATE_BACK, payload: true });
  return dispatch({ type: actionTypes.CUSTOMER_GOAL, payload: goal });
};
