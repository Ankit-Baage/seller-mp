import React from "react";
import classes from "./fileUploadInput.module.css";

export const FileUploadInput = ({ id, onChange }) => (
  <div className={classes.box}>
    <label htmlFor={id} className={classes.box__label}>
      <span className={classes.box__img} />
      <h5 className={classes.box__text}>Upload File</h5>
      <input
        type="file"
        id={id}
        className={classes.box__upload}
        onChange={onChange}
      />
    </label>
  </div>
);