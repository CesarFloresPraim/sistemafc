import { combineReducers } from "redux";
import general from "./general";
import auth from "./auth";
import customer from "./customer";
import rh from "./rh";

let reducers = {
  general,
  auth,
  customer,
  rh
};
let combinedReducer = combineReducers(reducers);
export default combinedReducer;
