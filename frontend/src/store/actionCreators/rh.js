import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";

// export const SetSelectedRegisterRH = (id) => (dispatch) => {
//   return dispatch({ type: actionTypes.SET_SELECTED_REGISTER_RH, payload: id });
// };

export const SetSelectedRegisterId = (id) => (dispatch) => {
  return dispatch({ type: actionTypes.SET_SELECTED_REGISTER_ID, payload: id });
};



export const SetSearchRegisterRH = (search) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SEARCH_REGISTER_RH,
    payload: search,
  });
};

export const ShowNewEmployeeOverlay = (value, isEditting) => (dispatch) => {
  return dispatch({
    type: actionTypes.SHOW_NEW_EMPLOYEE_OVERLAY,
    payload: { show: value, isEditting: isEditting },
  });
};

export const AddSmallBoxRegister = (smallBoxRegister) => (dispatch) => {
  return dispatch({
    type: actionTypes.ADD_SMALLBOX_REGISTER,
    payload: smallBoxRegister,
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

export const FetchEmployeeForResgisterList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(apiRoutes.FETCH_EMPLOYEE_FOR_REGISTER_LIST)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_EMPLOYEE_FOR_REGISTER_LIST,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const SetRegisters = (register) => (dispatch) => {
  return dispatch({ type: actionTypes.SET_REGISTERS, payload: register });
};

export const SetRegistersDetails = (registersDetails) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_REGISTERS_DETAILS,
    payload: registersDetails,
  });
};

export const SetSelectedRegistersDetails = (registersDetails) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SELECTED_REGISTERS_DETAILS,
    payload: registersDetails,
  });
};

export const SaveRegister = (register) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .put(`${apiRoutes.PUT_REGISTER}${register.id}`, register)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ClearNewRegister = () => (dispatch) => {
  return dispatch({
    type: actionTypes.CLEAR_NEW_REGISTER,
    payload: {},
  });
};


export const FetchRegisterList = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(apiRoutes.FETCH_REGISTER_LIST)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_REGISTERS,
          payload: res.data,
        })
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const FetchRegisterDetails = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${apiRoutes.FETCH_REGISTER_DETAILS}${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: actionTypes.SET_SELECTED_REGISTER,
          payload: res.data,
        })
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const SetSelectedRegister = (register) => (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SELECTED_REGISTER,
    payload: register,
  });
};

export const InitializeRegister = (dates) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(apiRoutes.INITIALIZE_REGISTER, dates)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const FetchRegistersDetailsRH = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .get(`${apiRoutes.FETCH_REGISTER_DETAILS}${id}`)
      .then((res) => {
        dispatch({ type: actionTypes.SET_REGISTERS, payload: res.data });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const CreateEmployee = (details) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .post(apiRoutes.EMPLOYEE, details)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const EditEmployee = (details, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .put(`${apiRoutes.EMPLOYEE}${id}`, details)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const DeactivateEmployee = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPrivate
      .delete(`${apiRoutes.EMPLOYEE}${id}`)
      .then((res) => {
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
      .get(apiRoutes.FETCH_DEPARTMENT_LIST)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_DEPARTMENT_LIST,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
