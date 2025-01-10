import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { OrderSubTable } from "../orderSubTable/OrderSubTable";
import classes from "./nestedTable.module.css";

export const NestedTable = ({ data, columns, expandedRow }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classes.box}>
      <div className={classes.box__table}>
        <table className={classes.box__modelTable}>
          <thead className={classes.box__modelTable__head}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={classes.box__modelTable__head__row}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={classes.box__modelTable__head__row__cell}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classes.box__modelTable__body}>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Main Row */}
                  <tr
                    style={{
                      textAlign: "center",
                      position: "relative",
                      borderBottom: "1.5px solid #EFEFEF",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={classes.box__modelTable__body__row__data}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>

                  {/* Expanded Row with Smooth Animation */}
                  <AnimatePresence>
                    {expandedRow === row.original.id && (
                      <motion.tr
                        initial={{ maxHeight: "0px", opacity: 0 }}
                        animate={{ maxHeight: "200px", opacity: 1 }}
                        exit={{ maxHeight: "0px", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                          overflow: "hidden",
                          background: "#f9f9f9",
                        }}
                      >
                        <td
                          colSpan={columns.length}
                          className={classes.box__modelTable__body__row__expanded}
                          style={{
                            padding: "10px",
                          }}
                        >
                          {/* Pass the row data to OrderSubTable */}
                          <OrderSubTable data={row.original} />
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <tr style={{ textAlign: "center" }}>
                <td
                  colSpan={columns.length}
                  className={classes.box__modelTable__body__row__data__empty}
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
