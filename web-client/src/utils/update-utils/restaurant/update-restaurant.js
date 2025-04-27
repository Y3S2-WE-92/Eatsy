import { userAPI } from "../../../services";
import axios from "axios";

export const updateMyRestaurantAvailability = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.patch(userAPI.updateRestaurantAvailability,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update restaurant availability:", error.message);
        return null;
    }
};