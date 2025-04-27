const mongoose = require("mongoose");

const paybackSchema = new mongoose.Schema({
  orderId: { type: String, required: true},
  receiverId: { type: String, required: true },
  receiverType: { type: String, required: true , enum: ['Restaurant', 'Delivery']},
  amountReceived: { type: Number, required: true },
  platformCommission: { type: Number, required: true }
}, { timestamps: true });

const Payback = mongoose.model("Payback", paybackSchema);
module.exports = Payback;
