import axios, { AxiosResponse } from "axios";
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

const options = {
    params: {
        bl_latitude: "11.847676",
        tr_latitude: "12.838442",
        bl_longitude: "109.095887",
        tr_longitude: "109.149359",
    },
    headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
    },
    withCredentials: false, // 추가
};

export const fetchRestaurantsList = createAsyncThunk(
    "place/restaurants",
    async (): Promise<AxiosResponse<any>> => {
        try {
            const response = await axiosInstance.get(URL, options);
            console.log("response", response.data);
            return response;
        } catch (error) {
            console.error("Error fetching restaurants", error);
            throw error;
        }
    }
);
