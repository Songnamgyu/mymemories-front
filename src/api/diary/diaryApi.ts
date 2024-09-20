import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { DiaryItem } from "../../slice/diary/diarySlice";

type DiarySaveRequestParam = {
    date: string;
    content: string;
    score: number;
    imageFile?: any;
    title?: string;
};

type DiaryResponseParam = {
    id: number;
    selectedDate: string;
    content: string;
    score: number;
    filePath?: any;
    fileName: string;
    title?: string;
    deleteYn: string;
};

type DiaryListParam = {
    date: string;
};
type DiaryListResponse = {
    data: DiaryItem[];
};

export const saveDiary = createAsyncThunk<
    DiaryResponseParam, // 성공 시 반환되는 데이터의 타입
    DiarySaveRequestParam, // 전달받는 파라미터의 타입
    { rejectValue: any }
>(
    "/diary/detail",
    async (param: DiarySaveRequestParam, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("selectedDate", param.date);
            formData.append("content", param.content);
            formData.append("score", param.score.toString());
            if (param.imageFile) {
                formData.append("file", param.imageFile);
            }
            if (param.title) {
                formData.append("title", param.title);
            }
            const response = await axiosInstance.post<DiaryResponseParam>(
                "/diary/detail",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getDiaryList = createAsyncThunk<
    DiaryListResponse,
    DiaryListParam,
    { rejectValue: any }
>("/diary/list", async (param: DiaryListParam, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<DiaryListResponse>(
            "/diary/list",
            { params: param }
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data || error.message);
    }
});

export const getFileImage = createAsyncThunk(
    "/file",
    async (fileName: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`file/image/${fileName}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateDiary = createAsyncThunk<
    DiaryResponseParam,
    DiarySaveRequestParam,
    { rejectValue: any }
>("/updateDiary", async (param: DiarySaveRequestParam, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("selectedDate", param.date);
        formData.append("content", param.content);
        formData.append("score", param.score.toString());
        if (param.imageFile) {
            formData.append("file", param.imageFile);
        }
        if (param.title) {
            formData.append("title", param.title);
        }
        const response = await axiosInstance.put("/diary/detail", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("error", error);
        return rejectWithValue(error.response.data || error.message);
    }
});
