import React, { useCallback, useEffect, useState } from "react";
import classes from "./orderDetailPage.module.css";

import { orderDetailTableColumnsConfig } from "./orderDetailTableColumnsConfig";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetOrderDetailQuery } from "../../../services/orderDetailApiSlice";
import { dateFormatter } from "../../../utils/dateFormatter";

export const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.orderId;
  const dispatch = useDispatch();
  const [columnDefs, setColumnDefs] = useState([]);

  const { data: orderDetail } = useGetOrderDetailQuery(orderId, {
    skip: !orderId,
  });

  const handleOpenModal = useCallback((rowData, action) => {
    // Implement your modal logic here
    console.log("Row Data: ", rowData, "Action: ", action);
  }, []);

  useEffect(() => {
    // if (orderId) {
    //   dispatch(setOrderId({ order_id: orderId }));
    // }
    setColumnDefs(
      orderDetailTableColumnsConfig["orderDetail"](handleOpenModal)
    );
  }, [dispatch, handleOpenModal, orderId]);
  console.log("orderDetail ", orderDetail);

  return (
    <div className={classes.box}>
     Ankit
      
    </div>
  );
};
