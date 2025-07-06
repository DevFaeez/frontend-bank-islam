import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../../api/configApi";
import axios from "axios";

export const fetchAdmin = createAsyncThunk(
  "adminProfile/fetch",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/Controller/AdminController.php?action=fetchAdmin&employeeId=${employeeId}`)
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
)

export const updateAdminProfile = createAsyncThunk(
  "adminProfile/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASEURL}/Controller/AdminController.php?action=updateAdmin`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);