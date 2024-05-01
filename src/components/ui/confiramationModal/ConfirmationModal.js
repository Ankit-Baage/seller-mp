import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./confirmationModal.module.css";

export const ConfirmationModal = ({ data, onConfirm, onCancel, open }) => {
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
        open={open}
      >
        <h5 className={classes.title}>Do you want to delete ?</h5>
        <div className={classes.form}>
          <div className={classes.form__controls}>
            <div className={classes.form__group}>
              <input
                type="text"
                id="lotId"
                className={classes.form__field}
                placeholder="Request Id"
                value={data.lot_id}
                disabled
              />
              <label htmlFor="lotId" className={classes.form__label}>
                Lot Id
              </label>
            </div>
            <div className={classes.form__group}>
              <input
                type="text"
                id="originalPrice"
                className={classes.form__field}
                placeholder="Original price"
                value={data.original_price}
                disabled
              />
              <label htmlFor="originalPrice" className={classes.form__label}>
                Original Price
              </label>
            </div>
            <div className={classes.form__group}>
              <input
                type="text"
                id="discountedPrice"
                className={classes.form__field}
                placeholder="Discounted Price"
                value={data.rate_card}
                disabled
              />
              <label htmlFor="discountedPrice" className={classes.form__label}>
                Discounted Price
              </label>
            </div>
          </div>
          <div className={classes.btns}>
            <button className={classes.form__btn} onClick={handleConfirmDelete}>
              Confirm
            </button>
            <button
              className={classes.form__btn__cancel}
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.dialog>
    </>
  );
};
