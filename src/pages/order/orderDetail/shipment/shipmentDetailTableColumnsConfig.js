import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const shipmentDetailTableColumnsConfig = {
  shipmentDetail: (handleOpenModal, handleOrderDetails, hasVrp) => [
    columnHelper.accessor(hasVrp ? "lot_id" : "item", {
      header: hasVrp ? "Lot Id" : "Item Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <div
          style={{
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "12px",
            color: "#FFFFFF",
            background: "#FF6F3F",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {info.getValue()}
        </div>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("qty", {
      header: "Qty",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("price", {
      header: "Total Amt",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "actions",
      header: <div style={{ textAlign: "center" }}>Action</div>,
      cell: (props) => (
        <div
          style={{
            display: "flex",
            columnGap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <button
            style={{
              color: "#C6C6C6",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 400,
              fontFamily: "Poppins, sans",
              padding: "7px 8px",
              borderRadius: "4px",
              border: "1px solid #C6C6C6",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
            }}
            onClick={() => handleOrderDetails(props.row.original.id)}
          >
            View Details
          </button>
          <button
            style={{
              color: "#FFFF",
              fontSize: "12px",
              lineHeight: "12px",
              fontWeight: 400,
              fontFamily: "Poppins, sans",
              padding: "7px 8px",
              borderRadius: "4px",
              backgroundColor: "#46CD80",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(props.row.original)}
          >
            Download Invoice
          </button> */}
        </div>
      ),
    }),
  ],
};
