const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById, getNearbyOrders, updateDeliveryPersonID, updatePaymentID, updateOrderStatus } = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/nearby", getNearbyOrders);
router.put("/deliveryPerson/:id", updateDeliveryPersonID);
router.put("/payment/:id", updatePaymentID);
router.put("/status/:id", updateOrderStatus);

module.exports = router;