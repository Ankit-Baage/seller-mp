import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import { Header } from "../../components/header/Header";
import { SideBar } from "../../components/sideBar/SideBar";
import { getTokenDuration } from "../../utils/auth";

export const Home = () => {
  const token = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      const duration = getTokenDuration();
      if (!token || duration <= 0) {
        Cookies.remove("authToken");
        Cookies.remove("expiryTimestamp");
        navigate("/"); 
      }
    };

    const interval = setInterval(checkAuth, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [navigate, token]);
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
