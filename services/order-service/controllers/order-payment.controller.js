const axios = require("axios");

const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:4004';

const sendPayback =async({status, order}) =>{
    try {
        if(status === "ready"){
            await axios.post(`${PAYMENT_SERVICE_URL}/api/payback`, {
                refNo: order.refNo,
                receiverId: order.restaurantID,
                amount:  order.restaurantCost,
                receiverType: 'restaurant'
                    });
        }
        if(status == "delivered"){
            await axios.post(`${PAYMENT_SERVICE_URL}/api/payback`, {
                refNo: order.refNo,
                receiverId: order.deliveryPersonID,
                amount:  order.deliveryCost,
                receiverType: 'delivery'
                    });
        }
    } catch (error) {
        
    }
}

module.exports = sendPayback;