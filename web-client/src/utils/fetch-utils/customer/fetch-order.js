import { orderAPI } from "../../../services";
import axios from "axios";

export const getCustomerMyOrders = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(orderAPI.getCustomerMyOrders, {
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
        throw error;
    }
};