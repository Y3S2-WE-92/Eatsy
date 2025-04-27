const CommissionSetting = require("../models/commissionSetting.model.js");

// Fetch the single Commission Setting
const getCommissionSetting = async (req, res) => {
  try {
    const setting = await CommissionSetting.findOne();
    if (!setting) {
      return res.status(404).json({ message: "Commission setting not found" });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create the Commission Setting (only if none exists)
const createCommissionSetting = async (req, res) => {
  try {
    const existing = await CommissionSetting.findOne();
    if (existing) {
      return res.status(400).json({ message: "Commission setting already exists" });
    }

    const newSetting = new CommissionSetting({
      restaurantCommissionPercentage: req.body.restaurantCommissionPercentage,
      deliveryCommissionPercentage: req.body.deliveryCommissionPercentage
    });

    await newSetting.save();
    res.status(201).json(newSetting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the existing Commission Setting
const updateCommissionSetting = async (req, res) => {
  try {
    const setting = await CommissionSetting.findOne();
    if (!setting) {
      return res.status(404).json({ message: "Commission setting not found" });
    }

    if (req.body.restaurantCommissionPercentage !== undefined) {
      setting.restaurantCommissionPercentage = req.body.restaurantCommissionPercentage;
    }
    if (req.body.deliveryCommissionPercentage !== undefined) {
      setting.deliveryCommissionPercentage = req.body.deliveryCommissionPercentage;
    }

    await setting.save();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getCommissionSetting, createCommissionSetting, updateCommissionSetting};