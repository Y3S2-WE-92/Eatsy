const USER_API_URL = import.meta.env.VITE_USER_API_URL;

export const userAPI = {
    UserAPIhealth: `${USER_API_URL}/health`,

    AdminRegister: `${USER_API_URL}/admin/register`,
    AdminLogin: `${USER_API_URL}/admin/login`,
    GetAllAdmins: `${USER_API_URL}/admin`,
    GetAdminByID: `${USER_API_URL}/admin/:id`,

    
    GetAllRestaurants: `${USER_API_URL}/restaurant`,
    VerifyRestaurant: (id, adminId) => `${USER_API_URL}/restaurant/verify/${id}/${adminId}`,
    GetAllDeliveryPersons:  `${USER_API_URL}/deliveryPerson`,
    VerifyDeliveryPerson: (id, adminId) => `${USER_API_URL}/deliveryPerson/verify/${id}/${adminId}`,

}