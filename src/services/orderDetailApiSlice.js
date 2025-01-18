import { ordersListUrl } from "../config/config";
import { apiSlice } from "./apiSlice";

// Define the slice
export const orderDetailSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderDetail: builder.query({
      query: (orderId) => `${ordersListUrl}/${orderId}`,
      transformResponse: (responseData) => {
        const { order_details = {}, shipment_details = {} } = responseData.data;

        const shipmentDetailArray = Object.entries(shipment_details).map(
          ([key, value], index) => ({
            id: index + 1,
            shipmentKey: key,
            title: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            ...value,
          })
        );

        const transformedDetail = {
          orderDetails: order_details,
          shipmentDetails: shipmentDetailArray,
        };

        return transformedDetail;
      },
      providesTags: (result, error, orderId) => [
        { type: "orderDetail", id: orderId },
      ],
    }),
    updateShipmentStatus: builder.mutation({
      query: ({ orderId, id, status }) => ({
        url: `${ordersListUrl}/${orderId}`, // Same URL as GET
        method: "PATCH",
        body: {
          id, // Shipment identifier
          status, // New status
        },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "orderDetail", id: orderId },
      ],
    }),
  }),
});

export const { useGetOrderDetailQuery, useUpdateShipmentStatusMutation } =
  orderDetailSlice;
