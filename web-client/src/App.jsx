import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Customer
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/customer/auth/Login";
import SignUp from "./pages/customer/auth/SignUp";
import CustomerLayout from "./layout/user-layouts/CustomerLayout";

//Restaurant
import RestaurantLanding from "./pages/restaurant/auth/RestaurantLanding";
import RestaurantRegistration from "./pages/restaurant/auth/RestaurantRegistration";
import RestaurantLayout from "./layout/user-layouts/RestaurantLayout";

//Delivery
import DeliveryLanding from "./pages/delivery/auth/DeliveryLanding";
import DeliveryRegistration from "./pages/delivery/auth/DeliveryRegistration";
import DeliveryLayout from "./layout/user-layouts/DeliveryLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path={"/"} element={<LandingPage />} />

        {/* Customer Management */}
        <Route path={"/auth/login"} element={<Login />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
        <Route path={"/customer/*"} element={<CustomerLayout />} />
      
        {/* Delivery Management */}
        <Route path={"/for-delivery"} element={<DeliveryLanding />} />
        <Route path={"/for-delivery/register"} element={<DeliveryRegistration />} />
        <Route path={"/delivery/*"} element={<DeliveryLayout />} />

        {/* Restaurant Management */}
        <Route path={"/for-restaurant"} element={<RestaurantLanding />} />
        <Route path={"/for-restaurant/register"} element={<RestaurantRegistration />} />
        <Route path={"/restaurant/*"} element={<RestaurantLayout />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
