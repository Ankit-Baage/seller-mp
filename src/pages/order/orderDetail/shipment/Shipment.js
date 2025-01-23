import React, { useEffect, useState } from "react";
import classes from "./shipment.module.css";
import { CustomSelect } from "../../../../component/customSelect/CustomSelect";
import { shipmentDetailTableColumnsConfig } from "./shipmentDetailTableColumnsConfig";
import { Table } from "../../../../component/table/Table";


const optionData = [
  { id: "0", label: "Pending" },
  { id: "1", label: "In Process" },
];

export const Shipment = ({ shipment, onChange }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  const handleChange = (id) => {
    console.log(id);
    onChange({shipment_id:shipment.shipment_id, status:id})
    // console.log(shipment.shipment_id);
  };

  useEffect(() => {
    // Ensure shipment.category is available before checking if it's "VRP"
    if (shipment?.category) {
      const hasVrp = shipment.category === "VRP";
      // Correctly call the function that updates the column definitions
      setColumnDefs(
        shipmentDetailTableColumnsConfig.shipmentDetail(null, null, hasVrp)
      );
    }
  }, [shipment?.category]);

  console.log("shipmentDetails", shipment);
  return (
    <div className={classes.box}>
      <div className={classes.box__shipment}>
        <div className={classes.box__shipment__left}>
          <h1 className={classes.box__shipment__head}>{shipment?.title}</h1>
          <CustomSelect
            label="Change Status"
            optionData={optionData}
            onChange={(id) => handleChange(id)}
            selectOptionId={shipment.status_id}
          />
        </div>
        <div className={classes.box__shipment__btns}>
          <button className={classes.box__shipment__download}>
            Download Invoice
          </button>
        </div>
      </div>
      <input
        type="checkbox"
        id={shipment.id}
        className={classes.box__shipment__input}
      />
      <label
        htmlFor={shipment.id}
        className={classes.box_shipment__label}
      ></label>
      <div className={classes.box__shipment__table}>
        <Table data={shipment?.items} columns={columnDefs} />
      </div>
    </div>
  );
};
