import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchHarvests = createAsyncThunk("harvests/fetch", async (field) => {
    const response = await axios.post("http://localhost:8080/api/harvest/fetch-field-harvest", field);
    return response.data;
});

export { fetchHarvests };