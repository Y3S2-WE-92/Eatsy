const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
} = require("../controllers/orderItem.controller");

router.post("/", createOrderItem);
router.get("/", getOrderItems);
router.get("/:id", getOrderItemById);

module.exports = router;
