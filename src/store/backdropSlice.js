import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBackdropOpen: false,
};

const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    openBackdrop: (state) => {
      state.isBackdropOpen = true;
    },
    closeBackdrop: (state) => {
      state.isBackdropOpen = false;
    },
  },
});

// Exporting actions
export const { openBackdrop, closeBackdrop } = backdropSlice.actions;

// Selector function
export const selectBackdropState = (state) => state.backdrop.isBackdropOpen;

// Exporting reducer
export default backdropSlice.reducer;
