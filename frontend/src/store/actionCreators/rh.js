import * as actionTypes from "../action-types";
import Axios from "../../utils/request";
import { apiRoutes } from "../../types/api-routes";

export const SetSelectedRegisterRH = (id) => (dispatch) => {
  return dispatch({ type: actionTypes.SET_SELECTED_REGISTER_RH, payload: id });
};

export const SetSearchRegisterRH = (search) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SEARCH_REGISTER_RH,
    payload: search,
  });
};

export const ShowNewEmployeeOverlay = (search) => (dispatch) => {
    return dispatch({
      type: actionTypes.SHOW_NEW_EMPLOYEE_OVERLAY,
      payload: search,
    });
  };
