const axios = require("axios");
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005/api";
const userService = require("./user.service");

const sendOrderPlacementNotification = async ({
  to,
  refNo,
  customerName,
  createdAt,
}) => {
  try {
    const customerEmail = await userService.getCustomerEmailById(to);
    if (customerEmail) {
      await axios.post(`${NOTIFICATION_SERVICE_URL}/notifications/send`, {
        to: customerEmail,
        subject: `Order - ${refNo}`,
        text: `Your Order - ${refNo} Has Been Placed Successfully`,
        html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
              <h2 style="color: #4CAF50; text-align: center;">Thank you for your order, ${customerName}!</h2>
              <p>Your order has been placed successfully.</p>
              <table style="margin-top: 20px;">
                <tr>
                  <td style="font-weight: bold;">Order Reference:</td>
                  <td>${refNo}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold;">Order Date:</td>
                  <td>${new Date(createdAt).toLocaleString()}</td>
                </tr>
              </table>
              <p style="margin-top: 20px;">We will notify you once your order is accepted.</p>
              <p style="margin-top: 30px;">Best regards,<br/>The Eatsy Team</p>
            </div>`,
        metadata: {
          service: "order-service",
          type: "order-created",
        },
      });
      console.log(`Notification sent to ${to}`);
    } else {
      console.log(`Email not found for ${to}`);
    }
  } catch (error) {
    console.error(`Failed to send notification to ${to}`, error.message);
  }
};

const sendOrderAcceptanceNotification = async ({
  to,
  refNo,
  createdAt,
}) => {
  try {
    const customerEmail = await userService.getCustomerEmailById(to);
    if(customerEmail){
      await axios.post(`${NOTIFICATION_SERVICE_URL}/notifications/send`, {
        to: customerEmail,
        subject: `Order - ${refNo}`,
        text: `Your Order - ${refNo} Has Been Accepted Successfully`,
        html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h2 style="color: #4CAF50; text-align: center;">Dear Customer, Thank you for your order!</h2>
                <p>Your order has been accepted successfully.</p>
                <table style="margin-top: 20px;">
                  <tr>
                    <td style="font-weight: bold;">Order Reference:</td>
                    <td>${refNo}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Order Date:</td>
                    <td>${new Date(createdAt).toLocaleString()}</td>
                  </tr>
                </table>
                <p style="margin-top: 30px;">Best regards,<br/>The Eatsy Team</p>
              </div>`,
        metadata: {
          service: "order-service",
          type: "order-accepted",
        },
      });
      console.log(`Notification sent to ${to}`);
    }else{
      console.log(`Email not found for ${to}`);
    }
    
  } catch (error) {
    console.error(`Failed to send notification to ${to}`, error.message);
  }
};

const sendOrderRejectedNotification = async ({
  to,
  refNo,
  createdAt,
}) => {
  try {
    const customerEmail = await userService.getCustomerEmailById(to);
    if(customerEmail){
      await axios.post(`${NOTIFICATION_SERVICE_URL}/notifications/send`, {
        to: customerEmail,
        subject: `Order - ${refNo}`,
        text: `Your Order - ${refNo} Has Been Rejected`,
        html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h2 style="color:rgb(255, 43, 43); text-align: center;">Dear Customer, We are sorry!</h2>
                <p>Your order has been rejected by the restaurant. Please try another restaurant</p>
                <table style="margin-top: 20px;">
                  <tr>
                    <td style="font-weight: bold;">Order Reference:</td>
                    <td>${refNo}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold;">Order Date:</td>
                    <td>${new Date(createdAt).toLocaleString()}</td>
                  </tr>
                </table>
                <p style="margin-top: 30px;">Best regards,<br/>The Eatsy Team</p>
              </div>`,
        metadata: {
          service: "order-service",
          type: "order-rejected",
        },
      });
    } else {
      console.log(`Email not found for ${to}`);
    }
    console.log(`Notification sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send notification to ${to}`, error.message);
  }
};

module.exports = {
  sendOrderPlacementNotification,
  sendOrderAcceptanceNotification,
  sendOrderRejectedNotification,
};
