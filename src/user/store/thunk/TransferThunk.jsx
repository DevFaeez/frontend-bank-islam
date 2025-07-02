import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../api/configApi";
import axios from "axios";

export const transfer = createAsyncThunk(
    "transfer/transfer",
    async(data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/TransferController.php?action=transfer`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error"});
        }
    }
)