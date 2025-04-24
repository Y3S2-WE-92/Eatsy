const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'User Service' });
});

// Import Routes
// Customer
const customerRoutes = require("./routes/customer/customer.route");
const customerLocationRoutes = require("./routes/customer/customerLocation.route");

// Restaurant
const restaurantRoutes = require("./routes/restaurant/restaurant.route");

// Delivery Person
const deliveryPersonRoutes = require("./routes/deliveryPerson/deliveryPerson.route");

//Admin
const adminRoutes = require("./routes/admin/admin.route");

// Use Routes
// Customer
app.use("/api/customer", customerRoutes);
app.use("/api/customer-location", customerLocationRoutes);

// Delivery Person
app.use("/api/deliveryPerson", deliveryPersonRoutes);

// Restaurant
app.use("/api/restaurant", restaurantRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
