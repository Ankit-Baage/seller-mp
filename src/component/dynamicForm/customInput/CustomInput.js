import React from "react";
import classes from "./customInput.module.css";

export const CustomInput = ({
  id,
  type,
  placeholder,
  label,
  register,
  disabled,
  validation,
  defaultValue,
}) => {
  return (
    <div className={classes.form__group}>
      <input
        type={type}
        id={id}
        className={classes.form__field}
        placeholder={placeholder}
        {...register(id, validation)}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <label htmlFor={id} className={classes.form__label}>
        {label || placeholder}
      </label>
    </div>
  );
};
