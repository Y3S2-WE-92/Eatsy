import React from "react";
import { ThemeButton, CloseButton, RestaurantReg } from "../../../components";

function RestaurantRegistration() {
  return (
    <div className="signup min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 p-4">
        <CloseButton link={"/for-restaurant"} />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>
      <RestaurantReg />
    </div>
  );
}

export default RestaurantRegistration;
