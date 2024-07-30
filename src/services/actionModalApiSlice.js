import { apiSlice } from "./apiSlice";

export const actionModalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteRequest: builder.mutation({
      query: ({ category, request_id }) => ({
        url: `${category}?request_id=${request_id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { category, request_id },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCategoryList", { category })
          );
        } catch (err) {
          console.error("Reject request failed:", err);
        }
      },
      invalidatesTags: (result, error, { category, request_id }) => [
        { type: category, id: request_id },
      ],
    }),
  }),
});

export const { useDeleteRequestMutation } = actionModalApiSlice;
