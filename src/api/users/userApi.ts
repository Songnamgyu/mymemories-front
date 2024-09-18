import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { setLogout } from "../../slice/userSlice";

type SignupUser = {
    username: string;
    password: string;
    email: string;
    phoneNumber: string | number;
    gender: string;
};

type LoginUser = {
    email: string;
    password: string;
};

export const createUser = createAsyncThunk(
    "user/createuser",
    async (userData: SignupUser) => {
        const response = await axiosInstance.post("/signup", userData);
        return response;
    }
);

export const fetchUser = createAsyncThunk(
    "user/fecthUser",
    async (userData: LoginUser, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login", userData);
            console.log("response.data", response.data);
            const { accessToken, refreshToken } = response.data?.data;
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            return { accessToken, refreshToken };
        } catch (error: any) {
            // 오류 발생 시 메시지 반환
            return rejectWithValue(
                error.response?.data?.message || "로그인 실패"
            );
        }
    }
);
export const refreshAccessToken = createAsyncThunk<
    { accessToken: string }, // 성공 시 반환되는 값
    string, // 전달받는 리프레시 토큰 타입
    { rejectValue: string } // 실패 시 반환되는 값 타입
>("/token/refresh", async (refreshToken, { rejectWithValue, dispatch }) => {
    try {
        const response = await axiosInstance.post("/auth/refresh-token", {
            refreshToken, // refreshToken을 인자로 전달
        });

        return { accessToken: response.data.accessToken };
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setLogout()); // 리프레시 토큰 만료 시 로그아웃 처리
            return rejectWithValue(
                "Refresh token expired. Please login again."
            );
        }
        return rejectWithValue("Failed to refresh access token.");
    }
});
