import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Table } from "../../component/table/Table";
import { useDispatch } from "react-redux";
import { columnsConfig } from "./columnsDef";
import { downloadRequest } from "../../http-request/downloadFile";
import { toast } from "react-toastify";

import { openModal } from "../../store/modalSlice";


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


  const handleOpenModal = useCallback(
    (rowData) => {
      dispatch(
        openModal({
          component: "DynamicForm",
          uiData: {
            heading: "Do you want to delete this record?",
            primaryButtonLabel: "Delete",
            secondaryButtonLabel: "Cancel",
          },
          configData: {
            category,
            ...rowData, 
          },
          operationType: "delete",
        })
      );
    },
    [category, dispatch]
  );
  const handleStockOpenModal = useCallback(
    (rowData) => {
      dispatch(
        openModal({
          component: "DynamicForm",
          uiData: {
            heading: "Do you want to Change the status?",
            primaryButtonLabel: "Change Status",
            secondaryButtonLabel: "Cancel",
          },
          configData: {
            category,
            ...rowData, 
          },
          operationType: "update",
        })
      );
    },
    [category, dispatch]
  );

  useEffect(() => {
    if (columnsConfig[category]) {
      setColumnDefs(
        columnsConfig[category](
          handleOpenModal,
          handleStockOpenModal,
          handleDownload
        )
      );
    }
  }, [category, handleOpenModal, handleDownload, handleStockOpenModal]);
  return <Table data={data} columns={columnDefs} />;
};

