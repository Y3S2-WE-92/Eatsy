const mongoose = require("mongoose");

const DeliveryPersonSchema = new mongoose.Schema({
  name: String,
  telephone: String,
  address: String,
  email: { type: String, unique: true },
  vehicleNumber: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "delivery" },
});

module.exports = mongoose.model("DeliveryPerson", DeliveryPersonSchema);
