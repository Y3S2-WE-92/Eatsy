const OrderService = require("../services/order.service");

const getMyTopOrders = async (req, res) => {
    const { id } = req.user;
  
    try {
      const orders = await OrderService.getMyOrders(id);
      const today = new Date();
      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );
      const endOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 6
      );
  
      const topOrders = orders
        .filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= startOfWeek && orderDate <= endOfWeek;
        })
        .sort((a, b) => b.restaurantCost - a.restaurantCost)
        .slice(0, 5);
  
      res.json(topOrders);
    } catch (error) {
      console.error("Error in getMyTopOrders:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getMyRecentOrders = async (req, res) => {
    const { id } = req.user;
  
    try {
      const orders = await OrderService.getMyOrders(id);
      const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
  
      res.json(recentOrders);
    } catch (error) {
      console.error("Error in getMyRecentOrders:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = { getMyTopOrders, getMyRecentOrders };  
