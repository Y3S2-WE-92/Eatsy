const express = require("express");
const router = express.Router();
const {register,login,getDeliveryPersons,getDeliveryPersonById,updateDeliveryPerson,updateAvailability,updateLocation, getNearbyDeliveryPersons, getAllDeliveryPersonsIds, verifyDeliveryPerson} = require("../../controllers/deliveryPerson/deliveryPerson.controller");

// Create
router.post("/register", register);
router.post("/login", login);
router.get("/nearby", getNearbyDeliveryPersons);
router.get("/", getDeliveryPersons);
router.get("/:id", getDeliveryPersonById);
router.put("/:id", updateDeliveryPerson);
router.patch("/availability/:id", updateAvailability);
router.patch("/location/:id", updateLocation);
router.get("/person/ids", getAllDeliveryPersonsIds);
router.put('/verify/:id/:adminId', verifyDeliveryPerson);

module.exports = router;
