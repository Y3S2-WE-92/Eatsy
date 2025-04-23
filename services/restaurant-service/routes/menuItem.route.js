const express = require("express");
const router = express.Router();
const { getAllMenuItems, createMenuItem, getMenuItemByID, getMenuItemsByRestaurantID } = require("../controllers/menuItem.controller");

router.get("/", getAllMenuItems);
router.post("/", createMenuItem);
router.get("/:id", getMenuItemByID);
router.get("/restaurant/:id", getMenuItemsByRestaurantID);

module.exports = router;