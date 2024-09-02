import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

type createUser = {
    username: string;
    password: string;
    email: string;
    phoneNumber: string | number;
    gender: string;
};

export const createUser = createAsyncThunk(
    "user/createuser",
    async (userData: createUser) => {
        const response = await axiosInstance.post("/signup", userData);
        return response;
    }
);
