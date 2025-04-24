const DeliveryPerson = require("../models/deliveryperson.model");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  deliveryPersonLogin,
  adminLogin,
};
