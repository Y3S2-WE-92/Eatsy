const express = require("express");
const router = express.Router();
const {
  getPaymentsByUser,
  getAllPayments,
  getPaymentByOrderRefNo,
  getPaymentById,
} = require("../controllers/payment.controller.js");


router.get("/", getAllPayments);
router.get("/user/:userId", getPaymentsByUser);
router.get("/order/:id", getPaymentByOrderRefNo);
router.get("/:paymentId", getPaymentById);

module.exports = router;
