import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { paymentAPI, orderAPI, userAPI } from '../../../admin-panel/src/services';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [paybacks, setPaybacks] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchPaybacks();
    fetchRestaurants();
    fetchDeliveryPersons();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get(orderAPI.GetAllOrders);
    if (response) setOrders(response.data);
  };

  const fetchPaybacks = async () => {
    const response = await axios.get(paymentAPI.GetAllPaybacks);
    if (response) setPaybacks(response.data);
  };

  const fetchRestaurants = async () => {
    const response = await axios.get(userAPI.GetAllRestaurants);
    if (response) setRestaurants(response.data);
  };

  const fetchDeliveryPersons = async () => {
    const response = await axios.get(userAPI.GetAllDeliveryPersons);
    if (response) setDeliveryPersons(response.data);
  };

  // Order status summary for chart
  const orderStatusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(orderStatusCounts).map(([status, count]) => ({
    name: status,
    count
  }));

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats */}
      <div className="stats shadow w-full grid md:grid-cols-4 gap-4">
        <div className="stat">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-primary">{orders.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Restaurants</div>
          <div className="stat-value text-secondary">{restaurants.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Delivery Personnel</div>
          <div className="stat-value text-accent">{deliveryPersons.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Paybacks Processed</div>
          <div className="stat-value text-success">{paybacks.length}</div>
        </div>
      </div>

      {/* Order Status Chart */}
      <div className="card shadow bg-base-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Order Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
