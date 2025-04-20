const USER_API_URL = import.meta.env.VITE_USER_API_URL;

export const userAPI = {
    UserAPIhealth: `${USER_API_URL}/health`,

    //Authentication
    AdminRegister: `${USER_API_URL}/register/admin`,

    //Login
    AdminLogin: `${USER_API_URL}/auth/admin`,
}