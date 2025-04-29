const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    refNo: { type: String, required: true, unique: true },
    customerID: { type: String, required: true },
    restaurantID: { type: String, required: true },
    deliveryPersonID: { type: String },
    paymentID: { type: String },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "paid",
        "preparing",
        "ready",
        "assigned",
        "pickup",
        "delivered",
      ],
      default: "pending",
    },
    restaurantCost: { type: Number, required: true },
    deliveryCost: { type: Number, required: true },
    readyAt: { type: Date },
    deliveredAt: { type: Date },
    deliveryLocation: {
      address: { type: String, required: true },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
      },
    },
    items: [
      {
        itemID: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        selectedSize: { type: String, required: true },
        price: { type: Number, required: true },
      }
    ]
  },
  { timestamps: true }
);

orderSchema.index({ "deliveryLocation.location": "2dsphere" });

module.exports = mongoose.model("Order", orderSchema);
