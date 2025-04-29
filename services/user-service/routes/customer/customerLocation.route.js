const express = require("express");
const router = express.Router();
const {
  getCustomerLocations,
  addCustomerLocation,
  deleteCustomerLocation,
  getLocationByID,
  getAllCustomerLocations,
} = require("../../controllers/customer/customerLocation.controller");
const { protect } = require("../../middleware/auth.middleware");

router.post("/", addCustomerLocation);
router.get("/", getAllCustomerLocations);
router.delete("/:id", deleteCustomerLocation);
router.get("/customer", protect, getCustomerLocations);
router.get("/:id", getLocationByID);

module.exports = router;
