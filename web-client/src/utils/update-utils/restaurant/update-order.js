import { orderAPI } from "../../../services";
import axios from "axios";

export const AcceptOrder = async (id) => {
    const payload = { status : "accepted" };
    try {
        const response = await axios.put(`${orderAPI.updateOrderStatus(id)}`, payload);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error accepting order:", error);
    }
};

export const RejectOrder = async (id) => {
    const payload = { status : "rejected" };
    try {
        const response = await axios.put(`${orderAPI.updateOrderStatus(id)}`, payload);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error rejecting order:", error);
    }
};