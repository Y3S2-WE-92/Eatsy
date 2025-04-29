const axios = require("axios");
const Delivery = require("../models/delivery.model");
const { sendSMS, sendEmail } = require("../services/notification.service");
// const { getIO } = require("../../order-service/sockets/socket");
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:4002";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4000";

exports.assignDeliveryPerson = async (req, res) => {
  try {
    const { id, restaurantId, customerId, deliveryAddress, deliveryPersonId } =
      req.body;
    console.log("Assigning delivery person for order ID:", id);

    // Fetch order from Order Service
    let order;
    try {
      const response = await axios.get(`${ORDER_SERVICE_URL}/api/order/${id}`);
      order = response.data;
      console.log("Fetched order:", order);
    } catch (error) {
      console.log("Order not found:", error.message);
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status !== "ready") {
      console.log("Invalid order status:", order.status);
      return res.status(400).json({ error: "Invalid order" });
    }

    // Find available delivery person from User Service
    const { coordinates } = deliveryAddress.location;
    let deliveryPersons;
    try {
      const response = await axios.get(
        `${USER_SERVICE_URL}/api/deliveryPerson/${deliveryPersonId}`
      );
      deliveryPersons = response.data;
      console.log("Fetched delivery persons:", deliveryPersons);
    } catch (error) {
      console.log("Error fetching delivery persons:", error.message);
      return res.status(500).json({ error: "Failed to find delivery persons" });
    }

    const deliveryPerson = deliveryPersons;

    // Create Delivery document
    const delivery = new Delivery({
      orderId: id,
      deliveryPersonId: deliveryPerson._id,
      restaurantId,
      customerId,
      deliveryAddress,
      status: "assigned",
    });
    await delivery.save();
    console.log("Delivery document created:", delivery._id);

    // Update delivery person in User Service
    try {
      await axios.put(
        `${USER_SERVICE_URL}/api/deliveryPerson/${deliveryPerson._id}`,
        { availability: false }
      );
    } catch (error) {
      console.error("Failed to update delivery person:", error.message);
      await Delivery.deleteOne({ _id: delivery._id });
      return res
        .status(500)
        .json({ error: "Failed to assign delivery person" });
    }

    // Update order status in Order Service
    try {
      await axios.put(`${ORDER_SERVICE_URL}/order/status/${id}`, {
        status: "ready",
      });

      // // Emit orderReady event via WebSocket
      // const io = getIO();
      // io.to(deliveryPersonId).emit("orderReady", {
      //   orderId: id,
      //   deliveryPersonId,
      //   status: "ready",
      // });
    } catch (error) {
      console.error("Failed to update order status:", error.message);
    }

    res.json({
      message: "Delivery person assigned",
      deliveryPersonId: deliveryPerson._id,
      deliveryId: delivery._id,
    });
  } catch (error) {
    console.error("Error in assignDeliveryPerson:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findOne({ orderId: id });
    if (!delivery) {
      return res.status(404).json({ error: "Delivery not found" });
    }

    // Fetch delivery person details from User Service
    let deliveryPerson;
    try {
      const response = await axios.get(
        `${USER_SERVICE_URL}/api/deliverPerson/${delivery.deliveryPersonId}`
        // { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
      );
      deliveryPerson = response.data;
    } catch (error) {
      console.log("Error fetching delivery person:", error.message);
      deliveryPerson = null;
    }

    res.json({
      status: delivery.status,
      deliveryPerson: deliveryPerson
        ? {
            name: deliveryPerson.name,
            location: deliveryPerson.location,
            lastUpdated: deliveryPerson.updatedAt,
          }
        : null,
    });
  } catch (error) {
    console.error("Error in getDeliveryStatus:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params; // Use id from request parameters
    const { status } = req.body;
    const delivery = await Delivery.findOne({ orderId: id });
    if (!delivery) {
      return res.status(404).json({ error: "Delivery not found" }); // Corrected error message
    }

    delivery.status = status;
    if (status === "delivered") {
      try {
        await axios.put(
          `${USER_SERVICE_URL}/api/deliverPerson/${delivery.deliveryPersonId}`,
          { availability: true }
          // { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
        );
      } catch (error) {
        console.error("Failed to update delivery person:", error.message);
      }
    }

    await delivery.save();

    // Update order status in Order Service
    try {
      await axios.put(
        `${ORDER_SERVICE_URL}/api/delivery/order/${id}/status`,
        { status }
        // { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
      );
    } catch (error) {
      console.error("Failed to update order status:", error.message);
    }

    // Emit status update via WebSocket
    if (req.app.get("io")) {
      const io = req.app.get("io");
      io.to(id).emit("deliveryStatusUpdate", { orderId: id, status });
    }

    res.json({ message: "Status updated" });
  } catch (error) {
    console.error("Error in updateDeliveryStatus:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryPersonTasks = async (req, res) => {
  try {
    const { deliveryPersonId } = req.params;
    // if (deliveryPersonId !== req.user.id) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }
    const deliveries = await Delivery.find({
      deliveryPersonId,
      status: { $ne: "delivered" },
    });
    res.json(deliveries);
  } catch (error) {
    console.error("Error in getDeliveryPersonTasks:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryPersonLocation = async (req, res) => {
  try {
    const { deliveryPersonId } = req.params;
    const { location } = req.body;
    if (deliveryPersonId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (
      !location ||
      location.type !== "Point" ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({ error: "Invalid location format" });
    }

    // Update location in User Service
    try {
      await axios.put(
        `${USER_SERVICE_URL}/api/deliverPerson/${deliveryPersonId}`,
        { location },
        { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
      );
    } catch (error) {
      console.error("Error updating delivery person location:", error.message);
      return res.status(500).json({ error: "Failed to update location" });
    }

    // Emit location update via WebSocket (handled by socket/index.js)
    // Note: WebSocket event is triggered by client-side socket.emit('updateDeliveryPersonLocation')
    // This ensures consistency between HTTP and WebSocket updates

    res.json({ message: "Location updated", location });
  } catch (error) {
    console.error("Error in updateDeliveryPersonLocation:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatusByDeliveryPerson = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const deliveryPersonId = req.user.id;

    // Verify the delivery person is assigned to the order
    const delivery = await Delivery.findOne({ orderId, deliveryPersonId });
    if (!delivery) {
      return res.status(403).json({ error: "Unauthorized or invalid order" });
    }

    // Update the delivery status
    delivery.status = status;
    await delivery.save();

    // Update the order status in Order Service
    try {
      await axios.put(
        `${ORDER_SERVICE_URL}/api/delivery/order/${orderId}/status`,
        { status }
        // { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
      );
    } catch (error) {
      console.error(
        "Failed to update order status in Order Service:",
        error.message
      );
    }

    res.json({ message: "Order status updated", status });
  } catch (error) {
    console.error("Error in updateOrderStatusByDeliveryPerson:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryPersonById = async (req, res) => {
  try {
    const { deliveryPersonId } = req.params;
    const deliveryPerson = await Delivery.find({ deliveryPersonId: deliveryPersonId });
    if (!deliveryPerson) {
      return res.status(404).json({ error: "Delivery person not found" });
    }
    res.json(deliveryPerson);
  } catch (error) {
    console.error("Error in getDeliveryPersonById:", error);
    res.status(500).json({ error: error.message });
  }
};