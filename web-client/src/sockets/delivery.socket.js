import { io } from "socket.io-client";
const ORDERS_SOCKET_URL = import.meta.env.VITE_DELIVERY_API_URL;

let socket;

export const connectDeliverySocket = (deliveryPersonID) => {
  if (socket && socket.connected) {
    console.log("Socket already connected");
    return;
  }

  socket = io(ORDERS_SOCKET_URL);

  socket.on("connect", () => {
    console.log("Connected to Orders socket server");
    socket.emit("joinDeliveryRoom", deliveryPersonID);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
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
  if (!socket || !socket.connected) {
    console.error("Socket not connected. Cannot emit location.");
    return;
  }

  socket.emit("updateDeliveryPersonLocation", {
    deliveryPersonId: deliveryPersonID,
    location,
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};
