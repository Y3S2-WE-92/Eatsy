// local development - Docker
const RESTAURANTS_API_URL = "http://localhost:4001/api";
const DELIVERY_API_URL = "http://localhost:4002/api";
const ORDERS_API_URL = "http://localhost:4003/api";
const PAYMENT_API_URL = "http://localhost:4004/api";
const NOTIFICATIONS_API_URL = "http://localhost:4005/api";

export const apiEndpoints = {
    //Restaurants
    RestaurantsAPIhealth: `${RESTAURANTS_API_URL}/health`,

    //Delivery
    DeliveryAPIhealth: `${DELIVERY_API_URL}/health`,

    //Orders
    OrdersAPIhealth: `${ORDERS_API_URL}/health`,

    //Payment
    PaymentAPIhealth: `${PAYMENT_API_URL}/health`,

    //Notifications
    NotificationsAPIhealth: `${NOTIFICATIONS_API_URL}/health`,
};
