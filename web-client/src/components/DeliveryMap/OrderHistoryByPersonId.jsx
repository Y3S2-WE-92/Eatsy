import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../utils/alert-utils/ToastUtil";
import { formatCustomDate } from "../../utils/format-utils/DateUtil";
import { deliveryAPI } from "../../services/delivery-service";

function OrderHistoryByPersonId({ deliveryPersonID }) {
  const toast = useToast();
  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(deliveryAPI.getDeliveryPersonById(deliveryPersonID));
      if (response.status !== 200) {
        throw new Error("Failed to fetch order history");
      }
      const historyOrders = response.data.filter(order => order.status !== "pending");
      setOrders(historyOrders);
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Failed to fetch order history.");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(deliveryAPI.updateOrderStatus(orderId), { status: newStatus });
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully!");
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  useEffect(() => {
    if (deliveryPersonID) {
      fetchOrderHistory();
    }
  }, [deliveryPersonID]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      <table className="table-auto w-full border-collapse border border-base-300">
        <thead>
          <tr className="bg-base-200">
            <th className="border border-base-300 px-4 py-2">#</th>
            <th className="border border-base-300 px-4 py-2">Ref No</th>
            <th className="border border-base-300 px-4 py-2">Status</th>
            <th className="border border-base-300 px-4 py-2">Date</th>
            <th className="border border-base-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-base-100">
                <td className="border border-base-300 px-4 py-2">{index + 1}</td>
                <td className="border border-base-300 px-4 py-2">{order.orderId}</td>
                <td className="border border-base-300 px-4 py-2 capitalize">{order.status}</td>
                <td className="border border-base-300 px-4 py-2">
                  {formatCustomDate(order.createdAt)}
                </td>
                <td className="border border-base-300 px-4 py-2">
                  <select
                    className="select select-bordered select-sm"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                  >
                    <option value="assigned">Assigned</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center border border-base-300 px-4 py-2 text-base-content/60"
              >
                No order history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistoryByPersonId;
