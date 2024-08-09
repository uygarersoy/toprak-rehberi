import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addField = createAsyncThunk("field/add", async (field) => {
    const response = await axios.post("http://localhost:8080/api/field/add", field);
    return response.data;
});

export { addField };