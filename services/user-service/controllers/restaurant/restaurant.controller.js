const Restaurant = require("../../models/restaurant/restaurant.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      username,
      password,
      profileImage,
      address,
      location,
      owner,
      businessRegNo,
      coverImage,
    } = req.body;

    const existingRestaurant = await Restaurant.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (existingRestaurant) {
      return res.status(400).json({
        msg: "Restaurant already exists with provided email, phone, or username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRestaurant = new Restaurant({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      profileImage,
      address,
      location,
      owner,
      businessRegNo,
      coverImage,
    });

    await newRestaurant.save();
    res.status(201).json({ msg: "Restaurant registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const restaurant = await Restaurant.findOne({ username });
    if (!restaurant) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const token = jwt.sign({ id: restaurant._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      token,
      user: {
        id: restaurant._id,
        username: restaurant.username,
        name: restaurant.name,
        accountStatus: restaurant.accountStatus,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getRestaurantByID = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("verifiedBy", "name email");
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  getAllRestaurants,
  getRestaurantByID,
};
