import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUser = createAsyncThunk("user/register", async (user) => {
    const response = await axios.post("http://localhost:8080/api/user/register", user);
    return response.data;
});


export { registerUser };