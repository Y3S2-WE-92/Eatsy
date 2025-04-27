import React, { useState, useEffect} from 'react'
import { PageTitle } from "../../components";
import { styles } from "../../styles/styles";
import { fetchRestaurantOrders, updateOrderStatus } from '../../utils/fetch-utils/restaurant/fetch-res-order';
import { useToast } from '../../utils/alert-utils/ToastUtil';
import { formatCustomDate } from '../../utils/format-utils/DateUtil';
import { formatCurrency } from '../../utils/format-utils/CurrencyUtil';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantID, setRestaurantID] = useState("");

  const { success, error: toastError } = useToast();

  useEffect(() => {
    try {
      const rawData = localStorage.getItem("user");
      console.log("Raw localStorage data for 'restaurant':", rawData);
      const data = rawData ? JSON.parse(rawData) : {};
      console.log("Parsed restaurantData:", data);
      const id = data.id || "";
      console.log("Extracted restaurantID:", id);
      setRestaurantID(id);
    } catch (err) {
      console.error("Error parsing localStorage data:", err);
      setRestaurantID("");
    }
  }, []);

  // Fetch orders for the restaurant
  useEffect(() => {
    const fetchOrders = async () => {
      if (!restaurantID) {
        setError("Restaurant ID not found. Please log in again.");
        setLoading(false);
        toastError("Restaurant ID not found");
        return;
      }

      try {
        setLoading(true);
        const ordersData = await fetchRestaurantOrders(restaurantID);
        setOrders(ordersData);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        toastError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (restaurantID) {
      fetchOrders();
    }
  }, [restaurantID]);

  // Handle accept/reject order
  const handleAcceptReject = async (orderId, action) => {
    try {
      const newStatus = action === "accept" ? "accepted" : "rejected";
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
      success(`Order ${action}ed successfully`);
    } catch (err) {
      toastError(err.message);
    }
  };

  // Handle status update (preparing/ready)
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
      success("Order status updated");
    } catch (err) {
      toastError(err.message);
    }
  };

  if (loading) {
    return (
      <div className={`${styles.paddingX} flex flex-col`}>
        <PageTitle title="Orders" backLink="/restaurant" />
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`${styles.paddingX} flex flex-col`}>
        <PageTitle title="Orders" backLink="/restaurant" />
        <div className="text-center text-error">{error}</div>
      </div>
    );
  }
  return (
    <div className={`${styles.paddingX} flex flex-col`}>
      <PageTitle title="Orders" backLink="/restaurant" />
      <div className="card bg-base-300">
        <div className="card-body">
          {orders.length === 0 ? (
            <p className="text-center">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Ref No</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    <th>Placed At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.refNo}</td>
                    <td>{order.customerID}</td>
                    <td><ul>{order.items.map((item, index) => (
                      <li key={index}>{item.name} ({item.selectedSize}) x {item.quantity}</li>
                    ))}</ul></td>
                    <td>{formatCurrency(order.restaurantCost)}</td>
                    <td>{order.status}</td>
                    <td>{formatCustomDate(order.createdAt)}</td>
                    <td>{order.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAcceptReject(order._id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleAcceptReject(order._id, "reject")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : order.status === "accepted" ? (
                      <select
                        className="select select-bordered select-sm"
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      >
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                      </select>
                    ) : null}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders
