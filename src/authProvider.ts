import { AuthProvider } from "@refinedev/core";
import { apiClient } from "./libs/axios/config";
import { ADMIN_URI } from "./constants";
import { AxiosError } from "axios";

export const authProvider: AuthProvider = {
  login: async ({ name, password }) => {
    const result = await apiClient.get("sanctum/csrf-cookie");

    const LOGIN_END_POINT = ADMIN_URI + "/auth/login";

    try {
        const data = await apiClient.post(LOGIN_END_POINT, {
            name,
            password
        });
    }
    catch(error){

        const axiosError = error as AxiosError;
        
        console.log("error", axiosError.status);
        return {
            success: false,
            error: {
              message: "خطأ في عملية تسجيل الدخول",
              name: "اسم المستخدم أو كلمة المرور غير صحيحة",
            },
        };
    }

    return {
        success: true,
        redirectTo: "/admin",
    };


  },
  // ---
};