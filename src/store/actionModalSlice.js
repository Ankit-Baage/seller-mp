import { createSlice } from "@reduxjs/toolkit";

const actionModalSlice = createSlice({
  name: "actionModal",
  initialState: {
    isOpen: false,
    modalData: {
      category: null,
      lot_id: null,
      request_id: null,
      original_price: null,
      discounted_price: null,
      rate_card: null,
    },
  },
  reducers: {
    onActionOpen: (state, action) => {
      state.isOpen = true;
      state.modalData = {
        category: action.payload.category,
        lot_id: action.payload.lot_id,
        request_id: action.payload.request_id,
        original_price: action.payload.original_price,
        discounted_price: action.payload.discounted_price,
        rate_card: action.payload.rate_card,
      };
    },
    onActionClose: (state) => {
      state.isOpen = false;
      state.modalData = {
        category: null,
        lot_id: null,
        request_id: null,
        original_price: null,
        discounted_price: null,
        rate_card: null,
      };
    },
  },
});

export const { onActionOpen, onActionClose } = actionModalSlice.actions;

export const selectActionModalState = (state) => state.actionModal;

export default actionModalSlice.reducer;
