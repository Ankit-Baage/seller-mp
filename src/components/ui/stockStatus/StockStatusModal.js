import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./stockStatus.module.css";

export const StockStatusModal = ({ data, onConfirm, onCancel, open }) => {
  console.log(data)
  let content = data.stock_status==="sold"? "In Stock": "sold"
  const handleCancelDelete = () => {
    onCancel();
  };
  const handleConfirmDelete = () => {
    onConfirm();
  };
  return (
    <>
      <div className={classes.backdrop} onClick={handleCancelDelete} />

      <motion.dialog
        className={classes.dialog}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        // open={open}
      >
        <h5 className={classes.title}>You Are Going To Change The Status</h5>
        <div className={classes.btns}>
          To
          <button className={classes.form__btn} onClick={handleConfirmDelete}>
          {content}
          </button>
          {/* <button
            className={classes.form__btn__cancel}
            onClick={handleCancelDelete}
          >
            Cancel
          </button> */}
        </div>
      </motion.dialog>
    </>
  );
};
