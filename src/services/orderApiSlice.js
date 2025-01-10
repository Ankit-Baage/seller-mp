import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { ordersListUrl } from "../config/config";

// Create an adapter for the orders list
const ordersListAdapter = createEntityAdapter({
  selectId: (order) => order.id,
});

const initialState = ordersListAdapter.getInitialState();

// Define the slice
export const ordersListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query({
      query: (filters) => {
        const validFilters = Object.fromEntries(
          Object.entries(filters).filter(([key, value]) => value != null)
        );

        // Create query parameters string
        const queryParams = new URLSearchParams(validFilters).toString();

        // If there are no valid filters, just return the base URL
        return queryParams ? `${ordersListUrl}?${queryParams}` : ordersListUrl;
      },
      transformResponse: (responseData) => {
        const loadedOrdersList = responseData.data.map((item) => {
          if (item.url) {
            const urlParts = item.url.split("/");
            const urlLabelWithExt = urlParts[urlParts.length - 1];
            return {
              ...item,
              urlLabel: urlLabelWithExt,
            };
          }

          // If you want to remove the extension and get the base name

          return {
            ...item,
            urlLabel: "", // or you can set a default value here if necessary
          };
        });

        // Use the adapter to set all items in the state
        return ordersListAdapter.setAll(initialState, loadedOrdersList);
      },
      providesTags: (result) => {
        if (!result) {
          return [{ type: "orders", id: "ordersList" }];
        }
        return [
          { type: "orders", id: "ordersList" },
          ...result.ids.map((id) => ({ type: "orders", id })),
        ];
      },
    }),
  }),
});

// Export the hook
export const { useGetOrdersListQuery } = ordersListSlice;

// Select the order filter state
const orderFilter = (state) => state.orderFilter;

// Select the orders from the state (with applied filter)

const selectOrderListResult = createSelector(
  [orderFilter, (state) => state],
  (filter, state) => {
    const result = ordersListSlice.endpoints.getOrdersList.select({
      status: filter.status,
    })(state);
    return result;
  }
);
const selectOrdersListData = createSelector(
  [selectOrderListResult],
  (orderListResult) => orderListResult?.data ?? initialState
);

// Adapter selectors for orders
export const {
  selectAll: selectOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersListAdapter.getSelectors((state) => {
  const data = selectOrdersListData(state);
  return data;
});
