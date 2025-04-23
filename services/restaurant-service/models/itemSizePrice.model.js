const mongoose = require("mongoose");

const ItemSizePriceSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("ItemSizePrice", ItemSizePriceSchema);
