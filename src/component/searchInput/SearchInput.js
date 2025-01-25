import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import search from "../../assets/search.svg";
import classes from "./searchInput.module.css";

export const SearchInput = ({
  placeholder,
  onSearch,
  searchTextFrmStore,
  searchFilter,
  onClear,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  // Synchronize input value with `searchTextFrmStore`
  useEffect(() => {
    setValue("searchText", searchTextFrmStore || ""); // Set the input field to match Redux store value
  }, [searchTextFrmStore, setValue]);

  const onSubmit = (data) => {
    const { searchText } = data;
    onSearch(searchText);
  };

  const handleClear = (e) => {
    e.preventDefault(); // Prevent form submission on button click
    setValue("searchText", ""); // Clear the input field
    onClear(); // Call the clear callback
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <label htmlFor="searchInput" className={classes.container__label}>
        <input
          id="searchInput"
          type="text"
          placeholder={placeholder}
          className={classes.container__input}
          {...register("searchText")}
        />
      </label>
      {!searchFilter ? (
        <button type="submit" className={classes.container__box}>
          |
          <img
            src={search}
            alt="search"
            className={classes.container__box__img}
          />
          <span className={classes.container__box__btn}>Search</span>
        </button>
      ) : (
        <button
          type="button"
          className={classes.container__box__btn__close}
          onClick={handleClear}
        />
        
      )}
    </form>
  );
};
