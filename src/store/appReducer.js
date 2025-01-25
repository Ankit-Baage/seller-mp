import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import orderFilterReducer from "./orderFilterSlice";
import modalReducer from "./modalSlice"

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  categoryFilter: categoryFilterReducer,
  orderFilter: orderFilterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
