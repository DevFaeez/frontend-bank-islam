import { createSlice } from "@reduxjs/toolkit";
import { billPayment, fetchBill } from "../thunk/Billthunk";


const billSlice = createSlice({
    name: "bill",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchBill.pending, (state) => {
                console.log("fetchBill pending");
                state.loading = true;
            })
            .addCase(fetchBill.rejected, (state, action) => {
                console.log("fetchBill rejected", action);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBill.fulfilled, (state, action) => {
                console.log("fetchBill fulfilled", action.payload);
                state.loading = false;
                state.data = action.payload.data;
            })

            .addCase(billPayment.pending, (state) => {
                console.log("BillPayment pending");
                state.loading = true;
            })
            .addCase(billPayment.rejected, (state, action) => {
                console.log("BillPayment rejected", action);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(billPayment.fulfilled, (state, action) => {
                console.log("BillPayment fulfilled", action.payload);
                state.loading = false;
                state.data = action.payload.data;
            })
    }

})

export const billReducer = billSlice.reducer;