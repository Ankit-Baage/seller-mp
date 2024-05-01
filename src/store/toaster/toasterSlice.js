// toasterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  backgroundColor:"#FFD4C5"
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    openToaster: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message || "";
      state.backgroundColor= action.payload.backgroundColor
    },
    closeToaster: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});


export const { openToaster, closeToaster } = toasterSlice.actions;
export const selectToasterState = (state) => state.toaster; // Corrected selector name
export default toasterSlice.reducer;
