import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

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
