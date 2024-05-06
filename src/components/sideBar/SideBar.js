import React from "react";
import profile from "../../assets/profile_pic.png";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";

import { Form, Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button/Button";
import classes from "./sidebar.module.css";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "../../store/toaster/toasterActions";
import { logOut } from "../../utils/https-request/auth/logInRequest";

export const SideBar = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogOut = () => {
  //   dispatch(showToastWithTimeout("Logging Out..."));
  //   navigate("/");
  //   logOut();
  // };

  const categories = [
    { id: "prexo", image: prexo, name: "PREXO" },
    { id: "vrp", image: vrp, name: "VRP" },
    { id: "openBox", image: openBox, name: "OPEN-BOX" },
  ];

  const contacts = [
    { id: "phone", link: "+919999123511", label: "+91 9999123511" },
    {
      id: "email",
      link: "contact@mobigarage.com",
      label: "contact@mobigarage.com",
    },
  ];
  return (
    <div className={classes.stack}>
      <div className={classes.container}>
        <div className={classes.container__box}>
          <div className={classes.container__profile}>
            <div className={classes.container__profile__box}>
              <img
                src={profile}
                alt="User"
                className={classes.container__profile__box__img}
              />
            </div>
            <div className={classes.container__profile__info}>
              <h1 className={classes.container__profile__info__name}>
                Name: Ankit Baage
              </h1>
              <h1 className={classes.container__profile__info__name}>
                UserId: 1100215
              </h1>
            </div>
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          <h1 className={classes.container__box__categories__title}>
            Categories
          </h1>
          <div className={classes.container__box__categories__box}>
            {categories.map((category) => (
              <Link
                key={category.id}
                className={classes.container__box__categories__box__category}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className={
                    classes.container__box__categories__box__category__img
                  }
                />
                <h5
                  className={
                    classes.container__box__categories__box__category__name
                  }
                >
                  {category.name}
                </h5>
              </Link>
            ))}
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          <h1 className={classes.container__box__categories__title}>
            Contact Us
          </h1>
          <div className={classes.container__box__categories__box}>
            {contacts.map((contact) => (
              <a
                key={contact.id}
                href={
                  contact.id === "phone"
                    ? `tel:${contact.link}`
                    : `mailto:${contact.link}`
                }
              >
                <h5
                  className={
                    classes.container__box__categories__box__category__name
                  }
                >
                  {contact.label}
                </h5>
              </a>
            ))}
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          {/* <Button text="Log Out" type="button" onClick={handleLogOut} /> */}
          <Form action="/logout" method="post">
            <Button text="Log Out" />
          </Form>
        </div>
      </div>
    </div>
  );
};
