const mongoose = require("mongoose");

const CustomerLocationSchema = new mongoose.Schema(
  {
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    name: { type: String, required: true },
    deliveryAddress: {
      address: { type: String, required: true },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

// Geospatial index for location
CustomerLocationSchema.index({ "deliveryAddress.location": "2dsphere" });

module.exports = mongoose.model("CustomerLocation", CustomerLocationSchema);
