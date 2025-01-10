import React, { useCallback, useEffect, useState, useMemo } from "react";
import classes from "./orderDetailPage.module.css";

import { orderDetailTableColumnsConfig } from "./orderDetailTableColumnsConfig";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetOrderDetailQuery } from "../../../services/orderDetailApiSlice";
import { Shipment } from "./shipment/Shipment";
import {OrderAddressPage} from "./orderAddress/OrderAddressPage"
import {CategoryPageSkeleton} from "../../../component//skeleton/CategoryPageSkeleton"

export const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.orderId;
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);

  const { data: orderDetails, isSuccess } = useGetOrderDetailQuery(orderId, {
    skip: !orderId,
  });

  const handleOpenModal = useCallback((rowData, action) => {
    // Implement your modal logic here
    console.log("Row Data: ", rowData, "Action: ", action);
  }, []);

  const shipments = useMemo(() => {
    if (isSuccess && orderDetails?.shipment_details) {
      return Object.entries(orderDetails.shipment_details).map(
        ([key, value], index) => ({
          id: index + 1, // Unique identifier
          shipmentKey: key, // Keep the original key for reference
          title: key, // Format key to make it more readable
          ...value, // Include all properties from the shipment object
        })
      );
    }
    return []; // Return an empty array if no data is available
  }, [isSuccess, orderDetails?.shipment_details]);

  useEffect(() => {
    setColumnDefs(
      orderDetailTableColumnsConfig["orderDetail"](handleOpenModal)
    );
  }, [dispatch, handleOpenModal, orderId]);
  console.log("orderDetail ", orderDetails);

  return isSuccess ? (
    <div className={classes.box}>
      {/* <div className={classes.box__address}> */}
        <OrderAddressPage address={orderDetails?.order_details}/>
      {/* </div> */}
      <div className={classes.box__order__detail}>
        {shipments.map((shipment) => (
          <Shipment key={shipment?.shipmentKey} shipment={shipment} />
        ))}
      </div>
    </div>
  ) : <CategoryPageSkeleton />;
};
