const ORDERS_API_URL = import.meta.env.VITE_ORDERS_API_URL;

export const orderAPI = {
    OrdersAPIhealth: `${ORDERS_API_URL}/health`,
    GetAllOrders:  `${ORDERS_API_URL}/order`
};
