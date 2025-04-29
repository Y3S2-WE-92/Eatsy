const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  refNo: { type: String, required: true},
  amount: Number,
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  cardToken: String,
  stripePaymentIntentId: String
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;