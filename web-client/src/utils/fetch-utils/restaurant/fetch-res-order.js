import axios from "axios";
import { orderAPI } from "../../../services";
/**
 * Fetch orders for a specific restaurant
 * @param {string} restaurantID - The ID of the restaurant
 * @returns {Promise<Array>} - Array of orders
 */

export const fetchRestaurantOrders = async (restaurantID) => {
  try {
    const response = await axios.get(orderAPI.getAllOrders, {
      params: { restaurantID }, // Assumes backend supports ?restaurantID query
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant orders:", error);
    throw new Error("Failed to fetch restaurant orders");
  }
};

/**
 * Update the status of an order
 * @param {string} orderId - The ID of the order
 * @param {string} status - The new status (e.g., "accepted", "rejected", "preparing", "ready")
 * @returns {Promise<Object>} - Updated order data
 */

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(orderAPI.updateOrderStatus(orderId), {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
