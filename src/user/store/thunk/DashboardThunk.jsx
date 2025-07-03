import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../api/configApi";
import axios from "axios";

export const fetchDashboard = createAsyncThunk(
    "dashbaord/fetch",
    async(accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/DashboardController.php?action=fetchDashboard&accountId=${accountId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

