import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTransfer } from "../../thunk/Admin/AdminTransferTransactionTrunk";

const transferTransactionSlice = createSlice({
  name: "transferTransaction",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransfer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchAllTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
      });
  },
});

export const transferTransactionReducer = transferTransactionSlice.reducer;
