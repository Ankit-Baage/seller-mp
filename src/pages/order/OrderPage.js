import React from "react";
import { useSelector } from "react-redux";

import classes from "./orderPage.module.css";
import { CategoryPageSkeleton } from "../../component/skeleton/CategoryPageSkeleton";
import { OrderTablePage } from "./orderTable/OrderTablePage";
import { OrderFilterPage } from "./orderFilter/OrderFilterPage";
import {
  selectOrders,
  useGetOrdersListQuery,
} from "../../services/orderApiSlice";
import { selectOrderState } from "../../store/orderFilterSlice";

export const OrderPage = () => {
  const appliedFilters = useSelector(selectOrderState);
  const { data, isSuccess } = useGetOrdersListQuery(appliedFilters);

  const tableData = useSelector(selectOrders);
  console.log("orderFilter", appliedFilters);

  console.log("tableData", tableData);
  return isSuccess ? (
    <div className={classes.box}>
      <OrderFilterPage filters ={appliedFilters}/>
      <OrderTablePage data={tableData} />
    </div>
  ) : (
    <CategoryPageSkeleton />
  );
};
