import React from "react";
import classes from "./uploadBackDrop.module.css";

export const UploadBackDrop = ({message}) => {
  return (
    <div className={classes.backDrop}>
      <div className={classes.box}>
        <h2 className={classes.box__title}>{message}</h2>
        <div className={classes.box__bar}>
          <h2 className={classes.box__bar__title}>uploading</h2>
          <div className={classes.box__bar__animate}>
            <div className={classes.box__bar__animation}></div>
          </div>
        </div>
      </div>
    </div>
  ) 
};
