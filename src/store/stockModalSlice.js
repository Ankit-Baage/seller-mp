import { createSlice } from "@reduxjs/toolkit";

const stockModalSlice = createSlice({
  name: "stockModal",
  initialState: {
    isOpen: false,
    modalData: {
      category: null,
      request_id: null,
      status: null,
    },
  },
  reducers: {
    onStockOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = {
        category: action.payload.category,
        request_id: action.payload.request_id,
        status: action.payload.status,
      };
    },
    onStockClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        category: null,
      request_id: null,
      status: null,
      };
    },
  },
});

export const { onStockOpen, onStockClose } = stockModalSlice.actions;

export const selectStockModalState = (state) => state.stockModal;

export default stockModalSlice.reducer;
