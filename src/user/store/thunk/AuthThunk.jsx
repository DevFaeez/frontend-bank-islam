import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/userController.php?action=register`, userData);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });

        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/userController.php?action=login`, loginData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)

export const loginAdmin = createAsyncThunk(
    "auth/adminLogin",
    async (adminLoginData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/Controller/AdminController.php?action=adminLogin`, adminLoginData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);