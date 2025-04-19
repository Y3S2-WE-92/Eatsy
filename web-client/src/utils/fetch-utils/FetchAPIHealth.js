import { apiEndpoints } from "../../services";

export const fetchUserAPIhealth = async () => {
  try {
    const response = await fetch(apiEndpoints.userAPI.UserAPIhealth);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching User API health:", error);
  }
};

export const fetchHealthStatus = async () => {
  try {
    const response = await fetch(
      apiEndpoints.restaurantAPI.RestaurantsAPIhealth
    );
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching Restaurants API health:", error);
  }
};

export const fetchDeliveryAPIhealth = async () => {
  try {
    const response = await fetch(apiEndpoints.deliveryAPI.DeliveryAPIhealth);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching Delivery API health:", error);
  }
};

export const fetchOrdersAPIhealth = async () => {
  try {
    const response = await fetch(apiEndpoints.orderAPI.OrdersAPIhealth);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching Orders API health:", error);
  }
};

export const fetchPaymentAPIhealth = async () => {
  try {
    const response = await fetch(apiEndpoints.paymentAPI.PaymentAPIhealth);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching Payment API health:", error);
  }
};

export const fetchNotificationsAPIhealth = async () => {
  try {
    const response = await fetch(apiEndpoints.notificationAPI.NotificationsAPIhealth);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error("Error fetching Notifications API health:", error);
  }
};
