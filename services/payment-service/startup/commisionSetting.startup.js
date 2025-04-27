const CommissionSetting = require("../models/commissionSetting.model");

async function initCommissionSetting() {
  try {
    const existing = await CommissionSetting.findOne();
    if (!existing) {
      const defaultSetting = new CommissionSetting({
        restaurantCommissionPercentage: 10,
        deliveryCommissionPercentage: 5
      });
      await defaultSetting.save();
      console.log("Default CommissionSetting created.");
    } else {
      console.log("CommissionSetting already exists.");
    }
  } catch (err) {
    console.error("Error initializing CommissionSetting:", err.message);
  }
}

module.exports = initCommissionSetting;
