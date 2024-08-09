import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchFields = createAsyncThunk("fields/fetch", async (user) => {
    const response = await axios.post("http://localhost:8080/api/field/fetch-user-fields", user);
    return response.data;
});

export { fetchFields };