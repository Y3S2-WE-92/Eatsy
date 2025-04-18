import React, { useEffect, useState } from "react";
import { apiEndpoints } from "../../services/api-services";

function ComponentHealth() {
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

  const statusIndicator = (status) => {
    return (
      <div className={`${status==="OK"?"bg-success":"bg-error"} w-4 h-4 rounded-full`} />
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mx-auto shadow-sm border-2 border-base-content/10">
            <table className="table table-bordered table-zebra text-center">
              <thead>
                <tr>
                  <th>API</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-24">Restaurants API</td>
                  <td className="px-32">{statusIndicator(restaurantsAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Delivery API</td>
                  <td className="px-32">{statusIndicator(deliveryAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Orders API</td>
                  <td className="px-32">{statusIndicator(ordersAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Payment API</td>
                  <td className="px-32">{statusIndicator(paymentAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Notifications API</td>
                  <td className="px-32">{statusIndicator(notificationsAPIhealth)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComponentHealth;
