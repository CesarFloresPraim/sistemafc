import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";

export const ShowNewEmployeeOverlay = (value, isEditting) => (dispatch) => {
  return dispatch({
    type: actionTypes.SHOW_NEW_EMPLOYEE_FULL_OVERLAY,
    payload: { show: value, isEditting: isEditting },
  });
};

export const SetSearchEmployee = (search) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SEARCH_EMPLOYEE_FULL,
    payload: search,
  });
};

export const FetchEmployeeList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(apiRoutes.FETCH_EMPLOYEE_LIST)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_EMPLOYEE_LIST, payload: res.data });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const FetchDepartmentList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(apiRoutes.FETCH_DEPARTMENT_FULL_LIST)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_DEPARTMENT_FULL_LIST,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const CreateEmployeeFull = (employeeDTO) => (dispatch) => {
    return axiosPrivate.post(apiRoutes.EMPLOYEE, employeeDTO);
};

export const EditEmployeeFull = (employeeDTO) => (dispatch) => {
  return axiosPrivate.put(
    `${apiRoutes.EMPLOYEE}${employeeDTO.id}`,
    employeeDTO
  );
};
