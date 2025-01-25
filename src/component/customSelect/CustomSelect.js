import React, { useState } from "react";
import classes from "./customSelect.module.css";

export const CustomSelect = ({
  options, // Renamed for better clarity
  onChange,
  value, // Directly controlled by parent for consistency
  label,
}) => {
  const [currentSelection, setCurrentSelection] = useState(value || "");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setCurrentSelection(selectedValue);
    onChange?.(selectedValue); // Invoke the callback if it exists
  };

  return (
    <div className={classes.box}>
      <select
      className={classes.box__select}
      onChange={handleChange}
      value={currentSelection}
    >
      <option value="" disabled className={classes.box__select__option}>
        {label || "Select an option"}
      </option>
      {options?.map((option) => (
        <option
          key={option.id || option.value}
          value={option.id || option.value}
          className={classes.box__select__option}
        >
          {option.label}
        </option>
      ))}
    </select>
    </div>
    
  );
};
