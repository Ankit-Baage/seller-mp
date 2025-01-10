import React from "react";
import { dateFormatter } from "../../../../utils/dateFormatter";
import classes from "./orderAddressPage.module.css";

export const OrderAddressPage = ({ address }) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__grid}>
        <div className={classes.box__upper}>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Order ID : </h1>
            <h1 className={classes.box__content__value}>{address?.order_id}</h1>
          </div>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Date :</h1>
            <h1 className={classes.box__content__value}>
              {dateFormatter(address?.ordered_on)}
            </h1>
          </div>
        </div>
        <div className={classes.box__upper}>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>No. of Item :</h1>
            <h1 className={classes.box__content__value}>
              {address?.num_of_items}
            </h1>
          </div>

          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Total Amt :</h1>
            <h1 className={classes.box__content__value}>
              Rs.{address?.total_amount}
            </h1>
          </div>
        </div>
        <hr className={classes.box__sep} />
        <div className={classes.box__upper}>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Name :</h1>
            <h1 className={classes.box__content__value}>{address?.name}</h1>
          </div>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Address :</h1>
            <h1 className={classes.box__content__value}>{address?.area}</h1>
          </div>
        </div>
        <div className={classes.box__upper}>
          <div className={classes.box__content}>
            <h1 className={classes.box__content__key}>Phone No. :</h1>
            <h1 className={classes.box__content__value}>
              {address?.mobile_no}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
