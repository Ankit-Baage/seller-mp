import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalData: null,
  },
  reducers: {
    onModalOpen: (state, action) => {
      state.isModalOpen = true;
      state.modalData = action.payload.modalData; // Ensure the payload contains modalData
    },
    onModalClose: (state) => {
      state.isModalOpen = false;
      state.modalData = null;
    },
  },
});

// Exporting actions
export const { onModalOpen, onModalClose } = modalSlice.actions;

// Corrected selector function (state.modal matches the slice name)
export const selectModalState = (state) => state.modal;

// Exporting reducer
export default modalSlice.reducer;
