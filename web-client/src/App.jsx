import "./App.css";
import React, { useEffect, useState } from "react";
import { apiEndpoints } from "./services/api-services";
import { logos } from "./assets/logos";

function App() {
  const [restaurantsAPIhealth, setRestaurantsAPIhealth] = useState(null);
  const [deliveryAPIhealth, setDeliveryAPIhealth] = useState(null);
  const [ordersAPIhealth, setOrdersAPIhealth] = useState(null);
  const [paymentAPIhealth, setPaymentAPIhealth] = useState(null);
  const [notificationsAPIhealth, setNotificationsAPIhealth] = useState(null);

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch(apiEndpoints.RestaurantsAPIhealth);
      const data = await response.json();
      setRestaurantsAPIhealth(data.status);
    } catch (error) {
      console.error("Error fetching Restaurants API health:", error);
    }
  };
  const fetchDeliveryAPIhealth = async () => {
    try {
      const response = await fetch(apiEndpoints.DeliveryAPIhealth);
      const data = await response.json();
      setDeliveryAPIhealth(data.status);
    } catch (error) {
      console.error("Error fetching Delivery API health:", error);
    }
  };
  const fetchOrdersAPIhealth = async () => {
    try {
      const response = await fetch(apiEndpoints.OrdersAPIhealth);
      const data = await response.json();
      setOrdersAPIhealth(data.status);
    } catch (error) {
      console.error("Error fetching Orders API health:", error);
    }
  };
  const fetchPaymentAPIhealth = async () => {
    try {
      const response = await fetch(apiEndpoints.PaymentAPIhealth);
      const data = await response.json();
      setPaymentAPIhealth(data.status);
    } catch (error) {
      console.error("Error fetching Payment API health:", error);
    }
  };
  const fetchNotificationsAPIhealth = async () => {
    try {
      const response = await fetch(apiEndpoints.NotificationsAPIhealth);
      const data = await response.json();
      setNotificationsAPIhealth(data.status);
    } catch (error) {
      console.error("Error fetching Notifications API health:", error);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
    fetchDeliveryAPIhealth();
    fetchOrdersAPIhealth();
    fetchPaymentAPIhealth();
    fetchNotificationsAPIhealth();
  }, []);

  return (
    <>
      <div>
        <h1 className="bg-primary text-white text-center p-4">
          Eatsy - Cloud-Native Food Ordering & Delivery System using
          Microservices
        </h1>

        <ul>
          <li>
            <h2>Restaurants API - Status: {restaurantsAPIhealth}</h2>
          </li>
          <li>
            <h2>Delivery API - Status: {deliveryAPIhealth}</h2>
          </li>
          <li>
            <h2>Orders API - Status: {ordersAPIhealth}</h2>
          </li>
          <li>
            <h2>Payment API - Status: {paymentAPIhealth}</h2>
          </li>
          <li>
            <h2>Notifications API - Status: {notificationsAPIhealth}</h2>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
