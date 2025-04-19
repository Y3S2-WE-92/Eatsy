import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import { Link } from "react-router-dom";

function RestaurantLandingNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"}>
          <button className="btn btn-ghost text-error border border-error rounded-full me-2">
            Change to Eatsy for Customers
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <Link to={"/auth/login"}>
          <button className="btn btn-ghost border border-success text-success rounded-full me-2">
            Restaurant Login
          </button>
        </Link>
        <Link to={"/auth/signup"}>
          <button className="btn btn-ghost border border-error text-error rounded-full me-4">
            Register a Restaurant
          </button>
        </Link>
        <ThemeButton />
      </div>
    </div>
  );
}

export default RestaurantLandingNavbar;
