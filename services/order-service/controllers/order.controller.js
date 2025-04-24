const Order = require('../models/order.model');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders (optionally filter by status, customerID, restaurantID)
const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.customerID) filter.customerID = req.query.customerID;
    if (req.query.restaurantID) filter.restaurantID = req.query.restaurantID;

    const orders = await Order.find(filter);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get nearby orders for delivery (within x km)
const getNearbyOrders = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });

    const nearbyOrders = await Order.find({
      status: 'ready',
      'deliveryLocation.location': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(nearbyOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update the deliveryPersonID for an order
const updateDeliveryPersonID = async (req, res) => {
  try {
    const { deliveryPersonID } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryPersonID, status: 'assigned' },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update the paymentID for an order
const updatePaymentID = async (req, res) => {
  try {
    const { paymentID } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentID, status: 'paid' },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const update = { status };

    if (status === 'ready') {
      update.readyAt = new Date();
    } else if (status === 'delivered') {
      update.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getNearbyOrders,
  updateDeliveryPersonID,
  updatePaymentID,
  updateOrderStatus
};
