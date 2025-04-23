const express = require("express");
const router = express.Router();
const {
  getPaymentsByUser,
  getAllPayments,
  getPaymentById
} = require("../controllers/payment.controller.js");


router.get("/", getAllPayments);
router.get("/user/:userId", getPaymentsByUser);
router.get("/:paymentId", getPaymentById);

module.exports = router;
