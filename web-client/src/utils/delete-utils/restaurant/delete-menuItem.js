import { restaurantAPI } from "../../../services";
import axios from "axios";

export const deleteMyMenuItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(
            `${restaurantAPI.deleteMyMenuItem(id)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Failed to delete menu item:", error.message);
        return null;
    }
};