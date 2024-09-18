import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUser } from "../api/users/userApi";

type User = {
    isLoading?: boolean;
    error?: any;
    message: string;
    isAuthenciated: boolean;
};

const initialState: User = {
    isLoading: false,
    error: null,
    message: "",
    isAuthenciated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuthenciated: (state, action) => {
            state.isAuthenciated = action.payload;
        },
        setLogout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            state.isAuthenciated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                createUser.fulfilled,
                (
                    state,
                    action: PayloadAction<{ data: { message: string } }>
                ) => {
                    state.isLoading = false;
                    state.message = action.payload.data.message || "success";
                }
            )
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.message = "fail";
            });
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isAuthenciated = true;
                state.isLoading = false;
                state.message = "success";
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isAuthenciated = false;
                state.isLoading = false;
            });
    },
});

export const { setIsAuthenciated, setLogout } = userSlice.actions; // 액션을 export
export default userSlice.reducer;
