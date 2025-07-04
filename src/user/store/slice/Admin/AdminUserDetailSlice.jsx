import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUser } from "../../thunk/Admin/AdminUserDetailTrunk";

const AdminUserDetailSlice = createSlice({
    name: "adminUserDetail",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllUser.pending, (state) => {
                console.log("fetchAllUser pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUser.rejected, (state) => {
                console.log("fetchAllUser rejected");
                state.loading = false;
                state.error = null;
                
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                console.log("fetchAllUser fulfilled");
                state.loading = false;
                state.error = null;
                state.data = action.payload.data
            })
    }
})

export const userDetailReducer = AdminUserDetailSlice.reducer;