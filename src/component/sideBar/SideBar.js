import React from "react";
import Cookies from "js-cookie";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { apiSlice } from "../../services/apiSlice";
import { toast } from "react-toastify";
import { useUserProfileQuery } from "../../services/authApiSlice";
import classes from "./sideBar.module.css";
import Dropdown from "../dropDown/DropDown";
import { dropdowns, withoutDropdowns } from "./dropDown";

const contacts = [
  { id: "phone", link: "+91 9999123511" },
  { id: "email", link: "contact@mobigarage.com" },
];

export const SideBar = () => {
  // const [profile, setProfile] = useState({
  //   userImg: null,
  //   userName: null,
  //   userId: null,
  // });
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useUserProfileQuery();
  const name = data?.data?.name || "U";
  const id = data?.data?.id;
  const img = name.slice(0, 1).toUpperCase(); // First letter capitalized
  const userName = img + name.slice(1);
  // useEffect(() => {
  //   if (isSuccess) {
  //     setProfile({
  //       userImg: img,
  //       userName,
  //       userId: id,
  //     });
  //   }
  // }, [id, img, isSuccess, userName]);
  const isActiveParent = (basePath) => {
    const currentPath = location.pathname;
  
    // Explicitly check if the basePath is "/" (homepage)
    if (basePath === "/") {
      return currentPath === "/";
    }
  
    // For other paths, check if the currentPath starts with basePath
    return currentPath.startsWith(`/${basePath}`);
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("expirationTime");
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    toast.success("Logged out successfully");
    navigate("login");
  };
  return (
    <div className={classes.stack}>
      <div className={classes.container}>
      <div className={classes.container__profile}>
            <div className={classes.container__profile__box}>
              {/* <img
                src={profile}
                alt="User"
                className={classes.container__profile__box__img}
              /> */}
              {img}
            </div>
            <div className={classes.container__profile__info}>
              <h1 className={classes.container__profile__info__name}>
                Name: {name}
              </h1>
              <h1 className={classes.container__profile__info__name}>
                User Id: {id}
              </h1>
            </div>
          </div>
          <hr className={classes.dropDown__sep} />
        <div className={classes.dropdown__menu}>
          {withoutDropdowns.map((option) => (
            <NavLink
              to={option.path}
              key={option.id}
              className={
                isActiveParent(option.path)
                  ? `${classes.dropdown__menu__item} ${classes.dropdown__menu__item__active}`
                  : classes.dropdown__menu__item
              }
              end
            >
              <img src={option.image} alt={option.name} />
              <h5 className={classes.dropDown__menu__item__name}>
                {option.name}
              </h5>
            </NavLink>
          ))}
        </div>

        {dropdowns.map((dropdown, index) => (
          <Dropdown
            key={dropdown.id}
            id={dropdown.id}
            title={dropdown.title}
            options={dropdown.options}
            isLast={index === dropdowns.length - 1}
          />
        ))}

        <div className={classes.container__box__categories}>
          <h1 className={classes.container__box__categories__title}>
            Contact Us
          </h1>
          <div className={classes.container__box__categories__box}>
            {contacts.map((contact) => (
              <a
                href="tel:+91 9999123511"
                key={contact.id}
                className={classes.container__box__categories__box__category}
              >
                <h5
                  className={
                    classes.container__box__categories__box__category__name
                  }
                >
                  {contact.link}
                </h5>
              </a>
            ))}
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          <button
            type="button"
            className={classes.box__btn}
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
