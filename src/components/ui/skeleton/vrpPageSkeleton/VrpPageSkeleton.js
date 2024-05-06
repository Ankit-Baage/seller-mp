import React from "react";
import { SelectSkeleton } from "../selectSkeleton/SelectSkeleton";
import { TableSkeleton } from "../tableSkeleton/TableSkeleton";
import classes from "./vrpPageSkeleton.module.css";

export const VrpPageSkeleton = () => {
  return (
    <div className={classes.box}>
      <div className={classes.select}>
        <SelectSkeleton />
        <SelectSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
};
