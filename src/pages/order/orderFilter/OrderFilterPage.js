import React, { useEffect } from "react";
import { SearchInput } from "../../../component/searchInput/SearchInput";
import { useSearchParams } from "react-router-dom";
import classes from "./orderFilterPage.module.css";
import { useDispatch } from "react-redux";
import { setOrderFilter } from "../../../store/orderFilterSlice";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";

const optionData = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Rejected" },
];

export const OrderFilterPage = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Update filter state on initial render or URL change
  useEffect(() => {
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    if (
      filters.status !== statusParam || 
      filters.search !== searchParam
    ) {
      dispatch(
        setOrderFilter({
          status: statusParam || null,
          search: searchParam || null,
        })
      );
    }
  }, [dispatch, searchParams, filters]);

  // Helper to update URL and dispatch filters
  const updateFilterParams = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
    dispatch(setOrderFilter({ [key]: value || null }));
  };

  const handleSelection = (selectedOptionId) => {
    updateFilterParams("status", selectedOptionId);
  };

  const handleSearch = (searchText) => {
    updateFilterParams("search", searchText);
  };

  const handleClearText = () => {
    // Remove "search" from URL params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    setSearchParams(newSearchParams);

    // Reset "search" in the Redux store
    dispatch(setOrderFilter({ search: null }));
  };

  return (
    <div className={classes.box}>
      {/* Search Input */}
      <div className={classes.box__content}>
        <SearchInput
          placeholder="Search by Order Id or Transaction Id"
          onSearch={handleSearch}
          searchTextFrmStore={filters.search}
          searchFilter={filters.search != null}
          onClear={handleClearText}
        />
      </div>

      {/* Custom Select Dropdown */}
      <div className={classes.box__content}>
        <CustomSelect
          label="Select All"
          optionData={optionData}
          onChange={handleSelection}
          selectOptionId={filters.status || ""}
        />
      </div>
    </div>
  );
};
