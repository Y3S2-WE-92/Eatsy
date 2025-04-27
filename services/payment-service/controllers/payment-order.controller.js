require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model.js");

const processPayment = async (req, res) => {
  const { userId, refNo, amount, cardToken } = req.body;

  const customerId = process.env.STRIPE_CUSTOMER_ID;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      customer: customerId,
      payment_method: cardToken,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never"
      },
    });

    const payment = new Payment({
      userId,
      refNo,
      amount,
      cardToken,
      status: "success",
      stripePaymentIntentId: paymentIntent.id
    });

    await payment.save();
    res.status(201).json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { processPayment }