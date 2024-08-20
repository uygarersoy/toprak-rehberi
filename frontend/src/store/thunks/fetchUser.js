import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk("user/fetch", async ({ userName, password }) => {
    const response = await axios.post("http://localhost:8080/api/user/login", null, {
        params: {
            userName,
            password
        }}
    );
    return response.data;
});

export { fetchUser };