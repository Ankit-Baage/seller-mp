import React from "react";
import { useForm } from "react-hook-form";
import search from "../../assets/search.svg";
import classes from "./searchInput.module.css";

export const SearchInput = ({ placeholder }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { searchText } = data;
    
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
      <button type="submit" className={classes.container__box}>
        <img
          src={search}
          alt="search"
          className={classes.container__box__img}
        />
        <span className={classes.container__box__btn}>Search</span>
      </button>
    </form>
  );
};
