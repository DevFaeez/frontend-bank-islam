import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { transferReducer } from "./slice/TransferSlice";
import { goalAccountReducer } from "./slice/GoalAccountSlice";
import { userReducer } from "./slice/UserProfileSlice";

const store = configureStore({
reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        transfer: transferReducer,
        goalAccount: goalAccountReducer,
        user: userReducer
}
})

export {store}
