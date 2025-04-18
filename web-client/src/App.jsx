import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";


function App() {
  return (
    <Routes>
      {/* User Management */}
      <Route path={"/auth/login"} element={<Login />} />
      <Route path={"/auth/signup"} element={<SignUp />} />

    </Routes>
  );
}

export default App;
