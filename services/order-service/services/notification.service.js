const axios = require("axios");

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005/api";

const sendOrderPlacementNotification = async ({
  to,
  refNo,
  customerName,
  createdAt,
}) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE_URL}/notifications/send`, {
      to,
      subject: `Order - ${refNo}`,
      text: `Your Order - ${refNo} Has Been Placed Successfully`,
      html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
  <h2 style="color: #4CAF50;">Thank you for your order, ${customerName}!</h2>
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
  } catch (error) {
    console.error(`Failed to send notification to ${to}`, error.message);
  }
};

module.exports = { sendOrderPlacementNotification };
