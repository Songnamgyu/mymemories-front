import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveDiary } from "../../api/diary/diaryApi";

// Diary 항목에 대한 타입 정의
type DiaryItem = {
    id: number;
    selectedDate: string;
    content: string;
    score: number;
    filePath?: any;
    fileName: string;
    title?: string;
    deleteYn: string;
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
            .addCase(saveDiary.pending, (state) => {
                state.isLoading = true; // 요청 중일 때 로딩 상태를 true로 설정
            })
            .addCase(
                saveDiary.fulfilled,
                (state, action: PayloadAction<DiaryItem>) => {
                    state.isLoading = false; // 요청 완료 시 로딩 상태 해제
                    state.diaryData.push(action.payload); // 응답 받은 데이터를 diaryData 배열에 추가
                }
            )
            .addCase(saveDiary.rejected, (state) => {
                state.isLoading = false; // 요청 실패 시 로딩 상태 해제
            });
    },
});

export default diarySlice.reducer;
