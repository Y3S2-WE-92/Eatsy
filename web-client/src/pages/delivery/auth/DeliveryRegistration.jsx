import React from "react";
import { ThemeButton, CloseButton, DeliveryReg } from "../../../components";

function DeliveryRegistration() {
  return (
    <div className="signup min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 p-4">
        <CloseButton link={"/for-delivery"} />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>
      <DeliveryReg />
    </div>
  );
}

export default DeliveryRegistration;
