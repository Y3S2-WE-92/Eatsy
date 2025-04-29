const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:4002";
const axios = require("axios");

const getMyOrders = async (userId) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/order/restaurant/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    }
};

module.exports = {
    getMyOrders,
};