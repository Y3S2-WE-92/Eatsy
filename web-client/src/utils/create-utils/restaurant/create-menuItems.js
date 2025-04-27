import { restaurantAPI } from "../../../services";
import axios from "axios";

export const createMenuItems = async (payload) => {
    try {
        const response = await axios.post(restaurantAPI.createMenuItems, payload);
        return response;
    } catch (error) {
        console.error("Failed to create menu items:", error.message);
        return null;
    }
};