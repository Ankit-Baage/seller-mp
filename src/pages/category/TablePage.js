import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Table } from "../../component/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { columnsConfig } from "./columnsDef";
import { downloadRequest } from "../../http-request/downloadFile";
import { toast } from "react-toastify";
import {
  onStockClose,
  onStockOpen,
  selectStockModalState,
} from "../../store/stockModalSlice";
import {
  onModalClose,
  onModalOpen,
  selectModalState,
} from "../../store/modalSlice";
import { Backdrop } from "../../component/backdrop/Backdrop";
import { AnimatePresence } from "framer-motion";
import classes from "./tablePage.module.css";
import { DynamicForm } from "../../component/dynamicForm/DynamicForm";
import { useDeleteRequestMutation } from "../../services/actionModalApiSlice";
import {
  closeBackdrop,
  openBackdrop,
  selectBackdropState,
} from "../../store/backdropSlice";
import { useUpdateStockMutation } from "../../services/stockModalApiSlice";

export const TablePage = ({ data }) => {
  const { category } = useParams();
  const [columnDefs, setColumnDefs] = useState([]);
  const { isModalOpen, modalData } = useSelector(selectModalState);
  const { isStockOpen, stockModalData } = useSelector(selectStockModalState);
  const isBackdropOpen = useSelector(selectBackdropState);

  const [deleteRequest, { error }] = useDeleteRequestMutation();
  const [stockRequest, { error: stockError }] = useUpdateStockMutation();

  const dispatch = useDispatch();
  const modalConfig = [
    {
      id: modalData?.category === "vrp" ? "lotId" : "requestId",
      type: "text",
      defaultValue:
        modalData?.category === "vrp"
          ? modalData?.lot_id
          : modalData?.request_id,
      label: modalData?.category === "vrp" ? "lot Id" : "Request Id",
      placeholder: modalData?.category === "vrp" ? "lotId" : "requestId",
      disabled: true,
    },
    {
      id: "originalPrice",
      type: "text",
      defaultValue: modalData?.original_price,
      label: "original Price",
      placeholder: "original Price",
      disabled: true,
    },
    {
      id: "discountedPrice",
      type: "text",
      defaultValue:
        modalData?.category === "vrp"
          ? modalData?.rate_card
          : modalData?.discounted_price,
      label: "Discounted Price",
      placeholder: "Discounted Price",
      disabled: true,
    },
  ];
  const stockConfig = [
    {
      id: stockModalData?.category === "vrp" ? "lotId" : "requestId",
      type: "text",
      defaultValue:
        stockModalData?.category === "vrp"
          ? stockModalData?.lot_id
          : stockModalData?.request_id,
      label: stockModalData?.category === "vrp" ? "lot Id" : "Request Id",
      placeholder: stockModalData?.category === "vrp" ? "lotId" : "requestId",
      disabled: true,
    },
    {
      id: "status",
      type: "text",
      defaultValue: stockModalData?.status,
      label: "Status",
      placeholder: "Status",
      disabled: true,
    },
  ];

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
      dispatch(openBackdrop());
      const modalData = {
        category,
        ...rowData,
      };
      dispatch(onModalOpen({ modalData }));
      console.log("modal", modalData);
    },
    [category, dispatch]
  );
  const handleDelete = async () => {
    const id = toast.loading("Deleting...");
    try {
      const response = await deleteRequest({
        category: modalData?.category,
        request_id: modalData?.request_id,
      }).unwrap();
      toast.update(id, {
        render: response.message.displayMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(id, {
        render: error.message.displayMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.log(error);
    } finally {
      dispatch(closeBackdrop());
      dispatch(onModalClose());
    }
  };
  const handleCloseModal = useCallback(() => {
    dispatch(closeBackdrop());
    dispatch(onModalClose());
    dispatch(onStockClose());
  }, [dispatch]);

  console.log("modalData", modalData);

  const handleStockOpenModal = useCallback(
    (rowData) => {
      dispatch(openBackdrop());
      const stockModalData = {
        category,
        ...rowData,
        status: rowData.stock_status === "sold" ? "1" : "0",
      };
      dispatch(onStockOpen({ stockModalData }));
      console.log("stockModalData", stockModalData);
    },
    [category, dispatch]
  );
  const handleChangeStockStatus = async () => {
    const id = toast.loading("Please wait...");
    try {
      const response = await stockRequest({
        category: stockModalData?.category,
        request_id: stockModalData?.request_id,
        status: stockModalData?.status,
      }).unwrap();
      toast.update(id, {
        render: response.message.displayMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(id, {
        render: error.message.displayMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.log(error);
    } finally {
      dispatch(closeBackdrop());
      dispatch(onStockClose());
    }
  };
  const handleStockCloseModal = useCallback(() => {
    dispatch(closeBackdrop());
    dispatch(onStockClose());
  }, [dispatch]);

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
  }, [category, handleOpenModal, handleStockOpenModal, handleDownload]);

  return (
    <>
      <AnimatePresence>
        {isBackdropOpen && (
          <Backdrop onClose={handleCloseModal}>
            {isModalOpen && (
              <div className={classes.box}>
                <h1 className={classes.box__title}>
                  Do you want to delete this?
                </h1>
                <DynamicForm
                  config={modalConfig}
                  primaryButtonLabel="Delete"
                  secondaryButtonLabel="Cancel"
                  onClose={handleCloseModal}
                  onSubmit={handleDelete}
                />
              </div>
            )}
            {isStockOpen && (
              <div className={classes.box}>
                <h1 className={classes.box__title}>
                  Do you want to change the status?
                </h1>
                <DynamicForm
                  config={stockConfig}
                  primaryButtonLabel="Change Status"
                  secondaryButtonLabel="Cancel"
                  onClose={handleStockCloseModal}
                  onSubmit={handleChangeStockStatus}
                />
              </div>
            )}
          </Backdrop>
        )}
      </AnimatePresence>

      <Table data={data} columns={columnDefs} />
    </>
  );
};
