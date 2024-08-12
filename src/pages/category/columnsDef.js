import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const columnsConfig = {
  vrp: (handleOpenActionModal, handleDownload, handleStockOpenActionModal) => [
    columnHelper.accessor("lot_id", {
      header: "Lot Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("apple_percentage", {
      header: "Apple %",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
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
            onClick={() => handleStockOpenActionModal(props.row.original)}
          >
            {props.row.original.stock_status === "sold" ? "Sold" : "In Stock"}
          </button>
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
            onClick={() => handleOpenActionModal(props.row.original)}
          >
            {props.row.original.status === "deactivated" ? "Deleted" : "Delete"}
          </button>
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
            onClick={() => handleDownload(props.row.original)}
          >
            Download
          </button>
        </div>
      ),
    }),
  ],
  spares: (handleOpenActionModal, handleDownload) => [
    columnHelper.accessor("request_id", {
      header: "Request Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
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
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={props.row.original.status === "deactivated"}
            onClick={() => handleOpenActionModal(props.row.original)}
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
            // onClick={() => onDownload(props.row.original)}
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
            onClick={() => handleDownload(props.row.original)}
          >
            Download
          </button>
        </div>
      ),
    }),
  ],
  new_phones: (handleOpenActionModal, handleDownload) => [
    columnHelper.accessor("request_id", {
      header: "Request Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
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
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={props.row.original.status === "deactivated"}
            onClick={() => handleOpenActionModal(props.row.original)}
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
            onClick={() => handleDownload(props.row.original)}
          >
            Download
          </button>
        </div>
      ),
    }),
  ],
  open_box: (handleOpenActionModal, handleDownload) => [
    columnHelper.accessor("request_id", {
      header: "Request Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
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
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={props.row.original.status === "deactivated"}
            onClick={() => handleOpenActionModal(props.row.original)}
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
            onClick={() => handleDownload(props.row.original)}
          >
            Download
          </button>
        </div>
      ),
    }),
  ],
};
