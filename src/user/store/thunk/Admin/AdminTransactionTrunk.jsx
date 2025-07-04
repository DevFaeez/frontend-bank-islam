import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../../api/configApi";
import axios from "axios";

export const fetchAllTrans = createAsyncThunk(
  "transaction/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/Controller/TransactionController.php?action=fetchAllTrans`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);
