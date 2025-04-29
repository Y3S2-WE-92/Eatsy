import { restaurantAPI, userAPI } from "../../../services";
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

export const getMyAvailability = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(userAPI.getRestaurantAvailability,{
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

export const getMyTopOrders = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(restaurantAPI.getMyTopOrders, {
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

export const getMyRecentOrders = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(restaurantAPI.getMyRecentOrders, {
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