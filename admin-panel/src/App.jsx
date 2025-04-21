import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";

import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />

        <Route path={"/admin-panel/*"} element={<DashboardLayout />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
