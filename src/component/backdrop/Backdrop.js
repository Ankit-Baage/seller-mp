import React, { useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./backdrop.module.css";

export const Backdrop = ({ 
  children, 
  backdropClassName = "", // Custom class for the outer backdrop div
  boxClassName = "", // Custom class for the inner box div
  onClose, 
  ...rest 
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose(); // Trigger onClose handler if provided
    }
    console.log("Backdrop closed");
  };

  // useEffect(() => {
  //   // Prevent body scroll when the backdrop is open
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  // Combine default and custom class names for both divs
  const backdropClass = `${classes.backdrop} ${backdropClassName}`.trim();
  const boxClass = `${classes.box} ${boxClassName}`.trim();
  console.log("backdrop")

  return (
    <motion.div
      className={backdropClass} // Custom class for the backdrop
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...rest} // Spread other props onto the motion.div
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the backdrop
        className={boxClass} // Custom class for the inner div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -120 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
