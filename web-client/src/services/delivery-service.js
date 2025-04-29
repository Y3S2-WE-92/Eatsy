const DELIVERY_API_URL = import.meta.env.VITE_DELIVERY_API_URL;

export const deliveryAPI = {
    DeliveryAPIhealth: `${DELIVERY_API_URL}/health`,
    getDeliveryPersonById: (id) => `${DELIVERY_API_URL}/delivery/deliveryPerson/${id}`, // Get delivery person by ID
    updateOrderStatus : (id) => `${DELIVERY_API_URL}/delivery/${id}/status`, // Update order status
    assignDeliveryPerson: () => `${DELIVERY_API_URL}/delivery/assign` // Assign delivery person to order
};
