const express = require("express");
const router = express.Router();
const {
  getAllMenuItems,
  createMenuItem,
  getMenuItemByID,
  getMenuItemsByRestaurantID,
  getMyMenuItems,
  updateMenuItemAvailability,
  updateMyMenuItem,
  deleteMyMenuItem
} = require("../controllers/menuItem.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAllMenuItems);
router.post("/", protect, createMenuItem);
router.get("/restaurant/my-menu-items", protect, getMyMenuItems);
router.put("/restaurant/my-menu-items/:id", protect, updateMyMenuItem);
router.delete("/restaurant/my-menu-items/:id", protect, deleteMyMenuItem);
router.get("/restaurant/:id", getMenuItemsByRestaurantID);
router.put("/availability/:id", protect, updateMenuItemAvailability);
router.get("/:id", getMenuItemByID);

module.exports = router;
