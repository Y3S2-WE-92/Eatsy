import { io } from "socket.io-client";
const ORDERS_SOCKET_URL = import.meta.env.VITE_ORDERS_SOCKET_URL;

let socket;

export const connectCustomerSocket = (customerID) => {
  socket = io(ORDERS_SOCKET_URL);

  socket.on("connect", () => {
    console.log("Connected to socket server as Customer");

    // Join customer's personal room
    socket.emit("joinCustomerRoom", customerID);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
};

export const listenOrderStatusUpdate = (callback) => {
  if (!socket) return;

  socket.on("orderStatusUpdate", (data) => {
    console.log("Order status updated:", data);
    callback(data);
  });
};

export const disconnectCustomerSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
