import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  onStockClose,
  selectStockModalState,
} from "../../store/stockModalSlice";
import classes from "./stockModal.module.css";
import { useUpdateStockMutation } from "../../services/stockModalApiSlice";
import { toast } from "react-toastify";

export const StockModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalData } = useSelector(selectStockModalState);
  const [stockRequest, { error }] = useUpdateStockMutation();

  const handleClose = () => {
    dispatch(onStockClose());
  };
  const handleConfirm = async (event) => {
    event.preventDefault();
    const id = toast.loading("Please wait...");
    try {
      await stockRequest({
        category: modalData?.category,
        request_id: modalData?.request_id,
        status: modalData?.status,
      }).unwrap();
      toast.update(id, {
        render: `${modalData?.category} status changed successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      dispatch(onStockClose());
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

  return isOpen ? (
    <div className={classes.backdrop} onClick={handleClose}>
      <motion.div
        className={classes.box}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <h5 className={classes.box__title}>
          You Are Going To Change The Status
        </h5>
        <div className={classes.box__btns}>
          <button
            className={classes.box__btns__confirm}
            onClick={handleConfirm}
          >
            {modalData.status === "1" ? "In-Stock" : "Sold"}
          </button>
        </div>
      </motion.div>
    </div>
  ) : null;
};
