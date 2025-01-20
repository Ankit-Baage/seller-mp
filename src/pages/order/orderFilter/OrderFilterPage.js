import React, { useEffect, useState } from "react";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { useSearchParams } from "react-router-dom";

import classes from "./orderFilterPage.module.css";
import { useDispatch } from "react-redux";
import { setOrderFilter } from "../../../store/orderFilterSlice";
import { CustomSelect } from "../../../component/experiment/customSelect/CustomSelect";

const optionData = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Rejected" },
];

export const OrderFilterPage = ({ filters }) => {
  const [appliedFilter, setAppliedFilter] = useState({
    status: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const statusParam = searchParams.get("status");

    setAppliedFilter((prevFilters) => ({
      ...prevFilters,
      status: statusParam || null,
    }));
    dispatch(setOrderFilter({ status: statusParam }));
  }, [dispatch, searchParams]);

  const handleSelection = (selectedOptionId) => {
    setAppliedFilter((prevFilters) => ({
      ...prevFilters,
      status: selectedOptionId || null,
    }));
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedOptionId) {
      newSearchParams.set("status", selectedOptionId);
    } else {
      newSearchParams.delete("status");
    }
    setSearchParams(newSearchParams);
    dispatch(setOrderFilter({ status: appliedFilter.status }));
  };
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <SearchInput placeholder="Search by Order Id or Transaction Id" />
      </div>

      <div className={classes.box__content}>
        <CustomSelect
          label="Select All"
          optionData={optionData}
          onChange={(selectedOptionId) => handleSelection(selectedOptionId)}
          selectOptionId={filters.status||""}
        />
      </div>
    </div>
  );
};
