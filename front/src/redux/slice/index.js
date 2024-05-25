import { combineReducers } from "redux";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import projetReducer from "./projetSlice";
import congeReducer from "./congeSlice";
import departementReducer from "./departementSlice";
import posteReducer from "./posteSlice";
// import { configureStore } from "@reduxjs/toolkit";
// import academicYearReducer from "./academicYearReducer";
export const reducers = combineReducers({
  authReducer,
  userReducer,
  projetReducer,
  congeReducer,
  departementReducer,
  posteReducer
});
