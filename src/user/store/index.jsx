import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
import { useReducer } from "react";
import { userReducer } from "./slice/UserProfileSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
        user: userReducer
    }
})

export {store}