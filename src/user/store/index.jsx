import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/AuthSlice";
import { dashboardReducer } from "./slice/DashboardSlice";
import { billReducer } from "./slice/BillSlice";
<<<<<<< HEAD
import { transferReducer } from "./slice/TransferSlice";
import { goalAccountReducer } from "./slice/GoalAccountSlice";
=======
import { useReducer } from "react";
import { userReducer } from "./slice/UserProfileSlice";
>>>>>>> 6abea84280ce5d4735c96eaedfbcbfd60e646b25

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bill: billReducer,
<<<<<<< HEAD
        transfer: transferReducer,
        goalAccount: goalAccountReducer
=======
        user: userReducer
>>>>>>> 6abea84280ce5d4735c96eaedfbcbfd60e646b25
    }
})

export {store}