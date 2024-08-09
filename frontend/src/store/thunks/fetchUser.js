import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk("user/fetch", async (credentials) => {
    const response = await axios.post("http://localhost:8080/api/user/login", credentials);
    return response.data;
});

export { fetchUser };