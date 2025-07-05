import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../../api/configApi";
import axios from "axios";

export const fetchAllTransfer = createAsyncThunk(
  "transferTransaction/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/Controller/TransferController.php?action=fetchAllTransfer`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);
