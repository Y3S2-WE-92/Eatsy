import { restaurantAPI } from "../../../services";
import axios from "axios";

export const getAllCategories = async () => {
    try {
        const response = await axios.get(restaurantAPI.getAllCategories);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error.message);
        return [];
    }
};