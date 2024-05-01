import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./home.module.css";
import { Header } from "../../components/header/Header";
import { SideBar } from "../../components/sideBar/SideBar";

export const Home = () => {
  return (
    <div className={classes.container}>
      <Header />

      <div className={classes.container__outlet}>
        <SideBar />
        <div className={classes.container__outlet__box}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
