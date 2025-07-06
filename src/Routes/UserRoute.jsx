import { Route, Routes } from "react-router-dom";
import Homepage from "../user/pages/Homepage";
import AccountPage from "../user/pages/AccountPage";
import GoalAccountPage from "../user/pages/GoalAccountPage";
import LoanPage from "../user/pages/LoanPage";
import AuthPage from "../user/pages/AuthPage";
import UserProfile from "../user/pages/UserProfile";

import AdminPage from "../user/pages/AdminPage";
import AdminAccountDetails from "../user/components/Admin/AdminAccountDetail";
import AdminProfile from "../user/components/Admin/AdminProfile";
import AdminUserDetail from "../user/components/Admin/AdminUserDetail";
import AdminTransactionManagement from "../user/components/Admin/AdminTransactionManagement";

export default function UserRoute() {
  return (
    <Routes>
      {/* Regular user routes */}
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
      <Route path="/app" element={<AuthPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
    </Routes>
  );
}
