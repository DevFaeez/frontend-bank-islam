import { createSlice } from "@reduxjs/toolkit";
import { fetchLoan, fetchMyLoan, payMyLoan, submitNewLoan } from "../thunk/LoanThunk";


const loanSlices = createSlice({
    name: "loan",
    initialState: {
        availableLoan: [],
        myLoan: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchLoan.pending, (state) => {
                console.log("fetchLoan pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLoan.rejected, (state) => {
                console.log("fetchLoan rejected");
                state.loading = false;
            })
            .addCase(fetchLoan.fulfilled, (state, action) => {
                console.log("fetchLoan fulfilled", action.payload);
                state.loading = false;
                state.availableLoan = action.payload.data;
            })

            .addCase(submitNewLoan.pending, (state) => {
                console.log("submitNewLoan pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(submitNewLoan.rejected, (state) => {
                console.log("submitNewLoan rejected");
                state.loading = false;
            })
            .addCase(submitNewLoan.fulfilled, (state, action) => {
                console.log("submitNewLoan fulfilled", action.payload);
                state.loading = false;
            })

            .addCase(fetchMyLoan.pending, (state) => {
                console.log("fetchMyLoan pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyLoan.rejected, (state) => {
                console.log("fetchMyLoan rejected");
                state.loading = false;
            })
            .addCase(fetchMyLoan.fulfilled, (state, action) => {
                console.log("fetchMyLoan fulfilled", action.payload);
                state.loading = false;
                state.myLoan = action.payload.data || []
            })

            .addCase(payMyLoan.pending, (state) => {
                console.log("payMyLoan pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(payMyLoan.rejected, (state) => {
                console.log("payMyLoan rejected");
                state.loading = false;
            })
            .addCase(payMyLoan.fulfilled, (state, action) => {
                console.log("payMyLoan fulfilled", action.payload);
                state.loading = false;
                state.myLoan = state.myLoan.map((loan) => (
                    loan.ACCOUNTLOANID === action.payload.accountLoanId ? {...loan, BALANCE: action.payload.currentPay} : loan
                ))
            })
    }

})

export const loanReducer = loanSlices.reducer;