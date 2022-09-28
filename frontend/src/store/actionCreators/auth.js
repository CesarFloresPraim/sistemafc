import * as actionTypes from "../action-types";
import {axiosPublic} from "../../utils/axiosPublic";
import { apiRoutes } from "../../types/api-routes";
import history from "../../history";

export const SignIn = (credentials) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axiosPublic.post(apiRoutes.GET_TOKENS, credentials)
      .then((res) => {
        console.log(res);
        dispatch({ type: actionTypes.SIGNIN, payload: res.data });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
