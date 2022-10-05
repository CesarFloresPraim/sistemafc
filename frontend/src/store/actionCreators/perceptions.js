import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";

export const ShowNewPerceptionOverlay = (value, isEditting) => (dispatch) => {
  return dispatch({
    type: actionTypes.SHOW_NEW_PERCEPTION_OVERLAY,
    payload: { show: value, isEditting: isEditting },
  });
};

export const FetchPerceptionTypeList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.get(apiRoutes.FETCH_PERCEPTION_TYPE_LIST)
          .then((res) => {
            dispatch({ type: actionTypes.SET_PERCEPTION_TYPE_LIST, payload: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const CreatePerceptionType = (newPerceptionType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.post(apiRoutes.CREATE_PERCEPTION_TYPE, newPerceptionType)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const EditPerceptionType = (newPerceptionType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.put(`${apiRoutes.EDIT_PERCEPTION_TYPE}${newPerceptionType.id}`, newPerceptionType)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const CreatePerception = (perceptionDTO) => (dispatch) => {
    return axiosPrivate.post(apiRoutes.CREATE_PERCEPTION, perceptionDTO)
};

export const EditPerception = (perceptionDTO) => (dispatch) => {
    return axiosPrivate.put(`${apiRoutes.EDIT_PERCEPTION}${perceptionDTO.id}`, perceptionDTO)
};

export const FetchEmployeePerceptionList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axiosPrivate.get(apiRoutes.FETCH_EMPLOYEE_PERCEPTIONS_LIST)
          .then((res) => {
            dispatch({ type: actionTypes.SET_EMPLOYEE_PERCEPTIONS_LIST, payload: res.data });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

