import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchUser";
import { updateUser } from "../thunks/updateUser";
import { registerUser } from "../thunks/registerUser";


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {},
        isLoading: false,
        error: null,
    },
    reducers: {
        removeUser(state, action) {
            return {
                data: {},
                isLoading: false,
                error: null
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            //state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            //state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        

    }
});

export const userReducer = userSlice.reducer;
export const { removeUser } = userSlice.actions;