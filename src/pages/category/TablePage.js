import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Table } from "../../component/table/Table";
import { useDispatch } from "react-redux";
import { onActionOpen } from "../../store/actionModalSlice";
import { columnsConfig } from "./columnsDef";
import { downloadRequest } from "../../http-request/downloadFile";
import { toast } from "react-toastify";
import { onStockOpen } from "../../store/stockModalSlice";

export const TablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);

  const dispatch = useDispatch();

  const handleDownload = useCallback(
    async (rowData) => {
      try {
        toast.success("downloading...");
        const fileData = await downloadRequest({
          category,
          requestId: rowData.request_id,
        });
        console.log(category);
        const contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const blob = new Blob([fileData], { type: contentType });

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `mobiGarage_${rowData.request_id}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Error occurred during download:", err);
        toast.success("error while downloading");
      }
    },
    [category]
  );

  const handleOpenActionModal = useCallback(
    (rowData) => {
      dispatch(
        onActionOpen({
          category: category,
          lot_id: rowData.lot_id,
          request_id: rowData.request_id,
          original_price: rowData.original_price,
          discounted_price: rowData.discounted_price,
          rate_card: rowData.rate_card,
        })
      );
    },
    [category, dispatch]
  );

  const handleStockOpenActionModal = useCallback(
    (rowData) => {
      dispatch(
        onStockOpen({
          category: category,
          request_id: rowData.request_id,
          status: rowData.stock_status === "sold" ? "1" : "0",
        })
      );
    },
    [category, dispatch]
  );

  useEffect(() => {
    if (columnsConfig[category]) {
      setColumnDefs(
        columnsConfig[category](
          handleOpenActionModal,
          handleDownload,
          handleStockOpenActionModal
        )
      );
    }
  }, [
    category,
    handleDownload,
    handleOpenActionModal,
    handleStockOpenActionModal,
  ]);

  return <Table data={data} columns={columnDefs} />;
};
