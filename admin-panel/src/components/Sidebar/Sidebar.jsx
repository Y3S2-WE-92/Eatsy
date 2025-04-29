import React from "react";
import { Link } from "react-router-dom";
import ThemeLogo from "../Logos/ThemeLogo";
import ThemeButton from "../Buttons/ThemeButton";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const items = [
    {
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
      link: "/admin-panel/",
    },
    {
      name: "Delivery Management",
      icon: "fas fa-users",
      link: "/admin-panel/users",
    },
    {
      name: "Restaurant Management",
      icon: "fas fa-utensils",
      link: "/admin-panel/restaurants",
    },
    // {
    //   name: "Settings",
    //   icon: "fas fa-cog",
    //   link: "/admin-panel/settings",
    // },
    {
      name: "Revenue",
      icon: "fas fa-chart-line",
      link: "/admin-panel/reports",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <i className="fas fa-bars"></i>
        </label>
      </div>
      <div className="drawer-side bg-base-200">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ThemeLogo style={"w-12 md:w-40 mx-auto my-12"} />
        <ul className="menu text-base-content w-80 p-4 space-y-2">
          {/* Sidebar content here */}
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="flex items-center py-2 border">
                <i className={`${item.icon} mr-2`}></i>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Footer */}
        <div className="divider"></div>
        <div className="card mx-auto flex flex-row items-center justify-center gap-2 p-4">
          <ThemeButton />
          <button
            className="btn btn-ghost text-error border border-error rounded-full"
            onClick={() => {
              handleLogout();
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
