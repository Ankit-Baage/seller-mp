import { createSlice } from "@reduxjs/toolkit";

const orderFilterSlice = createSlice({
  name: "orderFilter",
  initialState: {
    status: null,
    search: null,
  },
  reducers: {
    setOrderFilter: (state, action) => {
      state.status = action.payload.status || null;
      state.search = action.payload.search || null;
    },

    clearOrderFilters: (state) => {
      state.status = null;
      state.search = null;
    },
  },
});

export const { setOrderFilter, clearOrderFilters } = orderFilterSlice.actions;

export const selectOrderState = (state) => state.orderFilter;

export default orderFilterSlice.reducer;
