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
    if (orderId && shipment_id && status) {
      const loadingToast = toast.loading("Updating status...");
      try {
        const result = await updateShipmentStatus({
          orderId,
          id: shipment_id,
          status,
        }).unwrap();
        toast.update(loadingToast, {
          render:
            result.message.displayMessage ||
            "Shipment status updated successfully!", // Use response message or fallback
          type: "success",
          isLoading: false,
        });
      } catch (error) {
        toast.update(loadingToast, {
          render: error?.message.displayMessage || "Failed to update shipment status. Please try again.",
          type: "error",
          isLoading: false,
        });
        console.log(error);
      }
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
