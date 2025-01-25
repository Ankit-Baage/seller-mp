import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  component: null, // Holds the modal body component (e.g., AddForm, UpdateForm, DeleteForm)
  uiData: null, // Holds the data passed to the modal (e.g., item data to edit or delete)
  configData: null, // Type of operation: 'add', 'update', 'delete'
  operationType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      const { component, uiData, configData, operationType } =
        action.payload || {};
      state.isOpen = true;
      state.component = component || null; // Assign the modal body content (e.g., form component)
      state.uiData = uiData || null; // Assign the modal data (e.g., item to be edited or deleted)
      state.configData = configData || null; // Assign the modal data (e.g., item to be edited or deleted)
      state.operationType = operationType || null; // Assign the operation type
    },
    closeModal() {
      return initialState; // Clean reset to initial state
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
