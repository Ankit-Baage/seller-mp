import React, { useEffect, useState } from "react";
import classes from "./shipment.module.css";
import { CustomSelect } from "../../../../component/experiment/customSelect/CustomSelect";
import { shipmentDetailTableColumnsConfig } from "./shipmentDetailTableColumnsConfig";
import { Table } from "../../../../component/table/Table";

const optionData = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Rejected" },
];

export const Shipment = ({ shipment }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs(shipmentDetailTableColumnsConfig["shipmentDetail"]);
  }, []);

  console.log("shipmentDetails", shipment);
  return (
    <div className={classes.box}>
      <div className={classes.box__shipment}>
        <div className={classes.box__shipment__left}>
          <h1 className={classes.box__shipment__head}>{shipment?.title}</h1>
          <CustomSelect label="Approval Status" optionData={optionData} />
        </div>
        <div className={classes.box__shipment__btns}>
          <button className={classes.box__shipment__download}>
            Download Invoice
          </button>
        </div>
      </div>
      <input
        type="checkbox"
        id="shipment"
        className={classes.box__shipment__input}
      />
      <label htmlFor="shipment" className={classes.box_shipment__label}></label>
      <div className={classes.box__shipment__table}>
        <Table data={shipment?.items} columns={columnDefs} />
      </div>
    </div>
  );
};
