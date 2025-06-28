import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const fetchBill = createAsyncThunk(
    "bill/fetch",
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/BillController.php?action=fetchBill`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });

        }
    }
)

export const billPayment = createAsyncThunk(
    "bill/payment",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/BillController.php?action=billPayment`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });

        }
    }
)

