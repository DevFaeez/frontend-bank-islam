import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { transferReducer } from "./slice/TransferSlice";
import { goalAccountReducer } from "./slice/GoalAccountSlice";
import { useReducer } from "react";
import { userReducer } from "./slice/UserProfileSlice";
import { adminTransactionReducer} from "./slice/Admin/AdminTransactionSlice";
import { adminReducer } from "./slice/Admin/AdminProfileSlice";
import { userDetailReducer } from "./slice/Admin/AdminUserDetailSlice";
import { transferTransactionReducer } from "./slice/Admin/AdminTransferTransactionSlice";
import { loanReducer } from "./slice/LoanSlice";
import { transactionReducer } from "./slice/TransactionSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        user: userReducer,
        admin: adminReducer,
        goalAccount: goalAccountReducer,
        user: userReducer,
        adminUserDetail: userDetailReducer,
        loan: loanReducer,
        transfer: transferReducer,
        transaction: transactionReducer,
        adminTransaction: adminTransactionReducer,
        transferTransaction: transferTransactionReducer
    }
})

export {store}

