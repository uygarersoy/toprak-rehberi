import { createSlice } from "@reduxjs/toolkit";
import { fetchHarvests } from "../thunks/fetchHarvests";
import { removeHarvest } from "../thunks/removeHarvest";
import { addHarvest } from "../thunks/addHarvest";

const harvestSlice = createSlice({
    name: "harvests",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(fetchHarvests.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchHarvests.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchHarvests.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(removeHarvest.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(removeHarvest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((harvest) => {
                return harvest.id !== action.payload;
            });
            state.error = null;
        });
        builder.addCase(removeHarvest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addHarvest.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addHarvest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.error = null;
        });
        builder.addCase(addHarvest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const harvestReducer = harvestSlice.reducer;