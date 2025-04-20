// local development - Docker
// const USER_API_URL = "http://localhost:4000/api";

// local development
const USER_API_URL = "http://localhost:3000/api";

export const userAPI = {
    UserAPIhealth: `${USER_API_URL}/health`,

    //Authentication
    AdminRegister: `${USER_API_URL}/register/admin`,

    //Login
    AdminLogin: `${USER_API_URL}/auth/admin`,
}