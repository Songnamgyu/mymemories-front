import axios from "axios";
import axiosRetry from "axios-retry";
import axiosInstance from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios-retry 설정
axiosRetry(axios, {
    retries: 3,
    retryCondition: (error) => error.response?.status === 429,
    retryDelay: (retryCount) => {
        return Math.pow(2, retryCount) * 1000; // 1초 -> 2초 -> 4초 대기
    },
});

const apiKey: string | undefined =
    process.env.REACT_APP_RAPID_TRAVEL_ADVISOR_API_KEY;
const URL =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

// fetchRestaurantsList 함수 수정
export const fetchRestaurantsList = createAsyncThunk(
    "place/restaurants",
    async (bounds: {
        bl_latitude: number;
        tr_latitude: number;
        bl_longitude: number;
        tr_longitude: number;
    }) => {
        const options = {
            method: "GET",
            params: {
                bl_latitude: bounds.bl_latitude,
                tr_latitude: bounds.tr_latitude,
                bl_longitude: bounds.bl_longitude,
                tr_longitude: bounds.tr_longitude,
            },
            headers: {
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
                "X-RapidAPI-Key": apiKey,
            },
            withCredentials: false,
        };

        try {
            const response = await axiosInstance.get(URL, options);
            console.log("response", response.data);
            return response.data; // 응답 데이터만 반환
        } catch (error) {
            console.log("Error fetching restaurants", error);
            throw error;
        }
    }
);
