import { apiSlice } from "./apiSlice";
import { createSelector } from "@reduxjs/toolkit";

// Define the slice
export const orderDetailSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderDetail: builder.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (responseData) => {
        // Optionally transform the response data if needed
        const transformedDetail = {
          ...responseData.data,
          // orderedOnFormatted: new Date(responseData.ordered_on * 1000).toLocaleDateString(),
        };
        return transformedDetail;
      },
      providesTags: (result, error, orderId) => [{ type: "orderDetail", id: orderId }],
    }),
  }),
});

// Export the hook for fetching order details
export const { useGetOrderDetailQuery } = orderDetailSlice;

