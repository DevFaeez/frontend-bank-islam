import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { useReducer } from "react";
import { userReducer } from "./slice/UserProfileSlice";
import { transactionReducer } from "./slice/Admin/AdminTransactionSlice";
import { adminReducer } from "./slice/Admin/AdminProfileSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        user: userReducer,
        transactions: transactionReducer,
        admin: adminReducer
    }
})

export {store}