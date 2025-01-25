import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { closeModal } from "../../store/modalSlice";
import { DynamicForm } from "../../component/dynamicForm/DynamicForm"; // Import component
import { useDeleteRequestMutation } from "../../services/modalApiSlice";
import { useUpdateStockMutation } from "../../services/stockModalApiSlice";
import {  UploadModal } from "../uploadModal/UploadModal";
import classes from "./modal.module.css";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, component, uiData, configData, operationType } = useSelector(
    (state) => state.modal
  );
  const [deleteRequest, { error }] = useDeleteRequestMutation();
  const [stockUpdateRequest, { error: stockError }] = useUpdateStockMutation();

  // Dynamically generate modal configuration
  const modalConfig = useMemo(() => {
    if (!configData || !operationType) return [];

    if (operationType === "delete") {
      // Configuration for delete operation
      return [
        {
          id: configData.category === "vrp" ? "lotId" : "requestId",
          type: "text",
          defaultValue:
            configData.category === "vrp"
              ? configData.lot_id
              : configData.request_id,
          label: configData.category === "vrp" ? "Lot Id" : "Request Id",
          placeholder: configData.category === "vrp" ? "Lot Id" : "Request Id",
          disabled: true,
        },
        {
          id: "originalPrice",
          type: "text",
          defaultValue: configData.original_price,
          label: "Original Price",
          placeholder: "Original Price",
          disabled: true,
        },
        {
          id: "discountedPrice",
          type: "text",
          defaultValue:
            configData.category === "vrp"
              ? configData.rate_card
              : configData.discounted_price,
          label: "Discounted Price",
          placeholder: "Discounted Price",
          disabled: true,
        },
      ];
    } else if (operationType === "update") {
      // Configuration for update operation
      return [
        {
          id: configData.category === "vrp" ? "lotId" : "requestId",
          type: "text",
          defaultValue:
            configData.category === "vrp"
              ? configData.lot_id
              : configData.request_id,
          label: configData.category === "vrp" ? "Lot Id" : "Request Id",
          placeholder: configData.category === "vrp" ? "Lot Id" : "Request Id",
          disabled: true, // Read-only field for update as well
        },
        {
          id: "status",
          type: "text", // Allow editing
          defaultValue: configData.stock_status,
          label: "Status",
          placeholder: "Status",
          disabled: true, // Editable field
        },
      ];
    } else {
      // Default fallback if the operationType is not recognized
      return [];
    }
  }, [configData, operationType]);


  // Handle modal close
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = useCallback(async () => {
    if (!configData) {
      console.error("Modal data is missing!");
      return;
    }

    const { request_id, category, stock_status } = configData;

    const id = toast.loading("Processing...");

    try {
      let response;

      switch (operationType) {
        case "delete":
          // Handle delete operation
          if (!request_id) {
            console.error("Request ID is missing for delete operation!");
            return;
          }
          response = await deleteRequest({
            category,
            request_id,
          }).unwrap();
          break;

        case "update":
          // Handle update operation (you can modify this as needed)
          response = await stockUpdateRequest({
            category,
            request_id,
            status: stock_status === "in stock" ? "0" : "1",

            // Include other data for update
          }).unwrap();
          break;

        default:
          console.error("Unsupported operation type!");
          return;
      }

      toast.update(id, {
        render: response.message.displayMessage,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Close modal on success
    } catch (error) {
      toast.update(id, {
        render: error.message.displayMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.log(error);
    } finally {
      dispatch(closeModal());
    }
  }, [configData, operationType, deleteRequest, stockUpdateRequest, dispatch]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={classes.backdrop}
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={classes.box}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Conditionally render the appropriate component */}
            {component === "DynamicForm" ? (
              <DynamicForm
                heading={uiData?.heading}
                config={modalConfig}
                onSubmit={handleSubmit}
                onClose={handleClose}
                primaryButtonLabel={uiData?.primaryButtonLabel}
                secondaryButtonLabel={uiData?.secondaryButtonLabel}
              />
            ) : (
              <UploadModal message={uiData?.heading}/>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
