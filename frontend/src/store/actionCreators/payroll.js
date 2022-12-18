import * as actionTypes from "../action-types";
import { axiosPrivate } from "../../utils/axiosPrivate";
import { apiRoutes } from "../../types/api-routes";


export const InitializePayroll = (payroll) => (dispatch) => {
    return axiosPrivate.post(apiRoutes.INITIALIZE_PAYROLL, payroll)
};

export const SetSelectedPayroll = (id) => (dispatch) => {
    return dispatch({type: actionTypes.SET_SELECTED_PAYROLL, payload: id})
};

export const FetchPayrollList = () => (dispatch) => {
    return axiosPrivate.get(apiRoutes.FETCH_PAYROLL_LIST)
};

export const FetchPayrollDetails = (id) => (dispatch) => {
    return axiosPrivate.get(`${apiRoutes.FETCH_PAYROLL_DETAILS}${id}`)
};

export const SetPayrollDetails = (payrollDetails) => (dispatch) => {
    return dispatch({type: actionTypes.SET_PAYROLL_DETAILS, payload: payrollDetails})
};

export const SetPayrollList = (payrollList) => (dispatch) => {
    return dispatch({type: actionTypes.SET_PAYROLL_LIST, payload: payrollList})
};

export const FetchUnusedRegisterList = () => (dispatch) => {
    return axiosPrivate.get(apiRoutes.FETCH_PAYROLL_UNUSED_REGISTERS_RH)
};


