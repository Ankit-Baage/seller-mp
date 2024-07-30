import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import actionModalReducer from "./actionModalSlice";
import stockModalReducer from "./stockModalSlice";
import { apiSlice } from "../services/apiSlice";

const appReducer = combineReducers({
  auth: authReducer,
  categoryFilter: categoryFilterReducer,
  actionModal: actionModalReducer,
  stockModal: stockModalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
