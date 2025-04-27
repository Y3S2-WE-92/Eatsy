const mongoose = require("mongoose");

const paybackSchema = new mongoose.Schema({
  refNo: { type: String, required: true},
  receiverId: { type: String, required: true },
  receiverType: { type: String, required: true , enum: ['restaurant', 'delivery']},
  amountReceived: { type: Number, required: true },
  platformCommission: { type: Number, required: true }
}, { timestamps: true });

const Payback = mongoose.model("Payback", paybackSchema);
module.exports = Payback;
