import { createSlice } from "@reduxjs/toolkit";
import { transfer } from "../thunk/TransferThunk";


const transferSlice = createSlice({
    name: "transfer",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(transfer.pending, (state) => {
                console.log("transfer pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(transfer.rejected, (state, action) => {
                console.log("transfer rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(transfer.fulfilled, (state, action) => {
                console.log("transfer fulfilled", action.payload);
                state.loading = false;
            })
    }
})

export const transferReducer = transferSlice.reducer;