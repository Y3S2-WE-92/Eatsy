import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components";
import { styles } from "../../styles/styles";
import {
  fetchRestaurantOrders,
  updateOrderStatus,
} from "../../utils/fetch-utils/restaurant/fetch-res-order";
import { useToast } from "../../utils/alert-utils/ToastUtil";
import { formatCustomDate } from "../../utils/format-utils/DateUtil";
import { formatCurrency } from "../../utils/format-utils/CurrencyUtil";
import { formatStatusBadge } from "../../utils/format-utils/StatusUtil";
import OrderViewModal from "../../components/Modals/Restaurants/OrderViewModal";
import { FaInfo } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantID, setRestaurantID] = useState("");
  const [isOrderViewModalOpen, setIsOrderViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  useEffect(() => {
    if (restaurantID) {
      fetchOrders();
    }
  }, [restaurantID]);

  const handleAcceptReject = async (orderId, action) => {
    try {
      const newStatus = action === "accept" ? "accepted" : "rejected";
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
      success(`Order ${action}ed successfully`);
      fetchOrders();
    } catch (err) {
      toastError(err.message);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
      success("Order status updated");
      fetchOrders();
    } catch (err) {
      toastError(err.message);
    }
  };

  if (loading) {
    return (
      <div className={`${styles.paddingX} flex flex-col min-h-screen  items-center`}>
        <PageTitle title="Orders" backLink="/restaurant" />
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg text-base-content">Loading orders...</p>
        </div>
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderViewModalOpen(true);
  };

  const handleViewOrderClose = () => {
    setIsOrderViewModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className={`${styles.paddingX} flex flex-col`}>
        <PageTitle title="Orders" backLink="/restaurant" />
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              <thead>
                <tr className="text-sm font-semibold text-center">
                  <th>Ref No</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th>Placed At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const { text, badgeClass } = formatStatusBadge(order.status);
                  return (
                    <tr key={order._id} className="text-center hover:cursor-pointer hover:bg-base-300">
                      <td>{order.refNo}</td>
                      <td>{order.customerID}</td>
                      <td>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.name} ({item.selectedSize}) x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{formatCurrency(order.restaurantCost)}</td>
                      <td>
                        <div className={`badge badge-soft badge-${badgeClass}`}>{text}</div>
                      </td>
                      <td>{formatCustomDate(order.createdAt)}</td>
                      <td className="flex flex-row items-center gap-2 justify-center">
                        {order.status === "pending" ? (
                          <div className="flex flex-row items-center justify-center gap-2">
                            <button
                              className="btn btn-outline btn-success btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptReject(order._id, "accept");
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-outline btn-error btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptReject(order._id, "reject");
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : order.status === "accepted" || order.status === "preparing" ? (
                          <select
                            className="select select-neutral select-sm w-full max-w-xs"
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          >
                            <option value="accepted">Accepted</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                          </select>
                        ) : null}
                        <button className="btn btn-info btn-sm btn-circle" onClick={(e) => handleViewOrder(order)}>
                          <FaInfo/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isOrderViewModalOpen && (
        <OrderViewModal
          order={selectedOrder}
          isOpen={isOrderViewModalOpen}
          onClose={handleViewOrderClose}
        />
      )}
    </>
  );
}

export default Orders;
