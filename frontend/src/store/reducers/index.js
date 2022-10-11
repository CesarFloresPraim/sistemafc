import { combineReducers } from "redux";
import auth from "./auth";
import rh from "./rh";
import perceptions from "./perceptions"
import deductions from "./deductions"
import employees from "./employees"
import vacations from "./vacations"
import payroll from "./payroll"

let reducers = {
  auth,
  rh,
  perceptions,
  deductions,
  employees,
  vacations,
  payroll,
};
let combinedReducer = combineReducers(reducers);
export default combinedReducer;
