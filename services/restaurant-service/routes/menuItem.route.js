const express = require("express");
const router = express.Router();
const {
  getAllMenuItems,
  createMenuItem,
  getMenuItemByID,
  getMenuItemsByRestaurantID,
  getMyMenuItems,
  updateMenuItemAvailability,
} = require("../controllers/menuItem.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAllMenuItems);
router.post("/", createMenuItem);
router.get("/restaurant/my-menu-items", protect, getMyMenuItems);
router.get("/restaurant/:id", getMenuItemsByRestaurantID);
router.put("/availability/:id", protect, updateMenuItemAvailability);
router.get("/:id", getMenuItemByID);

module.exports = router;
