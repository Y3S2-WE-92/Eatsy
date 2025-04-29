const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const deliveryRoutes = require("./routes/delivery.routes");
const socketHandler = require("./socket");

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Delivery Service");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Delivery Service" });
});

app.use("/api/delivery", deliveryRoutes);

socketHandler(io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Delivery Service running on port ${PORT}`);
});
