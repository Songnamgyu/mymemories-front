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

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        // localStorage에서 토큰 가져오기
        const token = localStorage.getItem("token");

        // 토큰이 있을 경우 Authorization 헤더에 추가
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
    (response) => {
        // 응답이 성공적일 때 처리
        return response;
    },
    (error) => {
        // 응답 오류 처리
        if (error.response.status === 401) {
            // 인증 오류(401 Unauthorized) 처리 로직 추가 가능
            console.error("Unauthorized! Redirecting to login...");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
