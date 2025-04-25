const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById, getNearbyOrders, updateDeliveryPersonID, updatePaymentID, updateOrderStatus, getOrderByRefNo } = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/nearby", getNearbyOrders);
router.get("/ref/:refNo", getOrderByRefNo);
router.put("/deliveryPerson/:id", updateDeliveryPersonID);
router.put("/payment/:id", updatePaymentID);
router.put("/status/:id", updateOrderStatus);
router.get("/:id", getOrderById);

module.exports = router;