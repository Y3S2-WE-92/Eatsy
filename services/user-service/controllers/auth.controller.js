const Customer = require("../models/customer.model");
const DeliveryPerson = require("../models/deliveryperson.model");
const Admin = require("../models/admin.model");
const Restaurant = require("../models/restaurant.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Customer Login
const customerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = await Customer.findOne({ username });
    if (!customer)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: customer.username,
        role: customer.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Restaurant Login
const restaurantLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const restaurant = await Restaurant.findOne({ username });
    if (!restaurant)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: restaurant._id, role: restaurant.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: restaurant.username,
        role: restaurant.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delivery Person Login
const deliveryPersonLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const deliveryPerson = await DeliveryPerson.findOne({ username });
    if (!deliveryPerson)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, deliveryPerson.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: deliveryPerson._id, role: deliveryPerson.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: deliveryPerson.username,
        role: deliveryPerson.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  customerLogin,
  restaurantLogin,
  deliveryPersonLogin,
  adminLogin,
};
