import { io } from "socket.io-client";
const ORDERS_SOCKET_URL = import.meta.env.VITE_ORDERS_SOCKET_URL;

let socket;

export const connectRestaurantSocket = (restaurantID) => {
  socket = io(ORDERS_SOCKET_URL);

  socket.on("connect", () => {
    console.log("Connected to Orders socket server");

    // After connection, join restaurant room
    socket.emit("joinRestaurantRoom", restaurantID);
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

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
