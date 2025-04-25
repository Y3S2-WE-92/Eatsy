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
