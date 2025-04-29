const Order = require("../models/order.model");
const generateRefNo = require("../utils/refno.util");
const { getIO } = require("../sockets/socket");
const sendPayback = require("../controllers/order-payment.controller");
const userService = require("../services/user.service");
const notificationService = require("../services/notification.service");

// Create a new order
const createOrder = async (req, res) => {
  const { id } = req.user;
  try {
    const customerID = id;
    const customer = await userService.getCustomerById(customerID);

    if (customer) {
      const refNo = generateRefNo();
      const order = new Order({ ...req.body, refNo, customerID: customer._id });
      const savedOrder = await order.save();

      await notificationService.sendOrderPlacementNotification({
        to: customer._id,
        refNo: savedOrder.refNo,
        customerName: customer.name,
        createdAt: savedOrder.createdAt,
      });

      const io = getIO();
      io.to(savedOrder.restaurantID).emit("newOrder", savedOrder);

      res.status(201).json(savedOrder);
    }else{
      res.status(404).json({ error: "Customer not found" });
    }
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
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get nearby orders for delivery (within x km)
const getNearbyOrders = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 500000 } = req.query;
    if (!lat || !lng)
      return res.status(400).json({ error: "lat and lng required" });

    const nearbyOrders = await Order.find({
      status: "ready",
      "deliveryLocation.location": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
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
      { deliveryPersonID, status: "assigned" },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    await sendPayback({ status: "assigned", order });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update the paymentID for an order
const updatePaymentID = async (req, res) => {
  try {
    const { paymentID } = req.body;
    const order = await Order.findOneAndUpdate(
      { refNo: req.params.id },
      { paymentID, status: "paid" },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("Error here: ", error);
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const update = { status };

    if (status === "ready") {
      update.readyAt = new Date();
    } else if (status === "delivered") {
      update.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });

    const io = getIO();
    if (status === "accepted" || status === "rejected") {
      io.to(order.customerID).emit("orderStatusUpdate", {
        orderID: order._id,
        status,
        refNo: order.refNo,
        restaurantCost: order.restaurantCost,
        deliveryCost: order.deliveryCost,
      });

      if (status === "accepted") {
        await notificationService.sendOrderAcceptanceNotification({
          to: order.customerID,
          refNo: order.refNo,
          customerName: order.customerName,
          createdAt: order.createdAt,
        });
      }

      if (status === "rejected") {
        await notificationService.sendOrderRejectedNotification({
          to: order.customerID,
          refNo: order.refNo,
          customerName: order.customerName,
          createdAt: order.createdAt,
        });
      }
    }

    await sendPayback({ status, order });

    // Notify delivery person when the order is ready
    if (status === "ready") {
      console.log("Order is ready for delivery:", order._id);
      // Fetch all delivery person IDs from the API
      const deliveryPersonIDs = await userService.getAllDeliveryPersons();

      // Emit the event to all delivery persons
      deliveryPersonIDs.forEach((id) => {
        io.to(id).emit("orderReady", {
          orderID: order._id,
          refNo: order.refNo,
          deliveryLocation: order.deliveryLocation,
          restaurantID: order.restaurantID,
          items: order.items,
        });
      });

      console.log("Order ready event emitted to all delivery persons.");
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getOrderByRefNo = async (req, res) => {
  try {
    const order = await Order.findOne({ refNo: req.params.refNo });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ customerID: id }).sort({ createdAt: -1 });
    //get and append restaurant name for each order
    const ordersWithRestaurants = await Promise.all(
      orders.map(async (order) => {
        const restaurantName = await userService.getRestaurantNameById(
          order.restaurantID
        );
        return {
          ...order._doc,
          restaurantName: restaurantName || "Unknown Restaurant",
        };
      })
    );
    res.json(ordersWithRestaurants);
  } catch (error) {
    console.error("Error in getCustomerOrders:", error);
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByRestuarantID = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ restaurantID: id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error in getCustomerOrders:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getNearbyOrders,
  updateDeliveryPersonID,
  updatePaymentID,
  updateOrderStatus,
  getOrderByRefNo,
  getMyOrders,
  getOrdersByRestuarantID,
};
