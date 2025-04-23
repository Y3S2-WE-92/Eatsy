const express = require("express");
const router = express.Router();
const {
    processPayment
} = require("../controllers/payment-order.controller.js");

router.post("/pay", processPayment);

module.exports = router;