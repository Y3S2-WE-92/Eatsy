const DeliveryPerson = require("../models/deliveryperson.model");
const bcrypt = require("bcryptjs");

// Delivery Person Registration
const deliveryRegister = async (req, res) => {
  try {
    const {
      name,
      telephone,
      address,
      email,
      vehicleNumber,
      username,
      password,
    } = req.body;

    const existingUser = await DeliveryPerson.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          msg: "Delivery person already exists with provided email or username",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeliveryPerson = new DeliveryPerson({
      name,
      telephone,
      address,
      email,
      vehicleNumber,
      username,
      password: hashedPassword,
    });

    await newDeliveryPerson.save();
    res.status(201).json({ msg: "Delivery person registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  deliveryRegister,
};
