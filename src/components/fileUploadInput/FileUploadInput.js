import React from "react";
import classes from "./fileUploadInput.module.css";

export const FileUploadInput = ({ id, onChange }) => (
  <div className={classes.form__group__upload}>
    <label htmlFor={id} className={classes.form__field__upload__label}>
      <span className={classes.form__field__upload__label__img} />
      <h5 className={classes.form__field__upload__label__text}>Upload File</h5>
      <input
        type="file"
        id={id}
        className={classes.form__field__upload}
        onChange={onChange}
      />
    </label>
  </div>
);
