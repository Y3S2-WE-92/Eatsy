import React from "react";
import { RestaurantLandingNavbar, RestaurantLogin } from "../../../components";

function RestaurantLanding() {
  return (
    <section>
      <RestaurantLandingNavbar />
      <div className="flex flex-col md:flex-row justify-center">
        <div className="hidden md:flex flex-1 w-3/4">
          <img
            src="https://images.unsplash.com/photo-1670819916552-67698b1c86ae?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Restaurant Landing"
            className="w-full overflow-hidden max-h-screen object-cover"
          />
        </div>
        <div className="w-full md:w-1/4">
          <RestaurantLogin />
        </div>
      </div>
    </section>
  );
}

export default RestaurantLanding;
