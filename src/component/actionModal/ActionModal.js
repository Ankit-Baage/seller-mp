import React from "react";
import { motion } from "framer-motion";
import classes from "./actionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { onActionClose, selectActionModalState } from "../../store/actionModalSlice";
import {
  useDeleteRequestMutation,
} from "../../services/actionModalApiSlice";
import { toast } from "react-toastify";

export const ActionModal = () => {
  const { isOpen, modalData } = useSelector(selectActionModalState);
  const dispatch = useDispatch();
  const [deleteRequest, { error }] = useDeleteRequestMutation();
  console.log(modalData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = toast.loading("Please wait...");
    try {
      await deleteRequest({
        category: modalData?.category,
        request_id: modalData?.request_id,
      }).unwrap();
      toast.update(id, {
        render: `${modalData?.category} item deleted successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      dispatch(onActionClose());
    } catch (error) {
      toast.update(id, {
        render: `Error: ${error.data.detail}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(onActionClose());
  };

  return isOpen ? (
    <motion.div
      onClick={handleClose}
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className={classes.box__form}>
          <h5 className={classes.box__form__title}>
            Do you want to delete this?
          </h5>
          <div className={classes.form__group}>
            <input
              type="text"
              id={modalData?.category === "vrp" ? "lotId" : "requestId"}
              name={modalData?.category === "vrp" ? "lotId" : "requestId"}
              value={
                modalData?.category === "vrp"
                  ? modalData?.lot_id
                  : modalData?.request_id
              }
              className={classes.form__field}
              disabled
            />
            <label
              htmlFor={modalData?.category === "vrp" ? "lotId" : "requestId"}
              className={classes.form__label}
            >
              {modalData?.category === "vrp" ? "lot Id" : "Request Id"}
            </label>
          </div>
          <div className={classes.form__group}>
            <input
              type="text"
              id="originalPrice"
              name="originalPrice"
              value={modalData?.original_price}
              className={classes.form__field}
              disabled
            />
            <label htmlFor="originalPrice" className={classes.form__label}>
              original Price
            </label>
          </div>
          <div className={classes.form__group}>
            <input
              type="text"
              id="discountedPrice"
              name="discountedPrice"
              value={
                modalData?.category === "vrp"
                  ? modalData?.rate_card
                  : modalData?.discounted_price
              }
              className={classes.form__field}
              disabled
            />
            <label htmlFor="discountedPrice" className={classes.form__label}>
              Discounted Price
            </label>
          </div>
          <div className={classes.buttonGroup}>
            <button type="submit" className={classes.form__btn}>
              Delete
            </button>
            <button type="button" className={classes.form__btn}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  ) : null;
};
