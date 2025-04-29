const Card = require("../models/card.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const saveCard = async (req, res) => {
  const { userId, paymentMethodId, cardName } = req.body;

  const customerId = await process.env.STRIPE_CUSTOMER_ID;
  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    const card = new Card({
      userId,
      cardToken: paymentMethod.id,
      last4: paymentMethod.card.last4,
      brand: paymentMethod.card.brand,
      cardName
    });

    await card.save();
    res.status(201).json({ success: true, card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getSavedCards = async (req, res) => {
  const { userId } = req.params;

  try {
    const cards = await Card.find({ userId });
    res.json({ success: true, cards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateCard = async (req, res) => {
  const { id } = req.params;
  const { cardName } = req.body;

  try {
    const updatedCard = await Card.findByIdAndUpdate(id, { cardName });
    if (!updatedCard) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.json({ success: true, card: updatedCard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteCard = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Card.findByIdAndDelete(id);
      res.json({ success: true, message: "Card deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

module.exports = {saveCard, getSavedCards, updateCard, deleteCard}