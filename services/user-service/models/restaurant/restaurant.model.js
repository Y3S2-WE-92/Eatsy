const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  availability: { type: Boolean, default: false },
  owner: { type: String },
  businessRegNo: { type: String },
  coverImage: { type: String },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  accountStatus: { type: String, default: "pending" },
  rating: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
},
{ timestamps: true });

// Geospatial index for location
RestaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
