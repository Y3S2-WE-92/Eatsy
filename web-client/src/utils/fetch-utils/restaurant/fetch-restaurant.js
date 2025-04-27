import { restaurantAPI } from "../../../services";
import axios from "axios";

export const getMyMenuItems = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(restaurantAPI.getMyMenuItems, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch menu items:", error.message);
        return [];
    }
};