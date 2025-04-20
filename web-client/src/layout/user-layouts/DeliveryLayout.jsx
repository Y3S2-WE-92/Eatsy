import React from "react";
import { Routes, Route } from "react-router-dom";
import { DeliveryNavBar } from "../../components";

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
        <Route path="/orders" element={<div>Orders</div>} />
      </Routes>
    </div>
  );
}

export default DeliveryLayout;
