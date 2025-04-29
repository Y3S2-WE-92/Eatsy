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
  getCustomerLocations: `${USER_API_URL}/customer-location/customer`,

  // Restaurant
  RestaurantRegister: `${USER_API_URL}/restaurant/register`,
  RestaurantLogin: `${USER_API_URL}/restaurant/login`,
  getAllRestaurants: `${USER_API_URL}/restaurant/`,
  getRestaurantByID: (id) => `${USER_API_URL}/restaurant/${id}`,
  updateRestaurantAvailability: `${USER_API_URL}/restaurant/availability`,
  getRestaurantAvailability: `${USER_API_URL}/restaurant/availability`,

  // DeliveryPerson
  DeliveryRegister: `${USER_API_URL}/deliveryPerson/register`,
  DeliveryLogin: `${USER_API_URL}/deliveryPerson/login`,
  getNearbyDeliveryPersons: `${USER_API_URL}/deliveryPerson/nearby`,
  getDeliveryPersons: `${USER_API_URL}/deliveryPerson/`,
  getDeliveryPersonById: `${USER_API_URL}/deliveryPerson/:id`,
  updateDeliveryPerson: `${USER_API_URL}/deliveryPerson/:id`,
  updateAvailability: `${USER_API_URL}/deliveryPerson/availability/:id`,
  updateLocation: `${USER_API_URL}/deliveryPerson/location/:id`,
};
