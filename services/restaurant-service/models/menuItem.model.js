const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    availability: { type: Boolean, default: true },
    estPreperationTime: Number,
    restaurantID: { type: String, required: true },
    image: { type: String },
    sizes: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", MenuItemSchema);
