import React from "react";
import classes from "./fileUploadInput.module.css";

export const FileUploadInput = ({ 
  id, 
  onChange, 
  label = "Upload File" // Default label for better flexibility
}) => {
  return (
    <div className={classes.box}>
      <label htmlFor={id} className={classes.box__label}>
        <span className={classes.upload__icon} />
        <h5 className={classes.box__text}>{label}</h5>
        <input
          type="file"
          id={id}
          className={classes.box__upload}
          onChange={onChange}
          aria-label={label} // Accessibility improvement
        />
      </label>
    </div>
  );
};
