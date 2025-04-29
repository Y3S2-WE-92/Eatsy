import { io } from "socket.io-client";
const ORDERS_SOCKET_URL = import.meta.env.VITE_ORDERS_SOCKET_URL;

let socket;

export const connectDeliverySocket = (deliveryPersonID) => {
  socket = io(ORDERS_SOCKET_URL);

  socket.on("connect", () => {
    console.log("Connected to Orders socket server");

    // After connection, join delivery room
    socket.emit("joinDeliveryRoom", deliveryPersonID);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
};

export const listenNewOrder = (callback) => {
  if (!socket) return;

  socket.on("newOrder", (orderData) => {
    console.log("New Order Received:", orderData);
    callback(orderData);
  });
};

export const listenOrderReady = (callback) => {
  if (!socket) return;

  socket.on("orderReady", (orderData) => {
    console.log("Order Ready Notification:", orderData);
    callback(orderData);
  });
};

export const listenForLocationUpdates = (callback) => {
  if (!socket) return;

  socket.on("locationUpdate", (data) => {
    console.log("Location update received:", data);
    callback(data);
  });
};

export const emitDeliveryPersonLocation = (deliveryPersonID, location) => {
  if (!socket) return;

  socket.emit("updateDeliveryPersonLocation", {
    deliveryPersonId: deliveryPersonID,
    location,
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
