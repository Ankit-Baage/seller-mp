import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./dropDown.module.css";




const Dropdown = ({ title, options, id }) => {
  return (
    <div className={classes.dropDown__wrapper}>
      <div className={classes.dropdown}>
        <label htmlFor={id} className={classes.dropdown__label}>
          {title}
        </label>
        <input
          type="checkbox"
          name={id}
          id={id}
          className={classes.dropDown__input}
        />
        <span className={classes.dropdown__icon} />

        <div className={classes.dropdown__menu}>
          {options.map((option) => (
            <NavLink
              to={option.path}
              key={option.id}
              className={({ isActive }) =>
                isActive
                  ? `${classes.dropdown__menu__item} ${classes.dropdown__menu__item__active}`
                  : classes.dropdown__menu__item
              }
              end
            >
              <img
                src={option.image}
                alt={option.name}
              />
              <h5
                className={
                  classes.dropDown__menu__item__name
                }
              >
                {option.name}
              </h5>
            </NavLink>
          ))}
        </div>
      </div>
      <hr className={classes.dropDown__sep}/>
    </div>
  );
};

export default Dropdown;
