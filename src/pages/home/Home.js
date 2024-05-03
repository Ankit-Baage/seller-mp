import React, { useEffect } from "react";
import Cookies from "js-cookie";

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import classes from "./home.module.css";
import { Header } from "../../components/header/Header";
import { SideBar } from "../../components/sideBar/SideBar";
import {
  getAuthToken,
  getTokenDuration,
} from "../../utils/loaders/checkAuthLoader";

export const Home = () => {
  const submit = useSubmit();
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    if (!authToken) {
      return;
    }
    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [authToken, submit]);

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
