import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const removeField = createAsyncThunk("field/remove", async (fieldId) => {
    await axios.delete(`http://localhost:8080/api/field/${fieldId}`);
    return fieldId;
});

export { removeField };