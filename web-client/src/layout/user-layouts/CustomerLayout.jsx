import React from 'react'
import { Routes, Route } from "react-router-dom";
import { CustomerNavBar } from '../../components';

import Home from '../../pages/customer/Home';
import RestaurantView from '../../pages/customer/RestaurantView';

function CustomerLayout() {
  const sections = [
    { name: "Home", path: "/customer/" },
    { name: "My Orders", path: "/customer/my-orders" },
  ]

  return (
    <div>
      <CustomerNavBar sections={sections} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-orders" element={<div>My Orders</div>} />

        <Route path="/restaurant-view/:id" element={<RestaurantView />} />
      </Routes>
    </div>
  )
}

export default CustomerLayout