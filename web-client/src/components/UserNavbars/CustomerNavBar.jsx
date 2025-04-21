import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import ThemeTextLogo from "../Logos/ThemeTextLogo";
import ProfileButton from "../Buttons/ProfileButton";
import NotificationsButton from "../Buttons/NotificationsButton";
import ShoppingCartButton from "../ShoppingCart/ShoppingCartButton";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";
import { HiMenu } from "react-icons/hi";

const notifications = [
  { id: 1, message: "New order received", time: "2 minutes ago" },
  { id: 2, message: "Order #1234 has been delivered", time: "10 minutes ago" },
];

function CustomerNavBar({ sections = [] }) {
  return (
    <div className={`${styles.paddingX} navbar bg-base-300 shadow-sm`}>
      {/* Left: Dropdown on Mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiMenu className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {sections.map((section, index) => (
              <li key={index}>
                <Link to={section.path}>{section.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link to={"/customer/"} className="btn btn-ghost text-lg">
          <ThemeTextLogo style="w-12 md:w-16" />
        </Link>
      </div>

      {/* Center: Horizontal Menu (only on lg and up) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {sections.map((section, index) => (
            <li key={index}>
              <Link to={section.path}>{section.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Buttons */}
      <div className="navbar-end gap-3">
        <ShoppingCartButton />
        <NotificationsButton notifications={notifications} />
        <ProfileButton />
        <ThemeButton />
      </div>
    </div>
  );
}

export default CustomerNavBar;
