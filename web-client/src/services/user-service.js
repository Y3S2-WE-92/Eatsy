import { getAllRestaurants, getRestaurantByID } from "../../../services/user-service/controllers/restaurant/restaurant.controller";

const USER_API_URL = import.meta.env.VITE_USER_API_URL;

export const userAPI = {
  UserAPIhealth: `${USER_API_URL}/health`,

  // Customer
  CustomerRegister: `${USER_API_URL}/customer/register`,
  CustomerLogin: `${USER_API_URL}/customer/login`,

  // CustomerLocation
  addCustomerLocation: `${USER_API_URL}/customer-location`,
  deleteCustomerLocation: `${USER_API_URL}/customer-location/:id`,
  getLocationByID: `${USER_API_URL}/customer-location/:id`,
  getCustomerLocations: `${USER_API_URL}/customer-location/customer/:id`,

  // Restaurant
  RestaurantRegister: `${USER_API_URL}/restaurant/register`,
  RestaurantLogin: `${USER_API_URL}/restaurant/login`,
  getAllRestaurants: `${USER_API_URL}/restaurant`,
  getRestaurantByID: `${USER_API_URL}/restaurant/:id`,

  //Authentication
  DeliveryRegister: `${USER_API_URL}/register/delivery`,

  //Login
  DeliveryLogin: `${USER_API_URL}/auth/delivery`,
};
