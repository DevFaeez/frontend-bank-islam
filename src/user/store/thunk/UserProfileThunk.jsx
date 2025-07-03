import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../../api/configApi";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "user/fetch",
    async(accountId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASEURL}/Controller/userController.php?action=fetchUser&accountId=${accountId}`)

            console.log("fetchUser response", response.data);

            return response.data;
            
            
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }


    }
)

