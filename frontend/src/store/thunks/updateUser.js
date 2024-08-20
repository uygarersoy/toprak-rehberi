import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUser = createAsyncThunk("user/update", async ({userName, email, currentPassword, newPassword}) => {
    const response = await axios.put("http://localhost:8080/api/user/update", null, {
        params: {
            userName,
            email,
            currentPassword,
            newPassword
        }
    });
    return response.data;
});

export { updateUser };