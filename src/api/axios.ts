import axios from "axios";
import { env } from "process";

const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
    throw new Error(
        "REACT_APP_API_URL is not defined in the environment variables"
    );
}

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
