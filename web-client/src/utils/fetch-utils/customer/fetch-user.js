import { userAPI } from "../../../services";
import axios from "axios";

export const getCustomerLocations = async () => {
  try {
    const token = localStorage.getItem("token");
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
    console.error("Error fetching locations:", error);
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
