import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";

import {
  connectRestaurantSocket,
  listenNewOrder,
  disconnectSocket,
} from "../../sockets/restaurant.socket";

function Orders() {
  const [orders, setOrders] = useState([]);
  const restaurantID = useSelector((state) => state.restaurant.loginRestaurant?.id);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    connectRestaurantSocket(restaurantID);

    // 2. Listen for new orders
    listenNewOrder((newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
      alert("You have a new order!");
    });

    // 3. Disconnect on unmount
    return () => {
      disconnectSocket();
    };
  }, [restaurantID]);
  
  return (
    <div>
      <h2>Restaurant Dashboard</h2>
      <h3>New Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.refNo} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
