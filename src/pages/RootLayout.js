import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getExpirationDuration } from "../utils/getExpirationDuration";
import classes from "./rootLayout.module.css";
import { Header } from "../component/header/Header";
import { SideBar } from "../component/sideBar/SideBar";

export const RootLayout = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (token === "EXPIRED") {
      navigate("/login");
      return;
    }

    const tokenDuration = getExpirationDuration();
    if (!tokenDuration || tokenDuration <= 0) {
      navigate("/login");
      return;
    }

    const timeoutId = setTimeout(() => {
      navigate("login");
    }, tokenDuration);

    return () => clearTimeout(timeoutId);
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
