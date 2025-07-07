import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAdmin } from "../../thunk/Admin/AdminUserManagementTrunk";

const AdminUserManagementSlice = createSlice({
    name: "adminUserManage",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllAdmin.pending, (state) => {
                console.log("fetchAllAdmin pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAdmin.rejected, (state) => {
                console.log("fetchAllAdmin rejected");
                state.loading = false;
                state.error = null;
                
            })
            .addCase(fetchAllAdmin.fulfilled, (state, action) => {
                console.log("fetchAllAdmin fulfilled");
                state.loading = false;
                state.error = null;
                state.data = action.payload.data
            })
    }
})

export const adminUserManageReducer = AdminUserManagementSlice.reducer;