import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addHarvest = createAsyncThunk("harvest/add", async (harvest) => {
    const response = await axios.post("http://localhost:8080/api/harvest/add", harvest);
    return response.data;
})

export { addHarvest };