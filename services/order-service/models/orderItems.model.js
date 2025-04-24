const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    itemId: { type: String, required: true },
    quantity: { type: Number, required: true },
    selectedSize: String
});

module.exports = mongoose.model("OrderItems", OrderItemsSchema);