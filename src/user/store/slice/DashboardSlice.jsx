import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "../thunk/DashboardThunk";

const dashboardSlice = createSlice({
    name: "dashbaord",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                console.log("fetchDashboard pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboard.rejected, (state) => {
                console.log("fetchDashboard rejected");
                state.loading = false;
                state.error = null;
                
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                console.log("fetchDashboard fulfilled");
                state.loading = false;
                state.error = null;
                state.data = action.payload.data
            })
    }
})

export const dashboardReducer = dashboardSlice.reducer;