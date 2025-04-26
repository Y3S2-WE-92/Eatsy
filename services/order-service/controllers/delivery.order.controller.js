const Order = require('../models/order.model');
const axios = require('axios');
// const { sendSMS, sendEmail } = require('../services/notification.service');
// const { io } = require('../socket'); // Remove WebSocket instance import
const DELIVERY_SERVICE_URL = process.env.DELIVERY_SERVICE_URL || 'http://localhost:4003';

exports.placeOrder = async (req, res) => {
    console.log('placeOrder called with body:', req.body);
    try {
      const { restaurantId, items, deliveryAddress } = req.body;
      const customerId = req.user?.id || 'mockedCustomerId'; // Mocked for testing
  
      // Fetch menu items from Restaurant Service
    // Fetch menu items from Restaurant Service
    // const restaurantResponse = await axios.get(`${process.env.RESTAURANT_SERVICE_URL}/api/restaurant/${order.restaurantId}/menu`);
    // const menuItems = restaurantResponse.data.items;

    const menuItems = [
        { itemId: 'item1', name: 'Pizza', price: 10 },
        { itemId: 'item2', name: 'Burger', price: 5 },
        { itemId: 'item3', name: 'Pasta', price: 8 }
      ];

  
      // Validate and calculate total
      let totalAmount = 0;
      const orderItems = items.map(item => {
        const menuItem = menuItems.find(m => m.itemId === item.itemId);
        if (!menuItem) throw new Error(`Item ${item.itemId} not found`);
        totalAmount += menuItem.price * item.quantity;
        return {
          itemId: item.itemId,
          name: menuItem.name,
          quantity: item.quantity,
          price: menuItem.price
        };
      });
  
      // Create order
      const order = new Order({
        customerId,
        restaurantId,
        items: orderItems,
        totalAmount,
        deliveryAddress
      });
  
      await order.save();
  
      // Use MongoDB _id as order identifier
      const orderId = order._id.toString();
      console.log('Generated orderId:', orderId);
  
      // Notify customer
    //   await sendSMS(
    //     req.user?.phone || 'mockedPhone',
    //     `Order ${orderId} placed successfully! Total: LKR ${totalAmount}`
    //   );
    //   console.log('SMS notification sent');
  
    //   await sendEmail(
    //     req.user?.email || 'mockedEmail@example.com',
    //     'Order Confirmation',
    //     `Your order ${orderId} has been placed. Total: LKR ${totalAmount}`
    //   );
    //   console.log('Email notification sent');
  
      // Notify Delivery Service with full order details
      try {
        await axios.post(`${DELIVERY_SERVICE_URL}/api/delivery/assign`, {
          id: orderId,
          restaurantId,
          customerId,
          deliveryAddress,
          status: 'pending'
        });
        console.log('Delivery service notified');
      } catch (deliveryError) {
        console.error('Failed to notify Delivery Service:', deliveryError.message);
        // Continue to respond to client even if delivery assignment fails
      }
  
      res.json({ message: 'Order placed', orderId });
    } catch (error) {
      console.error('Error in placeOrder:', error);
      res.status(500).json({ error: error.message });
    }
  };

exports.modifyOrder = async (req, res) => {
  try {
    const { id } = req.params; // Use _id
    const { items, deliveryAddress } = req.body;
    const customerId = req.user.id;

    const order = await Order.findOne({ _id: id, customerId });
    if (!order || order.status !== 'pending') {
      return res.status(400).json({ error: 'Order cannot be modified' });
    }

    // Fetch menu items from Restaurant Service
    // const restaurantResponse = await axios.get(`${process.env.RESTAURANT_SERVICE_URL}/api/restaurant/${order.restaurantId}/menu`);
    // const menuItems = restaurantResponse.data.items;

    const menuItems = [
        { itemId: 'item1', name: 'Pizza', price: 10 },
        { itemId: 'item2', name: 'Burger', price: 5 },
        { itemId: 'item3', name: 'Pasta', price: 8 }
      ];

    // Validate and calculate total
    let totalAmount = 0;
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(m => m.itemId === item.itemId);
      if (!menuItem) throw new Error(`Item ${item.itemId} not found`);
      totalAmount += menuItem.price * item.quantity;
      return {
        itemId: item.itemId,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price
      };
    });

    order.items = orderItems;
    order.totalAmount = totalAmount;
    if (deliveryAddress) order.deliveryAddress = deliveryAddress;
    order.updatedAt = Date.now();

    await order.save();

    res.json({ message: 'Order modified', orderId: id });
  } catch (error) {
    console.error('Error in modifyOrder:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Use _id
    const customerId = req.user.id;

    const order = await Order.findOne({ _id: id, customerId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ orderId: id, status: order.status, totalAmount: order.totalAmount });
  } catch (error) {
    console.error('Error in getOrderStatus:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (customerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error in getCustomerOrders:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    // Remove WebSocket event emission
    // if (status === 'ready') {
    //   io.emit('orderReady', { orderId: id, order });
    // }

    res.json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error in getOrderById:', error);
    res.status(500).json({ error: error.message });
  }
};