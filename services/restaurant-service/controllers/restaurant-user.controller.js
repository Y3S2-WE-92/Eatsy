const MenuItem = require("../models/menuItem.model");
const Category = require("../models/category.model");

const axios = require("axios");

const USER_SERVICE_BASE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4000/api";

const getMenuItemsByRestaurantID = async (restaurantID) => {
  try {
    const menuItems = await MenuItem.find({
      restaurantID: restaurantID,
    }).populate("category");
    return menuItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllRestaurantsWithMenuItems = async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/restaurant`);
    const restaurants = response.data;

    const updatedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const { _id, ...rest } = restaurant;
        const menuItems = await getMenuItemsByRestaurantID(_id);

        const categorySet = new Set();

        for (const item of menuItems || []) {
          if (item?.category?.name) {
            categorySet.add(item.category.name);
          }
        }

        const categories = Array.from(categorySet);

        const menuItemNames = menuItems.map((item) => item.name);

        return { ...rest, _id, menuItems: menuItemNames, categories };
      })
    );

    return res.status(200).json(updatedRestaurants);
  } catch (error) {
    console.error("Error in getAllRestaurantsWithMenuItems:", error.message);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = {
  getAllRestaurantsWithMenuItems,
};
