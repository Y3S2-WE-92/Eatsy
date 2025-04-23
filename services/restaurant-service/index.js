const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Restaurant Service");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Restaurant Service" });
});

// Importing category routes
const categoryRoutes = require("./routes/category.route.js");

// Using category routes
app.use("/api/category", categoryRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    // Start server
    app.listen(PORT, () => {
      console.log(`Restaurant Service running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
