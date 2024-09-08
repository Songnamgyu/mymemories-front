import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

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
