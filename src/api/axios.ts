import axios from "axios";
import { store } from "../app/store";
import { setLogout } from "../slice/userSlice";
import { refreshAccessToken } from "./users/userApi";

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
        const refreshToken = localStorage.getItem("refreshToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Refresh-Token"] = refreshToken;
        } else {
            console.warn("No token found in localStorage");
        }

        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("error_axios", error);
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    // refreshToken API 호출
                    const response = await axios.post(
                        `${API_BASE_URL}/auth/refresh-token`,
                        { refreshToken }
                    );

                    const newAccessToken = response.data.accessToken;

                    // 새로 받은 access token을 localStorage에 저장
                    localStorage.setItem("token", newAccessToken);

                    // 기존 요청의 Authorization 헤더에 새 access token 추가
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;

                    // 원래의 요청을 다시 실행
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error("Failed to refresh token:", err);

                    // 토큰 갱신 실패 시 로그아웃 처리 및 로그인 페이지로 리다이렉트
                    store.dispatch(setLogout());
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

// // 응답 인터셉터 추가
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // 응답이 성공적일 때 처리
//         return response;
//     },
//     (error) => {
//         // 응답 오류 처리
//         if (error.response.status === 401) {
//             // 인증 오류(401 Unauthorized) 처리 로직 추가 가능
//             console.error("Unauthorized! Redirecting to login...");
//             window.location.href = "/login"; // 로그인 페이지로 리디렉션
//         }

//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
