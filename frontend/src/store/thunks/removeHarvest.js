import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeHarvest = createAsyncThunk("harvest/reove", async (harvest) => {
    await axios.delete(`http://localhost:8080/api/harvest/delete/${harvest.id}`);
    return harvest.id;
});

export { removeHarvest };