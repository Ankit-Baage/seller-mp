import { apiSlice } from "./apiSlice";
import totalOrder from "../assets/totalOrder.svg";
import totalSales from "../assets/totalSales.svg";
import returnedOrder from "../assets/returnedOrder.svg";
import totalCustomer from "../assets/totalCustomer.svg";
import transaction from "../assets/transaction.svg";
import sales from "../assets/sales.svg";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesSummary: builder.query({
      query: () => "/dashboard/sales-summary",
      transformResponse: (response) => {
        // Handle case where response or response.data is missing
        if (!response?.data) {
          return {
            earning_summary: [],
            sales_summary: [],
          };
        }

        const { earning_summary = [], sales_summary = [] } = response.data;

        // Map images to titles based on their order in the array for earning_summary
        const imageMap = [transaction, sales];
        const transformedEarningSummary = earning_summary.map(
          (item, index) => ({
            ...item,
            id: index + 1, // Add an id starting from 1
            image: imageMap[index], // Add the image based on the index
          })
        );

        return {
          ...response.data,
          earning_summary: transformedEarningSummary,
          sales_summary: sales_summary, // Assuming sales_summary doesn't need image mapping
        };
      },
    }),
    getOrderSummary: builder.query({
      query: () => "/dashboard/order-summary",
      transformResponse: (response) => {
        if (!response.data || !Array.isArray(response.data)) {
          return [];
        }
        const imageMap = [totalOrder, totalSales, returnedOrder, totalCustomer];
        const transformedData = response.data.map((item, index) => ({
          ...item,
          id: index + 1,
          image: imageMap[index],
        }));

        return transformedData;
      },
    }),
  }),
});

// Export the generated hooks
export const { useGetSalesSummaryQuery, useGetOrderSummaryQuery } =
  homeApiSlice;
