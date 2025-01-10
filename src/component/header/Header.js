import React from "react";
import logo from "../../assets/logoWithName.svg";
// import { useNavigate } from "react-router-dom";
import classes from "./header.module.css";



export const Header = ({ isPending }) => {
  // const navigate = useNavigate();

  // const handleNavigateToProfile = () => {
  //   navigate("profile");
  // };
  return (
    <div className={classes.container}>
      <div className={classes.container__box}>
        <div className={classes.container__box__logo}>
          <img src={logo} alt="Logo" className={classes.container__box__img} />
        </div>
      </div>
    </div>
  );
};