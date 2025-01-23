import { createSlice } from "@reduxjs/toolkit";

const uploadModalSlice = createSlice({
  name: "uploadModal",
  initialState: {
    isUploadOpen: false,
    message: "",
  },
  reducers: {
    startUpload: (state, action) => {
      state.isUploadOpen = true;
      state.message = action.payload.message;
    },
    finishUpload: (state) => {
      state.isUploadOpen = false;
      state.message = "";
    },
  },
});

export const { startUpload, finishUpload } =
uploadModalSlice.actions;

export default uploadModalSlice.reducer;
