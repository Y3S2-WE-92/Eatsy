import { restaurantAPI } from "../../../services";
import axios from "axios";

export const updateMenuItemAvailability = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
    return null;
  }

  try {
    const response = await axios.put(
      `${restaurantAPI.updateMenuItemAvailability(id)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to update menu item availability:", error.message);
    return null;
  }
};

export const updateMyMenuItem = async (id, payload) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${restaurantAPI.updateMyMenuItem(id)}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to update menu item:", error.message);
    return null;
  }
};
