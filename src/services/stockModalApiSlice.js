import { apiSlice } from "./apiSlice";

export const stockModalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateStock: builder.mutation({
      query: ({ category, request_id, status }) => ({
        url: `${category}/stock?request_id=${request_id}&status=${status}`,
        method: "PATCH",
      }),
      onQueryStarted: async (
        { category, request_id, status },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCategoryList", { category }, (draft) => {
              // Modify the draft if needed based on the response
            })
          );
        } catch (err) {
          console.error("inStock request failed:", err);
        }
      },
      invalidatesTags: (result, error, { category, request_id }) => [
        { type: category, id: request_id },
      ],
    }),
  }),
});

export const { useUpdateStockMutation } = stockModalApiSlice;
