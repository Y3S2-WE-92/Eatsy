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

export const getMenuItemsByRestaurantID = async (id) => {
    try {
        const response = await axios.get(`${restaurantAPI.getMenuItemsByRestaurantID(id)}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch menu items:", error.message);
        return [];
    }
}