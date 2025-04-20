const USER_API_URL = import.meta.env.VITE_USER_API_URL;

export const userAPI = {
    UserAPIhealth: `${USER_API_URL}/health`,

    //Authentication
    CustomerRegister: `${USER_API_URL}/register/customer`,
    DeliveryRegister: `${USER_API_URL}/register/delivery`,
    RestaurantRegister: `${USER_API_URL}/register/restaurant`,

    //Login
    CustomerLogin: `${USER_API_URL}/auth/customer`,
    DeliveryLogin: `${USER_API_URL}/auth/delivery`,
    RestaurantLogin: `${USER_API_URL}/auth/restaurant`,
}