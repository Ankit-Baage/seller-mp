import React from "react";
import classes from "./card.module.css";

export const Card = ({ children, className = "", style = {} }) => {
  return (
    <div className={`${classes.box} ${className}`} style={style}>
      {children}
    </div>
  );
};
