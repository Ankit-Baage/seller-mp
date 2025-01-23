import { createSlice } from "@reduxjs/toolkit";

const stockModalSlice = createSlice({
  name: "stockModal",
  initialState: {
    isStockOpen: false,
    stockModalData: null,
  },
  reducers: {
    onStockOpen: (state, action) => {
      state.isStockOpen = true;
      state.stockModalData = action.payload.stockModalData;
    },
    onStockClose: (state) => {
      state.isStockOpen = false;
      state.stockModalData = null;
    },
  },
});

export const { onStockOpen, onStockClose } = stockModalSlice.actions;

export const selectStockModalState = (state) => state.stockModal;

export default stockModalSlice.reducer;
