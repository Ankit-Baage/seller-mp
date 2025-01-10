import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./authSlice";
import categoryFilterReducer from "./categorySlice";
import actionModalReducer from "./actionModalSlice";
import stockModalReducer from "./stockModalSlice";
import uploadModalReducer from "./uploadModalSlice";
import orderFilterReducer from "./orderFilterSlice";

const appReducer = combineReducers({
  auth: authReducer,
  categoryFilter: categoryFilterReducer,
  orderFilter: orderFilterReducer,
  actionModal: actionModalReducer,
  stockModal: stockModalReducer,
  uploadModal: uploadModalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default appReducer;
