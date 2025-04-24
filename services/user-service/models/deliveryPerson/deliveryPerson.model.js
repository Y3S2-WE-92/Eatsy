const mongoose = require("mongoose");

const DeliveryPersonSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true, required: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    nic: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    licenseNo: { type: String, required: true },
    availability: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    accountStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryPerson", DeliveryPersonSchema);