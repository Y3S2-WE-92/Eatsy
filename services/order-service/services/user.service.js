const axios = require('axios');
const USER_SERVICE_BASE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4000/api';

const getRestaurantNameById = async (restaurantID) => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/restaurant/${restaurantID}`);
    return response.data.name;
  } catch (error) {
    console.error('Failed to fetch customer from user-service:', error.message);
    return null;
  }
};

const getCustomerById = async (customerID) => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/customer/${customerID}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer from user-service:', error.message);
    return null;
  }
};

const getCustomerEmailById = async (customerID) => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/customer/${customerID}`);
    const email = response.data.email;

    if (!email) {
      throw new Error('Customer email not found');
    }

    return email;
  } catch (error) {
    console.error('Failed to fetch customer from user-service:', error.message);
    return null;
  }
};

const getAllDeliveryPersons = async () => {
  try {
    const response = await axios.get(`${USER_SERVICE_BASE_URL}/deliveryPerson/person/ids`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer from user-service:', error.message);
    return null;
  }
};

module.exports = {
  getRestaurantNameById,
  getCustomerById,
  getCustomerEmailById,
  getAllDeliveryPersons
};