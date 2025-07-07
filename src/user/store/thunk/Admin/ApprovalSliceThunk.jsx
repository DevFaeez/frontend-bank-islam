import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../../api/configApi";

export const fetchAllLoan = createAsyncThunk(
    "loanapproval/fetch",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/AdminLoanApprovalController.php?action=fetchAllLoan`);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });

        }
    }
)

export const updateLoanStatus = createAsyncThunk(
    "loanapproval/updatestatus",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/AdminLoanApprovalController.php?action=updateLoanStatus&status=${data.status}&loanId=${data.loanId}&employeeId=${data.employeeId}`);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const downloadLoanData = createAsyncThunk(
    "loanapproval/downloadloan",
    async (loanId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/AdminLoanApprovalController.php?action=downloadLoanData&loanId=${loanId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)