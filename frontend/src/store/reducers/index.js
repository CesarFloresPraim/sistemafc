import { combineReducers } from "redux";
import auth from "./auth";
import rh from "./rh";
import perceptions from "./perceptions"
import deductions from "./deductions"

let reducers = {
  auth,
  rh,
  perceptions,
  deductions,
};
let combinedReducer = combineReducers(reducers);
export default combinedReducer;
