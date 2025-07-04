import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../../api/configApi";
import axios from "axios";

export const fetchAllUser = createAsyncThunk(
  "userDetail/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/Controller/userController.php?action=fetchAllUser`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);
