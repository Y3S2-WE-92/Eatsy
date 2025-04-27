const axios = require("axios");

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005/api/notifications/send";

// Helper function for sending mails
const sendPaybackNotification = async({ to, subject, text, html }) => {
    try {
        await axios.post(NOTIFICATION_SERVICE_URL, {
            to,
            subject,
            text,
            html,
            metadata: {
                service: "payment-service",
                type: "payback-created"
            }
        });
        console.log(`Notification sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send notification to ${to}`, error.message);
    }
}

module.exports = sendPaybackNotification;