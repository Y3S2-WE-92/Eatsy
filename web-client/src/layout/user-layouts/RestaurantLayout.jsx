import React from "react";
import { Routes, Route } from "react-router-dom";
import { RestaurantNavbar } from "../../components";

import Home from "../../pages/restaurant/Home";
import MyMenus from "../../pages/restaurant/MyMenus";
import Orders from "../../pages/restaurant/Orders";
import Earnings from '../../pages/restaurant/Earnings'

function RestaurantLayout() {
  const sections = [
    { name: "Home", path: "/restaurant/" },
    { name: "Orders", path: "/restaurant/orders" },
    { name: "My Menus", path: "/restaurant/menu" },
    { name: "Earnings", path: "/restaurant/earnings" },
  ];

  return (
    <div>
      <RestaurantNavbar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/menu" element={<MyMenus/>} />
        <Route path="/earnings" element={<Earnings/>} />
      </Routes>
    </div>
  );
}

export default RestaurantLayout;
