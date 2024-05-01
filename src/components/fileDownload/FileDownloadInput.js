import React from "react";
import classes from "./fileDownloadInput.module.css";

export const FileDownloadInput = ({ id, onChange }) => (
  <div className={classes.form__group__upload}>
    <label htmlFor={id} className={classes.form__field__upload__label}>
      <span className={classes.form__field__upload__label__img} />
      <h5 className={classes.form__field__upload__label__text}>Download Sample</h5>
      <input
        type="button"
        id={id}
        className={classes.form__field__upload}
        onChange={onChange}
      />
    </label>
  </div>
);
