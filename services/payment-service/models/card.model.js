const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: String,
  cardToken: String,
  last4: String,
  brand: String,
  cardName: {
    type: String,
    unique: true
  }
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
