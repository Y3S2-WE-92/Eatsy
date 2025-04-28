require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model.js");

const getPaymentsByUser = async (req, res) => {
    try {
      const payments = await Payment.find({ userId: req.params.userId });
      res.json({ success: true, payments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  const getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.paymentId);
      if (!payment) return res.status(404).json({ success: false, error: "Payment not found" });
  
      res.json({ success: true, payment });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  const getPaymentByOrderRefNo = async (req, res) => {
    try {
      const payment = await Payment.find({refNo: req.params.id});
      if (!payment) return res.status(404).json({ success: false, error: "Payment not found" });
  
      res.json({ success: true, payment });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
      if (!payments) return res.status(404).json({ success: false, error: "Payments not found" });
  
      res.json({ success: true, data: payments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  module.exports = {getPaymentsByUser, getPaymentById, getPaymentByOrderRefNo, getAllPayments}
