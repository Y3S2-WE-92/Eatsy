const socketIO = require("socket.io");

let io;

module.exports = {
  init: (server) => {
    io = socketIO(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);

      // Restaurant joins their room
      socket.on("joinRestaurantRoom", (restaurantID) => {
        console.log(`Restaurant ${restaurantID} joined room`);
        socket.join(restaurantID);
      });

      // Customer joins their room
      socket.on("joinCustomerRoom", (customerID) => {
        console.log(`Customer ${customerID} joined room`);
        socket.join(customerID);
      });

      // Delivery Person joins their room
      socket.on("joinDeliveryRoom", (deliveryPersonID) => {
        console.log(`Delivery id:  ${deliveryPersonID} joined room`);
        socket.join(deliveryPersonID);
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },

};
