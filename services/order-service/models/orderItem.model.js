const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    itemID: { type: String, required: true },
    quantity: { type: Number, required: true },
    selectedSize: {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model("OrderItem", OrderItemSchema);