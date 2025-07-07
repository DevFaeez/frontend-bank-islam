import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../api/configApi";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "user/fetch",
    async(accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/userController.php?action=fetchUser&accountId=${accountId}`)
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }


    }
)

export const updateUserProfile = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASEURL}/Controller/userController.php?action=updateUser`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
)

export const updateUserPassword = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASEURL}/Controller/userController.php?action=updateUserPassword`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);

    