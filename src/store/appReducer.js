import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import actionModalReducer from "./actionModalSlice";
import stockModalReducer from "./stockModalSlice";
import uploadModalReducer from "./uploadModalSlice";

const appReducer = combineReducers({
  auth: authReducer,
  categoryFilter: categoryFilterReducer,
  actionModal: actionModalReducer,
  stockModal: stockModalReducer,
  uploadModal: uploadModalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
