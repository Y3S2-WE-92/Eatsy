import React from "react";
import { Routes, Route } from "react-router-dom";
import { DeliveryNavBar, DeliveryOrders } from "../../components";

import Home from "../../pages/delivery/Home";
import Earnings from "../../pages/delivery/Earnings"

function DeliveryLayout() {
  const sections = [
    { name: "Home", path: "/delivery/" },
    { name: "Orders", path: "/delivery/orders" },
    { name: "Earnings", path: "/delivery/earnings" },
  ]

  return (
    <div>
      <DeliveryNavBar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<DeliveryOrders/>} />
        <Route path="/earnings" element={<Earnings />} />
      </Routes>
    </div>
  );
}

export default DeliveryLayout;
