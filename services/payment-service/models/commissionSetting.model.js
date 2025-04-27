const mongoose = require("mongoose");

const commissionSettingSchema = new mongoose.Schema({
  restaurantCommissionPercentage: {
    type: Number,
    required: true,
    default: 10, // platform takes 10% from restaurant profit
  },
  deliveryCommissionPercentage: {
    type: Number,
    required: true,
    default: 5, // platform takes 5% from delivery profit
  }
}, { timestamps: true });

const CommissionSetting = mongoose.model("CommissionSetting", commissionSettingSchema);
module.exports = CommissionSetting;
