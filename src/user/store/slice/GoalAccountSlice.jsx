import { createSlice } from "@reduxjs/toolkit";
import { addAmountGoalAccount, createGoalAccount, deleteGoalAccount, fetchGoalAccount } from "../thunk/GoalAccoutThunk";

const goalAccountSlices = createSlice({
    name: "goalAccount",
    initialState: {
        loading: false,
        error: null,
        goalAccountData: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(createGoalAccount.pending, (state) => {
                console.log("createGoalAccount pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoalAccount.rejected, (state, action) => {
                console.log("createGoalAccount rejected", action.payload);
                state.loading = false;
                
            })
            .addCase(createGoalAccount.fulfilled, (state, action) => {
                console.log("createGoalAccount fulfilled", action.payload);
                state.loading = false;
            })

            .addCase(fetchGoalAccount.pending, (state) => {
                console.log("fetchGoalAccount pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoalAccount.rejected, (state, action) => {
                console.log("fetchGoalAccount rejected", action.payload);
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchGoalAccount.fulfilled, (state, action) => {
                console.log("fetchGoalAccount fulfilled", action.payload);
                state.loading = false;
                state.goalAccountData = action.payload.data;
                
            })

            .addCase(addAmountGoalAccount.pending, (state) => {
                console.log("addAmountGoalAccount pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(addAmountGoalAccount.rejected, (state, action) => {
                console.log("addAmountGoalAccount rejected", action.payload);
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(addAmountGoalAccount.fulfilled, (state, action) => {
                console.log("addAmountGoalAccount fulfilled", action.payload);
                state.loading = false;
                state.goalAccountData = state.goalAccountData.map((goal) => (
                    goal.goalaccountid === action.payload.goalAccountId ? {...goal, balance: action.payload.balance} : goal
                ))
            })

            .addCase(deleteGoalAccount.pending, (state) => {
                console.log("deleteGoalAccount pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGoalAccount.rejected, (state, action) => {
                console.log("deleteGoalAccount rejected", action.payload);
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteGoalAccount.fulfilled, (state, action) => {
                console.log("deleteGoalAccount fulfilled", action.payload);
                state.loading = false;
                state.goalAccountData = state.goalAccountData.filter((goal) => (
                    goal.goalaccountid !== action.payload.goalAccountId
                ))
            })

    }

})

export const goalAccountReducer = goalAccountSlices.reducer;