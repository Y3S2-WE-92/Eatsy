import React from "react";
import { Sidebar } from "../components";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import RestaurantManagement from "../pages/RestaurantManagement";
import Reports from "../pages/Reports";

function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content flex flex-col bg-base-100">
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/restaurants" element={<RestaurantManagement />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;
