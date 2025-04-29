const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  getNearbyOrders,
  updateDeliveryPersonID,
  updatePaymentID,
  updateOrderStatus,
  getOrderByRefNo,
  getMyOrders,
  getOrdersByRestuarantID,
} = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, createOrder);
router.get("/", getOrders);
router.get("/nearby", getNearbyOrders);
router.get("/customer/my-orders", protect, getMyOrders);
router.get("/ref/:refNo", getOrderByRefNo);
router.get("/restaurant/:id", getOrdersByRestuarantID);
router.put("/deliveryPerson/:id", updateDeliveryPersonID);
router.put("/payment/:id", updatePaymentID);
router.put("/status/:id", updateOrderStatus);
router.get("/:id", getOrderById);

module.exports = router;
