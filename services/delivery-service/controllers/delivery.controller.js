const Driver = require('../models/driver.model');
const Order = require('../models/order.model'); // Correct import from delivery-service
const { sendSMS, sendEmail } = require('../services/notification.service');

exports.assignDriver = async (req, res) => {
  try {
    const { id, restaurantId, customerId, deliveryAddress, status } = req.body; // Expect full order details
    console.log('Assigning driver for order ID:', id);

    // Check if order exists, create if not
    let order = await Order.findById(id);
    if (!order) {
      console.log('Order not found, creating new order in deliveryDB');
      order = new Order({
        _id: id,
        restaurantId,
        customerId,
        deliveryAddress,
        status: status || 'pending'
      });
      await order.save();
      console.log('New order created:', id);
    }

    if (order.status !== 'pending') {
      console.log('Invalid order status:', order.status);
      return res.status(400).json({ error: 'Invalid order' });
    }

    console.log('Finding available drivers near the delivery address');
    const drivers = await Driver.find({
      available: true,
      currentOrder: null,
      location: {
        $near: {
          $geometry: order.deliveryAddress.location,
          $maxDistance: 1000000 // 10km
        }
      }
    }).limit(1);

    if (!drivers.length) {
      console.log('No available drivers found');
      return res.status(404).json({ error: 'No available drivers' });
    }

    const driver = drivers[0];
    order.driverId = driver._id;
    order.status = 'assigned';
    driver.currentOrder = order._id;
    driver.available = false;

    await order.save();
    console.log('Order updated with driver assignment');
    await driver.save();
    console.log('Driver updated with current order');

    // Send notification to driver
    // await sendSMS(driver.phone, `New order assigned: ${id}. Pick up at ${order.deliveryAddress.address}`);
    // console.log('SMS notification sent to driver');
    // await sendEmail(driver.email, 'New Delivery Assignment', `You have been assigned order ${id}.`);
    // console.log('Email notification sent to driver');

    res.json({ message: 'Driver assigned', driverId: driver._id });
  } catch (error) {
    console.error('Error in assignDriver:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryStatus = async (req, res) => {
  console.log('getDeliveryStatus called with params:', req.params);
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('driverId', 'name location');
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({
      status: order.status,
      driver: order.driverId ? { name: order.driverId.name, location: order.driverId.location } : null
    });
  } catch (error) {
    console.error('Error in getDeliveryStatus:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  console.log('updateDeliveryStatus called with params:', req.params, 'and body:', req.body);
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log('Fetching order with id:', id);
    const order = await Order.findById(id);
    if (!order) {
      console.log('Unauthorized or order not found');
      return res.status(403).json({ error: 'Unauthorized' });
    }

    order.status = status;
    console.log('Order status updated to:', status);
    if (status === 'delivered') {
      const driver = await Driver.findById(order.driverId);
      driver.currentOrder = null;
      driver.available = true;
      await driver.save();
      console.log('Driver marked as available');
    }

    await order.save();
    console.log('Order saved with updated status');
    res.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Error in updateDeliveryStatus:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverTasks = async (req, res) => {
    console.log('getDriverTasks called with params:', req.params);
    try {
      const { driverId } = req.params;
      if (driverId !== req.user.id) {
        console.log('Unauthorized access by driverId:', req.user.id);
        return res.status(403).json({ error: 'Unauthorized' });
      }
      console.log('Fetching tasks for driverId:', driverId);
      const orders = await Order.find({ driverId, status: { $ne: 'delivered' } });
      console.log('Driver tasks fetched:', orders);
      res.json(orders);
    } catch (error) {
      console.error('Error in getDriverTasks:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateDriverLocation = async (req, res) => {
    console.log('updateDriverLocation called with params:', req.params, 'and body:', req.body);
    try {
      const { driverId } = req.params;
      const { location } = req.body; // Expect { type: 'Point', coordinates: [longitude, latitude] }
  
      // Validate authentication
      if (driverId !== req.user.id) {
        console.log('Unauthorized access by driverId:', req.user.id);
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      // Validate location format
      if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        console.log('Invalid location format');
        return res.status(400).json({ error: 'Invalid location format' });
      }
  
      // Update driver's location
      const driver = await Driver.findById(driverId);
      if (!driver) {
        console.log('Driver not found');
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      driver.location = location;
      driver.updatedAt = new Date(); // Track when location was last updated
      await driver.save();
      console.log('Driver location updated:', location);
  
      res.json({ message: 'Location updated', location });
    } catch (error) {
      console.error('Error in updateDriverLocation:', error);
      res.status(500).json({ error: error.message });
    }
  };