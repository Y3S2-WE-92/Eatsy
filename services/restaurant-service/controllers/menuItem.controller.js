const MenuItem = require("../models/menuItem.model");
const Category = require("../models/category.model");
const userService = require("../services/user.service");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("category");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  const {id} = req.user;
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedData = {
      ...req.body,
      restaurantID: id,
    };

    const menuItem = await MenuItem.create(updatedData);
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
    const { id } = req.params;

    const restaurant = await userService.getRestaurantById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItems = await MenuItem.find({
      restaurantID: req.params.id,
    }).populate("category").lean();

    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      restaurantName: restaurant.name,
      deliveryFee: restaurant.deliveryFee,
    }));

    res.json({ menuItems: updatedMenuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyMenuItems = async (req, res) => {
  const { id } = req.user;
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
  const { id } = req.user;
  try {
    // Check if the user is a restaurant owner
    const restaurant = await userService.getRestaurantById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the menu item belongs to the restaurant
    if (menuItem.restaurantID !== restaurant._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this menu item" });
    }

    // Toggle availability
    menuItem.availability = !menuItem.availability;
    await menuItem.save();

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMyMenuItem = async (req, res) => {
  const { id } = req.user;
  try {
    // Check if the user is a restaurant owner
    const restaurant = await userService.getRestaurantById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the menu item belongs to the restaurant
    if (menuItem.restaurantID !== restaurant._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this menu item" });
    }
    const updatedData = {
      ...req.body,
      restaurantID: id,
    }
    Object.assign(menuItem, updatedData);
    await menuItem.save();
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMyMenuItem = async (req, res) => {
  const { id } = req.user;
  try {
    // Check if the user is a restaurant owner
    const restaurant = await userService.getRestaurantById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the menu item belongs to the restaurant
    if (menuItem.restaurantID !== restaurant._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this menu item" });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
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
  updateMyMenuItem,
  deleteMyMenuItem
};
