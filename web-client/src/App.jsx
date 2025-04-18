import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";


function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={"/"} element={<LandingPage />} />

      {/* User Management */}
      <Route path={"/auth/login"} element={<Login />} />
      <Route path={"/auth/signup"} element={<SignUp />} />
    </Routes>
  );
}

export default App;
