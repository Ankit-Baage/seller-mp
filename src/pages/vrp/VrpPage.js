import React, { useState } from "react";
import useGetVrp from "../../tanstack-query/vrp/useGetVrp";
import { BasicTable } from "../../components/table/BasicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vrpTableDataDeleteRequest } from "../../utils/https-request/vrp/vrpTableDataDeleteRequest";
import { FileUploadInput } from "../../components/fileUploadInput/FileUploadInput";
import { uploadImageRequest } from "../../utils/https-request/vrp/uploadImage";
import classes from "./vrpPage.module.css";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "../../store/toaster/toasterActions";
import { ConfirmationModal } from "../../components/ui/confiramationModal/ConfirmationModal";
import { vrpDownloadRequest } from "../../utils/https-request/vrp/vrpDownloadRequest";
import { StockStatusModal } from "../../components/ui/stockStatus/StockStatusModal";
import { vrpLotStockStatusRequest } from "../../utils/https-request/vrp/vrpLotstatusrequest";

export const VrpPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [openConfirmationModal, setConfirmationModal] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [openLotStatusModal, setOpenLotStatusModal] = useState(false);
  const { data, isError, isLoading, isSuccess } = useGetVrp();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const deleteRowMutation = useMutation({
    mutationFn: vrpTableDataDeleteRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vrp"] });
      console.log(response);
      dispatch(
        showToastWithTimeout(response.data.message.displayMessage, "#00A167")
      );
    },
    onError: (error) => {
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: vrpLotStockStatusRequest,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["vrp"] });
      console.log(response);
      dispatch(
        showToastWithTimeout(response.data.message.displayMessage, "#00A167")
      );
    },
    onError: (error) => {
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    },
  });

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const response = await uploadImageRequest(selectedFile);

      dispatch(
        showToastWithTimeout(response.data.message.displayMessage, "#00A167")
      );
    } catch (error) {
      if (error.response && error.response.data.message.displayMessage) {
        dispatch(
          showToastWithTimeout(
            `Error: ${error.response.data.message.displayMessage}`,
            "#D32F2F"
          )
        );
      } else {
        dispatch(
          showToastWithTimeout(
            "File size exceeds the maximum limit. Please upload a smaller file.",
            "#D32F2F"
          )
        );
      }
    } finally {
      event.target.value = null;
    }
  };

  const handleDownloadSample = async () => {
    const downloadUrl =
      "https://mgstorageaccount.blob.core.windows.net/mgbucket/mg_template_vrp_file.xlsx";
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.target = "_blank";
    anchor.download = "mg_template_vrp_file.xlsx";

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const onDownload = async (rowData) => {
    try {
      const fileData = await vrpDownloadRequest({
        requestId: rowData.request_id,
      });
      dispatch(showToastWithTimeout("Downloading...", "#00A167"));
      const contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const blob = new Blob([fileData], { type: contentType });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `mobiGarage_${rowData.request_id}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      dispatch(showToastWithTimeout("Something went wrong", "#D32F2F"));
    }
  };

  const handleStockStatusChange = (rowData) => {
    const status = rowData.stock_status === "sold" ? "1" : "0";
    setShowStatus({ requestId: rowData.request_id, status: status });
  };

  const handleCancelStockStatusChange = () => {
    setShowStatus(null);
    setOpenLotStatusModal(false);
  };

  const handleStockStatusChangeConfirm = async () => {
    console.log(showStatus);
    await changeStatusMutation.mutateAsync({
      requestId: showStatus.requestId,
      status: showStatus.status,
    });
    setShowStatus(null);
    setOpenLotStatusModal(false);
  };

  const handleDelete = (rowData) => {
    if (rowData.status === "deactivated") {
      return;
    }
    setShowConfirmation(rowData.request_id);
  };

  const handleConfirmDelete = () => {
    const requestId = showConfirmation;
    console.log("Deleting row:", requestId);
    deleteRowMutation.mutateAsync(requestId);
    setShowConfirmation(null);
    setConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(null);
    setConfirmationModal(false);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("lot_id", {
      header: "Lot Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    // Accessor Column
    // columnHelper.accessor("5g_percentage", {
    //   header: "5g %",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    columnHelper.accessor("apple_percentage", {
      header: "Apple %",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    // columnHelper.accessor("p4_percentage", {
    //   header: "P4 %",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    // columnHelper.accessor("original_price", {
    //   header: "Original Price",
    //   cell: (info) => formatNumber(info.getValue()),
    //   footer: (props) => props.column.id,
    // }),
    // Accessor Column
    // columnHelper.accessor("discount_percentage", {
    //   header: "Discount %",
    //   cell: (info) => info.getValue(),
    //   footer: (props) => props.column.id,
    // }),
    columnHelper.accessor("ASP", {
      header: "ASP",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("total_phones", {
      header: "Total Phones",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    // columnHelper.accessor("rate_card", {
    //   header: "Rate Card",
    //   cell: (info) => formatNumber(info.getValue()),
    //   footer: (props) => props.column.id,
    // }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("remarks", {
      header: "Remarks",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor("approval_status", {
      header: "Approval Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),

    columnHelper.display({
      id: "stock_status",
      header: <div style={{ textAlign: "center" }}>Stock Status</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => handleStockStatusChange(props.row.original)}
            disabled={props.row.original.status === "deactivated"}
            style={{
              width: "fit-content",
              color: "#FFFFFF",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              backgroundColor:
                props.row.original.status === "deactivated"
                  ? props.row.original.stock_status === "sold"
                    ? "#FFD4C5"
                    : "#C8FACD" // Lighter green
                  : props.row.original.stock_status === "sold"
                  ? "#FF6F3F"
                  : "#00A167",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor:
                props.row.original.status === "deactivated"
                  ? "default"
                  : "pointer",
            }}
          >
            {props.row.original.stock_status === "sold" ? "Sold" : "In Stock"}
          </button>
          <AnimatePresence>
            {showStatus &&
              showStatus.requestId === props.row.original.request_id && (
                <StockStatusModal
                  key={props.row.original.request_id}
                  data={props.row.original}
                  onConfirm={handleStockStatusChangeConfirm}
                  onCancel={handleCancelStockStatusChange}
                  open={setOpenLotStatusModal}
                  // onOpenChange={setOpen}
                />
              )}
          </AnimatePresence>
        </div>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={props.row.original.status === "deactivated"}
            onClick={() => handleDelete(props.row.original)}
            style={{
              width: "fit-content",
              color: "#FFFFFF",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              backgroundColor:
                props.row.original.status === "deactivated"
                  ? "#FFD4C5"
                  : "#FF6F3F",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor:
                props.row.original.status === "deactivated"
                  ? "default"
                  : "pointer",
            }}
          >
            {props.row.original.status === "deactivated" ? "Deleted" : "Delete"}
          </button>
          <AnimatePresence>
            {showConfirmation === props.row.original.request_id && (
              <ConfirmationModal
                key={props.row.original.request_id}
                data={props.row.original}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                open={ConfirmationModal}
                // onOpenChange={setOpen}
              />
            )}
          </AnimatePresence>
        </div>
      ),
    }),
    columnHelper.display({
      id: "download",
      header: <div style={{ textAlign: "center" }}>Download</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={
              props.row.original.approval_status === "pending for status"
            }
            onClick={() => onDownload(props.row.original)}
            style={{
              width: "76px",
              color: "#FFFFFF",
              backgroundColor: "#46CD80",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 500,
              fontFamily: "Poppins, sans",
              borderRadius: "4px",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Download
          </button>
        </div>
      ),
    }),
  ];

  return isSuccess && data.data.data ? (
    <div className={classes.box}>
      <div className={classes.box__btn}>
        <FileUploadInput id="image_url" onChange={(e) => handleFileChange(e)} />
        <button
          className={classes.box__details__download}
          onClick={handleDownloadSample}
        >
          <span className={classes.box__details__download__img}></span>
          Download Template
        </button>
      </div>

      <BasicTable tableData={data.data.data} tableColumns={columns} />
    </div>
  ) : null;
};
