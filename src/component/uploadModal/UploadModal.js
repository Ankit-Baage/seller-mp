import React from "react";
import classes from "./uploadModal.module.css";

export const UploadModal = ({ message }) => {
  return (
    <div className={classes.box}>
      <h2 className={classes.box__title}>{message}</h2>
      <div className={classes.box__bar}>
        <h2 className={classes.box__bar__title}>uploading</h2>
        <div className={classes.box__bar__animate}>
          <div className={classes.box__bar__animation}></div>
        </div>
      </div>
    </div>
  );
};
