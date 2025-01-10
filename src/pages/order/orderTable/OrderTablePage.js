import React, { useCallback, useEffect, useState } from "react";

import { orderTableColumnsConfig } from "./orderTableColumnsConfig";
import { useDispatch } from "react-redux";

import { Table } from "../../../component/table/Table";
import { useNavigate } from "react-router-dom";

export const OrderTablePage = ({ data }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = useCallback((rowData, action) => {
    // Implement your modal logic here
    console.log("Row Data: ", rowData, "Action: ", action);
  }, []);

  const handleOrderDetails = useCallback(
    (orderId) => {
      // dispatch(setOrderId({ order_id: rowId }));
      console.log("details", orderId);
      navigate(`${orderId}`);
    },
    [navigate]
  );

  useEffect(() => {
    setColumnDefs(orderTableColumnsConfig["order"](handleOpenModal, handleOrderDetails));
  }, [handleOpenModal, handleOrderDetails]);


  return <Table data={data} columns={columnDefs} />;
};
