const Customer = require("../models/customer.model");
const DeliveryPerson = require("../models/deliveryperson.model");
const Admin = require("../models/admin.model");
const Restaurant = require("../models/restaurant.model");
const bcrypt = require("bcryptjs");

// Customer Registration
const customerRegister = async (req, res) => {
  try {
    const { name, email, phone, username, password } = req.body;

    const existingUser = await Customer.findOne({
      $or: [{ email }, { username }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          msg: "Customer already exists with provided email, username, or phone",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
    });

    await newCustomer.save();
    res.status(201).json({ msg: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Restaurant Registration
const restaurantRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerName,
      ownerContactNo,
      username,
      password,
    } = req.body;

    const existingUser = await Restaurant.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          msg: "Restaurant already exists with provided email or username",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRestaurant = new Restaurant({
      name,
      email,
      address,
      ownerName,
      ownerContactNo,
      username,
      password: hashedPassword,
    });

    await newRestaurant.save();
    res.status(201).json({ msg: "Restaurant registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

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

// Admin Registration
const adminRegister = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const existingUser = await Admin.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Admin already exists with provided email or username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  customerRegister,
  restaurantRegister,
  deliveryRegister,
  adminRegister,
};
