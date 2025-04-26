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
  }
};
