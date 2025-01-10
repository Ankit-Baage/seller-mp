import { createSlice } from "@reduxjs/toolkit";

const orderFilterSlice = createSlice({
  name: "orderFilter",
  initialState: {
    status: null,
  },
  reducers: {
    setOrderFilter: (state, action) => {
      state.status = action.payload.status;
    },

    clearOrderFilters: (state) => {
      state.status = null;
    },
  },
});

export const { setOrderFilter, clearOrderFilters } = orderFilterSlice.actions;

export const selectOrderState = (state) =>
  state.orderFilter;

export default orderFilterSlice.reducer;
