const ORDERS_API_URL = import.meta.env.VITE_ORDERS_API_URL;

export const orderAPI = {
    OrdersAPIhealth: `${ORDERS_API_URL}/health`,
    placeOrder: `${ORDERS_API_URL}/order/`,
    getAllOrders: `${ORDERS_API_URL}/order/`,
    getCustomerMyOrders : `${ORDERS_API_URL}/order/customer/my-orders`,
    getOrderByID:(id) => `${ORDERS_API_URL}/order/${id}`,
    getOrderByRefNo: (refNo) => `${ORDERS_API_URL}/order/ref/${refNo}`,
    updateDeliveryPersonID: (id) => `${ORDERS_API_URL}/order/deliveryPerson/${id}`,
    updatePaymentID: (id) => `${ORDERS_API_URL}/order/payment/${id}`,
    updateOrderStatus: (id) => `${ORDERS_API_URL}/order/status/${id}`,
    getNearbyOrders: (lat, lng) => `${ORDERS_API_URL}/order/nearby?lat=${lat}&lng=${lng}`,
};
