const axios = require("axios");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:4000";

// Helper function for sending mails
const getUserEmailByType = async ({ id, receiverType }) => {
  try {
    let response;

    if (receiverType === "restaurant") {
      response = await axios.get(`${USER_SERVICE_URL}/api/restaurant/${id}`);
      console.log('Rerieved mail for restaurant for payback');
      return response.data.email;
    }

    if (receiverType === "delivery") {
      response = await axios.get(`${USER_SERVICE_URL}/api/deliveryPerson/${id}`);
      console.log('Rerieved mail for delivery person for payback');
      return response.data.email;
    }

    throw new Error("Invalid receiverType");

  } catch (error) {
    console.error(`Failed to retrieve email for ${receiverType} (ID: ${id}):`, error.message);
    return null;
  }
};

module.exports = getUserEmailByType;