import React, { useState } from "react";
import classes from "./customSelect.module.css";

export const CustomSelect = ({
  optionData,
  onChange,
  selectOptionId,
  label,
}) => {
  const [currentSelection, setCurrentSelection] = useState(selectOptionId);

  const handleChange = (event) => {
    const optionId = event.target.value;
    setCurrentSelection(optionId);
    // onSelection(label, optionId);
    onChange(optionId)
    console.log(optionId)
  };
  console.log("currentSelection", currentSelection);
  return (
    <select
      className={classes.box}
      onChange={handleChange}
      value={currentSelection}
    >
      <option value="" className={classes.box__option}>
        {label}
      </option>
      {optionData.map((option) => (
        <option
          key={option.id}
          value={option.id}
          className={classes.box__option}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
