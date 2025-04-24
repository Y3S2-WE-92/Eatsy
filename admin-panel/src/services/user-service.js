import { getAllAdmins } from "../../../services/user-service/controllers/admin/admin.controller";

const USER_API_URL = import.meta.env.VITE_USER_API_URL;

export const userAPI = {
    UserAPIhealth: `${USER_API_URL}/health`,

    AdminRegister: `${USER_API_URL}/admin/register`,
    AdminLogin: `${USER_API_URL}/admin/login`,
    getAllAdmins: `${USER_API_URL}/admin`,
    getAdminByID: `${USER_API_URL}/admin/:id`,
}