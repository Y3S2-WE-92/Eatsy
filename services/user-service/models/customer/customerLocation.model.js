const mongoose = require("mongoose");

const CustomerLocationSchema = new mongoose.Schema(
  {
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    name: { type: String, required: true },
    deliveryAddress: {
      address: { type: String, required: true },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerLocation", CustomerLocationSchema);
