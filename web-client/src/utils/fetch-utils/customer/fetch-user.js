import { userAPI, restaurantAPI } from "../../../services";
import axios from "axios";
import toast from "react-hot-toast";

export const getCustomerLocations = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return [];
    }
    const response = await axios.get(userAPI.getCustomerLocations, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    toast.error("Error fetching locations");
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
      const response = await axios.get(userAPI.getAllRestaurants);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch restaurants:", error.message);
      return [];
  }
};

export const getRestaurantByID = async (id) => {
  try {
      const response = await axios.get(`${userAPI.getRestaurantByID(id)}`);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch customer from user-service:", error.message);
      return null;
  }
};
