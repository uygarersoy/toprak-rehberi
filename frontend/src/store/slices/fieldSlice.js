import { createSlice } from "@reduxjs/toolkit";
import { addField } from "../thunks/addField";
import { fetchFields } from "../thunks/fetchFields";
import { removeField } from "../thunks/removeField";

const fieldsSlice = createSlice({
    name: "fields",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {
        resetFields(state, action) {
            return {
                data: {},
                isLoading: false,
                error: null
            }   
        }
    },
    extraReducers(builder) {
        builder.addCase(addField.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addField.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addField.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchFields.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchFields.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(fetchFields.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(removeField.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(removeField.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(removeField.fulfilled, (state, action) => {
            state.data = state.data.filter((field) => {
                return field.id !== action.payload;
            });
            state.isLoading = false;
            state.error = null;
        })
    }
});

export const fieldsReducer = fieldsSlice.reducer;