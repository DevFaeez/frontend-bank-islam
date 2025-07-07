import { createSlice } from "@reduxjs/toolkit";
import { downloadLoanData, fetchAllLoan, fetchAllLoanTrans, updateLoanStatus } from "../../thunk/Admin/ApprovalSliceThunk";


const loanApprovalSlice = createSlice({
    name: "loanapproval",
    initialState: {
        loanData: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllLoan.pending, (state) => {
                console.log("fetchAllLoan pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLoan.rejected, (state, action) => {
                console.log("fetchAllLoan rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(fetchAllLoan.fulfilled, (state, action) => {
                console.log("fetchAllLoan fulfilled", action.payload);
                state.loading = false;
                state.loanData = action.payload.data || [];
            })
            .addCase(fetchAllLoanTrans.fulfilled, (state, action) => {
                console.log("fetchAllLoanTrans fulfilled", action.payload);
                state.loading = false;
                state.loanData = action.payload.data || [];
            })
            .addCase(updateLoanStatus.pending, (state) => {
                console.log("updateLoanStatus pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLoanStatus.rejected, (state, action) => {
                console.log("updateLoanStatus rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(updateLoanStatus.fulfilled, (state, action) => {
                console.log("updateLoanStatus fulfilled", action.payload.data);
                state.loading = false;
                state.loanData = state.loanData.map((item) => (
                    item.ACCOUNTLOANID === action.payload.accountLoanId ? {...item, STATUS: action.payload.status} : item
                ));
            })

            .addCase(downloadLoanData.pending, (state) => {
                console.log("downloadLoanData pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(downloadLoanData.rejected, (state, action) => {
                console.log("downloadLoanData rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(downloadLoanData.fulfilled, (state, action) => {
                console.log("downloadLoanData fulfilled", action.payload.data);
                state.loading = false;
            })
    }

})

export const loanApprovaReducer = loanApprovalSlice.reducer;