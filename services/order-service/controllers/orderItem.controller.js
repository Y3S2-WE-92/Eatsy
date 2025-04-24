const OrderItem = require('../models/orderItem.model');

// Create a new OrderItem
const createOrderItem = async (req, res) => {
  try {
    const orderItem = new OrderItem(req.body);
    const savedItem = await orderItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all OrderItems (optionally filter by orderID)
const getOrderItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.orderID) filter.orderID = req.query.orderID;

    const items = await OrderItem.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single OrderItem by ID
const getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'OrderItem not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
};
