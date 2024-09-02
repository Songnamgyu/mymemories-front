import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "../api/users/userApi";

type User = {
    user: {};
    isLoading?: boolean;
    error?: any;
};

const initialState: User = {
    user: {},
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default User;
