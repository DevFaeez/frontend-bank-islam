import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTransaction } from "../thunk/TransactionThunk";


const transactionSlices = createSlice({
    name: "transaction",
    initialState: {
        transactionData: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllTransaction.pending, (state) => {
                console.log("fetchAllTransaction pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTransaction.rejected, (state, action) => {
                console.log("fetchAllTransaction rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(fetchAllTransaction.fulfilled, (state, action) => {
                console.log("fetchAllTransaction fulfilled", action.payload);
                state.loading = false;
                state.transactionData = action.payload.data;
            })

    }

})

export const transactionReducer = transactionSlices.reducer;