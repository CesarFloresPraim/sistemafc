import { combineReducers } from "redux";
import auth from "./auth";
import rh from "./rh";

let reducers = {
  auth,
  rh
};
let combinedReducer = combineReducers(reducers);
export default combinedReducer;
