import React from "react";
import { Routes, Route } from "react-router-dom";
import { DeliveryNavBar, DeliveryOrders } from "../../components";

import Home from "../../pages/delivery/Home";

function DeliveryLayout() {
  const sections = [
    { name: "Home", path: "/delivery/" },
    { name: "Orders", path: "/delivery/orders" },
  ]

  return (
    <div>
      <DeliveryNavBar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<DeliveryOrders/>} />
      </Routes>
    </div>
  );
}

export default DeliveryLayout;
