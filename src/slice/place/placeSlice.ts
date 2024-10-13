import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantsList } from "../../api/place/placeApi";

const initialState = {
    placeList: [],
};

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurantsList.fulfilled, (state, action) => {
            state.placeList = action.payload?.data;
        });
    },
});

export default placeSlice.reducer;
