const express = require("express");
const router = express.Router();
const {
    getAllRestaurantsWithMenuItems,
} = require("../controllers/restaurant-user.controller");

router.get("/", getAllRestaurantsWithMenuItems);

module.exports = router;
