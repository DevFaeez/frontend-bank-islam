import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { goalAccountReducer } from "./slice/GoalAccountSlice";
import { userReducer } from "./slice/UserProfileSlice";
import { adminReducer } from "./slice/Admin/AdminProfileSlice";
import { userDetailReducer } from "./slice/Admin/AdminUserDetailSlice";
import { transferTransactionReducer } from "./slice/Admin/AdminTransferTransactionSlice";
import { loanReducer } from "./slice/LoanSlice";
import { transactionReducer } from "./slice/TransactionSlice";
import { adminTransactionReducer } from "./slice/Admin/AdminTransactionSlice";
import { loanApprovaReducer } from "./slice/Admin/ApprovalLoanSlice";
import { adminUserManageReducer } from "./slice/Admin/AdminUserManagementSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        user: userReducer,
        goalAccount: goalAccountReducer,
        loan: loanReducer,
        transaction: transactionReducer,
        
        // admin
        admin: adminReducer,
        adminUserDetail: userDetailReducer,
        adminTransaction: adminTransactionReducer,
        adminTranferTransaction: transferTransactionReducer,
        adminLoanApproval: loanApprovaReducer,
        adminUserManage: adminUserManageReducer
}
})

export {store}

