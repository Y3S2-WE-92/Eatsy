const MenuItem = require("../models/menuItem.model");
const Category = require("../models/category.model");
const { getRestaurantById } = require("../utils/user-service.util");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("category");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuItemByID = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate(
      "category"
    );
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuItemsByRestaurantID = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({
      restaurantID: req.params.id,
    }).populate("category");

    res.json({ menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyMenuItems = async (req, res) => {
  const {id} = req.user;
  try {
    const menuItems = await MenuItem.find({
      restaurantID: id,
    }).populate("category");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItemAvailability = async (req, res) => {
  const {id} = req.user;
  try {
    // Check if the user is a restaurant owner
    const restaurant = await getRestaurantById(id);

    if (!restaurant) {
      console.log("Restaurant not found");
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Toggle availability
    menuItem.availability = !menuItem.availability;
    await menuItem.save();

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  createMenuItem,
  getMenuItemByID,
  getMenuItemsByRestaurantID,
  getMyMenuItems,
  updateMenuItemAvailability,
};
