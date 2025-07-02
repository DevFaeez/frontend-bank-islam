import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { transferReducer } from "./slice/TransferSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        transfer: transferReducer
    }
})

export {store}