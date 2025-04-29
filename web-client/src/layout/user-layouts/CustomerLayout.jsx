import React from "react";
import { Routes, Route } from "react-router-dom";
import { CustomerNavBar } from "../../components";

import Home from "../../pages/customer/Home";
import RestaurantView from "../../pages/customer/RestaurantView";
import Checkout from "../../pages/customer/Checkout";
import MyOrders from "../../pages/customer/MyOrders";
import MyCardsPage from '../../pages/customer/payment/MyCardsPage';

function CustomerLayout() {
  const sections = [
    { name: "Home", path: "/customer/" },
    { name: "My Orders", path: "/customer/my-orders" },
  ];

  return (
    <div>
      <CustomerNavBar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/restaurant-view/:id" element={<RestaurantView />} />

        <Route path="/checkout/:cartId/:amount" element={<Checkout />} />
        
        <Route path="/my-cards" element={<MyCardsPage/>}/>
      </Routes>
    </div>
  );
}

export default CustomerLayout;
