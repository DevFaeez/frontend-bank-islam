import { createSlice } from "@reduxjs/toolkit";
import { fetchAdmin } from "../../thunk/Admin/AdminProfileTrunk";

const AdminProfileSlice = createSlice({
    name: "adminProfile",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAdmin.pending, (state) => {
                console.log("fetchAdmin pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdmin.rejected, (state) => {
                console.log("fetchAdmin rejected");
                state.loading = false;
                state.error = null;
                
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                console.log("fetchAdmin fulfilled");
                state.loading = false;
                state.error = null;
                state.data = action.payload.data
            })
    }
})

export const adminReducer = AdminProfileSlice.reducer;