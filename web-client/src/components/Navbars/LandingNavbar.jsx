import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";

function LandingNavbar() {
  return (
    <div className={`${styles.paddingX} navbar bg-base-100`}>
      <div className="flex-1 btn-group">
        <Link to={"/for-restaurant"}>
          <button className="btn btn-ghost text-error border border-error rounded-l-full">
            Eatsy for Restaurants
          </button>
        </Link>
        <Link to={"/for-delivery"}>
          <button className="btn btn-ghost text-error border border-error rounded-r-full">
            Eatsy Food Delivery
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
