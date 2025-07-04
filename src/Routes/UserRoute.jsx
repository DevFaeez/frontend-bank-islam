import { Route, Routes } from "react-router-dom";
import LoanPage from "../user/pages/LoanPage";
import AccountPage from "../user/pages/AccountPage";
import GoalAccountPage from "../user/pages/GoalAccountPage";
import AuthPage from "../user/pages/AuthPage";
import Login from "../user/components/Auth/Login";
import Homepage from "../user/pages/Homepage";
import UserProfile from "../user/pages/UserProfile";

export default function UserRoute() {
    return(
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<AccountPage />} />
            <Route path="/loan" element={<LoanPage />} />
            <Route path="/goal" element={<GoalAccountPage />} />
            <Route path="/payloan" element={<AccountPage />} />
            <Route path="/transfer" element={<AccountPage />} />
            <Route path="/paybill" element={<AccountPage />} />
            <Route path="/profile" element={<AccountPage />} />
            <Route path="/logout" element={<Homepage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            {/* <Route path="/app" element={<AuthPage />} /> */}
            {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        </Routes>
    )
}       