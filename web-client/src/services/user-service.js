// local development - Docker
const USER_API_URL = "http://localhost:4000/api";

// local development
// const USER_API_URL = "http://localhost:3000/api";

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