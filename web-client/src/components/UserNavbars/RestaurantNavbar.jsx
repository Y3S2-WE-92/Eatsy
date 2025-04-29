import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import ThemeTextLogo from "../Logos/ThemeTextLogo";
import ProfileButton from "../Buttons/ProfileButton";
import NotificationsButton from "../Buttons/NotificationsButton";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";

import { HiMenu } from "react-icons/hi";

const notifications = [
  {
    id: 1,
    message: "New order received",
    time: "2 minutes ago",
  },
  {
    id: 2,
    message: "Order #1234 has been delivered",
    time: "10 minutes ago",
  },
]

function RestaurantNavbar({ sections=[] }) {
  return (
    <div className={`${styles.paddingX} navbar bg-base-300 shadow-sm sticky top-0 z-50`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiMenu className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {sections.map((section, index) => (
              <li key={index}>
                <Link to={section.path}>{section.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to={"/restaurant/"} className="btn btn-ghost text-sm lg:text-lg">
          <ThemeTextLogo style="w-12 md:w-16" />| <span className="text-error font-bold">Restaurant</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {sections.map((section, index) => (
            <li key={index}>
              <Link to={section.path}>{section.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <NotificationsButton notifications={notifications} />
        <ProfileButton role="restaurant"/>
        <ThemeButton />
      </div>
    </div>
  );
}

export default RestaurantNavbar;
