import { restaurantAPI } from "../../../services";
import axios from "axios";

export const createMenuItems = async (payload) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(restaurantAPI.createMenuItems, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Failed to create menu items:", error.message);
        return null;
    }
};