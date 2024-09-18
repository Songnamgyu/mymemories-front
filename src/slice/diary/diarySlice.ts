import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDiaryList, saveDiary } from "../../api/diary/diaryApi";

// Diary 항목에 대한 타입 정의
export type DiaryItem = {
    id: number;
    selectedDate: string;
    content: string;
    score: number;
    filePath?: string; // 타입 수정
    fileName?: string; // 타입 수정
    title?: string;
    deleteYn?: string; // 타입 수정
};

// Slice의 상태 타입 정의
type DiaryState = {
    diaryData: DiaryItem[]; // 다이어리 목록
    isLoading: boolean; // 로딩 상태
};

// 초기 상태 설정
const initialState: DiaryState = {
    diaryData: [],
    isLoading: false,
};

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // saveDiary 요청 중일 때
            .addCase(saveDiary.pending, (state) => {
                state.isLoading = true;
            })
            // saveDiary 요청 성공 시
            .addCase(
                saveDiary.fulfilled,
                (state, action: PayloadAction<DiaryItem>) => {
                    state.isLoading = false;
                    state.diaryData.push(action.payload);
                }
            )
            // saveDiary 요청 실패 시
            .addCase(saveDiary.rejected, (state) => {
                state.isLoading = false;
            })
            // getDiaryList 요청 중일 때
            .addCase(getDiaryList.pending, (state) => {
                state.isLoading = true;
            })
            // getDiaryList 요청 성공 시
            .addCase(
                getDiaryList.fulfilled,
                (state, action: PayloadAction<{ data: DiaryItem[] }>) => {
                    state.isLoading = false;
                    state.diaryData = action.payload.data;
                }
            )
            .addCase(getDiaryList.rejected, (state, action) => {
                state.isLoading = false;
                state.diaryData = [];
            });
    },
});

export default diarySlice.reducer;
