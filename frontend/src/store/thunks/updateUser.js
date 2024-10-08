import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUser = createAsyncThunk("user/update", async ({userName, currentPassword, newPassword}) => {
    const response = await axios.put("http://localhost:8080/api/user/update", null, {
        params: {
            userName,
            currentPassword,
            newPassword
        }
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
});

export { updateUser };