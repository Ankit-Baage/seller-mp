import React, { useCallback, useEffect, useState, useMemo } from "react";
import classes from "./orderDetailPage.module.css";

import { orderDetailTableColumnsConfig } from "./orderDetailTableColumnsConfig";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  useGetOrderDetailQuery,
  useUpdateShipmentStatusMutation,
} from "../../../services/orderDetailApiSlice";
import { Shipment } from "./shipment/Shipment";
import { OrderAddressPage } from "./orderAddress/OrderAddressPage";
import { CategoryPageSkeleton } from "../../../component//skeleton/CategoryPageSkeleton";
import { toast } from "react-toastify";

export const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.orderId;
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);

  const { data, isSuccess } = useGetOrderDetailQuery(orderId, {
    skip: !orderId,
  });

  const [
    updateShipmentStatus,
    { isLoading: isUpdatingStatus, isSuccess: isStatusUpdated },
  ] = useUpdateShipmentStatusMutation();

  const handleOpenModal = useCallback((rowData, action) => {
    // Implement your modal logic here
    console.log("Row Data: ", rowData, "Action: ", action);
  }, []);

  const handleStatusChange = async ({ shipment_id, status }) => {
    if (!orderId || !shipment_id || !status) {
      toast.error("Missing required parameters to update shipment status.");
      return;
    }
  
    const loadingToast = toast.loading("Updating status...");
  
    try {
      // Perform the API call
      const result = await updateShipmentStatus({
        orderId,
        id: shipment_id,
        status,
      }).unwrap();
  
      // Close the loading toast and show success message
      toast.update(loadingToast, {
        render:
          result?.message?.displayMessage || "Shipment status updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000, // Automatically close after 2 seconds
      });
    } catch (error) {
      // Close the loading toast and show error message
      toast.update(loadingToast, {
        render:
          error?.message?.displayMessage || "Failed to update shipment status. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2000, // Automatically close after 2 seconds
      });
      console.error(error);
    }
  };

  useEffect(() => {
    setColumnDefs(
      orderDetailTableColumnsConfig["orderDetail"](handleOpenModal)
    );
  }, [dispatch, handleOpenModal, orderId]);
  console.log("shipments ", data);

  return isSuccess ? (
    <div className={classes.box}>
      {/* <div className={classes.box__address}> */}
      <OrderAddressPage address={data?.orderDetails} />
      {/* </div> */}
      <div className={classes.box__order__detail}>
        {data.shipmentDetails.map((shipment) => (
          <Shipment
            key={shipment?.shipmentKey}
            shipment={shipment}
            onChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
