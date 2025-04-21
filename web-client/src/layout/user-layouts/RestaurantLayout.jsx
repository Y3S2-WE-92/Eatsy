import React from "react";
import { Routes, Route } from "react-router-dom";
import { RestaurantNavbar } from "../../components";

import Home from "../../pages/restaurant/Home";

function RestaurantLayout() {
  const sections = [
    { name: "Home", path: "/restaurant/" },
    { name: "Orders", path: "/restaurant/orders" },
    { name: "My Menus", path: "/restaurant/menu" },
  ];

  return (
    <div>
      <RestaurantNavbar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/menu" element={<div>Menu</div>} />
      </Routes>
    </div>
  );
}

export default RestaurantLayout;
