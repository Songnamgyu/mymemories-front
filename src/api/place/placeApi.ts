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

// fetchRestaurantsList 함수 수정
export const fetchRestaurantsList = createAsyncThunk(
    "place/restaurants",
    async (bounds: {
        sw: { lat: number; lng: number };
        ne: { lat: number; lng: number };
    }): Promise<AxiosResponse<any>> => {
        console.log("sw", bounds);
        const options = {
            params: {
                bl_latitude: bounds.sw.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
                tr_latitude: bounds.ne.lat,
            },
            headers: {
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
                "X-RapidAPI-Key": apiKey,
            },
            // withCredentials: false, // 추가
        };
        console.log("api,place");
        try {
            const response = await axiosInstance.get(URL, options);
            console.log("response", response.data);
            return response.data; // 응답 데이터만 반환
        } catch (error) {
            console.error("Error fetching restaurants", error);
            throw error;
        }
    }
);
