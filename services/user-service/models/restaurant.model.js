const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  address: String,
  ownerName: String,
  ownerContactNo: String,
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "restaurant" },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
