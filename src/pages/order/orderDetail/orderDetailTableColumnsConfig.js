import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const orderDetailTableColumnsConfig = {
  orderDetail: (handleOpenModal, handleOrderDetails) => [
    columnHelper.accessor("order_id", {
      header: "Order Id",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("total_amount", {
      header: "Total Amt",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("num_of_items", {
      header: "No. of Items",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("area", {
      header: "Area",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("ordered_on", {
      header: "Date",
      cell: (info) => {
        const timestamp = info.getValue();
        const date = new Date(timestamp * 1000);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);

        return `${day}/${month}/${year}`;
      },
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
          <button
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
          </button>
        </div>
      ),
    }),
  ],
};
