import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";

export const ShowNewVacationOverlay = (value) => (dispatch) => {
  return dispatch({
    type: actionTypes.SHOW_NEW_VACATION_OVERLAY,
    payload: { show: value},
  });
};

export const SetSearchEmployee = (search) => (dispatch) => {
    return dispatch({
      type: actionTypes.SET_SEARCH_EMPLOYEE_VACATION,
      payload: search,
    });
  };

export const CreateVacation = (vacationDTO) => (dispatch) => {
    return axiosPrivate.post(apiRoutes.CREATE_VACATION, vacationDTO)
};

export const EditVacation = (vacationDTO) => (dispatch) => {
    return axiosPrivate.put(`${apiRoutes.EDIT_VACATION}${vacationDTO.id}`, vacationDTO)
};

export const FetchEmployeeVacationList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.get(apiRoutes.FETCH_EMPLOYEE_VACATIONS_LIST)
          .then((res) => {
            dispatch({ type: actionTypes.SET_EMPLOYEE_VACATIONS_LIST, payload: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

