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
);
