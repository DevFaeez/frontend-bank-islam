import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const fetchAllTransaction = createAsyncThunk(
    "transaction/fetch",
    async (accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/TransactionController.php?action=fetchTransaction&accountId=${accountId}`);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });

        }
    }
)
