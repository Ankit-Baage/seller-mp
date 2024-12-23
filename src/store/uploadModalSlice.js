import { createSlice } from "@reduxjs/toolkit";

const uploadModalSlice = createSlice({
  name: "uploadModal",
  initialState: {
    isOpen: false,
    message: "",
  },
  reducers: {
    startUpload: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
    },
    finishUpload: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { startUpload, finishUpload } =
uploadModalSlice.actions;

export default uploadModalSlice.reducer;
