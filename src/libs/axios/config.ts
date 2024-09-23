import axios from "axios";
import { BASE_URI } from "../../constants";

export const apiClient = axios.create({
    baseURL: BASE_URI,
    withCredentials: true,
    timeout: 6000,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});
