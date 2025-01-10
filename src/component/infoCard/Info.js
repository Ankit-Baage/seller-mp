import React from "react";
import classes from "./info.module.css";

export const Info = ({ image, title, subTitle }) => {
  return (
    <div className={classes.box}>
      <img src={image} alt={title}  className={classes.box__img}/>
      <div className={classes.box__content}>
        <h1 className={classes.box__content__title}>{title}</h1>
        <h2 className={classes.box__content__subTitle}>{subTitle}</h2>
      </div>
    </div>
  );
};
