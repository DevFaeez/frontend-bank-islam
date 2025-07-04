import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { transferReducer } from "./slice/TransferSlice";
import { goalAccountReducer } from "./slice/GoalAccountSlice";
import { userReducer } from "./slice/UserProfileSlice";
import { transactionReducer } from "./slice/Admin/AdminTransactionSlice";
import { adminReducer } from "./slice/Admin/AdminProfileSlice";
import { userDetailReducer } from "./slice/Admin/AdminUserDetailSlice";
import { loanReducer } from "./slice/LoanSlice";

const store = configureStore({
reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        transfer: transferReducer,
        goalAccount: goalAccountReducer,
        user: userReducer,
        loan: loanReducer,
        transaction: transactionReducer,
        admin: adminReducer,
        adminUserDetail: userDetailReducer
}
})

export {store}
