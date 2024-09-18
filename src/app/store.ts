import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import diaryReducer from "../slice/diary/diarySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        diary: diaryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
