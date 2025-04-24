const DeliveryPerson = require("../models/deliveryperson.model");
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

module.exports = {
  deliveryPersonLogin,
};
