import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTrans } from "../../thunk/Admin/AdminTransactionTrunk";

const AdminTransactionSlice = createSlice({
  name: "AdminTransaction",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTrans.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchAllTrans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
      });
  },
});

export const adminTransactionReducer = AdminTransactionSlice.reducer;
