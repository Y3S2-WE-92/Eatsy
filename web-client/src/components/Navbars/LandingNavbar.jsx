import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 btn-group">
        <Link to={"/restaurant"}>
          <button className="btn btn-ghost text-error border border-error rounded-l-full">
            Eatsy for Restaurants
          </button>
        </Link>
        <Link to={"/delivery"}>
          <button className="btn btn-ghost text-error border border-error rounded-r-full">
            Join Eatsy Delivery
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <Link to={"/auth/login"}>
          <button className="btn btn-error rounded-full me-2">Login</button>
        </Link>
        <Link to={"/auth/signup"}>
          <button className="btn btn-success rounded-full me-4">Sign Up</button>
        </Link>
        <ThemeButton />
      </div>
    </div>
  );
}

export default LandingNavbar;
