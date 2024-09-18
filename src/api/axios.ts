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
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const response = await axios.post("/auth/refresh-token", {
                        refreshToken,
                    });
                    store
                        .dispatch(
                            refreshAccessToken(refreshToken) // refreshToken을 전달해야 합니다.
                        )
                        .then((result) => {
                            if (refreshAccessToken.fulfilled.match(result)) {
                                // 새로운 access token이 성공적으로 받아진 경우
                                console.log(
                                    "New access token:",
                                    result.payload.accessToken
                                );
                                // 새로 받은 access token을 저장하거나 처리하는 로직 추가
                            } else {
                                console.error("Failed to refresh access token");
                                // 필요 시 로그인 페이지로 리다이렉트
                                window.location.href = "/login";
                            }
                        });

                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.accessToken}`;
                    return axiosInstance(originalRequest); // 재시도
                } catch (err) {
                    store.dispatch(setLogout()); // Refresh token도 만료 시 로그아웃
                    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
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
