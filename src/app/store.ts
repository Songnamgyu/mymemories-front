import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import diaryReducer from "../slice/diary/diarySlice";
import placeReducer from "../slice/place/placeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        diary: diaryReducer,
        place: placeReducer,
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
