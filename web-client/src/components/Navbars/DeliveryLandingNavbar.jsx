import React from "react";
import ThemeButton from "../Buttons/ThemeButton";
import CloseButton from "../Buttons/CloseButton";
import { Link } from "react-router-dom";

function DeliveryLandingNavbar() {
  return (
    <div className="navbar bg-base-100 shadow-md absolute top-0 z-50">
      <div className="flex-1">
        <CloseButton link={"/"} />
      </div>
      <div className="flex-none">
        <Link to={"/delivery/register"}>
          <button className="btn btn-ghost border border-error text-error rounded-full me-4">
            Become a Delivery Partner
          </button>
        </Link>
        <ThemeButton />
      </div>
    </div>
  );
}

export default DeliveryLandingNavbar;
