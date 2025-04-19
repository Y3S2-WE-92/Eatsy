import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import RestaurantLanding from "./pages/landing/RestaurantLanding";
import DeliveryLanding from "./pages/landing/DeliveryLanding";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";


function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={"/"} element={<LandingPage />} />
      <Route path={"/restaurant"} element={<RestaurantLanding />} />
      <Route path={"/delivery"} element={<DeliveryLanding />} />

      {/* User Management */}
      <Route path={"/auth/login"} element={<Login />} />
      <Route path={"/auth/signup"} element={<SignUp />} />
    </Routes>
  );
}

export default App;
