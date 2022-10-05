import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";

export const ShowNewDeductionOverlay = (value, isEditting) => (dispatch) => {
  return dispatch({
    type: actionTypes.SHOW_NEW_DEDUCTION_OVERLAY,
    payload: { show: value, isEditting: isEditting },
  });
};

export const FetchDeductionTypeList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.get(apiRoutes.FETCH_DEDUCTION_TYPE_LIST)
          .then((res) => {
            dispatch({ type: actionTypes.SET_DEDUCTION_TYPE_LIST, payload: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const CreateDeductionType = (newDeductionType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.post(apiRoutes.CREATE_DEDUCTION_TYPE, newDeductionType)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const EditDeductionType = (newDeductionType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.put(`${apiRoutes.EDIT_DEDUCTION_TYPE}${newDeductionType.id}`, newDeductionType)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const CreateDeduction = (deductionDTO) => (dispatch) => {
    return axiosPrivate.post(apiRoutes.CREATE_DEDUCTION, deductionDTO)
};

export const EditDeduction = (deductionDTO) => (dispatch) => {
    return axiosPrivate.put(`${apiRoutes.EDIT_DEDUCTION}${deductionDTO.id}`, deductionDTO)
};

export const FetchEmployeeDeductionList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.get(apiRoutes.FETCH_EMPLOYEE_DEDUCTIONS_LIST)
          .then((res) => {
            dispatch({ type: actionTypes.SET_EMPLOYEE_DEDUCTIONS_LIST, payload: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

