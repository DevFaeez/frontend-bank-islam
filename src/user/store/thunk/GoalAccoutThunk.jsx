import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const createGoalAccount = createAsyncThunk(
    "goalAccount/create",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/GoalAccountController.php?action=createGoalAccount`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const fetchGoalAccount = createAsyncThunk(
    "goalAccount/fetch",
    async (accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/GoalAccountController.php?action=fetchGoalAccount&id=${accountId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const addAmountGoalAccount = createAsyncThunk(
    "goalAccount/addAmount",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${BASEURL}/Controller/GoalAccountController.php?action=addAmount`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const deleteGoalAccount = createAsyncThunk(
    "goalAccount/delete",
    async (goalAccountId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${BASEURL}/Controller/GoalAccountController.php?action=deleteGoalAccount&goalAccountId=${goalAccountId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)