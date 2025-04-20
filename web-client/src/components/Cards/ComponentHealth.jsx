import React, { useEffect, useState } from "react";
import {
  fetchDeliveryAPIhealth,
  fetchHealthStatus,
  fetchNotificationsAPIhealth,
  fetchOrdersAPIhealth,
  fetchPaymentAPIhealth,
  fetchUserAPIhealth,
} from "../../utils/fetch-utils/FetchAPIHealth";

function ComponentHealth() {
  const [userAPIhealth, setUserAPIhealth] = useState(null);
  const [restaurantsAPIhealth, setRestaurantsAPIhealth] = useState(null);
  const [deliveryAPIhealth, setDeliveryAPIhealth] = useState(null);
  const [ordersAPIhealth, setOrdersAPIhealth] = useState(null);
  const [paymentAPIhealth, setPaymentAPIhealth] = useState(null);
  const [notificationsAPIhealth, setNotificationsAPIhealth] = useState(null);

  useEffect(() => {
    const fetchHealthStatuses = async () => {
      const userHealth = await fetchUserAPIhealth();
      const restaurantHealth = await fetchHealthStatus();
      const deliveryHealth = await fetchDeliveryAPIhealth();
      const ordersHealth = await fetchOrdersAPIhealth();
      const paymentHealth = await fetchPaymentAPIhealth();
      const notificationsHealth = await fetchNotificationsAPIhealth();

      setUserAPIhealth(userHealth);
      setRestaurantsAPIhealth(restaurantHealth);
      setDeliveryAPIhealth(deliveryHealth);
      setOrdersAPIhealth(ordersHealth);
      setPaymentAPIhealth(paymentHealth);
      setNotificationsAPIhealth(notificationsHealth);
    };

    fetchHealthStatuses();
  }, []);

  const statusIndicator = (status) => {
    return (
      <div
        className={`${
          status === "OK" ? "bg-success" : "bg-error"
        } w-4 h-4 rounded-full`}
      />
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm border-2 border-base-content/10">
            <table className="table table-bordered table-zebra text-center">
              <thead>
                <tr>
                  <th>API</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User API</td>
                  <td>{statusIndicator(userAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Restaurants API</td>
                  <td>{statusIndicator(restaurantsAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Delivery API</td>
                  <td>{statusIndicator(deliveryAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Orders API</td>
                  <td>{statusIndicator(ordersAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Payment API</td>
                  <td>{statusIndicator(paymentAPIhealth)}</td>
                </tr>
                <tr>
                  <td>Notifications API</td>
                  <td>{statusIndicator(notificationsAPIhealth)}</td>
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
