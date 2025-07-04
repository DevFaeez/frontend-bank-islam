import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const fetchLoan = createAsyncThunk(
    "loan/fetchLoan",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/LoanController.php?action=fetchLoan`);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const submitNewLoan = createAsyncThunk(
    "loan/newloan",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/LoanController.php?action=submitLoan`, data);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const fetchMyLoan = createAsyncThunk(
    "loan/myloan",
    async (accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/LoanController.php?action=fetchMyLoan&accountId=${accountId}`);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const payMyLoan = createAsyncThunk(
    "loan/payMyloan",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/LoanController.php?action=payMyLoan`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)