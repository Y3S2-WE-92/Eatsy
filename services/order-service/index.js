const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/order.routes");
const deliveryOrderRoutes = require("./routes/delivery.order.route");

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Order Service");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Order Service" });
});

app.use("/api/order", orderRoutes);
app.use("/api/delivery/order", deliveryOrderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
