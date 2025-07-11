import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";

export const rootReducer = combineReducers({
  global: globalReducer,
});

export default rootReducer;
