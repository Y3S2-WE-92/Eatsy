import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

//Customer
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/customer/auth/Login";
import SignUp from "./pages/customer/auth/SignUp";

//Restaurant
import RestaurantLanding from "./pages/restaurant/auth/RestaurantLanding";
import RestaurantRegistration from "./pages/restaurant/auth/RestaurantRegistration";

//Delivery
import DeliveryLanding from "./pages/delivery/auth/DeliveryLanding";
import DeliveryRegistration from "./pages/delivery/auth/DeliveryRegistration";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={"/"} element={<LandingPage />} />
      
      {/* Delivery Management */}
      <Route path={"/delivery"} element={<DeliveryLanding />} />
      <Route path={"/delivery/register"} element={<DeliveryRegistration />} />

      {/* Restaurant Management */}
      <Route path={"/restaurant"} element={<RestaurantLanding />} />
      <Route path={"/restaurant/register"} element={<RestaurantRegistration />} />

      {/* Customer Management */}
      <Route path={"/auth/login"} element={<Login />} />
      <Route path={"/auth/signup"} element={<SignUp />} />
    </Routes>
  );
}

export default App;
